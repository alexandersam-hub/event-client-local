import React, { useState } from 'react';
import s from './SupportWindow.module.css'
// import supportState from '../../../State/SupportState/SupportState';

const SupportWindow = (props) => {
    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [textMessage, setTextMessage] = useState('')
    const [message, setMessage] = useState('')
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorMail, setErrorMail] = useState(false)
    const [errorText, setIsErrorText] = useState(false)
    const [isError, setIsError] = useState(false)
    const validateEmail = (email)=> 
    {
        var re = /\S+@\S+\.\S+/;
        // console.log( re.test(email));
        return re.test(email);
    }
    return (
        <>
            <div onClick={()=>{   props.closeWindow(false)}} className={'modal_background'}></div>
        <div className={s.wrapper}>
       
            <div className={s.close_window} onClick={()=>{
                props.closeWindow(false)
            }}>✕</div>
            
          <div className={s.title}>Обратная связь</div>
          <input className={errorUsername? s.error_textbox_data:s.textbox_data} type='text' placeholder='Имя' value={username} onChange={(e)=>{
            setUsername(e.target.value)
          }}></input>
          <input className={errorMail? s.error_textbox_data:s.textbox_data} type='email'placeholder='E-mail' value={mail} onChange={(e)=>{
            setMail(e.target.value)
          }}></input>
          <textarea className={errorText? s.error_textarea_data:s.textarea_data} placeholder='Текст сообщения' value={textMessage} onChange={(e)=>{
            setTextMessage(e.target.value)
          }}></textarea>
            {message?<div className={isError?s.error_message:s.message}>{message}</div>:<></>}
          <button className={s.btn_send} onClick={async(e)=>{
              e.target.innerText = 'Отправляю...'
              let isErrorBody = false
              setErrorUsername(false)
              setErrorMail(false)
              setIsErrorText(false)
              setIsError(false)
              setMessage('')
              if(username.trim().length === 0){
                setErrorUsername(true)
                setIsError(true)
                isErrorBody = true
              }
              if(!validateEmail(mail)){
                setErrorMail(true)
                setIsError(true)
                isErrorBody = true
              }
              if(textMessage.trim().length === 0){
                setIsErrorText(true)
                setIsError(true)
                isErrorBody = true
              }
            //   console.log(username.trim().length);
            //   console.log(errorMail , errorText , errorUsername);
              if( isErrorBody){
                  setMessage('Не все поля заполнены правильно')
                  e.target.innerText = 'Отправить'
                  return
              }
              const result = await props.sendSupportMessage(username,mail, textMessage )
              setMessage(result.message)
              if(result.warning){
                setIsError(true)
                
              }
              e.target.innerText = 'Отправить'
           
          }}>Отправить</button>
        
        </div>
      
        </>
    );
};

export default SupportWindow;