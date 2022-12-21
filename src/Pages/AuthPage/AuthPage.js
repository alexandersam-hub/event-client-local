import React, {useState} from 'react';
import {Button} from "react-materialize";
import authState from '../../State/AuthState/AuthState'
import {observer} from "mobx-react-lite";
import s from './authPage.module.css'
import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";
import ModalWindowAuthByQr from "./QrAuth/formAuthQr";

const AuthPage = (observer(() => {
    const [login,setLogin] = useState('')
    const [password, setPassword] = useState('')
    // const [viewPassword, setViewPassword] = useState(false)
    // const [errorAuthQr, setErrorAuthQr] = useState(false)

    const actionLoginQr= async (token)=>{
        await authState.login_qr(token)
    }

    const handleChangeLogin = event => {
        setLogin(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    return (
        <>
            <NavBarChoiceQuiz/>
                <div className={s.wrapper}>
                <div className={s.form}>
                    <div className={s.title}>Авторизация</div>
                    <div className={s.text_box_wrapper}>
                            <input
                                onChange={handleChangeLogin}
                                id="login"
                                type="text"
                                placeholder='Имя пользователя'
                                className={s.text_box}/>
                            
                    </div>
                    <div className={s.text_box_wrapper}>
                            <input
                                onChange={handleChangePassword}
                                id="password"
                                type={"password"}
                                placeholder='Пароль'
                                className={s.text_box}/>
                    </div>
                    {authState.isError?
                        <div className={s.error_row}>
                            <label>{authState.message?authState.message:'Ошибка при вводе логина или пароля'}</label>
                        </div>:
                        <div  className={s.error_row_emty}></div>
                    }
                    <button onTouchStart={()=>{authState.login(login, password)}} className={s.button_enter}  onClick={()=>{authState.login(login, password)}}>Войти</button>
                    {/* <div className='btn center modal-trigger ' href="#modal_auth">Авторизация по QR</div> */}
                </div>
                </div>
            {/* <ModalWindowAuthByQr isError={authState.isError} actionLoginQr={actionLoginQr} errorAuthQr={errorAuthQr}/> */}
            </>
    );
}))

export default AuthPage;