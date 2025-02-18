import React, { isValidElement, useState } from 'react'
import { Button, FormControl, InputLabel, OutlinedInput, Box, Typo } from "@mui/material";

export default function UserForm({ buttonText, clickHandler }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>  <FormControl sx={{ margin: "10px" }} fullWidth required>
            <InputLabel>Username</InputLabel>
            <OutlinedInput label="Username" value={username} onChange={e => setUsername(e.target.value)}></OutlinedInput>
        </FormControl>
            <FormControl sx={{ margin: "10px" }} fullWidth required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}></OutlinedInput>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" type='submit' onClick={() => {
                    setPassword('');
                    setUsername('');
                    clickHandler({ username, password })
                }}>
                    {buttonText}
                </Button>
            </Box></div>
    )
}
