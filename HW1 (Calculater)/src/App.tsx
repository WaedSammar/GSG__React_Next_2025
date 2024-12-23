import { useState } from "react";
import "./App.css";
import Buttons from "./component/Buttons/displaysButtons.component";
import Display from "./component/displayResult/display.component";

function App() {
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState("");
  const [inputText, setInputText] = useState("");
  const [isNewOperation, setIsNewOperation] = useState(false);

  const handleDisplayChange = (input: string) => {
    if (["+", "-"].includes(input)) {
      if (isNewOperation) {
        setPreviousValue(currentValue);
        setInputText(currentValue + " " + input + " ");
        setCurrentValue("");
        setOperation(input);
        setIsNewOperation(false);
      } else if (currentValue) {
        setOperation(input);
        setPreviousValue(currentValue);
        setInputText((prev) => prev + " " + input + " ");
        setCurrentValue("");
      }
    } else if (input === "=") {
      const firstNumber = parseFloat(previousValue);
      const secondNumber = parseFloat(currentValue);

      let result = 0;
      if (operation === "+") result = firstNumber + secondNumber;
      if (operation === "-") result = firstNumber - secondNumber;

      setInputText((prev) => prev + " = " + result);
      setCurrentValue(result.toString());
      setPreviousValue("");
      setOperation("");
      setIsNewOperation(true);
    } else {
      if (isNewOperation) {
        setInputText(input);
        setCurrentValue(input);
        setPreviousValue("");
        setOperation("");
        setIsNewOperation(false);
      } else {
        setCurrentValue((prev) => prev + input);
        setInputText((prev) => prev + input);
      }
    }
  };

  return (
    <>
      <Display inputText={inputText} value={currentValue || "0"} />
      <Buttons onDisplayChange={handleDisplayChange} />
    </>
  );
}

export default App;
