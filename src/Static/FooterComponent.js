import React from 'react';
import s from './footer.module.css'
import supportState from '../../State/SupportState/SupportState';
import {Link} from "react-router-dom";
import blank from './resource/game_form.pdf'

const FooterComponent = (props) => {
    return (
        <div className={s.wrapper}>
            {/*<div className={s.wrapper_links}>*/}

            {/*    <div onClick={()=>{*/}
            {/*        supportState.checkViewWindowSupport(true)*/}
            {/*    }} className={s.back_call}>Обратная связь</div>*/}
            {/*    <div onClick={()=> {*/}
            {/*        props.viewAuthor(true)*/}
            {/*    }} className={s.author}>Авторы проекта</div>*/}
            {/*        <div className={s.resource_link} href={blank} download={'Игровой бланк'}>Скачать игровой бланк</div>*/}
            {/*</div>*/}

                <div className={s.text}>©Все права защищены ООО Центр "Витязь"</div>
        </div>
    );
};

export default FooterComponent;