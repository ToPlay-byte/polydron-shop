import React, {useState, useEffect} from "react";
import styles from './styles.module.scss'


const Pagination = ({totalProducts, productsPerPage, currentPage, searchParams}) => {
    const pages = []
    for(let number = 1; number <=  Math.ceil(totalProducts / productsPerPage); number++) {
        pages.push(number)
    }
    if (searchParams.get('page')) {
        searchParams.delete('page')
    }
    return (
        <div className={styles.pagination}>
            <ul className={styles.pagination__list}>
                {pages.map(page => {
                    let active = page == currentPage
                    return (
                        <li key={page} className={[styles['pagination__list-item'], active ? styles['pagination__list-item--active']: ''].join(' ')}>
                            <a href={String(searchParams) ? `?${searchParams}&page=${page}`:`?page=${page}`} className={styles["pagination__list-link"]}>{page}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Pagination