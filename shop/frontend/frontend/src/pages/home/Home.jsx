import React from "react";
import Layout from '@components/layouts/BaseLayout/BaseLayout'
import Products from './Products'
import Documentation from "./Documentation";
import Gallery from './Gallery'
import styles from './styles.module.scss'


const Home = () => {
    document.title = 'Головна'
    return (
        <Layout>
            <main className={styles.main}>
                <Products/>
                <Documentation/>
                <Gallery/>
            </main>
        </Layout>
    )
}


export default Home