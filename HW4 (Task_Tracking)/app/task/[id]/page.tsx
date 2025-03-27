'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { notFound, useParams, useRouter } from 'next/navigation';

const getTask = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) {
    notFound();
  }
  return res.json();
};

const TaskDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<{ id: number; title: string; completed: boolean } | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (params?.id) {
      getTask(Number(params.id))
        .then(setTask)
        .catch(() => setError(true)
      );
    }
  }, [params?.id]);

  const copyToClipboard = () => {
    if (task) {
      navigator.clipboard.writeText(task.title).then(() => {
        alert("Task title copied to clipboard!");
      });
    }
  };

  if (error) {
    router.replace('/not-found');
    return null;
  }

  if (!task) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ backgroundColor: "#FFFFFD", maxWidth: 500, p: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Task Details
          </Typography>
          <Image
            src={task.completed ? "/completedTask.svg" : "/pendingTask.png"}
            alt={task.completed ? "Completed" : "Pending"}
            width={200}
            height={200}
          />
          <Typography variant="h5" mt={2}>
            {task.title}
          </Typography>
          <Typography sx={{ mt: 2 }} color={task.completed ? "green" : "#FEBE11"}>
            {task.completed ? "Completed ✅" : "Pending ⏳"}
          </Typography>
          <Button variant="contained" sx={{ mt: 3, mr: 2 }} onClick={copyToClipboard}>
            Copy Title
          </Button>
          <Button variant="contained" sx={{ mt: 3 }} component={Link} href="/">
            Back to Tasks
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskDetails;
