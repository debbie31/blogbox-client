import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogsBody from './BlogsBody';

const Blogs = () => {
  const [posts, setPosts] = useState();
  
  const sendRequest = async () => {
    const res = await axios.get('https://blog-api-6h99.onrender.com/posts')
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setPosts(data.posts));
  }, []);
  console.log(posts);
  return (
    <div>
      {posts &&
       posts.map((post, index) => (
          <BlogsBody
          id={post._id}
          isUser={localStorage.getItem('tokenStore')===post.id}
            title={post.title}
            description={post.description}
            imageURL={post.image}
            userName={post.username}
            date={post.date}
          />
        ))}
    </div>
  );
};

export default Blogs;
