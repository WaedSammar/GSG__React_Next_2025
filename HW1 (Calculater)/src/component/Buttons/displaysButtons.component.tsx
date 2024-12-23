import "./displayButtons.css";

interface BProps {
  onDisplayChange: (insert: string) => void;
}

const Buttons = (props: BProps) => {
  console.log(props);
  const buttons = [
    { label: "1", className: "numbers" },
    { label: "2", className: "numbers" },
    { label: "3", className: "numbers" },
    { label: "4", className: "numbers" },
    { label: "5", className: "numbers" },
    { label: "6", className: "numbers" },
    { label: "7", className: "numbers" },
    { label: "8", className: "numbers" },
    { label: "9", className: "numbers" },
    { label: "0", className: "numbers" },
    { label: "+", className: "operations" },
    { label: "-", className: "operations" },
    { label: "=", className: "equal" },
  ];
  const display = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = e.currentTarget.textContent || "";
    props.onDisplayChange(buttonText);
  };
  return (
    <>
      <div className="buttons-container">
        {buttons.map((button, index) => (
          <button key={index} className={button.className} onClick={display}>
            {button.label}
          </button>
        ))}
      </div>
    </>
  );
};
export default Buttons;
