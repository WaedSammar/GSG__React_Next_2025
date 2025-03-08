import { useContext } from "react";
import { ITodoItem } from "../types";
import "./dashboard.css";
import { ThemeContext } from "../../main";

interface IProps {
  items: ITodoItem[];
}

const Dashboard = (props: IProps) => {
  const {theme} = useContext(ThemeContext)

  const urgentCount = props.items.filter((item) => item.isUrgent).length;
  const completedCount = props.items.filter((item) => item.isDone).length;

  return (
    <div className={`dashboard-wrapper ${theme}`}>
      <div className="tasks">
        <b>{props.items.length}</b>
        <span>Created Tasks</span>
      </div>
      <div className="tasks">
        <b>{urgentCount}</b>
        <span>Urgent Tasks</span>
      </div>
      <div className="tasks">
        <b>{completedCount}</b>
        <span>Completed Tasks</span>
      </div>
    </div>
  );
};

export default Dashboard;
