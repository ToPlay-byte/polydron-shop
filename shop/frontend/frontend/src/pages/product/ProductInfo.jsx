import React, { useEffect, useState, useContext, useRef } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import AuthContext from "@contexts/AuthContext";
import Cookie from 'js-cookie'
import CSRFToken from '@components/CSRFToken/CSRFToken'
import { useForm } from 'react-hook-form'
import useAxios from '@hooks/useAxios'
import axios from 'axios'
import Slider from "react-slick";
import styles from './styles.module.scss'


const ProductInfo = ({product: {characters, materials, quantity, name, description}}) => {
    const [ comments, setComments ] = useState([])
    const [ activeForm, setActiveForm ] = useState(false)

    let characters_list = []
    for(let character in characters) {
        characters_list.push(CharacterItem(character, characters[character]))
    }


    useEffect(() => {
        axios.get(`/api/catalog/comment?name=${name}`).then(res => {
            let isEqual = JSON.stringify(res.data) == JSON.stringify(comments);
            if(!isEqual) {
                setComments(res.data)
            }
        })
     
    }, [name, comments])

    return (
        <div className={styles['product__info']}>
            <div className={[styles['product__info-item'], styles.description].join(' ')}>
                <h4 className="product__info-title">Опис товару</h4>
                <div className={styles['product__desc']}>{description}</div>
            </div>
            <div className={[styles['product__info-item'], styles.characteristics].join(' ')}>  
            <h4 className="product__info-title">Характеристика</h4>    
                <ul className={styles["characteristics__list"]}>
                    <li className={styles['characteristics__list-item']}>
                        <div className={styles['characteristics__name']}>Кількість на складі</div>
                        <div className={styles['characteristics__dots']}></div>
                        <div className={styles['characteristics__value']}>{quantity}</div>
                    </li>
                    <li className={styles['characteristics__list-item']}>
                        <div className={styles['characteristics__name']}>Матеріал</div>
                        <div className={styles['characteristics__dots']}></div>
                        <div className={styles['characteristics__value']}>{materials}</div>
                    </li>
                    {characters_list.map(item => item)}
                </ul>
            </div>
            <div className={[styles['product__info-item'], ].join(' ')}>
                <button onClick={() => setActiveForm(true)} className={[styles['comments__add-btn'], activeForm ? styles['hidden']: ''].join(' ')} >Залишити коментар</button>
                <div className={styles['comments__form-wrapper']}>
                    { activeForm && <CommentForm setActive={setActiveForm} productName={name} setComments={setComments}/> }
                </div>
                { !comments.length ?
                  <div className={styles['comments__empty']}>У цього товару ще немає відгуків</div>:
                  <div className={styles['comments']}>
                    <div className={styles["comments__list"]}>
                        { comments.map(comment => <CommentsItem key={comment.id} comment={comment} setComments={setComments} productName={name}></CommentsItem>) }       
                    </div>
                  </div> }
            </div>
        </div>
    )
}


const CharacterItem =  (name, value) => {
    return (
        <li key={name} className={styles['characteristics__list-item']}>
            <div className={styles['characteristics__name']}>{name}</div>
            <div className={styles['characteristics__dots']}></div>
            <div className={styles['characteristics__value']}>{value}</div>
        </li>
    )
}   


