import React, {useEffect, useState} from 'react';
import s from './RoomCard.module.css'
import {Link} from "react-router-dom";

const RoomCard = (props) => {
    const [isRemove, setIsRemove] = useState(false)
    console.log(props.room)
    useEffect(()=>{
        // window.addEventListener("onClick", ()=>{}, {passive: true} );
        const regions = document.getElementsByTagName('path')
        // Viewer.current.fitToViewer();
        for(let i of regions){
            i.setAttribute('fill', 'silver')
            i.setAttribute('stroke', '#FF0000')
        }
    },[])
    return (
        <div className={s.wrapper}>
            <div className={s.title}>{props.room.title}</div>
            {/*<div className={s.description}>{props.room.description}</div>*/}
            {
                props.room.teamsName.length>0?
                    <div>
                        <div>Количество команд: {props.room.countTeam}</div>
                        <div>Названия команд</div>
                        {props.room.teamsName.map((team, index)=>{
                            return(
                                <div key={props.room.id+'team_name'+index}>{index+1}) {team}</div>
                            )
                        })}
                        {isRemove?
                        <div>Удалено</div>:
                            <>
                                <Link to={'../preview/'+props.room.id}>
                                    <div className={s.btn_start}>Начать</div>
                                </Link>
                                {props.room.progress.currentTask || (props.room.progress.score && Object.keys(props.room.progress.score).length>0)?
                                    <div onClick={()=>{
                                        const newRoom = props.room
                                        newRoom.progress = {}
                                        props.resetScoreRoom(newRoom)
                                    }
                                    } className={s.btn_update}>Сбросить прогресс</div>:
                                    <></>
                                }
                                <div className={s.btn_update} onClick={()=>{
                                    props.changeRoom(props.room)
                                }}>Изменить</div>
                                <div className={s.btn_remove} onClick={async()=>{
                                    if(window.confirm('Удалить комнату?'))
                                        setIsRemove( await props.deleteRoom(props.room.id))
                                }}>Удалить</div>
                            </>
                        }

                    </div>:
                    <div>Нет названий</div>
            }
        </div>
    );
};

export default RoomCard;