import { IStudent } from "../types";

const validateStudent = (newStudent: IStudent) => {
  const errors: string[] = [];

  if (newStudent.name.length < 3) {
    errors.push("The name must be more than 3 letters");
  }
  if (newStudent.age < 17 || newStudent.age > 48) {
    errors.push("The age must be between 17 and 48");
  }
  if (newStudent.coursesList.length <= 0) {
    errors.push("You must add at least one course");
  }
  return errors;
};
export { validateStudent };
