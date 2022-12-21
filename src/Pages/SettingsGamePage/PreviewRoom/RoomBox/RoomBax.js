import React from 'react';
import {QRCodeSVG} from 'qrcode.react';
import s from './RoomBox.module.css'
import config from '../../../../config'
//index={index} team={teamName} room={room}
import md5 from 'md5'
const RoomBax = (props) => {
    console.log("RoomBox ", props)
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Команда {props.index+1}</div>
            <a href={config.URL_PLAYER+"/"+props.room.id+'/'+md5(props.room.id+props.index)}>
                {/*<QRCodeSVG value={config.URL_PLAYER+"/"+props.room.id+'/'+md5(props.team)} />*/}
                <QRCodeSVG value={config.URL_PLAYER+"/"+props.room.id+'/'+md5(props.room.id+props.index)} />
            </a>
            {/*<div> <a href={"http://localhost:3002/"+props.room.id+'/'+md5(props.team)}>{"http://localhost:3002/"+props.room.id+'/'+md5(props.team)}</a></div>*/}
            <div className={s.team_name}>{props.team}</div>
        </div>
    );
};

export default RoomBax;