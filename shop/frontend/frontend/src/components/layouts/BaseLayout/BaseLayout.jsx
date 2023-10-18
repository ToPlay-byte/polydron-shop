import React, { useState, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'


const BaseLayout = ({ children }) => {
    return (
        <>
            <Header  />
                {children}
            <Footer/>
        </>
    )
}

export default BaseLayout

