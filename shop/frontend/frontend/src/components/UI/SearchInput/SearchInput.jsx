import React, { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import styles from './styles.module.scss'

const SearchInput = ({inputProps, inputClassName='', buttonClassName='', containerClassName=''}) => {
    const [ productsList, setProductsList ] = useState([])
    const [ active, setActive ] = useState(false)
    const [ searchParams ]  = useSearchParams()
    const { category } = useParams()
    const getProductsList = e => {

        let name = e.target.value
        axios.get(`/api/catalog/search?name=${name}`).then(res => setProductsList(res.data))
    }
    const onFocus = e => {
        return setActive(true)
    }

    const onClick = e => {
        return setActive(false)
    }

    const onSubmit = e => {
        e.preventDefault()
        const query= new FormData(e.target).get('q')
        console.log(query)
        if (searchParams.get('q')) {
            searchParams.delete('q')
        }
        location.href = `/catalog/${category ? category: ''}?${String(searchParams)? `${searchParams}&q=${query}`: `q=${query}`}`
    }

    return ( 
        <form className={[styles['search'], containerClassName].join(' ')} onSubmit={onSubmit}>
            <div className={[styles["search__bg"], active ? styles['search__bg--active'] : ''].join(' ')} onClick={onClick}></div>
            <input {...inputProps}  onFocus={onFocus} type="search" onInput={getProductsList} className={[styles['search__input'], inputClassName].join(' ')} name='q' placeholder="Пошук..."/>
            <button className={[styles['search__btn'], buttonClassName].join(' ')}>
                <BsSearch size={20}/>
            </button>
            <div className={[styles['search__results'], active ? styles['search__results--active'] : ''].join(' ')}>
                { !productsList.length ?
                    <div className={styles["search__results-item"]}>По вашему запиту нічого не знайдено</div>:
                    productsList.map(item => {
                        console.log(productsList)
                        console.log(item)
                        return (
                            <div className={styles["search__results-item"]}>
                                <a href={`/catalog/detail/${item.slug}`} className={styles["search__results-link"]}>{item.name}</a>
                            </div>
                        )
                    })
                }
            </div>
        </form>
     );
}
 


export default SearchInput;