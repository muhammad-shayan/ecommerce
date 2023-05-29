import styles from './auth.module.scss'
import RegisterImg from '../../components/assets/register.png'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

export default function Register() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [password2,setPassword2] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const onSubmit = (e) =>{
    e.preventDefault()
    if(password !== password2){
      toast.error('Passwords not matched')
    }
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setIsLoading(false)
      toast.success('Registration successful')
      navigate('/login')
    })
    .catch((error) => {
      toast.error(error.message);
      setIsLoading(false)
    });
  }

  return (
    
    <section className={`container ${styles.auth}`}>
      {isLoading?<Loader/>:null}
      <Card>
          <div className={styles.form}>
              <h2>Register</h2>
              <form onSubmit={onSubmit}>
                  <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                  <input type="password" value={password2} placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)}/>
                  <button className="--btn --btn-primary --btn-block">Register</button>
              </form>
              <span className={styles.register}>
                  <p>Already have an accont?</p>
                  <Link to='/login'>Login</Link>
              </span>
          </div>
      </Card>
      <div className={styles.img}>
          <img src={RegisterImg} alt="" width={400}/>
      </div>
    </section>
  )
}
