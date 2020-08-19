

export let initialState = {
  organisations: []
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SAVE_ORG': {
      return { ...state}
    }
    case 'API_CALL_SUCCESS': {
      const { organisations } = payload;
      return { ...state, organisations}
    }
    case 'FILTER_STREAMS': {
      return { ...state }
    }
    default:
      return state
  }
}