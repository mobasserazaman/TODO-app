import React, { useEffect, useState } from 'react'
import "../styles/Tasks.css";
import axios from 'axios';
import { fetchTasks, addTask, removeTask, modifyTask } from '../slices/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import Heading from '../components/Heading';
import { Box, ListItem, List, Typography, Button } from '@mui/material';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskCreateModal';

export default function Tasks({ user }) {

  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState(false);
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]) //?why put dispatch in dependenct array

  const handleCreate = (newTask) => {
    dispatch(addTask(newTask));
    setCreateTaskModalIsOpen(false);
  }
  const handleUpdate = (newTask) => {
    dispatch(modifyTask({ id: currentTask._id, newTask }));
    setEditTaskModalIsOpen(false);
    setCurrentTask(null);
  }
  const handleDelete = (id) => {
    dispatch(removeTask(id));
  }
  const openCreateTaskModal = () => {
    setCreateTaskModalIsOpen(true);
  }
  const closeCreateTaskModal = () => {
    setCreateTaskModalIsOpen(false);
  }
  const openEditTaskModal = (task) => {
    setEditTaskModalIsOpen(true);
    setCurrentTask(task);
  }
  const closeEditTaskModal = () => {
    setEditTaskModalIsOpen(false);
  }
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70%", margin: "0 auto" }}>
      <Heading />     
      <Typography variant='h5' sx={{mt:3}}>Welcome <strong>{user.username},</strong></Typography> 
      <Button size='small' variant='contained' sx={{m:1}} color='secondary' onClick={handleLogout}>Logout</Button>
      <Button size='small' variant='contained' sx={{m:1}} onClick={openCreateTaskModal}>Create Task</Button>
      <List sx={{width:'60%'}}>
        {tasks.map(task => <ListItem key={task._id}><Task task={task} handleDelete={handleDelete} openModal={openEditTaskModal} /></ListItem>)}
      </List>
      <TaskModal open={createTaskModalIsOpen} clickHandler={handleCreate} close={closeCreateTaskModal} />
      <TaskModal open={editTaskModalIsOpen} task={currentTask} clickHandler={handleUpdate} close={closeEditTaskModal} />
    </Box>
  )
}
