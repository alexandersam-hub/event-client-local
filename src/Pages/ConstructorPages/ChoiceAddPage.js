import React from 'react';
import {Link} from "react-router-dom";
import s from './choicePage.module.css'
import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";

const ChoiceAddPage = () => {
    return (
        <>
            <NavBarChoiceQuiz/>
            <div className={s.formChoice}>
                <div className={s.ButtonWrapper}>
                    <div>
                        <Link className={s.buttonChoice} to={'./quiz'}>Викторины</Link>
                    </div>
                    <div>
                        <Link className={ s.buttonChoice} to={'./question'}>Вопросы к викторинам</Link>
                    </div>
                    <div>
                        <Link className={ s.buttonChoice} to={'./users'}>Пользователи</Link>
                    </div>
                    <div>
                        <Link className={ s.buttonChoice} to={'./category'}>Категории</Link>
                    </div>
                    <div>
                        <Link className={ s.buttonChoice} to={'./statistic'}>Статистика</Link>
                    </div>
                    <div>
                        <Link className={ s.buttonChoice} to={'./support'}>Заявки в техподдержку</Link> 
                    </div>

                </div>
            </div>
        </>
    );
};

export default ChoiceAddPage;