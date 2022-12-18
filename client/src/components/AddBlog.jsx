import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = 'create') => {
    const res = await axios
      .post(`http://localhost:4500/posts/${type}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem('tokenStore'),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate('/blogs'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={2}
          borderColor='#1daacd'
          borderRadius={5}
          boxShadow='10px 15px 20px #ccc'
          padding={3}
          margin={'auto'}
          marginTop={15}
          display='flex'
          flexDirection={'column'}
          width={'40%'}
        >
          <Typography
            fontWeight={'bold'}
            padding={2}
            color='black'
            textAlign={'center'}
          >
            Post your Blog
          </Typography>
          <InputLabel>Title</InputLabel>
          <TextField
            name='title'
            onChange={handleChange}
            value={inputs.title}
            margin='auto'
            variant='outlined'
          />
          <InputLabel>Description</InputLabel>
          <TextField
            name='description'
            onChange={handleChange}
            value={inputs.description}
            margin='auto'
            variant='outlined'
          />
          <InputLabel>ImageURL</InputLabel>
          <TextField
            name='image'
            onChange={handleChange}
            value={inputs.image}
            margin='auto'
            variant='outlined'
          />
          <Button type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
