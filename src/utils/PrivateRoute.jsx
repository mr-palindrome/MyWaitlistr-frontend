import {Route, Redirect} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"


export const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>
}

export const RedirectAuthRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return <Route {...rest}>{user ? <Redirect to="/" /> : children}</Route>
}