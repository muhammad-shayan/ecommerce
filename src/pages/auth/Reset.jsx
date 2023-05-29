import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import ForgotImg from '../../components/assets/forgot.png'
import { useState } from 'react'
import Loader from '../../components/loader/Loader'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

export default function Reset() {
  const [email,setEmail] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsLoading(false)
      toast.success('Check your email for a reset link')
    })
    .catch((error) => {
      toast.error(error.message)
      setIsLoading(false)
    });

  }
  return (
    <>
      {isLoading ? <Loader/>:null}
      <section className={`container ${styles.auth}`}>  
        <Card>
            <div className={styles.form}>
                <h2>Reset Password</h2>
                <form onSubmit={onSubmit}>
                    <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <button type='submit' className="--btn --btn-primary --btn-block">Reset Password</button>
                    <span className={styles.links}>
                    
                      <Link to='/login'>-Login</Link>
                      <Link to='/register'>-Register</Link>
                    </span>
                </form>
            </div>
        </Card>
        <div className={styles.img}>
            <img src={ForgotImg} alt="" width={400}/>
        </div>
      </section>
    </>
  )
}
