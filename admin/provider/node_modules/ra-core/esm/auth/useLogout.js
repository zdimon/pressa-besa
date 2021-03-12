import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useAuthProvider, { defaultAuthParams } from './useAuthProvider';
import { clearState } from '../actions/clearActions';
import { useHistory } from 'react-router-dom';
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
    var authProvider = useAuthProvider();
    var dispatch = useDispatch();
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
    var history = useHistory();
    var logout = useCallback(function (params, redirectTo) {
        if (params === void 0) { params = {}; }
        if (redirectTo === void 0) { redirectTo = defaultAuthParams.loginUrl; }
        return authProvider.logout(params).then(function (redirectToFromProvider) {
            dispatch(clearState());
            history.push({
                pathname: redirectToFromProvider || redirectTo,
                state: {
                    nextPathname: history.location && history.location.pathname,
                },
            });
            return redirectToFromProvider;
        });
    }, [authProvider, history, dispatch]);
    var logoutWithoutProvider = useCallback(function (_) {
        history.push({
            pathname: defaultAuthParams.loginUrl,
            state: {
                nextPathname: history.location && history.location.pathname,
            },
        });
        dispatch(clearState());
        return Promise.resolve();
    }, [dispatch, history]);
    return authProvider ? logout : logoutWithoutProvider;
};
export default useLogout;
