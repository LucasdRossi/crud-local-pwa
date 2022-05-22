import { useReducer } from "react";

const initialState = {
  id: undefined,
  name: "",
  author: "",
  numberOfPages: "",
  error: "",
  incomplete: true,
};

export default function useBookForm() {
  return useReducer((state, action) => {
    const isIncomplete =
      !action.payload || !state.name || !state.author || !state.numberOfPages;

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
      case "CHANGE_NUMBER_OF_PAGES":
        return {
          ...state,
          incomplete: isIncomplete,
          numberOfPages: action.payload,
          error: "",
        };
      case "SET_BOOK":
        return {
          ...state,
          incomplete: false,
          name: action.payload.name,
          author: action.payload.author,
          numberOfPages: action.payload.numberOfPages,
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
