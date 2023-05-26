import styles from './auth.module.scss'
import LoginImg from '../../components/assets/login.png'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
export default function Login() {
  return (
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={LoginImg} alt="" width={400}/>
        </div>
        <Card>
            <div className={styles.form}>
                <h2>Login</h2>
                <form>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button className="--btn --btn-primary --btn-block">Login</button>
                    <div className={styles.links}>
                        <Link to='/reset'>Reset password</Link>
                    </div>
                    <p>-- or --</p>
                </form>
                <button className="--btn --btn-danger --btn-block"><FaGoogle color='#fff' style={{marginRight:'0.5rem'}}/>Login with Google</button>
                <span className={styles.register}>
                    <p>Don't have an account? </p>
                    <Link to='/register'>Register</Link>
                </span>
            </div>
        </Card>
    </section>
  )
}
