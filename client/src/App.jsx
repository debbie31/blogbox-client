import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import BlogDetail from './components/BlogDetail';
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/myBlogs/:id' element={<BlogDetail />} />
          <Route path='/blogs/add' element={<AddBlog />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
