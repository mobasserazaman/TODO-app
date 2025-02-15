import React, { isValidElement, useState } from 'react'
import axios from 'axios';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, register } from '../slices/authSlice';
import { Button, FormControl, InputLabel, OutlinedInput, TextField, Box, Typography } from "@mui/material";


export default function Login() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [username2, setUsername2] = useState('');
    const [password2, setPassword2] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(register({ username: username2, password: password2 }));
        setPassword2('');
        setUsername2('');
    }


    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70%", margin: "0 auto" }}>
                <Typography variant='h4'>TODO List App</Typography>
                <Typography variant="body2">
                    Created by <strong>Mobassera Zaman</strong>
                </Typography>
                <Box sx={{ width: "35%", margin: "0 auto" }}>
                    <FormControl sx={{ margin: "10px" }} fullWidth required>
                        <InputLabel>Username</InputLabel>
                        <OutlinedInput id="username" value={username} onChange={e => setUsername(e.target.value)}></OutlinedInput>
                    </FormControl>
                    <FormControl sx={{ margin: "10px" }} fullWidth required>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput id="password" value={password} onChange={e => setPassword(e.target.value)}></OutlinedInput>
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" color="primary" type='submit' onClick={handleLogin}>
                            Login
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ width: "35%", margin: "0 auto" }}>
                    <FormControl sx={{ margin: "10px" }} fullWidth required>
                        <InputLabel>Username</InputLabel>
                        <OutlinedInput id="username2"value={username2} onChange={e => setUsername2(e.target.value)} required ></OutlinedInput>
                    </FormControl>
                    <FormControl sx={{ margin: "10px" }} fullWidth required>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput id="password2" value={password2} onChange={e => setPassword2(e.target.value)} required></OutlinedInput>
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" color="primary" type='submit' onClick={handleRegister}>
                            Register
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
