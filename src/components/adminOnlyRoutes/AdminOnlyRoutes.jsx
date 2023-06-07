import { useSelector } from "react-redux"
import { selectEmail } from "../../features/authSlice"
import { Link } from "react-router-dom"

export const AdminOnlyRoutes = ({children}) => {
    const email = useSelector(selectEmail)
    if(email==='test@gmail.com'){
        return children
    }
    else{
        return (
            <section style={{height:'80vh'}}>
                <div className="container">
                    <h2>Permission Denied</h2>
                    <p>This page can only be viewed by an Admin user</p>
                    <br />
                    <Link to="/">
                        <button className="--btn --btn-primary">&larr; Go Back</button>
                    </Link>
                </div>
            </section>
          )
    }
  
}


export const AdminOnlyLinks = ({children}) => {
    const email = useSelector(selectEmail)
    if(email==='test@gmail.com'){
        return children
    }
    else{
        return null
    }
}


