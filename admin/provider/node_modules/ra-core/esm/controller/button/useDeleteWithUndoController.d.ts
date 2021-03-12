import { ReactEventHandler } from 'react';
import { RedirectionSideEffect } from '../../sideEffect';
import { Record } from '../../types';
/**
 * Prepare callback for a Delete button with undo support
 *
 * @example
 *
 * import React from 'react';
 * import ActionDelete from '@material-ui/icons/Delete';
 * import { Button, useDeleteWithUndoController } from 'react-admin';
 *
 * const DeleteButton = ({
 *     resource,
 *     record,
 *     basePath,
 *     redirect,
 *     onClick,
 *     ...rest
 * }) => {
 *     const { loading, handleDelete } = useDeleteWithUndoController({
 *         resource,
 *         record,
 *         basePath,
 *         redirect,
 *         onClick,
 *     });
 *
 *     return (
 *         <Button
 *             onClick={handleDelete}
 *             disabled={loading}
 *             label="ra.action.delete"
 *             {...rest}
 *         >
 *             <ActionDelete />
 *         </Button>
 *     );
 * };
 */
declare const useDeleteWithUndoController: ({ resource, record, basePath, redirect: redirectTo, onClick, }: UseDeleteWithUndoControllerParams) => UseDeleteWithUndoControllerReturn;
export interface UseDeleteWithUndoControllerParams {
    basePath?: string;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource: string;
    onClick?: ReactEventHandler<any>;
}
export interface UseDeleteWithUndoControllerReturn {
    loading: boolean;
    handleDelete: ReactEventHandler<any>;
}
export default useDeleteWithUndoController;
