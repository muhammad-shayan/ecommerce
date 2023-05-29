import loaderImg from '../assets/loader.gif'
import styles from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loaderImg} alt="Loading..." />
        </div>
    </div>
  )
}
