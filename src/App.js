import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import Cookies from 'js-cookie';
import ChoiceQuizPage from "./Pages/ChoiceQuizPage/ChoiceQuizPage";
import QuestionPage from "./Pages/QuestionPage/QuiestionPage";
import {observer} from "mobx-react-lite";
import AuthPage from "./Pages/AuthPage/AuthPage";
import ChoiseAddPage from "./Pages/ConstructorPages/ChoiceAddPage";
import ViewsQuestionPages from "./Pages/ConstructorPages/ViewsQuestionsPages";
import ViewsQuizPages from "./Pages/ConstructorPages/ViewsQuizPages";
import AuthPageQr from "./Pages/AuthPage/AuthPageQr";
import React, {useState} from "react";
import logoBack from './images/logo_back.svg'
import s from './App.module.css'
import fm from './font/montserrat/stylesheet.css'
import fg from './font/gilroy/stylesheet.css'

import FooterComponent from './Pages/Static/FooterComponent';
import AddUsersPage from "./Pages/ConstructorPages/AssUsersPage/AddUsersPage";
import StatisticPage from './Pages/ConstructorPages/StatisticPage/StatisticPage';
// import SupportState from './State/SupportState/SupportState'
// import SupportWindow from './Pages/Static/SupportWindow/SupportWindow';
import SupportPage from './Pages/ConstructorPages/SupportPage/SupportPage';
import Description from "./Pages/Description/Description";
import Category from "./Pages/ConstructorPages/Cattegory/Category";
// import AuthorModal from "./Pages/AuthorModal/AuthorModal";
// import DopQuiz from "./Pages/DopQuiz/DopQuiz";
import SettingsGamePage from "./Pages/SettingsGamePage/SettingsGamePage";
import PreviewRoom from "./Pages/SettingsGamePage/PreviewRoom/PreviewRoom";

const App = (observer(() => {
    document.body.style.zoom= 1.0;

    // window.addEventListener('beforeunload', (event) => {
    //     // Cancel the event as stated by the standard.
    //     event.preventDefault();
    //     // Chrome requires returnValue to be set.
    //     event.returnValue = '';
    // });
    const token = Cookies.get('token')
    // const [currentSizeWindow, setCurrentSizeWindow] = useState(window.outerWidth)
    // const [isViewBackRus, setIsViewBackRus] = useState(true)

    // const closeWindowSupport = ()=>{
    //     SupportState.checkViewWindowSupport(false)
    // }
    // const sendSupportMessage = async (username, mail, text)=>{
    //     const result = await SupportState.sendSupportMessage(username, mail, text)
    //     return result
    // }

    // window.addEventListener(`resize`, event => {
    //     setCurrentSizeWindow(window.outerWidth)
    // }, false);

    return (
        <>
        <div className={s.app}>

            {/*{currentSizeWindow>800 && isViewBackRus?<img src={logoBack} className={s.logoBack} alt=""/>:<></>}*/}
            <div className={s.back_ground}></div>
            {/*{SupportState.viewWindowSupport?<SupportWindow sendSupportMessage={sendSupportMessage} closeWindow={closeWindowSupport}/>:<></>}*/}

            <BrowserRouter>
            <Routes>
                {token?
                    <Route path='/' element={<ChoiceQuizPage
                            // currentSizeWindow={currentSizeWindow}
                    />}/>
                    :
                    <Route path='/' element={<AuthPage />}/>
                }
                <Route path='/quiz/:id/:room' element={<QuestionPage />}/>
                <Route path='/qr/:token' element={<AuthPageQr />}/>

                <Route path='/description' element={<Description />}/>

                {/*<Route path='/rvio_quiz' element={<DopQuiz setIsViewBackRus={setIsViewBackRus}/>}/>*/}

                <Route path='/constructor' element={<ChoiseAddPage />}/>
                <Route path='/constructor/question' element={<ViewsQuestionPages />}/>
                <Route path='/constructor/quiz' element={<ViewsQuizPages />}/>
                <Route path='/constructor/users' element={<AddUsersPage />}/>
                <Route path='/constructor/statistic' element={<StatisticPage />}/>
                <Route path='/constructor/support' element={<SupportPage />}/>
                <Route path='/constructor/category' element={<Category />}/>
                <Route path='/settings/:id' element={<SettingsGamePage />}/>
                <Route path='/preview/:id' element={<PreviewRoom />}/>
                <Route />
                <Route
                    path="*"
                    element={
                        <>
                            {/*<p>Нет такой страницы. Перейдите на <Link to={'/'}>главную</Link></p>*/}
                            {token?<ChoiceQuizPage />:<AuthPage />}
                        </>
                    }
                />
            </Routes>
            </BrowserRouter>

        </div>
        <FooterComponent/>
        </>
    );
}))

export default App;
