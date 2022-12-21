import React, {useEffect, useState} from 'react';
import {Button} from "react-materialize";
import {observer} from "mobx-react-lite";
import quizState from "../../State/Quiz/QuizState";
import {toJS} from "mobx";
import Loader from "../../Static/Loader/Loader";
import QuizList from "./QuizList/QuizList";
import ModalWindowQuiz from "./ModalWindow/ModalWindowQuiz";
import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";
import s from './viewQuiz.module.css'
// import mater from './materialize.min.css'

const ViewsQuizPages = (observer(() => {

    useEffect(()=>{init()},[])


    const [quizzes, setQuizzes] = useState([])
    const [textTitleModal, setTextTitleModal] = useState('')
    const [selectedQuiz, setSelectedQuiz] = useState({...quizState.getEmptyGame()})
    const [viewModal, setViewModal] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const init = async()=>{
        const newQuizzes = await quizState.init(true)
        console.log(newQuizzes)
        setQuizzes(newQuizzes.quizzes)
        setIsLoad(true)
    }

    const changeViewModal = (flag)=>{
        setViewModal(flag)
    }

    const saveQuiz=()=>{
        quizState.saveQuiz(selectedQuiz)
    }
    
    const changeSelectedQuiz =(nameParam, value)=>{
        selectedQuiz[nameParam]=value
        setSelectedQuiz({...selectedQuiz})
        // console.log(nameParam, value)
    }

    const removeQuiz=(id)=>{
        quizState.removeQuiz(id)
    }

    const addQuiz = ()=>{
        setTextTitleModal('Новая викторина')
        const newQuiz = quizState.getEmptyGame()
       //setSelectedQuiz(newQuiz)
        selectedQuiz.title = newQuiz.title
        selectedQuiz.description = newQuiz.description
        selectedQuiz.img = newQuiz.img
        selectedQuiz.isActive = newQuiz.isActive
        selectedQuiz.category = newQuiz.category
        // console.log(selectedQuiz)
    }

    const redactQuiz = (quizId)=>{
        setSelectedQuiz( quizzes.find(quiz=>quiz.id === quizId))
        setTextTitleModal('Редактирование: '+quizzes.find(quiz=>quiz.id === quizId).title)


        // console.log(selectedQuiz)

    }

    // eslint-disable-next-line no-mixed-operators
    // if(quizzes.length ===0 && quizState.isLoad || toJS(quizState.quizzes).length !== quizzes.length){
    //     setQuizzes( toJS(quizState.quizzes))
    // }
    return (
        <div>
            <NavBarChoiceQuiz/>
            <a className={s.backButton} href="/constructor">{'<<Назад'}</a>
            {isLoad?<div className={s.form}>
                    {quizzes.map(quiz=>{
                            return(
                                <div key={quiz.id} >
                                    <QuizList changeViewModal={changeViewModal} remove={removeQuiz} redactQuiz={redactQuiz} key={'quiz'+quiz.id} quiz={quiz}/>
                                </div>
                            )
                        }
                    )}

                        <Button  onClick={()=>{
                            addQuiz()
                            changeSelectedQuiz(true)
                            setViewModal(true)
                        }} className={s.addButton}>Добавить викторину</Button>

            </div>:
                <Loader/>}
            {viewModal?
                <ModalWindowQuiz changeViewModal={changeViewModal} typeOperation='quiz' changeSelected={changeSelectedQuiz} save={saveQuiz} selectedItem={selectedQuiz} titleWindow={textTitleModal}/>
                :
                <></>
            }
             </div>

    );
}))

export default ViewsQuizPages;