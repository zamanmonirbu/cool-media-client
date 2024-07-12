const initialState = {
    searchResults: [],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_USERS_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'SEARCH_USERS_SUCCESS':
        return {
          ...state,
          searchResults: action.payload,
          loading: false,
        };
      case 'SEARCH_USERS_FAIL':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  