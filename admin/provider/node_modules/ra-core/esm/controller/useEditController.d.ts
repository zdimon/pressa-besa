import { Record, Identifier } from '../types';
import { RedirectionSideEffect } from '../sideEffect';
import { OnSuccess, SetOnSuccess, OnFailure, SetOnFailure, TransformData, SetTransformData } from './saveModifiers';
export interface EditProps {
    basePath: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    hasList?: boolean;
    id: Identifier;
    resource: string;
    undoable?: boolean;
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
    transform?: TransformData;
    [key: string]: any;
}
export interface EditControllerProps {
    loading: boolean;
    loaded: boolean;
    saving: boolean;
    defaultTitle: string;
    save: (data: Record, redirect?: RedirectionSideEffect, callbacks?: {
        onSuccess?: OnSuccess;
        onFailure?: OnFailure;
        transform?: TransformData;
    }) => void;
    setOnSuccess: SetOnSuccess;
    setOnFailure: SetOnFailure;
    setTransform: SetTransformData;
    resource: string;
    basePath: string;
    record?: Record;
    redirect: RedirectionSideEffect;
    version: number;
    successMessage?: string;
}
/**
 * Prepare data for the Edit view
 *
 * @param {Object} props The props passed to the Edit component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Edit view
 *
 * @example
 *
 * import { useEditController } from 'react-admin';
 * import EditView from './EditView';
 *
 * const MyEdit = props => {
 *     const controllerProps = useEditController(props);
 *     return <EditView {...controllerProps} {...props} />;
 * }
 */
declare const useEditController: (props: EditProps) => EditControllerProps;
export default useEditController;
