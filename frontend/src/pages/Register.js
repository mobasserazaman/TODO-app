import React, { isValidElement, useEffect, useState } from 'react'
import axios from 'axios';
import { replace, useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, register, clearError } from '../slices/authSlice';
import { Button, FormControl, InputLabel, OutlinedInput, TextField, Box, Typography } from "@mui/material";
import UserForm from '../components/UserForm';
import Heading from "../components/Heading";

export default function Register() {

    const {error, message} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (user) => {
        dispatch(register(user));
        navigate("/login")
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70%", margin: "0 auto" }}>
            <Heading />
            {message !== "Registered" && <Box sx={{ width: "35%", margin: "0 auto" }}>
                <UserForm buttonText="Register" clickHandler={handleRegister}></UserForm>
            </Box>}
        </Box>
    )
}
