import { useEffect } from 'react';
import { useRefresh } from '../sideEffect';
/**
 * Trigger a refresh of the page when the page comes back from background after a certain delay
 *
 * @param {number} delay Delay in milliseconds since the time the page was hidden. Defaults to 5 minutes.
 */
var useRefreshWhenVisible = function (delay) {
    if (delay === void 0) { delay = 1000 * 60 * 5; }
    var refresh = useRefresh();
    useEffect(function () {
        var lastHiddenTime;
        var handleVisibilityChange = function () {
            if (document.hidden) {
                // tab goes hidden
                lastHiddenTime = Date.now();
            }
            else {
                // tab goes visible
                if (Date.now() - lastHiddenTime > delay) {
                    refresh();
                }
                lastHiddenTime = null;
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return function () {
            return document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [delay, refresh]);
};
export default useRefreshWhenVisible;
