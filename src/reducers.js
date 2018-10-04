import {
  LOADING_START,
  LOADING_FINISH,
  STORE_TABLE_DATA,
  OPEN_EDITOR,
  CLOSE_EDITOR,
  UPDATE_EDITOR_FIELD,
  SET_EDITOR_ERROR_MESSAGE,
  SET_TABLE_PAGINATION,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL
} from './actions';

const initialState = {
  tableData: [],
  pagination: {
    current: 1,
    total: 500,
    offset: 0,
    pageSize: 10
  },
  editor: {
    isOpen: false,
    item: {},
    isNewItem: false,
    error: null
  },
  userToRemove: null,
  isLoading: false
};

export default (state = initialState, action) => {

  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true
      }
    case LOADING_FINISH:
      return {
        ...state,
        isLoading: false
      }
    case STORE_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload
      }
    case SET_TABLE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      }
    case OPEN_EDITOR: {
      const item = action.payload || {};
      const isNewItem = !action.payload;
      return {
        ...state,
        editor: {
          isOpen: true,
          item: item,
          isNewItem: isNewItem
        }
      }
    }
    case CLOSE_EDITOR: {
      return {
        ...state,
        editor: initialState.editor
      }
    }
    case UPDATE_EDITOR_FIELD: {
      return {
        ...state,
        editor: {
          ...state.editor,
          item: {
            ...state.editor.item,
            [action.key]: action.value
          }
        }
      }
    }
    case SET_EDITOR_ERROR_MESSAGE: {
      return {
        ...state,
        editor: {
          ...state.editor,
          error: action.payload
        }
      }
    }
    case OPEN_CONFIRMATION_MODAL: {
      return {
        ...state,
        userToRemove: action.payload
      }
    }
    case CLOSE_CONFIRMATION_MODAL: {
      return {
        ...state,
        userToRemove: null
      }
    }
    default:
      return state;
  }

};
