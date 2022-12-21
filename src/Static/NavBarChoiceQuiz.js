import React from 'react';
import {Icon, Navbar, NavItem} from "react-materialize";
import s from './navBarChoiceQuiz.module.css'
import learnLogo from './resource/learn_play.svg'
import product from './resource/product.svg'
import logoNative from "../DopQuiz/media/logo_native.svg";

const NavBarChoiceQuiz = () => {
    return (


        <nav className={s.wrapper}>
            {/*<div className="nav-wrapper">*/}
            {/*    <div href="#" className={"brand-logo left " + s.logo}>Викторина</div>*/}
            {/*</div>*/}
            {/* <img  className={s.logo_native} src={logoNative} alt=""/>*/}
              <div className={s.logo}>
                  <div className={s.logo_up}>интерактивная развивающая игра</div>
                  <div  className={s.logo_down}>РОССИЯ В ДЕТАЛЯХ</div>

              </div>
            <div className={s.merch_logo}><img className={s.learnLogo} src={learnLogo} alt=""/><img onClick={()=>{if(window.confirm('Перезагрузить страницу?'))window.location.href = window.location.origin}} className={s.product} src={product} alt=""/></div>
        </nav>

    );
};

export default NavBarChoiceQuiz;