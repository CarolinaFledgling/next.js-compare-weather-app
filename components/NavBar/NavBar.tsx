import React from 'react'
import styles from '../NavBar/NavBar.module.css'

import { useRouter } from "next/router";
import NavigationLink from '../NavigationLink/NavigationLink';
import { withRouter, NextRouter } from 'next/router'


const navigationRoutes = ['home', 'about', 'contact']



export const NavBar = () => {
    const router= useRouter() as any
    // router verify the current route
    return (
        <nav className={styles.nav_container}>
            {navigationRoutes.map((singleRoute) => {
                return (
                    <NavigationLink
                        key={singleRoute}
                        href={`/${singleRoute}`}
                        text={singleRoute}
                        router={router}

                    />
                )
            })}

        </nav>
    )
}
