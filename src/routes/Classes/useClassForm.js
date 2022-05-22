import { useReducer } from "react";

const initialState = {
  id: undefined,
  name: "",
  author: "",
  error: "",
  period: "",
  incomplete: true,
};

export const classPeriods = {
  morning: {
    label: "Manhã",
  },
  afternoon: {
    label: "Tarde",
  },
  night: {
    label: "Noite",
  },
};

export default function useClassForm() {
  return useReducer((state, action) => {
    const isIncomplete =
      !action.payload || !state.name || !state.author || !state.period;

    switch (action.type) {
      case "CHANGE_NAME":
        return {
          ...state,
          incomplete: isIncomplete,
          name: action.payload,
          error: "",
        };
      case "CHANGE_AUTHOR":
        return {
          ...state,
          incomplete: isIncomplete,
          author: action.payload,
          error: "",
        };
      case "CHANGE_PERIOD":
        return {
          ...state,
          incomplete: isIncomplete,
          period: action.payload,
          error: "",
        };
      case "SET_CLASS":
        return {
          ...state,
          incomplete: false,
          name: action.payload.name,
          author: action.payload.author,
          period: action.payload.period,
          id: action.payload.id,
          error: "",
        };
      case "RESET":
        return { ...initialState, ...action.payload };
      default:
        throw new Error();
    }
  }, initialState);
}
