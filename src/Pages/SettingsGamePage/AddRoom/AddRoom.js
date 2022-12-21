import React, {useEffect, useState} from 'react';
import s from "./AddRoom.module.css";

const AddRoom = (props) => {

    const [countTeam, setCountTeam] = useState(props.room.countTeam)
    const [teamsName, setTeamsName] = useState(props.room.teamsName)
    const [room, setRoom] = useState(props.room)
    useEffect(()=>{
        const teamList = []
        for(let i =0; i<countTeam; i++){
            if(teamsName[i])
                teamList.push(teamsName[i])
            else
                teamList.push('')
        }
        setTeamsName(teamList)
    },[countTeam])

    const changeRoom = (fieldName, value, index=0)=>{

        if(fieldName === 'teamName'){
            const newTeamsName = [...teamsName]
            newTeamsName[index] = value
            setTeamsName(newTeamsName)
        }else{
            const updatesRoom = {...room}
            updatesRoom[fieldName] = value
            setRoom(updatesRoom)
        }

    }

    return (
        <div className={s.wrapper}>
            <input type="text" value={room.title} placeholder={'Название'} onChange={e=>{changeRoom('title', e.target.value)}}/>
            <input type="text" value={room.description} placeholder={'Описание'} onChange={e=>{changeRoom('description', e.target.value)}}/>
            <div>
                   <span className={s.btn_add_team} onClick={()=>{
                       if(countTeam>1)
                           setCountTeam(countTeam-1)
                   }}>-</span>
                <span> Введите количество команд </span>
                <span className={s.btn_add_team} onClick={()=>{
                    setCountTeam(countTeam+1)
                }}>+</span>
            </div>

            <input className={s.input_count_team} type="text" value={countTeam} onChange={(e)=>{
                setCountTeam(e.target.value)
            }} />


            <div>Названия команд:</div>
            {teamsName.map((team, index)=>{
                return(
                    <div key={room.id+index}>
                        <div>Команда {index+1}</div>
                        <input value={team} onChange={e=>{changeRoom('teamName', e.target.value, index)}} type="text" placeholder={`Название ${index+1} команды`}/>
                    </div>
                )
            })}
            <div className={s.btn_save} onClick={async (e)=>{
                e.target.innerText = 'Сохраняю...'
                const newRoom = {...room}
                newRoom.countTeam = countTeam
                newRoom.teamsName = teamsName
                newRoom.quiz = props.quizId
                const res = await props.saveRoom(newRoom)

                if (res){
                    e.target.innerText = 'Сохранено'
                    setTimeout(()=>{ props.close(false)},1000)
                }else{
                    e.target.innerText = 'Ошибка'
                }
            }}>Сохранить</div>
        </div>
    );
};

export default AddRoom;