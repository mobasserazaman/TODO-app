import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Box, Button, FormControl, OutlinedInput, InputLabel, Checkbox } from '@mui/material'
export default function TaskModal({ open, close, clickHandler, task }) {

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (open && task) {
      setTitle(task.title);
      setCompleted(task.completed);
    }
    if(open && !task){
      setTitle("");
      setCompleted(false);
    }
  }, [open, task]);

  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <FormControl>
          <InputLabel>Title</InputLabel>
          <OutlinedInput sx={{width:'240px'}} label="Title" onChange={e => setTitle(e.target.value)} value={title} required></OutlinedInput>
        </FormControl>
        <FormControl>
          <Checkbox size='large' checked={completed} onChange={(e) => setCompleted(e.target.checked)}></Checkbox>
        </FormControl>
        <Button variant="contained" sx={{ m: 1 }} onClick={() => clickHandler({ title, completed })}>
          Save
        </Button>
        <Button variant="contained" color="error" sx={{ m: 1 }} onClick={close}>
          Close
        </Button>
      </Box>
    </Modal>
  )
}
