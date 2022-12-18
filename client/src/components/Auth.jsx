import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr('');
  };

  const sendRequest = async (type = 'login') => {
    try {
      const res = await axios.post(`https://blog-api-6h99.onrender.com/users/${type}`, {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
      setInputs({ username: '', email: '', password: '' });
      localStorage.setItem('tokenStore', res.data.user._id);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignUp) {
      sendRequest('register')
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display='flex'
          flexDirection={'column'}
          alignItems='center'
          justifyContent={'center'}
          boxShadow='20px 20px 20px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant='h4' padding={2} textAlign='center'>
            {isSignUp ? 'Signup' : 'Login'}
          </Typography>
          {isSignUp && (
            <TextField
              name='username'
              onChange={handleChange}
              value={inputs.username}
              placeholder='Name'
              margin='normal'
              sx={{ width: 300 }}
            />
          )}{' '}
          <TextField
            name='email'
            onChange={handleChange}
            value={inputs.email}
            type={'email'}
            placeholder='Email'
            plamargin='normal'
            sx={{ width: 300 }}
          />
          <TextField
            name='password'
            onChange={handleChange}
            value={inputs.password}
            type={'password'}
            placeholder='Password'
            margin='normal'
            sx={{ width: 300 }}
          />
          <Button
            type='submit'
            sx={{ borderRadius: 3, marginTop: 3 }}
            color='warning'
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignUp ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Auth;
