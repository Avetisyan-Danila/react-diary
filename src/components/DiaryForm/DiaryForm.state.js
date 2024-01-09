export const INITIAL_STATE = {
  isValid: {
    title: true,
    date: true,
  },
  values: {
    title: "",
    date: "",
    tag: "",
    text: "",
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };
    case "RESET_VALIDITY":
      return {
        ...state,
        isValid: INITIAL_STATE.isValid,
      };
    case "CLEAR":
      return INITIAL_STATE;
    case "SUBMIT": {
      const titleValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;

      return {
        ...state,
        isValid: {
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: Boolean(titleValidity && dateValidity),
      };
    }
  }
}
