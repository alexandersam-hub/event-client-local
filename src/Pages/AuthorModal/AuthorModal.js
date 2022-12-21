import React from 'react';
import s from './authorModal.module.css'
const AuthorModal = (props) => {
    return (
        <>
            <div onClick={()=>{   props.closeWindow(false)}} className={'modal_background'}></div>


            <div className={s.wrapper}>
                <div className={s.close_window} onClick={()=>{
                    props.closeWindow(false)
                }}>✕</div>

                <div className={s.content}>
                    Над проектом работала команда специалистов из разных отраслей
                </div>
            </div>
        </>
    );
};

export default AuthorModal;