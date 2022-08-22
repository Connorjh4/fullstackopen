import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users);
  // const blogs = useSelector((state) => state.blogs);
  //   {blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)) &&

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map( user => 
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;