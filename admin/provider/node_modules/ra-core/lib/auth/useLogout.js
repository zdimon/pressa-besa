"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var useAuthProvider_1 = __importStar(require("./useAuthProvider"));
var clearActions_1 = require("../actions/clearActions");
var react_router_dom_1 = require("react-router-dom");
/**
 * Get a callback for calling the authProvider.logout() method,
 * redirect to the login page, and clear the Redux state.
 *
 * @see useAuthProvider
 *
 * @returns {Function} logout callback
 *
 * @example
 *
 * import { useLogout } from 'react-admin';
 *
 * const LogoutButton = () => {
 *     const logout = useLogout();
 *     const handleClick = () => logout();
 *     return <button onClick={handleClick}>Logout</button>;
 * }
 */
var useLogout = function () {
    var authProvider = useAuthProvider_1.default();
    var dispatch = react_redux_1.useDispatch();
    /**
     * We need the current location to pass in the router state
     * so that the login hook knows where to redirect to as next route after login.
     *
     * But if we used useLocation to get it, the logout function
     * would be rebuilt each time the user changes location. Consequently, that
     * would force a rerender of all components using this hook upon navigation
     * (CoreAdminRouter for example).
     *
     * To avoid that, we read the location directly from history which is mutable.
     * See: https://reacttraining.com/react-router/web/api/history/history-is-mutable
     */
    var history = react_router_dom_1.useHistory();
    var logout = react_1.useCallback(function (params, redirectTo) {
        if (params === void 0) { params = {}; }
        if (redirectTo === void 0) { redirectTo = useAuthProvider_1.defaultAuthParams.loginUrl; }
        return authProvider.logout(params).then(function (redirectToFromProvider) {
            dispatch(clearActions_1.clearState());
            history.push({
                pathname: redirectToFromProvider || redirectTo,
                state: {
                    nextPathname: history.location && history.location.pathname,
                },
            });
            return redirectToFromProvider;
        });
    }, [authProvider, history, dispatch]);
    var logoutWithoutProvider = react_1.useCallback(function (_) {
        history.push({
            pathname: useAuthProvider_1.defaultAuthParams.loginUrl,
            state: {
                nextPathname: history.location && history.location.pathname,
            },
        });
        dispatch(clearActions_1.clearState());
        return Promise.resolve();
    }, [dispatch, history]);
    return authProvider ? logout : logoutWithoutProvider;
};
exports.default = useLogout;
