import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NavBarChoiceQuestions from "../Static/NavBarChoiceQuestions";
import s from './SettingsGamePage.module.css'
import {QRCodeSVG} from 'qrcode.react';
import colors from "../../State/ColorsState/ColorsState"
import RoomState from "../../State/RoomState/RoomState";
import Loader from "../../Static/Loader/Loader";
import AddRoom from "./AddRoom/AddRoom";
import RoomCard from "./RoomCard/RoomCard";

const SettingsGamePage = () => {
    const {id} = useParams();

    const [teamsName, setTeamsName] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [rooms, setRooms] = useState([])
    const [redactRoom, setRedactRoom] = useState({})

    const init = async ()=>{
        const result = await RoomState.getRomsByQuizId(id)
        if(!result.warning){
            setRooms(result.rooms)
            setIsLoad(true)
        }else{
            return setTimeout(()=>{init()},1200)
        }
    }

    useEffect(()=>{

            init()

    }, [])
    const deleteRoom = async (id)=>{
        const result = await RoomState.delRoom(id)
        return !result.warning;
    }

    const resetScoreRoom = async(room)=>{
        const result = await RoomState.resetScore(room)

        if(!result.warning){
            const roomsList = []
            rooms.forEach(room=>{
                if(room.id === result.room.id){
                    roomsList.push(result.room)
                }else{
                    roomsList.push(room)
                }
            })
            setRooms(roomsList)
            return true
        }else{
            return false
        }
    }
    const saveRoom = async (room) => {
        if (room.id === 'new'){
            const result = await RoomState.addRoom(room)
            if(!result.warning){
                const roomsList = [...rooms]
                roomsList.push(result.room)
                setRooms(roomsList)
                await RoomState.resetScore(room)
                return true
            }else return false
        }else{
            const result = await RoomState.updateRoom(room)
            if(!result.warning){
                const roomsList = []
                rooms.forEach(room=>{
                    if(room.id === result.room.id){
                        roomsList.push(result.room)
                    }else{
                        roomsList.push(room)
                    }
                })
                setRooms(roomsList)
                await RoomState.resetScore(room)
                return true
            }else{
                return false
            }

        }

    }
    const changeRoom = (room) => {
        setRedactRoom(room)
        setIsAdd(true)
    }

    return isLoad?(
        <>
            <NavBarChoiceQuestions/>
            <div className={s.wrapper}>
            {!isAdd?
                <div className={s.wrapper}>
                    {rooms.length>0?
                        <div>
                            {rooms.map((room, index)=>{
                                return(
                                    <RoomCard resetScoreRoom={resetScoreRoom} saveRoom={saveRoom} deleteRoom={deleteRoom} changeRoom={changeRoom} key={'room_card_'+index} room={room}/>
                                    )
                            })}

                        </div>:
                        <div>
                            Для данной викторины нет подготовленной комнаты
                        </div>

                    }
                    <div onClick={()=>{
                        const emptyRoom = RoomState.getEmptyRoom()
                        setRedactRoom(emptyRoom);
                        setIsAdd(true)
                    }} className={s.btn_start}>Добавить</div>
                </div>:
                <div>
                    <AddRoom close={setIsAdd} saveRoom={saveRoom} quizId={id} room={redactRoom}/>
                    <div onClick={()=>{setIsAdd(false)}} className={s.btn_start}>Отмена</div>
                </div>
            }
            </div>

        </>
    ):(<>
        <NavBarChoiceQuestions/>
        <Loader/>

        </>
    )
};

export default SettingsGamePage;