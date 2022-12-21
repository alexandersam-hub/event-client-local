import React, {useEffect, useState} from 'react'
import staticState from '../../../State/StaticState/StaticState'
import Loader from '../../../Static/Loader/Loader'
import NavBarChoiceQuiz from '../../Static/NavBarChoiceQuiz'
import s from './statisticPage.module.css'

const StatisticPage = () => {
    const [progress, setProgress] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const [enters, setEnters] = useState([])
    const [point, setPoint] = useState('statistic')

    const init = async () => {
        setIsLoad(false)

        const data = await staticState.getStatistic()
        console.log('data',data)
        // if(data.length>0)
        setProgress(data.progress)
        setEnters(data.enters)
        setIsLoad(true)
    }

    useEffect(
        () => {
            init()
        }, [])
    let countKey = 0

    const getDateStr=(date)=>{
        const currentData = new Date(date)
        return `${currentData.getDay() > 9 ? currentData.getDay() :
            '0' + currentData.getDay()}.${currentData.getMonth() > 9 ? currentData.getMonth() :
            '0' + currentData.getMonth()}.${currentData.getFullYear()} ${currentData.getHours()}:${currentData.getMinutes() > 9 ? currentData.getMinutes() : '0' + currentData.getMinutes()}`
    }
    return (
        <>
            <NavBarChoiceQuiz/>

            <>
                {isLoad ?
                    <div className={s.wrapper}>
                        <a className={s.backButton} href="/constructor">{'<<Назад'}</a>

                        {enters.length>0?
                            <div>
                            {enters.map((enter,index)=>{

                                return(
                                    <div key={'enter_list_'+index}>
                                        <table className={s.enters_table}>
                                            <tbody>
                                            <tr>
                                                <td>{enter.user}</td>
                                                <td>{enter.organization}</td>
                                                <td>{enter.dates.map((date, index)=>{
                                                    const currentDate = getDateStr(date)
                                                    return(
                                                        <span key={'date_enter'+index}>
                                                            <span>{currentDate}</span>


                                                            <br/></span>
                                                    )
                                                })}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}
                        </div>:<></>}
                        {progress ?
                            <>
                                {Object.keys(progress).map(item => {

                                    return (<div key={"userdata_" + item}>
                                        <div className={s.title_card}>{item} <span
                                            className={s.org_name}>Организация: {progress[item].description}</span>
                                        </div>
                                        <div className={s.item_progress}>
                                            {progress[item].data.map(p => {
                                                countKey++
                                                return (
                                                    //
                                                    <table className={s.card_progress} key={item + '_' + countKey}>
                                                        <tbody>
                                                        <tr className={s.row_card}>
                                                            <td className={s.td_title}>Название квиза</td>
                                                            <td>{p.quiz}</td>
                                                        </tr>
                                                        <tr className={s.row_card}>
                                                            <td className={s.td_title}>Количество</td>
                                                            <td>{p.count}</td>
                                                        </tr>
                                                        <tr className={s.row_card}>
                                                            <td className={s.td_title}>Даты</td>
                                                            <td>{p.dates.map(date => {
                                                                    const currentData =getDateStr(date)
                                                                    return (
                                                                        <div className={s.date_row}
                                                                             key={item + date}>{currentData}</div>
                                                                    )

                                                                }
                                                            )}</td>
                                                        </tr>
                                                        {p.progress && p.progress.length > 0 ?
                                                            <tr className={s.row_card}>
                                                                <td>Результаты игр</td>
                                                                <td>{p.progress.map((pr, index) => {
                                                                    if (pr.length > 0)
                                                                        return (
                                                                            <span key={'row_' + pr.key + index}>
                                                                        {pr.map((item, index) => {
                                                                                return (
                                                                                    < span
                                                                                        key={'game_' + item.toString() + '0' + index}> {item.scores + '; '}</span>
                                                                                )
                                                                            }
                                                                        )}
                                                                                <br/>
                                                                        </span>
                                                                        )
                                                                    else
                                                                        return (
                                                                            < span key={'row_' + pr.key + index}> Без счета <br/></span>
                                                                        )
                                                                })}
                                                                </td>
                                                            </tr> : <></>
                                                        }


                                                        </tbody>
                                                    </table>
                                                )
                                            })}
                                        </div>
                                    </div>)
                                })}
                            </> : <div>Нет данных</div>}
                    </div> :
                    <Loader/>}

            </>
        </>
    )
}

export default StatisticPage