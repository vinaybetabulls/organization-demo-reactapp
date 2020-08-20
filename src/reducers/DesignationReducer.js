

export let initialState = {
    designation: []
  }
  
  export const reducer = (state, { type, payload }) => {
    switch (type) {
      case 'SAVE_DESIGNATION': {
        return { ...state}
      }
      case 'API_CALL_SUCCESS': {
        const { designation } = payload;
        return { ...state, designation}
      }
      case 'FILTER_STREAMS': {
        return { ...state }
      }
      default:
        return state
    }
  }