import React, { ReactNode } from 'react'
import { NavBar } from '../NavBar/NavBar'

interface Props {
    children?: ReactNode;
     // any props that come into the component
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

export default Layout