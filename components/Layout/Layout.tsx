import React, { ReactNode } from 'react'
import Footer from '../Footer/Footer';
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
            <Footer/>
        </>
    )
}

export default Layout