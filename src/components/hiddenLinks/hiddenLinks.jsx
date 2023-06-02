import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../features/authSlice"

export const ShowOnLogin = ({children}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (isLoggedIn?children:null)
}

export const ShowOnLogout = ({children}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (isLoggedIn?null:children)
}