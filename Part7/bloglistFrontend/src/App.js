import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom'

//components
import BlogsPage from "./pages/blogs";
import Blog from './components/blog'
import PrivateLayout from "./container/privateLayout";
import LoginPage from "./pages/loginPage";
import User from './components/user'
import UserList from "./components/userList";
 
//redux actions
import { getBlogs } from "./store/blogReducer";
import { getUsers } from './store/userReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getBlogs())
      dispatch(getUsers())
  }, [ dispatch ]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateLayout />}> 
          <Route index element={<BlogsPage />}/>
          <Route path="/blogs/:id" element={<Blog />}/>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Route>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="*" element={<div>Page does not exist</div>} />
      </Routes>  
    </>
  );
};

export default App;
