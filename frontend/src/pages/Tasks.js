import React, { useEffect, useState } from 'react'
import "../styles/Tasks.css";
import axios from 'axios';
import { fetchTasks, addTask, removeTask, modifyTask } from '../slices/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Tasks({ user, logout }) {

  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [updateFormIsOpen, setUpdateFormIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]) //?why put dispatch in dependenct array

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(addTask({ title, completed }));
    setTitle('');
    setCompleted(false);
  }

  const openUpdateForm = (task) => {
    setUpdateFormIsOpen(true);
    setTitle(task.title);
    setCompleted(task.completed);
    setCurrentTask(task);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(modifyTask({ id: currentTask._id, newTask: { title, completed } }));
    setTitle('');
    setCompleted(false);
    setCurrentTask(null);
    setUpdateFormIsOpen(false);
  }

  const handleDelete = (id) => {
    dispatch(removeTask(id));
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      console.log(response);
      if (response.status === 200) logout();
    } catch (error) {
      console.log(error);
    }
  }

  const updateForm = <form onSubmit={handleUpdate}>
    <label>Title</label>
    <input type='text' id='title' name='title' onChange={e => setTitle(e.target.value)} placeholder="Title" value={title} required></input>
    <label>Complete</label>
    <input type='checkbox' id='completed' name='completed' checked={completed} onChange={(e) => setCompleted(e.target.checked)}></input>
    <button type='submit'>Update</button>
    <button onClick={() => { setUpdateFormIsOpen(false); setCurrentTask(null) }}>Cancel</button>
  </form>;



  return (
    <div>
      <h1 id="heading">Welcome {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
      {loading && <p>loading..</p>}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {
        updateFormIsOpen ? updateForm : <ul>
          {tasks.map((task) =>
            <li key={task._id}>
              <p>{task.title}</p>
              <p>Completed? {task.completed ? "Yes" : "No"}</p>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
              <button onClick={() => openUpdateForm(task)}>Update</button>
            </li>)}
          <form onSubmit={handleCreate}>
            <label>Title</label>
            <input type='text' id='title' name='title' onChange={e => setTitle(e.target.value)} placeholder="Title" value={title} required></input>
            <label>Complete</label>
            <input type='checkbox' id='completed' name='completed' checked={completed} onChange={(e) => setCompleted(e.target.checked)}></input>
            <button type='submit'>Create Task</button>
          </form>
        </ul>

      }


    </div>
  )
}
