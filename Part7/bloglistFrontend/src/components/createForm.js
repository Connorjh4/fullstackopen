import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../store/blogReducer";
import { setNotification } from "../store/notifyReducer";

const CreateForm = ({createFormRef}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  
  const handleBlogPost = async (e) => {
    e.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    dispatch(addBlog(blog));  
    dispatch(setNotification({message:`Added new blog '${blog.title}' by ${blog.author}`, color:'green', time: 5}))  
    createFormRef.current.toggleVisibility()
    document.getElementById('createForm').reset()
  };

  return (
    <form onSubmit={handleBlogPost} data-testid="createForm" id='createForm'>
      <div>
        title:
        <input
          type="text"
          name="title"
          data-testid="title-input"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          data-testid="author-input"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          data-testid="url-input"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default CreateForm;
