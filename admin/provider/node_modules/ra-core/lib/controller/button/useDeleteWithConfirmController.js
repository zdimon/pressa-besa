"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dataProvider_1 = require("../../dataProvider");
var actions_1 = require("../../actions");
var sideEffect_1 = require("../../sideEffect");
/**
 * Prepare a set of callbacks for a delete button guarded by confirmation dialog
 *
 * @example
 *
 * const DeleteButton = ({
 *     resource,
 *     record,
 *     basePath,
 *     redirect,
 *     onClick,
 *     ...rest
 * }) => {
 *     const {
 *         open,
 *         loading,
 *         handleDialogOpen,
 *         handleDialogClose,
 *         handleDelete,
 *     } = useDeleteWithConfirmController({
 *         resource,
 *         record,
 *         redirect,
 *         basePath,
 *         onClick,
 *     });
 *
 *     return (
 *         <Fragment>
 *             <Button
 *                 onClick={handleDialogOpen}
 *                 label="ra.action.delete"
 *                 {...rest}
 *             >
 *                 {icon}
 *             </Button>
 *             <Confirm
 *                 isOpen={open}
 *                 loading={loading}
 *                 title="ra.message.delete_title"
 *                 content="ra.message.delete_content"
 *                 translateOptions={{
 *                     name: resource,
 *                     id: record.id,
 *                 }}
 *                 onConfirm={handleDelete}
 *                 onClose={handleDialogClose}
 *             />
 *         </Fragment>
 *     );
 * };
 */
var useDeleteWithConfirmController = function (_a) {
    var resource = _a.resource, record = _a.record, redirectTo = _a.redirect, basePath = _a.basePath, onClick = _a.onClick;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var notify = sideEffect_1.useNotify();
    var redirect = sideEffect_1.useRedirect();
    var refresh = sideEffect_1.useRefresh();
    var _c = dataProvider_1.useDelete(resource, null, null, {
        action: actions_1.CRUD_DELETE,
        onSuccess: function () {
            notify('ra.notification.deleted', 'info', { smart_count: 1 });
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: function (error) {
            notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
            setOpen(false);
        },
        undoable: false,
    }), deleteOne = _c[0], loading = _c[1].loading;
    var handleDialogOpen = function (e) {
        setOpen(true);
        e.stopPropagation();
    };
    var handleDialogClose = function (e) {
        setOpen(false);
        e.stopPropagation();
    };
    var handleDelete = react_1.useCallback(function (event) {
        deleteOne({
            payload: { id: record.id, previousData: record },
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteOne, onClick, record]);
    return { open: open, loading: loading, handleDialogOpen: handleDialogOpen, handleDialogClose: handleDialogClose, handleDelete: handleDelete };
};
exports.default = useDeleteWithConfirmController;
