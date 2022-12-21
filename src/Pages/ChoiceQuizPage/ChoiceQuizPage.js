import React, {useEffect, useState} from 'react';
import QuizComponent from "./QuizComponent/QuizComponent";
import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";
import NavBarChoiceQuestions from "../Static/NavBarChoiceQuestions";
import Loader from "../../Static/Loader/Loader";
import quizState from "../../State/Quiz/QuizState";
import s from './choicehQuizPage.module.css'
import config from '../../config';
import Description from "../Description/Description";
import categoryState from '../../State/Category/CategoryState'
import Cookie from 'js-cookie'
import MapPage from "./MapPage/MapPage";

const ChoiceQuizPage = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [isSearchEmpty, setIsSearchEmpty] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [countDo, setCountDo] = useState(false)
    const [countTeam, setCountTeam] = useState(8)
    const [isLoad, setIsLoad] = useState(false)
    const [isMapView, setIsMapView] = useState(false)

    const localInit = async () =>{
        setIsLoad(false)
        Cookie.set('count_do', false)
        const res = await categoryState.getCategory()
        if(!res.warning){
            setCategoryList(res.category)

        }
        const resQuiz = await quizState.getQuizzes()
        if(resQuiz.warning)
            return setTimeout(()=>{localInit()},1000)
        else{
            console.log(resQuiz)
            setQuizzes(resQuiz.quizzes)
        }
        setIsLoad(true)
    }
    useEffect(() => {
        localInit()
    }, [])

    const searchQuiz = (text) => {
      if (text.length === 0)
          setIsSearch(false)
        else
          setIsSearch(true)

        const res = quizState.quizzes.filter(item => item.title.toLowerCase().trim().includes(text.toLowerCase()) || item.description.toLowerCase().includes(text.toLowerCase()))
        if(res.length>0)
            setIsSearchEmpty(false)
        else
            setIsSearchEmpty(true)
        setQuizzes(res)
    }
    if(isMapView)
        return (
            <>
                <NavBarChoiceQuestions/>
                <MapPage />
            </>

        )
    else
    return (
        <>
            {quizState.marker === 'not_description'?
                <>
                    <Description />
                </>
                :<></>
            }
        <div className={s.wrapper}>

            <NavBarChoiceQuiz/>
            {isLoad ?
                <div className={s.wrapper_quiz_blocks}>
                    <div className={s.start_build} onClick={()=>{setIsMapView(true)}}></div>
                    <input onChange={(e) => {
                        searchQuiz(e.target.value)
                    }}
                           id="search_quiz" type="text"
                           className={ countDo?s.searchTextBoxActive:s.searchTextBox}
                           placeholder='Поиск по викторинам'
                    />
                    <div
                        className={countDo?s.count_wrapper_active:s.count_wrapper}>
                        {/*<label*/}
                        {/*    className={s.task_score}*/}
                        {/*    onClick={()=>{*/}
                        {/*        Cookie.set('count_do', !countDo)*/}
                        {/*        if(!countDo){*/}
                        {/*            Cookie.set('count_team', countTeam)*/}
                        {/*        }else{*/}
                        {/*            Cookie.remove('count_team')*/}
                        {/*        }*/}
                        {/*        setCountDo(!countDo)*/}
                        {/*    }}>Вести счет игры </label>*/}
                        {/*<input  className={s.task_score_checkbox}*/}
                        {/*    onChange={(e)=> {*/}
                        {/*    Cookie.set('count_do', !countDo)*/}
                        {/*    if(!countDo){*/}
                        {/*        Cookie.set('count_team', countTeam)*/}
                        {/*    }else{*/}
                        {/*        Cookie.remove('count_team')*/}
                        {/*    }*/}
                        {/*    setCountDo(!countDo)*/}
                        {/*}} checked={countDo} type='checkbox'/>*/}



                            <div className={countDo?s.wrapper_count_team:s.wrapper_count_team_no_active}>
                                <span className={s.count_team_label}>Введите количество команд</span>
                                <div className={s.wrapper_count_team_add}>
                                      <button className={s.count_team_label_add} onClick={()=>{
                                          if (countTeam>1 && countDo){
                                              setCountTeam(countTeam-1)
                                              Cookie.set('count_team', countTeam-1)
                                          }

                                      }}>-</button>
                                    <span  className={s.count_team_label_data}>{countTeam}</span>
                                    <button className={s.count_team_label_add} onClick={()=>{
                                        if (countTeam<10 && countDo){
                                            setCountTeam(1+countTeam)
                                            Cookie.set('count_team', 1+countTeam)
                                        }

                                    }}>+</button>
                                </div>

                            </div>
                    </div>
                    <>
                    {isSearchEmpty?<div className={s.quiz_empty}>По заданному критерию викторин не найдено</div>:<></>}
                        {quizzes.map(quiz => {

                            return (
                                <div key={'quiz_row' + quiz.id} className={s.row_quiz}>
                                     <QuizComponent category={categoryList.filter(item=>item.name===quiz.description)} key={'quiz' + quiz.id} quiz={quiz}/>
                                </div>
                            )
                        }
                    )


                    }</>
                 </div> :
                <Loader/>}

        </div>
            </>
    )
}

export default ChoiceQuizPage;