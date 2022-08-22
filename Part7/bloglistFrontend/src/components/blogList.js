import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  //   {blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)) &&
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      {blogs.map((blog) => 
        <div style={blogStyle} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
      )}
    </>
  );
};

export default BlogList;
