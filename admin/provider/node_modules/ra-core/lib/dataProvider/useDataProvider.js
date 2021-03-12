"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var DataProviderContext_1 = __importDefault(require("./DataProviderContext"));
var validateResponseFormat_1 = __importDefault(require("./validateResponseFormat"));
var undoableEventEmitter_1 = __importDefault(require("./undoableEventEmitter"));
var getFetchType_1 = __importDefault(require("./getFetchType"));
var defaultDataProvider_1 = __importDefault(require("./defaultDataProvider"));
var replyWithCache_1 = require("./replyWithCache");
var undoActions_1 = require("../actions/undoActions");
var fetchActions_1 = require("../actions/fetchActions");
var notificationActions_1 = require("../actions/notificationActions");
var uiActions_1 = require("../actions/uiActions");
var useLogoutIfAccessDenied_1 = __importDefault(require("../auth/useLogoutIfAccessDenied"));
// List of dataProvider calls emitted while in optimistic mode.
// These calls get replayed once the dataProvider exits optimistic mode
var optimisticCalls = [];
/**
 * Hook for getting a dataProvider
 *
 * Gets a dataProvider object, which behaves just like the real dataProvider
 * (same methods returning a Promise). But it's actually a Proxy object, which
 * dispatches Redux actions along the process. The benefit is that react-admin
 * tracks the loading state when using this hook, and stores results in the
 * Redux store for future use.
 *
 * In addition to the 2 usual parameters of the dataProvider methods (resource,
 * payload), the Proxy supports a third parameter for every call. It's an
 * object literal which may contain side effects, or make the action optimistic
 * (with undoable: true).
 *
 * @return dataProvider
 *
 * @example Basic usage
 *
 * import * as React from 'react';
import { useState } from 'react';
 * import { useDataProvider } from 'react-admin';
 *
 * const PostList = () => {
 *      const [posts, setPosts] = useState([])
 *      const dataProvider = useDataProvider();
 *      useEffect(() => {
 *          dataProvider.getList('posts', { filter: { status: 'pending' }})
 *            .then(({ data }) => setPosts(data));
 *      }, [])
 *
 *      return (
 *          <Fragment>
 *              {posts.map((post, key) => <PostDetail post={post} key={key} />)}
 *          </Fragment>
 *     }
 * }
 *
 * @example Handling all states (loading, error, success)
 *
 * import { useState, useEffect } from 'react';
 * import { useDataProvider } from 'react-admin';
 *
 * const UserProfile = ({ userId }) => {
 *     const dataProvider = useDataProvider();
 *     const [user, setUser] = useState();
 *     const [loading, setLoading] = useState(true);
 *     const [error, setError] = useState();
 *     useEffect(() => {
 *         dataProvider.getOne('users', { id: userId })
 *             .then(({ data }) => {
 *                 setUser(data);
 *                 setLoading(false);
 *             })
 *             .catch(error => {
 *                 setError(error);
 *                 setLoading(false);
 *             })
 *     }, []);
 *
 *     if (loading) return <Loading />;
 *     if (error) return <Error />
 *     if (!user) return null;
 *
 *     return (
 *         <ul>
 *             <li>Name: {user.name}</li>
 *             <li>Email: {user.email}</li>
 *         </ul>
 *     )
 * }
 *
 * @example Action customization
 *
 * dataProvider.getOne('users', { id: 123 });
 * // will dispatch the following actions:
 * // - CUSTOM_FETCH
 * // - CUSTOM_FETCH_LOADING
 * // - FETCH_START
 * // - CUSTOM_FETCH_SUCCESS
 * // - FETCH_END
 *
 * dataProvider.getOne('users', { id: 123 }, { action: CRUD_GET_ONE });
 * // will dispatch the following actions:
 * // - CRUD_GET_ONE
 * // - CRUD_GET_ONE_LOADING
 * // - FETCH_START
 * // - CRUD_GET_ONE_SUCCESS
 * // - FETCH_END
 */
