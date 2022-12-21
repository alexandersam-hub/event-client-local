import React, {useEffect, useState} from 'react';
import s from './count_team.module.css'
// import scoresState from '../../../State/ScoresState/ScoresState'
import {toJS} from "mobx";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
// teams={teams} setTeams={setTeams}
// isActiveTeams={isActiveTeams} setIsActiveTeams={setIsActiveTeams}
const CountTeam = (props) => {



    useEffect(()=>{



    },[])


    const updatePoint = (id, point)=>{
        const tms = [...props.teams]
        const currentTeam = tms.find(team=>team.id === id)

            if(props.isActiveTeams){
                props.setIdCurrentTeam(id)
                currentTeam.scores += Number(point)
                props.setIsActiveTeams(false)
            }
        props.setTeams(tms)
    }

    const dePoint = (point)=>{

        const tms = [...props.teams]
        const currentTeam = tms.find(team=>team.id === props.idCurrentTeam)

        if(!props.isActiveTeams){
            currentTeam.scores -= point
            props.setIsActiveTeams(true)
            props.setIdCurrentTeam(-1)
        }
        props.setTeams(tms)

    }




    return (
        <div className={s.wrapper_window}>
            <div className={s.wrapper}>
            <div className={s.title}>Счет игры</div>
            {props.teams.map((team, index)=>{
                return(
                    <div onClick={()=>{
                        props.setIsNextTask(false)
                        if(props.isActiveTeams)
                            updatePoint(team.id, props.price)
                        else if(team.id === props.idCurrentTeam)
                            dePoint(props.price)
                    }} key={'teamScores_'+index} className={ !props.isNextTask &&  team.id === props.idCurrentTeam? s.team_box_active: s.team_box}>
                        <table className={s.t_data}><tbody>
                        <tr>
                            <td className={s.t_teamname}> <span className={s.team_name}>{team.name}</span></td>

                            <td className={s.t_btn_add}> {props.isActiveTeams? <button className={s.team_btn_add}>+</button>:
                                <button className={s.team_btn_add}>{team.id === props.idCurrentTeam?'-':'+'}</button>}</td>
                            <td className={s.t_score_add}>  {team.id === props.idCurrentTeam&&!props.isActiveTeams?<span className={s.team_scores}>{team.scores-props.price} + {props.price}</span>:
                                <span className={s.team_scores}>{team.scores}</span>
                            }</td>
                        </tr>
                        </tbody></table>


                        {/*{!props.isActiveTeams && team.id === props.idCurrentTeam?<span className={s.team_scores}>{props.price}</span>:<span className={s.team_scores}></span>}*/}



                    </div>
                )
            })}

        </div>

        </div>
    );
};

export default CountTeam;