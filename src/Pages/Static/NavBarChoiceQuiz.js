import React from 'react';
import s from './navBarChoiceQuiz.module.css'
import learnLogo from './resource/learn_play.svg'
import product from './resource/product.svg'

const NavBarChoiceQuiz = () => {
    return (


        <nav className={s.wrapper}>
              <div className={s.logo}>
                  <div className={s.logo_up}>интерактивная командная игра</div>
                  <div  className={s.logo_down}>РОССИЯ В ДЕТАЛЯХ</div>

              </div>
            <div className={s.merch_logo}><img className={s.learnLogo} src={learnLogo} alt=""/><img onClick={()=>{if(window.confirm('Перезагрузить страницу?'))window.location.href = window.location.origin}} className={s.product} src={product} alt=""/></div>
        </nav>

    );
};

export default NavBarChoiceQuiz;