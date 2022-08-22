import { useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id))

  return (
    <div data-testid="user">
        <h1>{user.name}</h1>
        <h2>Added blogs</h2>
        {user.blogs.map( b => <li key={b.id} ><Link to={`/blogs/${b.id}`}>{b.title}</Link></li> )}
        
    </div>
  );
};

export default User;
