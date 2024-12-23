import "./display.css";

interface DisplayProps {
  inputText: string;
  value: string;
}

const Display = (props: DisplayProps) => {
  return (
    <div className="display">
      <div className="input-text">{props.inputText}</div>
      <div className="current-value">{props.value}</div>
    </div>
  );
};

export default Display;