const CommentForm = ({setActive, productName, setComments}) => {
    let { register, handleSubmit, formState: { errors }} = useForm()
    let api = useAxios()

    const handleCommentSubmit = data => {
        data.product_name = productName
        api.post('/api/catalog/comment', data).then(res => setComments(data => [res.data, ...data]))
        setActive(false)
    }

    return (
        <form className={styles['comments-form']} onSubmit={handleSubmit(handleCommentSubmit)}>
            <label htmlFor="" className={styles['comments-form__label']}>Переваги</label>
            <input {...register('advantages')} type="text" className={styles['comments-form__field']} />
            <label htmlFor="" className={styles['comments-form__label']}>Недоліки</label>
            <input {...register('disadvantages')} type="text" className={styles['comments-form__field']} />
            <label htmlFor="" className={styles['comments-form__label']}>Відгук</label>
            <textarea {...register('text', { required: true })}  className={styles['comments-form__textarea']}></textarea>
            {errors.text?.type == 'required' && <div className={styles['comments__error']}>Це поле повинно бути заповнено</div>}
            <div className={styles["comments-form__box"]}>
                <button type="submit" className={styles['comments-form__submit']}>Залишити відгук</button>
                <button type="button" onClick={() => setActive(false)}  className={styles['comments-form__cancel']}>Відмінити</button>
            </div>
        </form>
    )
}

const CommentsItem =({ comment, productName, setComments }) => {
    const [ activeEditForm, setActiveEditForm] = useState(false)
    return  activeEditForm ?
        <EditCommentForm comment={comment} productName={productName} setActive={setActiveEditForm} setComments={setComments} />:
        <CommentInfo comment={comment}  productName={productName} setActive={setActiveEditForm} setComments={setComments}/>
       
    
}


const CommentInfo = ({ comment, setActive, setComments, productName }) => {
    const { user } = useContext(AuthContext)
    const [ displayList, setDisplayList ] = useState(false)
    const [ activeAnswerForm, setActiveAnswerForm ] = useState(false)
    const [ activeDropdown, setActiveDropdown ]= useState(false)
    const [ subcomments, setSubcomments ] = useState(comment.parent)
    const dropdown = useRef(null)
    const check = comment.user.email == user.email
    const api = useAxios()

    
   
    const handleCommentDelete = () => {
        api.delete(`/api/catalog/comment`, { data: {comment_id: comment.id }}).then (() => {
            setComments(data => {
                return data.filter(item => item !== comment)
            })
        })
    }

    useEffect(() => {
        if (!activeDropdown) return
        
        const clickClose = e => {
            if (!dropdown.current) return
            if (!dropdown.current.contains(e.target)) {
                setActiveDropdown(false)
            }
        }

        document.addEventListener('click', clickClose)
    }, [activeDropdown])

    return (
        <div className={styles['comments__item']}>
            <div className={styles["comments__content"]}>
                <div className={styles["comments__content-top"]}>
                    <div className={styles['comments__user']}>{comment.user.full_name}</div>
                    {
                        check &&
                        <div ref={dropdown} className={styles['dropdown']}>
                            <div onClick={() => setActiveDropdown(true)} onBlur={() => setActiveDropdown(false)} className={styles["dropdown__open-btn"]}>
                                <span className={styles["dot"]}></span>
                                <span className={styles["dot"]}></span>
                                <span className={styles["dot"]}></span>
                            </div>
                            <div className={[styles["dropdown__list"], activeDropdown ? styles['active']: ''].join(' ')}>
                                <button onClick={() => setActive(true)} className={styles['dropdown__btn']}>Редагувати</button>
                                <button onClick={() => handleCommentDelete()} className={styles['dropdown__btn']}>Видалити</button>
                            </div>
                        </div>
                    }
                </div>
                { 
                    comment.advantages && 
                    <div className={styles['comments__field']}>
                        <div className={styles["comments__name"]}>Переваги</div>
                        <div className={styles["comments__value"]}>{comment.advantages}</div>
                    </div>
                }            
                { 
                    comment.disadvantages && 
                    <div className={styles['comments__field']}>
                        <div className={styles["comments__name"]}>Недоліки</div>
                        <div className={styles["comments__value"]}>{comment.disadvantages}</div>
                    </div>
                }
                <div className={styles['comments__text']}>{comment.text}</div>
                
                { !activeAnswerForm && <button onClick={() => setActiveAnswerForm(true)} className={styles["comments__reply-btn"]}>Відповісти</button>}
            </div>
            { activeAnswerForm && <AnswerForm setSubcomments={setSubcomments} comment={comment} productName={productName} setActiveAnswerForm={setActiveAnswerForm} /> }
            { subcomments.length > 0 &&
                <div className={styles["subcomments"]}>
                <button onClick={() => setDisplayList( value => !value)} className={styles["subcomments__btn"]}>
                    { displayList ? <AiOutlineCaretUp size={10} />: <AiOutlineCaretDown size={10} />}
                    <span className={styles["subcomments__btn-text"]}>{subcomments.length} відповідь</span>
                </button>
                <div className={[styles["subcomments__list"], displayList ? styles['active']: ''].join(' ')}>
                    {subcomments.map(item => <SubCommentsItem parent={comment} key={item.id} productName={productName} comment={item} user={user} setComments={setSubcomments}/>)}
                </div>
            </div>
            }
        
        </div>
        
    )
}




