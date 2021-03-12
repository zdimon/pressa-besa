import { FC } from 'react';
import { FormProps } from 'react-final-form';
import { Record } from '../types';
import { RedirectionSideEffect } from '../sideEffect';
/**
 * Wrapper around react-final-form's Form to handle redirection on submit,
 * legacy defaultValue prop, and array inputs.
 *
 * Requires a render function, just like react-final-form
 *
 * @example
 *
 * const SimpleForm = props => (
 *    <FormWithRedirect
 *        {...props}
 *        render={formProps => <SimpleFormView {...formProps} />}
 *    />
 * );
 *
 * @typedef {Object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {Object} initialValues
 * @prop {Function} validate
 * @prop {Function} save
 * @prop {boolean} submitOnEnter
 * @prop {string} redirect
 *
 * @param {Prop} props
 */
declare const FormWithRedirect: FC<FormWithRedirectOwnProps & FormProps>;
export interface FormWithRedirectOwnProps {
    defaultValue?: any;
    record?: Record;
    save: (data: Partial<Record>, redirectTo: RedirectionSideEffect, options?: {
        onSuccess?: (data?: any) => void;
        onFailure?: (error: any) => void;
    }) => void;
    redirect: RedirectionSideEffect;
    saving: boolean;
    version: number;
    warnWhenUnsavedChanges?: boolean;
}
export default FormWithRedirect;
