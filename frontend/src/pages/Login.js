import React, { isValidElement, useState } from 'react'
import axios from 'axios';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, register } from '../slices/authSlice';
import { Button, FormControl, InputLabel, OutlinedInput, TextField, Box, Typography } from "@mui/material";
import UserForm from '../components/UserForm';
import Heading from "../components/Heading";
export default function Login() {

    const dispatch = useDispatch();

    const handleLogin = (user) => {
        dispatch(login(user));
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70%", margin: "0 auto" }}>
            <Heading />
            <Box sx={{ width: "35%", margin: "0 auto" }}>
                <UserForm buttonText="Login" clickHandler={handleLogin}></UserForm>
                <Typography variant='body2'>Don't have an account? <Link to="/register">Sign up</Link></Typography>
            </Box>
        </Box>
    )
}
