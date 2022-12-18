import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogsBody = ({ title, description, imageURL, userName, isUser, id, date }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:4500/posts/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/blogs'))
      .then(() => navigate('/'))
  };
  return (
    <div>
      <Card
        sx={{
          width: '55%',
          margin: 'auto',
          marginTop: 5,
          padding: 3,
          ':hover': { boxShadow: '15px 15px 15px 20px #cdd' },
        }}
      >
        {!isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#1daacd' }} aria-label='Picture'>
              {userName}
            </Avatar>
          }
          title={title}
          subheader={date}
        />
        <CardMedia
          component='img'
          height='194'
          image={imageURL}
          alt='Picture'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogsBody;
