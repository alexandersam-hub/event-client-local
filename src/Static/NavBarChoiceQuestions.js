import React from 'react';

import s from './navBarChoiceQuestion.module.css'
import logoNative from "../DopQuiz/media/logo_native.svg";
import Cookie from "js-cookie";

const NavBarChoiceQuestions = () => {
    return (

        <nav className={s.wrapper}>
        {/*<div className="nav-wrapper">*/}
        {/*    <div href="#" className={"brand-logo left " + s.logo}>Викторина</div>*/}
        {/*</div>*/}
        {/*    <img className={s.logo_native} src={logoNative} alt=""/>*/}
          <div className={s.logo} onClick={()=>{
              if(window.confirm("Завершить досрочно?")){
                  Cookie.remove('task_number')
                  Cookie.remove('progress')
                  Cookie.remove('quiz_name')
                  window.scrollBy(0,-110);
                  document.location.href = window.location.origin+'/rvio_quiz'
              }
          }}>
              <div className={s.logo_up}>интерактивная развивающая игра</div>
              <div  className={s.logo_down}>РОССИЯ В ДЕТАЛЯХ</div>
          </div>
          <button className={s.poin_back} onClick={()=>{
                document.location.replace('/')
          }}>
              {'< Вернуться к выбору викторин'}
          </button>
    </nav>

    );
};
//  <NavItem href="/">
//                     <Icon left>
//                         chevron_left
//                     </Icon>Выход в меню
//                 </NavItem>
export default NavBarChoiceQuestions;