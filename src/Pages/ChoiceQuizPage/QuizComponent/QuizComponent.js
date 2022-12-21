import React from 'react';
import {Link} from "react-router-dom";
import AsyncImage from '../../QuestionPage/QuestionComponent/AsyncImage/AsyncImage';
import s from './quizchoice.module.css'

const QuizComponent = (props) => {

    return (

        <Link className={s.wrapper_link} to={`./settings/${props.quiz.id}`}>
        <div className={s.wrapper}>
            <div className={s.description}>

                <div className={s.title}>{props.quiz.title}</div>
                <div className={s.text}>{props.quiz.description}</div>
        
                <div className={s.buttonWrapper}></div>
            </div>
            <div className={s.img}>
                {/* <img src={props.quiz.img} alt=""/> */}
                <AsyncImage  stl={s.img_logo} src={props.quiz.img} loadImg={'/loader.svg'}/>

                    {/* <img src={props.quiz.img} alt=""/> */}

                {props.category[0]?<AsyncImage stl={s.category_img}  src={props.category[0].img} loadImg={'/loader.svg'}/>:<></>}



            </div>

            <div className={s.link} to={`./quiz/${props.quiz.id}`}><span
                className={s.linkText}>Начать</span></div>
        </div>
        </Link>
    );
};

export default QuizComponent;