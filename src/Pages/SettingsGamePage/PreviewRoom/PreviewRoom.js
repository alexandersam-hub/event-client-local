import React, {useEffect, useState} from 'react';
import NavBarChoiceQuestions from "../../Static/NavBarChoiceQuestions";
import {Link, useParams} from "react-router-dom";
import RoomState from "../../../State/RoomState/RoomState";
import quizState from "../../../State/Quiz/QuizState";
import Loader from "../../../Static/Loader/Loader";
import RoomBax from "./RoomBox/RoomBax";
import s from './PreviewRoom.module.css'
import WS from '../../../Services/socketService'

const PreviewRoom = () => {
    const {id} = useParams()
    const [room, setRoom] = useState({})
    const [isLoad, setIsLoad] = useState(false)
    const [quizName, setQuizName] = useState('')
    const init = async ()=>{
        setIsLoad(false)
        const resultRoom = await RoomState.getRoomById(id)

        if(resultRoom.warning)
            return setTimeout(()=>{init()},1200)
        else{
            // console.log(resultRoom)
            setQuizName( await quizState.getQuizNameById(resultRoom.room.quiz))
            setRoom(resultRoom.room)
        }

        setIsLoad(true)
    }

    useEffect(()=>{
        init()
    },[])
    return isLoad?(
        <div>
            <NavBarChoiceQuestions/>
            {room?
            <div  className={s.wrapper}>
                <div className={s.title_quiz}>{quizName}</div>
                {room.teamsName.length>0?
                <div className={s.cards_wrapper}>
                    {room.teamsName.map( (teamName, index)=>{
                        return(
                            <RoomBax key={'teamName_room_box'+index} index={index} team={teamName} room={room} />
                        )
                    })}
                    <Link to={`../quiz/${room.quiz}/${room.id}`}>
                        <div className={s.btn_start}>Начать игру</div>
                    </Link>
                </div>:
                <div>Не указаны имена команд</div>
                }
            </div>:
            <div>Нет данной комнаты</div>
            }
        </div>
    ):(
        <>
            <NavBarChoiceQuestions/>
            <Loader/>
        </>
    )
};

export default PreviewRoom;