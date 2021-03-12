/// <reference types="react" />
/**
 * Get the list of selected items for a resource, and callbacks to change the selection
 *
 * @param resource The resource name, e.g. 'posts'
 *
 * @returns {Object} Destructure as [selectedIds, { select, toggle, clearSelection }].
 */
declare const useSelectItems: (resource: string) => [import("react").ReactText[], {
    select: (newIds: import("react").ReactText[]) => void;
    toggle: (id: import("react").ReactText) => void;
    clearSelection: () => void;
}];
export default useSelectItems;
