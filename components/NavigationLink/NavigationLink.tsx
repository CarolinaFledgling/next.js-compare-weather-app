import Link from 'next/link'
import React from 'react'
import styles from '../NavigationLink/NavigationLink.module.css'

interface  NavigationProps {
    href:string;
    text:string;
    router?: string | undefined ;
}


const NavigationLink = ({ href, text, router }:NavigationProps) => {

    return (
        <Link href={href === '/home' ? '/' : href} passHref>
            <a href={href === '/home' ? '/' : href} className={styles.nav_item}>{text}</a>
        </Link>
    )
}

export default NavigationLink