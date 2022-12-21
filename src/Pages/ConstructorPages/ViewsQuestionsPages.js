import React, {useEffect, useState} from 'react';
import quizState from "../../State/Quiz/QuizState";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import Loader from "../../Static/Loader/Loader";
import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";
import questionState from "../../State/Questions/QuestionState";
import ModalWindowQuiz from "./ModalWindow/ModalWindowQuiz";
import s from './viewQuestion.module.css'

const ViewsQuestionPages = (observer(() => {

    const [currentQuestion, setCurrentQuestion] = useState({})
    const [textTitleModal, setTextTitleModal] = useState('')
    const [viewModal, setViewModal] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    // const [quizzes, setQuizzes] = useState([])
    const changeViewModal = (flag)=>{
        setViewModal(flag)
    }

    const setEmptyQuestion = () => {
        setCurrentQuestion(questionState.getEmptyQuestion())
    }

    const changeSelected = (nameParam, value) => {
        currentQuestion[nameParam]=value
        setCurrentQuestion({...currentQuestion})
        // console.log(nameParam, value)
    }

    const saveQuestion = () => {
        questionState.saveQuestion(currentQuestion)
    }

    const init = async () => {
        await quizState.init(true)
        const q = toJS( quizState.quizzes)
        console.log(q)
        if (q.length>0) {
            await questionState.init(q[0].id, true)
            // console.log(questionState.isLoad)
            // console.log(toJS(questionState.questions))
        }
        setIsLoad(true)
    }

    useEffect( () => {
        setEmptyQuestion()
         init()
    }, [])

    const redactQuestion = (question) => {
        setTextTitleModal('Редактирование: ' + question.title)
        setCurrentQuestion(question)
    }

    const removeQuestion=(removeQuestion)=>{
        questionState.removeQuestion(removeQuestion.id)
    }

    const newQuestion = () => {
        setTextTitleModal('Новый вопрос для викторины')
        const newQuestion = questionState.getEmptyQuestion()
        newQuestion.title = 'Вопрос '+ (toJS(questionState.questions).length + 1)
        setCurrentQuestion({...newQuestion})
    }

    return (
        <>
            <NavBarChoiceQuiz/>
         
            <a className={s.backButton} href="/constructor">{'<<Назад'}</a>
            {isLoad ?
                <div className={s.form}>
                    <div className={s.select}>
                        <div className={s.label_select}>Выберите викторину</div>
                    <select
                        id="Select-16"
                        className={s.select_quiz}                      
                        //value={quizzes[0].id}
                        onChange={async(e) => {
                            await questionState.init(e.target.value)
                            
                        }}
                    >
                        {toJS(quizState.quizzes).map((quiz) =>
                            <option key={"quiz_options" + quiz.id} value={quiz.id}>
                                {quiz.title}
                            </option>
                        )}

                    </select>
                    </div>
                    {questionState.isLoad ?
                        <>
                            {questionState.questions.length === 0 ?
                                <h4>Нет заданий</h4> :
                                <>
                                    {toJS(questionState.questions).map((question) => {
                                        return (
                                            <div className={s.wrapper} key={'question_view' + question.id}>
                                                <div className={s.title}>{question.title}</div>
                                                <div className={s.text}>Цена вопроса: {question.price}</div>
                                                <div className={s.text}>{`${question.text}`}<br/>{`(${question.answer})`}</div>
                                                {question.isActive?<></>:
                                                <div className={s.noActive}>Вопрос не активен</div>
                                                }
                                                <div className={s.btn_update} onClick={() => {
                                                    redactQuestion(question)
                                                    setViewModal(true)
                                                }}>Изменить</div>
                                                <div className={s.btn_del} onClick={() => {
                                                  // eslint-disable-next-line no-restricted-globals
                                                    if(confirm('Удалить?') )
                                                        removeQuestion(question)
                                                }}>Удалить
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                            <div onClick={() => {
                                newQuestion()
                                setViewModal(true)
                            }
                            } className={s.addButton}>
                                Добавить вопрос
                            </div>
                        </> :
                        <Loader/>
                    }
                    
                {viewModal?<ModalWindowQuiz changeViewModal={changeViewModal}
                                            typeOperation='question'
                                            titleWindow={textTitleModal}
                                            changeSelected={changeSelected}
                                            save={saveQuestion}
                                            selectedItem={currentQuestion}
                />:<></>}
                </div>
                :
                <Loader/>
            }
        </>
    );
}))

export default ViewsQuestionPages;