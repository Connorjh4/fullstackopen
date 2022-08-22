import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom'
import { addLike, removeBlog } from "../store/blogReducer";
import { setNotification } from "../store/notifyReducer";

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  return (
    <div data-testid="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <>
          <div>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}
              <button className="like" onClick={() => {
                dispatch(addLike(blog))
                }}>
                like
              </button>
            </p>
            <p>added by {blog.user.name}</p>
            <button onClick={() => {
              dispatch(removeBlog(blog))
              dispatch(setNotification({message:`${blog.title} has been removed`, color:'green', time: 5}))
              Navigate('/')
              } }>remove</button>
          </div>
      </>
    </div>
  );
};

export default Blog;
