import React, { useState, useRef, useEffect }from "react";
import { useSearchParams, useParams } from "react-router-dom"
import axios from "axios";
import Checkbox from "@components/UI/Checkbox/Checkbox";
import styles from './styles.module.scss'


const Sidbar = () => {
    const [categories, setCategories] = useState([])
    const [maxPrice, setMaxPrice] = useState(10000)
    const [minPrice, setMinPrice] = useState(0)
    const [empty, setEmpty] = useState(true)
    const { category } = useParams()
    const [searchParams] = useSearchParams()
    const progress = useRef()
    console.log(category)
    const handleChangeMinRange = e => {
        const minValue = e.target.value
        let percent = (minValue / 10000) * 100
        progress.current.style.left = percent + '%'
        setMinPrice(minValue)
    }

    const handleChangeEmppty = e => {
        setEmpty(e.target.checked)
        console.log(e.target.checked)
    }

    const onSumbiit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = [...formData.entries()];
        const query = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');
        location.href = `/catalog/${category ? category: ''}?${query}${searchParams.get('q')? `&q=${searchParams.get('q')}`: ''}`
    }


    const handleChangeMaxRange = e => {
        const maxValue = e.target.value
        let percent = 100 - (maxValue / 10000) * 100
        progress.current.style.right = percent + '%'
        setMaxPrice(maxValue)
    }

    useEffect(() => {
        axios.get('/api/catalog/categories/').then(res => {
           setCategories(res.data) 
        })
    },
    [])
    return (
        <section className={styles.sidbar}>
            <div className={styles.sidbar__inner}>
                <form onSubmit={onSumbiit} className={styles.sidbar__filter}>
                    <h3 className={styles['sidbar__filter-title']}>Ціна</h3>
                    <div className={styles['sidbar__filter-wrapper']}>
                        <div className={styles['sidbar__filter-block']}>
                            <label htmlFor="from" className={styles['sidbar__filter-label']}>Від</label>
                            <input id="from" type="text" value={minPrice} onChange={handleChangeMinRange} className={styles['sidbar__filter-input']} name='min'/>
                        </div>
                        <div className={styles['sidbar__filter-block']}>
                            <label htmlFor="to" className={styles['sidbar__filter-label']}>До</label>
                            <input id="from" type="text" value={maxPrice} onChange={handleChangeMaxRange}  className={styles['sidbar__filter-input']} name="max"/>
                        </div>
                    </div>
                    <div className={styles['sidbar__filter-slider']}> 
                        <div className={styles['sidbar__filter-track']}>
                            <div ref={progress} className={styles['sidbar__filter-progress']}></div>
                        </div>
                        <input type="range"  id="min-value" min='0' max='10000' value={minPrice} onChange={handleChangeMinRange}  className={[styles['sidbar__filter-range'], styles['sidbar__filter-range--min']].join(' ')}/>
                        <input type="range"  id="max-value" min='1' max='10000' value={maxPrice} onChange={handleChangeMaxRange} className={[styles['sidbar__filter-range'], styles['sidbar__filter-range--max']].join(' ')}/>
                    </div>
                    <div className={styles['sidbar__filter-title']}>Тільки в наявності:</div>
                    <Checkbox inputProps={{name: 'empty', checked: empty, id: "empty-products"}} onChange={handleChangeEmppty} text='Так' />
                    <button className={styles['sidbar__filter-btn']}>Застосувати</button>
                </form>
                <CategoriesList categories={categories} />
            </div>
        </section>
    )
}


const CategoriesList = ({categories}) => {
    return (
        <div className={styles['sidbar__categories-list']}>
            {categories.map( (item, index) => {
                if (item.parent) return 
                return (
                    <div key={item.name} className={styles["sidbar__categories-item"]}>
                        <a href={`/catalog/${item.slug}`} className={styles["sidbar__categories-item__link"]}>{item.name}</a>
                        <div className={styles["sidbar__subcategories"]}>
                            <div className={styles["sidbar__subcategories-list"]}>
                                {categories.map((subItem, index) => {
                                    if (item.name == subItem.parent) {
                                        return (
                                            <div key={index} className={styles['sidbar__subcategories-item']}><a key={subItem.name} href={`/catalog/${subItem.slug}`} className={styles["sidbar__subcategories-item__link"]}>{subItem.name}</a></div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default Sidbar