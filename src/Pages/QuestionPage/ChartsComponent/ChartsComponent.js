import React from 'react';
import s from './ChartsComponent.module.css'
import firstSvg from '../../Static/resource/first.svg'

const ChartsComponent = ({teamsName, score, isTimeNotUse, isFullScore}) => {
    const teamScores = []
    teamsName.forEach((team,index)=>{
        teamScores.push({
            team:team,
            current:score[index].current,
            last:score[index].last,
            time:score[index].time,
            isFirstTrue:score[index].isFirstTrue,

        })
    })
    teamScores.sort((a,b)=> (b.current-b.last) - (a.current - a.last))
    // score.sort((a,b)=>{
    //    console.log(a.current)
    //    return a.current>b.current})
    // console.log('score',scoresTeam)
    return teamsName && teamsName.length >0?(
        <div className={s.wrapper}>
            <div className={s.title}>Результаты текущего раунда</div>
            <table className={s.t_score}>
                <tbody>
                <tr>
                    <td className={s.t_td_title}>Название команды</td>
                    <td className={s.t_td_title}>Баллов <br/> за раунд</td>
                    {isFullScore?<td className={s.t_td_title}>Общий балл</td>:<></>}
                    {isTimeNotUse?<></>:<td className={s.t_td_title}>Время ответа</td>}
                </tr>
                {teamScores.map((team, index)=>{
                    console.log('team1',team)
                    // console.log('score[index].last',score[index].current - score[index].last)
                    return(
                        <tr className={
                            s.row
                            // team.current - team.last?
                            // (team.isFirstTrue?s.green_row_first:s.green_row)
                            // :s.red_row_table
                        }
                            key={'score_'+index}>
                            <td className={s.t_td_team_name}>{team.team}</td>
                            <td className={s.t_td_value}>{team.current - team.last}</td>
                            {isFullScore?<td className={s.t_td_value}>{team.current}</td>:<></>}
                            {isTimeNotUse? <></>:
                                <td className={s.t_td_value}>
                                    {team.isFirstTrue? <img className={s.first_place_svg} src={firstSvg} alt=""/>:<></>}
                                    {team.time} {team.time==='-'?'':'сек.'}
                                </td>
                            }

                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>

    ):(
        <></>
    )
};

export default ChartsComponent;