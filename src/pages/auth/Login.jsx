import styles from './auth.module.scss'
import LoginImg from '../../components/assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { useState } from 'react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false)
          toast.success('Login successful')
          navigate('/')
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false)
        });
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            toast.success('Login successful')
            navigate('/')
        }).catch((error) => {
            toast.error(error.message);
        });
    }

  return (
    <>
        {isLoading?<Loader/>:null}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={LoginImg} alt="" width={400}/>
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={onSubmit}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <button className="--btn --btn-primary --btn-block">Login</button>
                        <div className={styles.links}>
                            <Link to='/reset'>Reset password</Link>
                        </div>
                        <p>-- or --</p>
                    </form>
                    <button className="--btn --btn-danger --btn-block" onClick={loginWithGoogle}><FaGoogle color='#fff' 
                    style={{marginRight:'0.5rem'}}/>Login with Google</button>
                    <span className={styles.register}>
                        <p>Don't have an account? </p>
                        <Link to='/register'>Register</Link>
                    </span>
                </div>
            </Card>
        </section>
    </>
  )
}
