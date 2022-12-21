import React, {useEffect, useState} from 'react';
import s from './dopQuiz.module.css'
import background from './media/rus_back.svg'
import btn from './media/btn.svg'
import rus_0 from './media/rus_0.svg'
import rus_1 from './media/rus_1.svg'
import rus_2 from './media/rus_2.svg'
import rus_3 from './media/rus_3.svg'
import rus_4 from './media/rus_4.svg'
import rus_5 from './media/rus_5.svg'
import rus_6 from './media/rus_6.svg'
import rus_7 from './media/rus_7.svg'
import rus_8 from './media/rus_8.svg'
import flag_rvio from './media/flag_rvio.svg'
import flag_rvio2 from './media/flag_rvio2.svg'
import logoNative from './media/logo_native.svg'

import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";

const DopQuiz = (props) => {
    const rus_map = [
        rus_0, rus_1, rus_2,rus_3,rus_4,rus_5,rus_6,rus_7,rus_8
    ]

    const [indexMap, setIndexMap] = useState(0)
    const [viewFlag, setViewFlag] = useState(false)
    useEffect(()=>{
        props.setIsViewBackRus(false)
    })
    return (
        <>
            <NavBarChoiceQuiz/>

            <img className={s.background} src={background} alt=""/>
            <img onClick={()=>{  if(indexMap>0)setIndexMap(indexMap-1)}} className={s.rus_map} src={rus_map[indexMap]} alt=""/>
            {viewFlag? <img className={s.flag_vrio} src={flag_rvio} alt=""/>:<></>}
            {viewFlag? <img className={s.flag_vrio2} src={flag_rvio2} alt=""/>:<></>}

            <img className={s.btn} src={btn} alt="" onClick={()=>{
                if(indexMap<8)
                    setIndexMap(indexMap+1)
                else
                    setViewFlag(true)
            }}/>
            </>
    );
};

export default DopQuiz;