import React from 'react';
import styles from './taskItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

const TaskItem = ({ task }: { task: { id: number; title: string; completed: boolean } }) => {
  return (
    <li className={styles.box}>
      <Image
        src={task.completed ? '/checkmark.svg.png' : '/hourglass.svg'}
        alt={task.completed ? 'Completed' : 'Pending'}
        width={24}
        height={24}
        className={styles.taskIcon}
      />
      <Link href={`/task/${task.id}`}>
        {task.title} - {task.completed ? 'Completed' : 'Pending'}
      </Link>
    </li>
  );
};

export default TaskItem;
