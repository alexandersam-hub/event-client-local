import React from 'react';
import s from './ScoreModal.module.css'
import ChartsComponent from "../ChartsComponent/ChartsComponent";

const ScoreModal = ({teamsName, score, closeModal, isFinish, finishQuiz}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <ChartsComponent score={score} teamsName={teamsName}/>
                {isFinish?
                    <div className={s.btn_cancel} onClick={()=>{
                        finishQuiz()
                    }}>Завершить</div>:
                <div className={s.btn_cancel} onClick={()=>{
                    closeModal()
                }}>Дальше</div>}
            </div>

        </div>
    );
};

export default ScoreModal;