import { ITodoItem } from "../types";
import "./dashboard.css";

interface IProps {
  items: ITodoItem[];
}

const Dashboard = (props: IProps) => {
  const urgentCount = props.items.filter((item) => item.isUrgent).length;
  const completedCount = props.items.filter((item) => item.isDone).length;

  return (
    <div className="dashboard-wrapper">
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
