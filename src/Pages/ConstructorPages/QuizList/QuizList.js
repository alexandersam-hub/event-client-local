import React from 'react';
import s from './quizList.module.css'

const QuizList = (props) => {
    return (
        <div className={s.form}>
            <div className={s.title}>{props.quiz.title}</div>
            <div className={s.description}>{props.quiz.description}</div>
            <div className={s.description}>{props.quiz.category}</div>
            {props.quiz.isActive?<></>:
                <div className={s.noActive}>Викторина не активна</div>
            }
            <div onClick={()=>{
                props.redactQuiz(props.quiz.id)
                props.changeViewModal(true)
            }}  className={s.btn_change} >Изменить</div>
            <div onClick={()=>{
                   // eslint-disable-next-line no-restricted-globals
                   if(confirm('Удалить?') )
                       props.remove(props.quiz.id)
            }} className={s.btn_del} >Удалить</div>
        </div>
    );
};

export default QuizList;