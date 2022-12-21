import React, { useState } from 'react';
import s from './userList.module.css'
import userState from '../../../../State/UserState/UserState'
import { observer } from 'mobx-react-lite'

const UserList = (observer((props) => {
    const [changePassword, setChangePassword] = useState(false)
    const [username, setUsername] =  useState(props.user.username)
    const [description, setDescription] =  useState(props.user.description)
    const [password, setPassword] =  useState('')
    const [isActive, setIsActive] = useState(props.user.isActive)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isUpdatePassword, setIsUpdatePassword] = useState(false)
    return (
       
          <div key={"user_"+props.user.id} className={s.wrapper}>
                <div>
                    <div className={s.form_update_user}>
                    <div>
                        <span>Имя пользователя</span>
                        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div>
                        <span>Описание пользователя</span>
                        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='checkbox' checked = {isActive} onChange={(e)=>{setIsActive(e.target.checked)}}/>
                       {isActive? <span>Активен</span>:<span>Не активен</span>}
                    </div>
                    <div className={s.btn_save} onClick={(e)=>{
                        // if(username === props.user.username && isActive === props.user.isActive){
                        //     e.target.innerText = 'Данные не изменены'
                        //     setTimeout(()=>{ e.target.innerText = 'Сохранить'}, 1000)
                        //     return
                        // }
                        userState.updateUser(props.user.id, username, isActive, description)
                        setIsUpdate(true)
                        }}>Сохранить</div>
                    <div className={s.btn_del} onClick={()=>{
                        setIsUpdate(true)
                        userState.deleteUser(props.user.id)
                    }}>Удалить</div>
                      {isUpdate? <div>{userState.messageUpdate}</div>:<></>}
                    </div>
                    <div className={s.btn_update_password} onClick={()=>{setChangePassword(!changePassword)}}>Изменить пароль</div>
                    {changePassword?
                    <div>
                        <input className={s.inputPass} placeholder='Введите новый пароль' type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                        <div className={s.btn_save} onClick={()=>{
                             userState.updatePassword(props.user.id, password)
                             setIsUpdatePassword(true)
                        }}>Сохранить</div>

                        <div className={s.btn_del} onClick={()=>{
                            setChangePassword(false)
                            setPassword('')
                            setIsUpdatePassword(false)
                        }}>Отмена</div>

                        {isUpdatePassword?<div>{userState.messageUpdatePassword}</div>:<></>}
                    </div>:<></>}
                </div>
        </div>
      
    );
}))

export default UserList;