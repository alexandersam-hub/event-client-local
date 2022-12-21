import React, {useEffect, useState} from 'react';
// import loadImg from '../../../Static/Loader/loader.svg'
import AsyncImage from './AsyncImage/AsyncImage';
import s from './question.module.css'
import TimerComponent from "./TimerComponent/TimerComponent";

// isTimerStart={isTimerStart}
// isTimerEnd={isTimerEnd}
// isTimerPause={isTimerPause}
// time={time}
const QuestionComponent = (props) => {
    // const timerLimit = 60
    // const [time,setTime] = useState(timerLimit)
    // const [isTimer, setIsTimer] = useState(false)
    // const [timer, setTimer] = useState(null)
    // const [isViewTimer, setIsViewTimer] = useState(true)
    // const [isTimerFinish, setIsTimerFinish] = useState(false)
    // const timerStart = ()=>{
    //     if(isTimer){
    //         clearInterval(timer)
    //     }
    //     let currentTime = time
    //     setIsTimer(true)
    //     const newTimer = setInterval(()=>{
    //         currentTime--
    //         setTime(currentTime)
    //         if (currentTime === 0){
    //             setIsTimerFinish(true)
    //             clearInterval(newTimer)
    //             props.timerStop()
    //         }
    //
    //     },1000)
    //     setTimer(newTimer)
    // }

    // const timerStop = ()=>{
    //     setIsTimer(false)
    //     if(isTimer){
    //         clearInterval(timer)
    //     }
    // }
    // useEffect(()=>{
    //     console.log('user effect')
    //     // timerStart(timerLimit);
    //     // setTime(timerLimit);
    //     setIsTimerFinish(false)
    //     setIsViewTimer(true)},[])
    return(
        <>
            <div className={s.wrapper}>
                <div className={s.cardQuestion}>
                    <div className={s.quiz_name}>{props.quizName}</div>
                    <div className={s.formQuestionWrapper}>
                        <div className={s.question_wrapper}>
                            <div className={s.task_number_wrapper}>

                                {props.categoryImg? <div className={s.wrapper_img_number_task}><img className={s.category_img} src={props.categoryImg} alt=""/> </div>:<></>}

                                <div className={s.wrapper_text_number_task}>
                                    {props.isAdditionalTask ?
                                        <span className={s.task_number}>Дополнительный вопрос</span>:
                                        <span className={s.task_number}>Вопрос №{props.taskNumber + 1} </span>
                                    }
                                    {/*{countDo && !props.isSimple?<span className={s.price_line}>({props.question.price} {props.question.price === 1? 'балл':'балла'})</span>:<></>}*/}
                                </div>
                            </div>
                            {props.isAdditionalTask?
                                <div className={s.textQuestionWrapper}>
                                    <span>{props.question.textAdditional}</span>
                                    {props.question.translationTextAdditional?
                                        <>
                                            <div className={s.red_line}></div>
                                            <span>{props.question.translationTextAdditional}</span>

                                        </>:
                                        <></>}
                                    <div className={s.wrapper_timer}>
                                        {props.isTimerEnd?
                                            <div className={s.timer_stop}>Время истекло</div>:
                                            <div>
                                                <span className={props.time<10 && props.time>=0?s.timer_warning:s.timer }><TimerComponent time={props.time}/></span>
                                                <span className={props.isTimerStart?s.btn_stop_timer:s.btn_start_timer} onClick={(e)=> {
                                                    if (props.isTimerStart)
                                                        props.timerStop()
                                                    else
                                                        props.timerStart()

                                                    e.target.innerText = "..."
                                                }
                                                }>{props.isTimerStart?'Стоп':'Старт'}</span>
                                                {/*<span className={s.button_start_timer} onClick={()=>{*/}
                                                {/*    timerStart(!isStartTimer)*/}

                                                {/*}}>{isStartTimer?'Стоп':'Старт'}</span>*/}
                                            </div>
                                        }
                                    </div>
                                </div>:
                                <div className={s.textQuestionWrapper}>
                                    <span>{props.question.text}</span>
                                    {
                                        props.question.translationText?
                                            <>
                                                <div className={s.red_line}></div>
                                                <span>{props.question.translationText}</span>

                                            </>:
                                            <></>
                                    }

                                    <div className={s.wrapper_timer}>
                                        {props.isTimerEnd?
                                            <div className={s.timer_stop}>Время истекло</div>:
                                            <div>
                                                <span className={props.time<10 && props.time>=0?s.timer_warning:s.timer }><TimerComponent time={props.time}/></span>
                                                <span className={props.isTimerStart?s.btn_stop_timer:s.btn_start_timer} onClick={(e)=> {
                                                    if (props.isTimerStart)
                                                        props.timerStop()
                                                    else
                                                        props.timerStart()

                                                    e.target.innerText = "..."
                                                }
                                                }>{props.isTimerStart?'Стоп':'Старт'}</span>
                                                {/*<span className={s.button_start_timer} onClick={()=>{*/}
                                                {/*    timerStart(!isStartTimer)*/}

                                                {/*}}>{isStartTimer?'Стоп':'Старт'}</span>*/}
                                            </div>
                                        }
                                    </div>
                                </div>
                            }

                            {props.question.img ?
                                <div className={s.img_question_wrapper}>
                                    {/* {loadImg?<Loader/>: */}

                                    <AsyncImage stl={s.img_question} src={props.question.img} loadImg={'/loader.svg'}/>
                                    {/* <img className={s.img_question} onLoad={() => setLoadImg(true)} src={props.question.img} alt=""/> */}
                                </div> :
                                <></>
                            }

                        </div>

                    </div>
                </div>
            </div>
            {
                props.viewAnswer?
                    <div className={s.buttonViewAnswer} onClick={() => {
                        props.setViewAnswer(!props.viewAnswer)
                    }}>Ответ:
                        <span className={s.text_answer}>{props.question.answer}</span>
                        {props.question.translationAnswer?
                            <span className={s.text_answer}> / {props.question.translationAnswer}</span>:
                            <></>
                        }


                    </div> :
                    <div className={s.buttonViewAnswerView} onClick={() => {
                        props.setViewAnswer(!props.viewAnswer)
                    }}>Показать ответ</div>

            }
            <div className={s.wrapper_btns_next}>
                {props.question.isFinishQuestion?
                    <div className={s.btn_exit_quiz} onClick={() => {
                        props.closeQuiz()
                    }} >Завершить</div>:
                    <div className={s.btn_next_question} onClick={() => {
                        props.nextQuestion()
                        props.setViewAnswer(false)
                        // setIsViewTimer(false)
                    }}>Следующий вопрос</div>}
            </div>
            <div onClick={() => {
                props.closeQuiz()
            }}  className={s.btn_exit_quiz_early} >Завершить досрочно</div>
        </>
    )
};

export default QuestionComponent;