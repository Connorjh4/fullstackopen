import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import blogService from '../services/blogs'
import Notification from "../components/notification"
import Menu from '../components/menu'

const PrivateLayout = () => {
    const user = useSelector(state => state.loggedUser)
    const location = useLocation()

    if(user) {
        blogService.setToken(user.token)
    }

    return user ?
            <>
                <Menu />
                <h2>Blog App</h2>
                <Notification />
                <Outlet />
            </>
        :
            <Navigate to="/login" replace state={{ from: location}} />
}

export default PrivateLayout