const SubCommentsItem = ({parent, comment, setComments, user, productName }) => {
    let { register, handleSubmit, formState: { errors }} = useForm()
    const [ activeEditForm, setActiveEditForm ] = useState(false)
    const [ activeAnswerForm, setActiveAnswerForm ] = useState(false)
    const [ activeDropdown, setActiveDropdown ]= useState(false)
    const api = useAxios()
    const dropdown = useRef(null)
    
    const handleDeleteComment = () => {
        api.delete(`/api/catalog/comment`, { data: {comment_id: comment.id }}).then (() => {
            setComments(data => {
                return data.filter(item => item !== comment)
            })
        })
    }
    
    const handleSubmitComment = data => {
        data.product_name = productName
        api.put(`/api/catalog/comment/${comment.id}`, data, 
        ).then(
            res => {
                setComments(items => items.map(item => {
                    if (comment == item){
                        const new_comment = {
                            id: res.data.id,
                            user: {
                                full_name: res.data.user.full_name,
                                email: res.data.user.email
                            },
                            text: res.data.text
                        }
                        return new_comment
                    } 
                    return item
                }))
                setActiveEditForm(false)
            }
        )
    }
    
    useEffect(() => {
        if (!activeDropdown) return
        
        const clickClose = e => {
            if (!dropdown.current) return
            if (!dropdown.current.contains(e.target)) {
                setActiveDropdown(false)
            }
        }

        document.addEventListener('click', clickClose)
    }, [activeDropdown])
    
    return (
        <div className={styles["subcomments__item"]}>
            <div className={styles["subcomments__item-content"]}>
                <div className={styles["subcomments__header"]}>
                    <div className={styles['subcomments__user']}>{comment.user.full_name}</div>
                    { (!activeEditForm && user.email == comment.user.email ) && <div className={styles["dropdown"]}>
                            <div ref={dropdown} onClick={() => setActiveDropdown(true)} onBlur={() => setActiveDropdown(false)} className={styles["dropdown__open-btn"]}>
                                <span className={styles["dot"]}></span>
                                <span className={styles["dot"]}></span>
                                <span className={styles["dot"]}></span>
                            </div>
                            <div className={[styles['dropdown__list'], activeDropdown ? styles['active']: ''].join(' ')}>
                                <button onClick={() => {setActiveEditForm(true), setActiveDropdown(false)}} className={styles["dropdown__btn"]}>Редагувати</button>
                                <button onClick={() => handleDeleteComment()} className={styles["dropdown__btn"]}>Видалити</button>
                            </div>
                        </div> 
                    }
                </div>
                {
                    activeEditForm ?
                    <form onSubmit={handleSubmit(handleSubmitComment)} className={styles["subcomments__edit-form"]} >
                        <textarea {...register('text', { required: true })} defaultValue={comment.text} className={styles["subcomments__edit-form__field" ]}/>
                        {errors.text?.type == 'required' && <div className={styles['comments__error']}>Це поле повинно бути заповнено</div>}
                        <div className={styles["subcomments__box"]}>
                            <button className={styles["subcomments__edit-form__submit"]}>Редагувати</button>
                            <button onClick={() => setActiveEditForm(false)} className={styles["subcomments__edit-form__cancel"]}>Відмінити</button>
                        </div>
                    </form>:
                    <>
                        <div className={styles["subcomments__text"]}>{comment.text}</div>
                        <div onClick={() => setActiveAnswerForm(true)} className={styles['subcomments__reply-btn']}>Відповісти</div>
                    </>
                }
            </div>
            { activeAnswerForm && <AnswerForm comment={parent} productName={productName} setActiveAnswerForm={setActiveAnswerForm} setSubcomments={setComments} /> }
        </div>
    )
}

