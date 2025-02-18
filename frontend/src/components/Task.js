import { Typography, IconButton, ListItemText, Box } from '@mui/material'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import React from 'react'

export default function Task({task, openModal, handleDelete}) {
    
  return (
    <Box sx={{ display:'flex', justifyContent:'space-between',width:"100%" }}>
        <ListItemText sx={{width:'100%'}}>{task.title}</ListItemText>
        <IconButton onClick={() => openModal(task)}>
            <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(task._id)}>
            <DeleteIcon sx={{ color: "red" }}/>
        </IconButton>
    </Box>
  )
}
