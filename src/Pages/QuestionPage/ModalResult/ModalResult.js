import React, {useState} from 'react';
import s from './modalResult.module.css'

const ModalResult = (props) => {
    const [teams, setTeams] = useState(props.teams.sort((a,b)=> b.scores - a.scores))
    let lastResult = -1
    let level = 0

    return( <>
        <div onClick={()=>{ props.setViewResultWindow(false)}} className={s.wrapper}>  </div>
            <div className={s.wrapper_result}>
                <button className={s.btn_close_window} onClick={() => {
                    props.setViewResultWindow(false)
                }}>✕</button>
                <div className={s.title}>Результаты игры</div>
                <table className={s.result_table}>
                    <tbody>
                {teams.map((team, index)=>{
                    if( parseInt(team.scores) !== lastResult){
                        level++
                        lastResult = team.scores
                    }
                    return(
                        <tr className={s.row} key={'teamsResult_'+index}>
                            <td className={s.td_data_level}>{level} место:</td>
                            <td className={s.td_data_name}>{team.name}</td>
                            <td className={s.td_data_scores}>{team.scores}</td>
                        </tr>
                    )
                })}
                    </tbody>
                </table>
                <button className={s.btn_close} onClick={()=>props.close(teams)}>Завершить</button>

        </div></>
    );
};

export default ModalResult;