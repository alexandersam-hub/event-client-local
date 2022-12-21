import React from 'react';
import s from './ModalСonfirmation.module.css'

// styleBtnNextQuestion={s.btn_next_question}
// styleBtnClose={s.btn_exit_quiz_early}
// nextQuestion={nextQuestion}
// closeWindow={setIsViewModalConfirmation}

const ModalСonfirmation = (props) => {
    return (
        <>
            <div onClick={()=>{
                props.closeWindow(false)
                }
            } className={s.background}></div>
            <div className={s.wrapper}>

                <div className={s.text}>Вы не поставили баллы ни одной из команд. <br/>Хотите перейти к следующему вопросу?
                </div>
                <div className={s.btn_wrapper}>
                    <button onClick={() => {
                        props.nextQuestion()
                    }} className={s.btn_next}>Следующий вопрос
                    </button>
                    <button onClick={() => {
                        props.closeWindow(false)
                    }} className={s.btn_close}>Отмена
                    </button>
                </div>

            </div>
        </>
    );
};

export default ModalСonfirmation;