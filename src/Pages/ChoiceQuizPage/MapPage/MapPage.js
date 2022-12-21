import React, {useState} from 'react';
import s from './MapPage.module.css'
import mapSvg from './map.svg'
import timerSvg from './timer.svg'
import ReversTimer from "./ReversTimer/ReversTimer";

const MapPage = () => {
    const [time, setTime] = useState(0)
    const [timer, setTimer] = useState(null)
    const [isTimerStart, setIsTimerStart] = useState(false)
    const [listTime, setListTime] = useState([])
    const startTimer = () => {
        let t = time
        setIsTimerStart(true)
        const timer = setInterval(()=>{
            t++
            setTime(t)
        },1000)
        setTimer(timer)
    }
    const stopTimer = ()=>{
        setIsTimerStart(false)
        clearInterval(timer)
    }
    const getTime = (time)=>{
        const minute = Math.floor(time/60)
        const seconds = time - minute*60
        const time_string = (minute>9?minute.toString():'0'+ minute)+':' + (seconds>9?seconds.toString():'0'+seconds)
        console.log(time_string)
        return time_string
    }
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Сборка карты</div>
            <img className={s.map_img} src={mapSvg} alt=""/>
            <div className={s.wrapper_timer}>
                <div className={s.timer}>
                    <ReversTimer time={time} />
                </div>

                <div className={s.btn_start_or_stop} onClick={()=>{
                    if (isTimerStart)
                        stopTimer()
                    else
                        startTimer()
                }}>{isTimerStart?'Стоп':'Старт'}</div>
                <img onClick={()=>{
                    setListTime([...listTime, getTime(time) ])
                }} className={s.timer_svg} src={timerSvg} alt=""/>
            </div>
            {listTime.length>0?
                <table className={s.result_table}><tbody>
                {listTime.map((t,i)=>{

                        return(<tr key={'row_time_'+i}><td>{i+1}.</td><td>{t}</td></tr>)
                })}
                </tbody></table>:
                <></>
            }

        </div>
    );
};

export default MapPage;