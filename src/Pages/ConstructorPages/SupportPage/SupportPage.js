import React, { useEffect, useState } from 'react';
import NavBarChoiceQuiz from '../../Static/NavBarChoiceQuiz';
import s from './support.module.css'
import SupportState from '../../../State/SupportState/SupportState';
import Loader from '../../../Static/Loader/Loader';


const SupportPage = () => {
    const [supportPosts, setSupportPosts] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [idActivePost, setIdActivePost] = useState('')
    const init = async ()=>{
        setIsLoad(false)
        const result = await SupportState.getSupports()
            if(result.warning){
              
                setTimeout(()=>{
                    init()
                },1000)
            }
            else{
            
                setSupportPosts(result.posts)
                setIsLoad(true)
                
            }
        
    }

    const updatePost = (id, type, data)=>{
        const newPosts = []
        supportPosts.forEach(post=>{
            if(post.id === id){
                 post[type] = data
                
            }
            newPosts.push(post)
        })
        setSupportPosts(newPosts)
    }
    
    useEffect(()=>{
        init()
    },[])
   
    return (
        <>
          <NavBarChoiceQuiz/>
       
            <div className={s.wrapper}>
            <a className={s.backButton} href="/constructor">{'<<Назад'}</a>
                {isLoad? <>
                    {supportPosts.length>0?
                        <div className={s.card_wrapper}>
                            {supportPosts.map((post)=>{

                                return(
                                    <div className={s.card} key={'post_'+post.id}>
                                        <div className={s.worker_information}>
                                            <div>Имя пользователя в системе: {post.userLogin}</div>
                                            <div>Организация: {post.organisation}</div>
                                        </div>

                                        <div className={s.title_card}>Имя пользователя: </div>
                                        <input onChange={(e)=>{
                                            updatePost(post.id, 'username', e.target.value)
                                        }} className={s.textbox_data_post} type='text' value={post.username}/>

                                        <div className={s.title_card}>e-mail: </div>
                                        <input onChange={(e)=>{
                                            updatePost(post.id, 'mail', e.target.value)
                                        }}  className={s.textbox_data_post}  type='text' value={post.mail}/>

                                        <div className={s.title_card}>Текст сообщения: </div>
                                        <textarea onChange={(e)=>{
                                            updatePost(post.id, 'text', e.target.value)
                                        }} className={s.text_post} value={post.text}/>

                                         <div className={s.title_card}>Заметки: </div>
                                         <textarea onChange={(e)=>{
                                            updatePost(post.id, 'description', e.target.value)
                                        }} className={s.text_post} value={post.description}/>
                                        
                                        <div className={s.wrapper_checkbox}>
                                        <div>Предварительное сообщение отправлено пользователю :</div>
                                        <input onChange={(e)=>{
                                            updatePost(post.id, 'isSend', e.target.checked)
                                        }} type='checkbox' checked={post.isSend} />
                                        </div>

                                        <div className={s.wrapper_checkbox}>
                                        <div>Завершено:</div>
                                        <input onChange={(e)=>{
                                            updatePost(post.id, 'isFinished', e.target.checked)
                                        }} type='checkbox' checked={post.isFinished} />
                                        </div>
                                        <div>

                                        <button className={s.btn_update} onClick={async(e)=>{
                                            const newPost = supportPosts.find(item=>item.id === post.id)
                                            const result = await SupportState.updateSupport(newPost)
                                            const elem = document.createElement('div')
                                            const parrent = e.target.parentNode
                                            
                                            if(result.warning)
                                                elem.innerText = result.message
                                            else
                                                elem.innerText = 'Изменено'
                                            elem.className = s.message
                                            parrent.appendChild(elem)
                                           
                                        }}>
                                            Сохранить
                                        </button>
                                        <button className={s.btn_del} onClick={async (e)=>{
                                            // eslint-disable-next-line no-restricted-globals
                                            if(!confirm('Удалить?'))
                                                return
                                            const result = await SupportState.delSupport(post.id)
                                            const elem = document.createElement('div')
                                            const parrent = e.target.parentNode
                                            
                                            if(result.warning)
                                                elem.innerText = result.message
                                            else
                                                elem.innerText = 'Сообщение удалено'
                                            elem.className = s.message
                                            parrent.appendChild(elem)
                                        }}>Удалить</button>
                                    </div>
                                    </div>
                                )
                            })}
                        </div>:
                        <div>Нет заявок</div>    
                    }
                </>:<Loader/>}
            </div>
        </>
    );
};

export default SupportPage;