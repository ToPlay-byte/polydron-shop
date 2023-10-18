import React, { useState, useRef, useEffect } from "react";
import Slider from 'react-slick'
import styles from './styles.module.scss'


const ProductImagesSlider = ({poster, photos}) => {
    let photos_list = []
    console.log(poster)
    photos_list.push(poster)
    photos.map(item => photos_list.push(item.path))
    const settings = {
        slidesToShow: 1,
        arrows: false,
        infinite: false,
        fade: true,
        dots: true,
        dotsClass: styles['product__images-dots'],
        className: styles['product__images'],
        customPaging: function(i) {
            return (
                <img src={photos_list[i]} className={styles["product__images-dots-item"]}/>
            );
        }
    }
    return (
        <Slider {...settings}>
            {photos_list.map( (item, index) => <img key={index} src={item} className={styles['product__images-item']}/>)}
        </Slider>
    )
}

export default ProductImagesSlider