import Link from 'next/link'
import styles from "../styles/Home.module.css";

export default function FourOhFour() {
    return <div className={styles.main}>
        <h1>404 -  Sorry, Page Not Found</h1>
        <Link href="/">
            <a>
                Go back home
            </a>
        </Link>
    </div>
}