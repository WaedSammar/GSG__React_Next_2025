import React from 'react'
import styles from './homePage.module.css';
import TaskItem from '../taskItem/taskItem';

const HomePage = ({ tasks }: { tasks: any[] }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Tracker</h1>
      <ul className={styles.lists}>
        {
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        }
      </ul>
    </div>
  );
};

export default HomePage;
