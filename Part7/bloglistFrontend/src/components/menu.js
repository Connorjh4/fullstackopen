import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../store/loginReducer"
import { setNotification } from "../store/notifyReducer"

const Menu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.loggedUser)
  
    const handleLogout = async () => {
      window.localStorage.removeItem("loggedBlogUser");
      dispatch(clearUser())
      dispatch(setNotification({message:'You have signed out', color:'green', time: 5}))
      navigate("/")
    };
  
    return (
      <div>
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>
              logout
            </button>
          </p>
      </div>
    )
}

export default Menu