var useDataProvider = function () {
    var dispatch = react_redux_1.useDispatch();
    var dataProvider = react_1.useContext(DataProviderContext_1.default) || defaultDataProvider_1.default;
    var isOptimistic = react_redux_1.useSelector(function (state) { return state.admin.ui.optimistic; });
    var store = react_redux_1.useStore();
    var logoutIfAccessDenied = useLogoutIfAccessDenied_1.default();
    var dataProviderProxy = react_1.useMemo(function () {
        return new Proxy(dataProvider, {
            get: function (target, name) {
                if (typeof name === 'symbol') {
                    return;
                }
                return function (resource, payload, options) {
                    var type = name.toString();
                    var _a = options || {}, _b = _a.action, action = _b === void 0 ? 'CUSTOM_FETCH' : _b, _c = _a.undoable, undoable = _c === void 0 ? false : _c, _d = _a.onSuccess, onSuccess = _d === void 0 ? undefined : _d, _e = _a.onFailure, onFailure = _e === void 0 ? undefined : _e, rest = __rest(_a, ["action", "undoable", "onSuccess", "onFailure"]);
                    if (typeof dataProvider[type] !== 'function') {
                        throw new Error("Unknown dataProvider function: " + type);
                    }
                    if (onSuccess && typeof onSuccess !== 'function') {
                        throw new Error('The onSuccess option must be a function');
                    }
                    if (onFailure && typeof onFailure !== 'function') {
                        throw new Error('The onFailure option must be a function');
                    }
                    if (undoable && !onSuccess) {
                        throw new Error('You must pass an onSuccess callback calling notify() to use the undoable mode');
                    }
                    var params = {
                        action: action,
                        dataProvider: dataProvider,
                        dispatch: dispatch,
                        logoutIfAccessDenied: logoutIfAccessDenied,
                        onFailure: onFailure,
                        onSuccess: onSuccess,
                        payload: payload,
                        resource: resource,
                        rest: rest,
                        store: store,
                        type: type,
                        undoable: undoable,
                    };
                    if (isOptimistic) {
                        // in optimistic mode, all fetch calls are stacked, to be
                        // executed once the dataProvider leaves optimistic mode.
                        // In the meantime, the admin uses data from the store.
                        optimisticCalls.push(params);
                        return Promise.resolve();
                    }
                    return doQuery(params);
                };
            },
        });
    }, [dataProvider, dispatch, isOptimistic, logoutIfAccessDenied, store]);
    return dataProviderProxy;
};
var doQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, store = _a.store, undoable = _a.undoable, logoutIfAccessDenied = _a.logoutIfAccessDenied;
    var resourceState = store.getState().admin.resources[resource];
    if (replyWithCache_1.canReplyWithCache(type, payload, resourceState)) {
        return answerWithCache({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            resourceState: resourceState,
            dispatch: dispatch,
        });
    }
    return undoable
        ? performUndoableQuery({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
        })
        : performQuery({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
        });
};
/**
 * In undoable mode, the hook dispatches an optimistic action and executes
 * the success side effects right away. Then it waits for a few seconds to
 * actually call the dataProvider - unless the user dispatches an Undo action.
 *
 * We call that "optimistic" because the hook returns a resolved Promise
 * immediately (although it has an empty value). That only works if the
 * caller reads the result from the Redux store, not from the Promise.
 */
var performUndoableQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, logoutIfAccessDenied = _a.logoutIfAccessDenied;
    dispatch(undoActions_1.startOptimisticMode());
    if (window) {
        window.addEventListener('beforeunload', warnBeforeClosingWindow);
    }
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({
        type: action + "_OPTIMISTIC",
        payload: payload,
        meta: {
            resource: resource,
            fetch: getFetchType_1.default(type),
            optimistic: true,
        },
    });
    onSuccess && onSuccess({});
    undoableEventEmitter_1.default.once('end', function (_a) {
        var isUndo = _a.isUndo;
        dispatch(undoActions_1.stopOptimisticMode());
        if (isUndo) {
            dispatch(notificationActions_1.showNotification('ra.notification.canceled'));
            dispatch(uiActions_1.refreshView());
            if (window) {
                window.removeEventListener('beforeunload', warnBeforeClosingWindow);
            }
            return;
        }
        dispatch({
            type: action + "_LOADING",
            payload: payload,
            meta: __assign({ resource: resource }, rest),
        });
        dispatch({ type: fetchActions_1.FETCH_START });
        try {
            dataProvider[type](resource, payload)
                .then(function (response) {
                if (process.env.NODE_ENV !== 'production') {
                    validateResponseFormat_1.default(response, type);
                }
                dispatch({
                    type: action + "_SUCCESS",
                    payload: response,
                    requestPayload: payload,
                    meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END }),
                });
                dispatch({ type: fetchActions_1.FETCH_END });
                if (window) {
                    window.removeEventListener('beforeunload', warnBeforeClosingWindow);
                }
                replayOptimisticCalls();
            })
                .catch(function (error) {
                if (window) {
                    window.removeEventListener('beforeunload', warnBeforeClosingWindow);
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                return logoutIfAccessDenied(error).then(function (loggedOut) {
                    if (loggedOut)
                        return;
                    dispatch({
                        type: action + "_FAILURE",
                        error: error.message ? error.message : error,
                        payload: error.body ? error.body : null,
                        requestPayload: payload,
                        meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_ERROR }),
                    });
                    dispatch({ type: fetchActions_1.FETCH_ERROR, error: error });
                    onFailure && onFailure(error);
                    throw error;
                });
            });
        }
        catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(e);
            }
            throw new Error('The dataProvider threw an error. It should return a rejected Promise instead.');
        }
    });
    return Promise.resolve({});
};
// event listener added as window.onbeforeunload when starting optimistic mode, and removed when it ends
var warnBeforeClosingWindow = function (event) {
    event.preventDefault(); // standard
    event.returnValue = ''; // Chrome
    return 'Your latest modifications are not yet sent to the server. Are you sure?'; // Old IE
};
// Replay calls recorded while in optimistic mode
var replayOptimisticCalls = function () {
    Promise.all(optimisticCalls.map(function (params) {
        return Promise.resolve(doQuery.call(null, params));
    }));
    optimisticCalls.splice(0, optimisticCalls.length);
};
/**
 * In normal mode, the hook calls the dataProvider. When a successful response
 * arrives, the hook dispatches a SUCCESS action, executes success side effects
 * and returns the response. If the response is an error, the hook dispatches
 * a FAILURE action, executes failure side effects, and throws an error.
 */
var performQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, logoutIfAccessDenied = _a.logoutIfAccessDenied;
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({
        type: action + "_LOADING",
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({ type: fetchActions_1.FETCH_START });
    try {
        return dataProvider[type](resource, payload)
            .then(function (response) {
            if (process.env.NODE_ENV !== 'production') {
                validateResponseFormat_1.default(response, type);
            }
            dispatch({
                type: action + "_SUCCESS",
                payload: response,
                requestPayload: payload,
                meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END }),
            });
            dispatch({ type: fetchActions_1.FETCH_END });
            onSuccess && onSuccess(response);
            return response;
        })
            .catch(function (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
            return logoutIfAccessDenied(error).then(function (loggedOut) {
                if (loggedOut)
                    return;
                dispatch({
                    type: action + "_FAILURE",
                    error: error.message ? error.message : error,
                    payload: error.body ? error.body : null,
                    requestPayload: payload,
                    meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_ERROR }),
                });
                dispatch({ type: fetchActions_1.FETCH_ERROR, error: error });
                onFailure && onFailure(error);
                throw error;
            });
        });
    }
    catch (e) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(e);
        }
        throw new Error('The dataProvider threw an error. It should return a rejected Promise instead.');
    }
};
var answerWithCache = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, resourceState = _a.resourceState, dispatch = _a.dispatch;
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    var response = replyWithCache_1.getResultFromCache(type, payload, resourceState);
    dispatch({
        type: action + "_SUCCESS",
        payload: response,
        requestPayload: payload,
        meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END, fromCache: true }),
    });
    onSuccess && onSuccess(response);
    return Promise.resolve(response);
};
exports.default = useDataProvider;
