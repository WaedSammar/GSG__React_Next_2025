import styles from "./page.module.css";
import HomePage from '@/components/homePage/homePage';

const getTask = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=5`)
  return res.json();
}
const Home = async () => {
  const tasks = await getTask();
  return (
    <div className={styles.page}>
      <HomePage tasks={tasks} />
    </div>
  );
}

export default Home;