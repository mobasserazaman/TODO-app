import React, { isValidElement, useState } from 'react'
import axios from 'axios';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, register } from '../slices/authSlice';

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
            <div><h1>TODOs</h1></div>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} required></input>
                <label>Password:</label>
                <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} required></input>
                <button type='submit'>Login</button>
            </form>

            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input type='text' id='username2' value={username2} onChange={e => setUsername2(e.target.value)} required></input>
                <label>Password:</label>
                <input type='password' id='password2' value={password2} onChange={e => setPassword2(e.target.value)} required></input>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}
