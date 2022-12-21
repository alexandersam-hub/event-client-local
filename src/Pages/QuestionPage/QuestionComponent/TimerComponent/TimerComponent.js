import React from 'react';
import s from './TimerComponent.module.css'

const TimerComponent = ({time}) => {
    const minute = Math.floor(time / 60)
    const seconds = time - minute*60
    return (
        <div className={s.wrapper}>
             <span>{minute>9?minute:'0'+minute}:{seconds>9?seconds:'0'+seconds}</span>

        </div>
    );
};

export default TimerComponent;