import { useEffect, useReducer } from "react";
import axios from "axios";
import { Movie } from "../types";
import Cookie from "universal-cookie";

const cookie = new Cookie();


export interface State {
  data: Movie | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie }
  | { type: ActionType.FAILED; payload: string };

// const Action = {
//   FETCHING_STARTED: "FETCHING_STARTED",

// }

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        loading: true,
        error: null,
        data: null,
      };

    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    default:
      return initialState;
  }
};
export default function useMovie(id: string) {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const sessionToken = cookie.get("session_token");

    dispatch({ type: ActionType.LOADING });
    try {
      const { data } = await axios.get(`http://localhost:8080/movies/${id}`, {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });
      dispatch({ type: ActionType.SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: ActionType.FAILED, payload: error?.response?.data?.errors[0].msg });
    }
  };
  return { data, loading, error };
}
