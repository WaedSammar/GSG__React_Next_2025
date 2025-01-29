import { useState } from "react";
import { IStudent } from "../types";

const initialState = {
  age: 0,
  coursesList: [],
  id: "",
  isGraduated: false,
  name: "",
  absents: 0,
}; 

const useStudentForm = (
  onSubmit: (student: any) => void,
  validationState: (student: any) => string[]
) => {
  const [state, setState] = useState<IStudent>(initialState);
  const [errorsList, setErrorsList] = useState<string[]>([]);

  const handleChange = (field: string, value: any) => {
    setState({ ...state, [field]: value });
  };

  const handleSubmit = () => {
    const newState = { ...state, id: Date.now().toString() };
    const errors = validationState(newState);

    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setErrorsList([]);
      onSubmit(newState);
      handleClear();
    }
  };
  const handleClear = () => {
    setState(initialState);
  };

  const handleCoursesChange = (list: string[]) => {
    setState({ ...state, coursesList: list });
  };

  return {
    state,
    setState,
    handleChange,
    handleClear,
    handleSubmit,
    handleCoursesChange,
    initialState,
    errorsList,
  };
};
export default useStudentForm;
