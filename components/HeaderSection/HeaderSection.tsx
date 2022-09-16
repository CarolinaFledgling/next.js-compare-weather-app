import React from 'react'
import styles from '../HeaderSection/HeaderSection.module.css'

export default function HeaderSection() {
    return <div>
      <h1 className={styles.title}>
        Welcome to <span>Compare the weather tool!</span>
      </h1>
  
      <p className={styles.description}>
        Get started by adding <span className={styles.span}>country</span>
      </p>
    </div>
  }
