import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import questionState from "../../State/Questions/QuestionState";
import QuestionComponent from "./QuestionComponent/QuestionComponent";
import {getDebugName, set, toJS} from "mobx";
import {observer} from "mobx-react-lite";
import NavBarChoiceQuestions from "../Static/NavBarChoiceQuestions";
import Loader from "../../Static/Loader/Loader";
import s from './questionPage.module.css'
import Cookie from 'js-cookie'
import ScoreModal from "./ScoreModal/ScoreModal";
import config from "../../config";
import FinalPage from "./FinalPage/FinalPage";
import ChartsComponent from "./ChartsComponent/ChartsComponent";


const QuestionPage =() => {
    const {id, room} = useParams();

    const [isLoad, setIsLoad] = useState(false)
    const [finalScore, setFinalScore] = useState({})
    const [isStart, setIsStart] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [isVisibleFinalPage, setIsVisibleFinalPage] = useState(false)
    const [currentTask, setCurrentTask]= useState(0)
    const [countPlayersInTeam, setCountPlayersInTeam] = useState({})

    const [time, setTime] = useState(-1)
    const [isTimerStart, setIsTimerStart] = useState(false)
    const [isTimerEnd, setIsTimerEnd] = useState(false)
    const [isTimerPause, setIsTimerPause] = useState(false)

    const [currentAnswers, setCurrentAnswers] = useState({})
    // const [lastScore, setLastScore] = useState({})
    const [quiz, setQuiz] = useState({})
    const [question, setQuestion] = useState({})
    const [ws, setWs] = useState({})
    const [teams, setTeams] = useState([])
    // const [mes, setMes] = useState('')
    const [score, setScore] = useState({})
    const [answers, setAnswers] = useState({})
    const [countPlayerAnswer, setCountPlayerAnswer] = useState({})
    const [isViewReport, setIsViewReport] = useState(false)
    const [isViewModalScore, setIsViewModalScore] = useState(false)
    const [viewAnswer, setViewAnswer] = useState(false)
    const [isAdditionalTask, setIsAdditionalTask] = useState(false)
    const init=()=>{
        setIsLoad(false)
        window.scrollBy(0,-110);
        const myWs = new WebSocket(config.SERVER_SOCKET);
        myWs.onopen = function () {
            console.log('подключился');
            myWs.send(JSON.stringify({action: 'login', type:'game', room, quiz:id}));
        };
        myWs.onclose = ()=>{
            console.log('соединие закрылось' )
            init()
        }
        myWs.onmessage = function (message) {
            const data = JSON.parse( message.data)
            console.log("Message", data);
            switch (data.action) {
                case 'get_score':

                    if (data.stepRound && data.stepRound === 'finish') {
                        console.log('@!@@', data.stepRound)
                        setFinalScore({teamsName:data.teamsName, score:data.score})
                        setIsViewModalScore(false)
                        setIsVisibleFinalPage(true)
                    }
                    break
                case 'score':
                    if(data.stepRound === 'score')
                        setIsViewModalScore(true)
                    break
                case 'view_answer':
                    setViewAnswer(true)
                    break
                case 'game':
                    if (data.currentTask!==currentTask)
                        setViewAnswer(false)
                    setQuestion(data.question)
                    setIsStart(data.isStart)
                    setQuiz(data.quiz)

                    setIsTimerStart(data.isTimerStart)
                    setIsTimerEnd(data.isTimerEnd)
                    setIsTimerPause(data.isTimerPause)
                    setTime(data.time)

                    setCurrentTask(data.currentTask)
                    setScore(data.score)
                    if (data.stepRound === 'additional')
                        setIsAdditionalTask(true)
                    else
                        setIsAdditionalTask(false)
                    break
                case 'time':
                    setIsTimerStart(data.isTimerStart)
                    setIsTimerEnd(data.isTimerEnd)
                    setIsTimerPause(data.isTimerPause)
                    setTime(data.time)
                    break
                case 'score_admin':
                    console.log('score_admin')
                    setCountPlayersInTeam(data.room.countsPlayerList)
                    setCountPlayerAnswer(data.room.countPlayerAnswer)
                    setCurrentAnswers(data.room.logAnswers[data.room.currentTask])
                    setTeams(data.room.teamsCode)
                    setScore(data.room.score)
                    setIsViewReport(true)
                    if (data.room.stepRound === 'score')
                        setIsViewModalScore(true)
                    else
                        setIsViewModalScore(false)
                    break
            }

        };
        setWs(myWs)

        setIsLoad(true)
    }

    if (Object.keys(ws) >0 && ws.readyState!==1){
        console.log('Reload init!!!!')
        init()
    }

    const start = ()=>{
        ws.send(JSON.stringify({action: 'start', type:'game', room, quiz:id}));
    }

    const timerStart = ()=>{
        ws.send(JSON.stringify({action: 'timer_start', type:'game', room, quiz:id}));
    }

    const timerStop = ()=>{
        ws.send(JSON.stringify({action: 'timer_stop', type:'game', room, quiz:id}));
    }


    const nextQuestion = ()=>{
        setIsViewModalScore(false)
        ws.send(JSON.stringify({action: 'next', room, quiz:id}));
        setIsViewReport(false)
    }
    const viewScore = ()=>{
        // setIsViewModalScore(true)
        ws.send(JSON.stringify({action:'view_score', room, quiz:id}))
    }
    const closeQuiz = ()=>{
        setIsViewModalScore(true)
        ws.send(JSON.stringify({action:'view_score', room, quiz:id}))
        console.log('view_score')
        setIsFinish(true)
    }

    const finishQuiz = ()=>{
        console.log('finishQuiz')
        ws.send(JSON.stringify({action:'finish', room, quiz:id}))
    }

    const getArrTeamsName=()=>{
        const teamsList = []
        if (teams.length===0)
            return []
        teams.forEach(team=>teamsList.push(team.teamName))
        return teamsList
    }

    const getArrScore=()=>{
        const scoreList = []
        console.log('score',score)
        if (!score)
            return []
        teams.forEach(team=>{scoreList.push({
            current: Math.round(score[team.teamCode] && score[team.teamCode].current? score[team.teamCode].current:0),
            last:    score[team.teamCode] && score[team.teamCode].last? score[team.teamCode].last:0,
            isFirstTrue:   score[team.teamCode] && score[team.teamCode].isFirstTrue,
            time: score[team.teamCode] && score[team.teamCode].currentTime?
                score[team.teamCode].currentTime :'-'
        })


        })
        console.log('scoreList',scoreList, teams)
        return scoreList
    }
    useEffect(()=>{
        init()
    },[])
    console.log('score', score, teams)
    if(isViewModalScore)
        return (
            <>
                <NavBarChoiceQuestions/>
                <ScoreModal finishQuiz={finishQuiz} isFinish={isFinish || question.isFinishQuestion} teamsName={getArrTeamsName()} score={getArrScore()} closeModal={nextQuestion}/>

            </>
        )

    return !isVisibleFinalPage?(
        <>
            <NavBarChoiceQuestions/>

            <div className={s.wrapper}>

                {isLoad?
                    <div className={s.bodyAsk}>

                        {isStart?
                            <div>

                                {/*{teams.length>0?*/}
                                {/*    <div>*/}
                                {/*        {isViewReport && teams.map((team, index)=>{*/}
                                {/*            // console.log(countPlayerAnswer)*/}
                                {/*            return(*/}
                                {/*              <div key={'team_name_'+index}>{team.teamName} <span>{countPlayerAnswer && countPlayerAnswer[team.teamCode]?countPlayerAnswer[team.teamCode]:0} / {countPlayersInTeam && countPlayersInTeam[team.teamCode]?countPlayersInTeam[team.teamCode]:0}</span></div>*/}
                                {/*        )})}*/}
                                {/*        {teams.map((team, index)=>{*/}
                                {/*            return(*/}
                                {/*                <div key={'team_score_'+index}>{team.teamName} <span> {score[team.teamCode]&&score[team.teamCode].last?score[team.teamCode].last:0}</span></div>*/}
                                {/*            )})}*/}
                                {/*    </div>:<></>*/}
                                {/*}*/}

                                {/*setIsTimerStart(data.isTimerStart)*/}
                                {/*setIsTimerEnd(data.isTimerEnd)*/}
                                {/*setIsTimerPause(data.isTimerPause)*/}
                                {/*setTime(data.time)*/}

                                <QuestionComponent
                                    viewAnswer={viewAnswer}
                                    setViewAnswer={setViewAnswer}
                                    closeQuiz={closeQuiz}
                                    nextQuestion={viewScore}
                                    taskNumber={currentTask}
                                    quizName={quiz.title}
                                    isAdditionalTask={isAdditionalTask}
                                    timerStop={timerStop}
                                    timerStart={timerStart}
                                    isTimerStart={isTimerStart}
                                    isTimerEnd={isTimerEnd}
                                    isTimerPause={isTimerPause}
                                    time={time}
                                    question={question}/>
                            </div>
                            :
                            <div className={s.message_not_question}>
                                <div className={s.start_text}>Все готовы? <br/> Начнем!</div>
                                <div className={s.btn_start} onClick={()=>{start()}}>Старт</div>
                                {score?<ChartsComponent isTimeNotUse={true} teamsName={getArrTeamsName()} score={getArrScore()} />:<></>}
                            </div>
                        }

                    </div>:
                    <Loader/>
                }


            </div>
        </>):(
        <>
            <NavBarChoiceQuestions/>
            <FinalPage finalScore={finalScore}/>
        </>
    )
}

export default QuestionPage;