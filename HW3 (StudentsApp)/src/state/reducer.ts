import { IStudent } from "../types";

//const [state, dispatch] = useReducer(reducer, initialState);
interface IState {
  studentsList: IStudent[];
  totalAbsents: number;
}
type Action =
  | { type: "ADD_STUDENT"; payload: IStudent }
  | { type: "REMOVE_FIRST" }
  | { type: "TOTAL_ABSENT"; payload: { id: string; change: number } }
  | {
      type: "INIT_STUDENT";
      payload: { studentsList: IStudent[]; totalAbsents: number };
    };

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "INIT_STUDENT":
      return {
        ...state,
        studentsList: action.payload.studentsList,
        totalAbsents: action.payload.totalAbsents,
      };
    case "ADD_STUDENT":
      const newStudent = action.payload;
      return {
        ...state,
        studentsList: [...state.studentsList, newStudent],
        totalAbsents: state.totalAbsents + action.payload.absents,
      };
    case "REMOVE_FIRST":
      const newList = [...state.studentsList];
      const removedStudent = newList.shift();
      return {
        ...state,
        studentsList: newList,
        totalAbsents: removedStudent
          ? state.totalAbsents - removedStudent.absents
          : state.totalAbsents,
      };
    case "TOTAL_ABSENT":
      return {
        ...state,
        studentsList: state.studentsList.map((item) =>
          item.id === action.payload.id
            ? { ...item, absents: item.absents + action.payload.change }
            : item
        ),
        totalAbsents: state.totalAbsents + action.payload.change,
      };
    default:
      return state;
  }
};
export default reducer;
