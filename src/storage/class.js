import { useReducer, useEffect } from "react";

const LOCAL_STORAGE_KEY = "CLASSES";

function classesReducer(state, action) {
  const generateId = () => {
    if (state.length === 0) return 1;

    return state[state.length - 1].id + 1;
  };

  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload, id: generateId() }];
    case "REMOVE":
      return state.filter(({ id }) => id !== action.payload);
    case "EDIT":
      const filteredState = [...state].filter(
        ({ id }) => id !== action.payload.id
      );
      filteredState.push(action.payload);
      return filteredState.sort((a, b) =>
        String(a.id).localeCompare(String(b.id))
      );
    default:
      throw new Error();
  }
}

export default function useClassesStorage() {
  const [state, dispatch] = useReducer(
    classesReducer,
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}
