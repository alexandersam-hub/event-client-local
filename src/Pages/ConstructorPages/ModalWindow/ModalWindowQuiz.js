import React from 'react';
import AddQuizPage from "../AddQuizPage/AddQuizPage";
import AddQuestionPage from "../AddQuestionPage/AddQuestionPage";
import s from './modal.module.css'

const ModalWindowQuiz = (props) => {

    return (
        <div className={s.modal_wrapper} >
        <div className={s.modal}>
            <div className={s.exit_button}  onClick={()=>{
                props.changeViewModal(false)
            }}>╳</div> 
            <div className={s.title}>{props.titleWindow}</div>

            {props.typeOperation === 'quiz' ?
                <AddQuizPage changeSelectedQuiz={props.changeSelected}
                             save={props.save}
                             quiz={props.selectedItem}/> :
                <AddQuestionPage  changeSelectedQuestion={props.changeSelected}
                                  save={props.save}
                                  question={props.selectedItem}/>
            }

            <button onClick={() => {
                props.save()
                props.changeViewModal(false)
            
            }}  className={s.btn_save}>Сохранить</button>
            <button onClick={()=>{
                props.changeViewModal(false)
            }}
                className={s.btn_close}>Отмена</button>
        </div>
        </div>
    );

};

export default ModalWindowQuiz;