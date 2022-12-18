import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, InputLabel, TextField, Button } from '@mui/material';

const BlogDetail = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchdetails = async () => {
    const res = await axios
      .get(`http://localhost:4500/posts/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    fetchdetails().then((data) => {
      setPosts(data.posts);
      setInputs({
        title: data.posts.title,
        description: data.posts.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:4500/posts/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  console.log(posts);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => navigate('/blogs'));
  };

  return (
    <div>
      {inputs && (
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
            <Button type='submit'>Submit</Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
