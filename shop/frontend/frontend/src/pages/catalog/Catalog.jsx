import React from "react";
import Layout from '@components/layouts/BaseLayout/BaseLayout'
import Sidbar from './Sidbar'
import ProductList from "./ProductsList";
import styles from './styles.module.scss'


function Catalog() {
    document.title = 'Каталог'
    return (
        <Layout>
            <main className={styles.main}>
                <Sidbar/>
                <ProductList />
            </main>
        </Layout>
    )
}

export default Catalog
