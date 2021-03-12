import { Reducer } from 'redux';
export interface UIState {
    readonly sidebarOpen: boolean;
    readonly optimistic: boolean;
    readonly viewVersion: number;
}
declare const uiReducer: Reducer<UIState>;
export default uiReducer;
