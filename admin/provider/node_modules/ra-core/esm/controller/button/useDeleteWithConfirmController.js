import { useState, useCallback, } from 'react';
import { useDelete } from '../../dataProvider';
import { CRUD_DELETE } from '../../actions';
import { useRefresh, useNotify, useRedirect, } from '../../sideEffect';
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
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var _c = useDelete(resource, null, null, {
        action: CRUD_DELETE,
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
    var handleDelete = useCallback(function (event) {
        deleteOne({
            payload: { id: record.id, previousData: record },
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteOne, onClick, record]);
    return { open: open, loading: loading, handleDialogOpen: handleDialogOpen, handleDialogClose: handleDialogClose, handleDelete: handleDelete };
};
export default useDeleteWithConfirmController;
