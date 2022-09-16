import React from 'react'
import styles from '../Footer/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://karolinakulinskaportfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Made by 
                <span className={styles.span}>
                    Karolina Kulinska
                </span>
            </a>
        </footer>
    )
}
