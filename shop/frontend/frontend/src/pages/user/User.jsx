import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '@components/layouts/BaseLayout/BaseLayout'
import styles from './style.module.scss'
import Sidbar from './Sidbar'


const User = () => {
    return (
        <Layout>
            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <Sidbar/>
                    <Outlet/>
                </div>
            </main>
        </Layout>
    )
}

export default User
