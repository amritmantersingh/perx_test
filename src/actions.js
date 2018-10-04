export const LOADING_START = 'LOADING_START';
export const LOADING_FINISH = 'LOADING_FINISH';
export const STORE_TABLE_DATA = 'STORE_TABLE_DATA';
export const SET_TABLE_PAGINATION = 'SET_TABLE_PAGINATION';
export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';
export const UPDATE_EDITOR_FIELD = 'UPDATE_EDITOR_FIELD';
export const OPEN_CONFIRMATION_MODAL = 'OPEN_CONFIRMATION_MODAL';
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL';
export const SET_EDITOR_ERROR_MESSAGE ='SET_EDITOR_ERROR_MESSAGE';

export function startLoading() {
    return {
        type: LOADING_START
    }
}
export function finishLoading() {
    return {
        type: LOADING_FINISH
    }
}
export function storeTableData(data) {
    return {
        type: STORE_TABLE_DATA,
        payload: data
    }
}
export function setPagination(pagination) {
    return {
        type: SET_TABLE_PAGINATION,
        payload: pagination
    }
}
export function openEditor(selectedItem) {
    return {
        type: OPEN_EDITOR,
        payload: selectedItem
    }
}
export function closeEditor() {
    return {
        type: CLOSE_EDITOR
    }
}
export function updateField(key, value) {
    return {
        type: UPDATE_EDITOR_FIELD,
        key: key,
        value: value
    }
}
export function openConfirmationModal(id) {
    return {
        type: OPEN_CONFIRMATION_MODAL,
        payload: id
    }
}
export function closeConfirmationModal() {
    return {
        type: CLOSE_CONFIRMATION_MODAL
    }
}
export function handleEditorError (error) {
    return {
        type: SET_EDITOR_ERROR_MESSAGE,
        payload: error
    }
}