const  AnswerForm = ({comment, productName, setActiveAnswerForm, setSubcomments}) => {
    let { register, handleSubmit, formState: { errors }} = useForm()
    const api = useAxios()

    const handleSubmitAnswer = data => {
        data.product_name = productName
        data.comment_id = comment.id
        
        api.post('/api/catalog/comment', data).then(res => {
            setSubcomments(items => {
                const comment = {
                    id: res.data.id,
                    user: {
                        full_name: res.data.user.full_name,
                        email: res.data.user.email
                    },
                    text: res.data.text
                }
                let new__comments = [...items, comment]
                return new__comments
            })
            setActiveAnswerForm(false)
        })
    }
    
    return (
        <form className={styles["subcomments__form"]} onSubmit={handleSubmit(handleSubmitAnswer)}>
            <div className={styles["subcomments__form-title"]}>Ваша відповідь</div>
            <textarea {...register('text', { required: true })} defaultValue={`${comment.user.full_name},`} name="text" id="" className={styles['subcomments__form-field']}></textarea>
            {errors.text?.type == 'required' && <div className={styles['comments__error']}>Це поле повинно бути заповнено</div>}
            <div className={styles["subcomments__box"]}>
                <button className={styles["subcomments__form-submit"]}>Надіслати</button>
                <button onClick={() => setActiveAnswerForm(false)} className={styles["subcomments__form-cancel"]}>Відмінити</button>
            </div>
        </form>
    )
}

const EditCommentForm = ({comment, setComments, productName, setActive}) => {
    let { register, handleSubmit, formState: { errors }} = useForm()
    const api = useAxios()
    const handleCommentSubmit = data => {
        data.product_name = productName
        api.put(`/api/catalog/comment/${comment.id}`, data, {
             headers:{"X-CSRFToken": Cookie.get('csrftoken')}
        }).then(
            res => {
                setComments(items => items.map(item => {
                    if (comment == item){
                        return res.data
                    } 
                    return item
                }))
                setActive(false)
            }
        )
    }
    return (
        <form className={styles['comments-form']} onSubmit={handleSubmit(handleCommentSubmit)}>
            <CSRFToken />
            <label htmlFor="" className={styles['comments-form__label']}>Переваги</label>
            <input {...register('advantages')}  defaultValue={comment.advantages} name='advantages' type="text" className={styles['comments-form__field']} />
            <label htmlFor="" className={styles['comments-form__label']}>Недоліки</label>
            <input {...register('disadvantages')} defaultValue={comment.disadvantages} name='disadvantages' type="text" className={styles['comments-form__field']} />
            <label htmlFor="" className={styles['comments-form__label']}>Відгук</label>
            <textarea {...register('text', { required: true })} defaultValue={comment.text} name="text" className={styles['comments-form__textarea']}></textarea>
            {errors.text?.type == 'required' && <div className={styles['comments__error']}>Це поле повинно бути заповнено</div>}
            <div className={styles["comments-form__box"]}>
                <button type="submit" className={styles['comments-form__submit']}>Редагувати</button>
                <button type="button" onClick={() => setActive(false)}  className={styles['comments-form__cancel']}>Відмінити</button>
            </div>
        </form>
    )
}

export default ProductInfo