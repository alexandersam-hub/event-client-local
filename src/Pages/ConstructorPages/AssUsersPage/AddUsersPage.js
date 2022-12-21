import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import NavBarChoiceQuiz from "../../Static/NavBarChoiceQuiz";
import s from './addUser.module.css'
import UserList from './userListCpmponent/userListCpmponent'
import userState from '../../../State/UserState/UserState'
import { toJS } from 'mobx';
import {QRCodeCanvas} from 'qrcode.react';

const AddUsersPage = (observer (() => {
    // const [users, setUsers] = useState([])
    const getRandomInt=(min, max)=>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [newUsername, setNewUsername] = useState()
    const [newPassword, setNewPassword] = useState()
    const [description, setDescription] = useState('')
    const [newIsActive, setNewIsActive] = useState(true)
    const [prefix, setPrefix] = useState('')
    const[startIndex, setStartIndex] = useState(0)
    const[stopIndex, setStopIndex] = useState(0)
    const [usersList, setUserList] = useState([])

    useEffect(()=>{
        userState.init()
    },[])

    // const generateToken=()=>{
    //     if(newUsername && newPassword){
    //       setNewToken(window.location.origin)
    //     }
    //     }
    return (
        <>
          <NavBarChoiceQuiz/>
          <a className={s.backButton} href="/constructor">{'<<Назад'}</a>
          <div className={s.wrapper}>
                <div className={s.new_user}>
                    <div>Добавить нового пользователя</div> 
                    <input className={s.add_user_input} type="text" value={newUsername} onChange={(e)=>{setNewUsername(e.target.value)}} placeholder={'Введите пользователя'}/>
                    <input className={s.add_user_input} type="text" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} placeholder={'Введите пароль'}/>
                    <input className={s.add_user_input} type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={'Введите описание пользователя'}/>
                    <div>
                        <input className={s.add_user_input} type="text" onChange={()=>{}} value={userState.tokenURL} placeholder={'Ссылка на пользователя'}/>
                        <button className={s.btn_gen_url} onClick={()=>{
                            userState.generateToken(newUsername, newPassword)
                        }}>Сгенерировать ссылку</button>
                    </div>
                    <div><span>Активен </span> <input type={"checkbox"} checked={newIsActive} onChange={(e)=>setNewIsActive(e.target.checked)}/></div>
                    <div className={s.btn_save_new_user} onClick={async(e)=>{
                        if(!newUsername || !newPassword){
                            e.target.textContent  = "Не заполнены логин или пароль" 
                            setTimeout((()=> {e.target.textContent  = "Сохранить" }),1000)
                            return 
                        }
                        await userState.addUser(newUsername, newPassword,newIsActive,  description)
                        document.location.reload()
                        }}>Сохранить</div>
                        {userState.warningSave?
                        <div className={s.errorMessage}>{userState.message}</div>:<></>
                    }
                </div>
              <div>
                  <div>Автогенерация паролей</div>
                  <input type="text" placeholder={'префикс'} value={prefix} onChange={(e)=>setPrefix(e.target.value)}/>
                  <input type="text" placeholder={'начальное значение'} value={startIndex} onChange={(e)=>setStartIndex(e.target.value)}/>
                  <input type="text" placeholder={'конечное значение'} value={stopIndex} onChange={(e)=>setStopIndex(e.target.value)}/>
                  <button onClick={async ()=>{
                      userState.automaticRegistrationAndGenerateCard(prefix, startIndex, stopIndex)
                      // for(let i =startIndex; i<=stopIndex; i++){
                      //     const user = {}
                      //     if(i<10)
                      //       user.name = prefix+'0'+i
                      //     else
                      //         user.name = prefix+i
                      //     user.password = getRandomInt(100001, 999999)
                      //     user.token = await userState.generateToken( user.name,  user.password.toString())
                      //     user.token  = user.token.replace('https://викторина.родныеигры.рф/qr/','https://xn--80adsajtfqq.xn--c1abdmxeng9ge.xn--p1ai/qr/')
                      //     console.log( user.token)
                      //     user.res =  await userState.addUser(user.name,  user.password.toString(), true,  '')
                      //       const newUserList = usersList
                      //     usersList.push(user)
                      //     setUserList(newUserList)
                      // }

                  }}>Начать</button>
                  <table className={s.generateTable}>
                      <tbody>
                      {usersList.map((user,index)=>{
                          const downloadQR = (id, name) => {
                              const canvas = document.getElementById(id);

                              const pngUrl = canvas
                                  .toDataURL("image/svg+xml")
                                  .replace("image/svg+xml", "image/octet-stream");
                              let downloadLink = document.createElement("a");
                              downloadLink.href = pngUrl;
                              downloadLink.download = name+".png";
                              document.body.appendChild(downloadLink);
                              downloadLink.click();
                              document.body.removeChild(downloadLink);
                          };
                          return(
                              <table  key={'row_table_'+index+user.name+user.password} className={s.generateTable}>
                                  <tbody>
                              <tr key={'row_user_'+index+user.name+user.password}>
                                  <td  className={s.td_name}>{user.name}</td>
                                  <td className={s.td_password}> {user.password}</td>
                              </tr>

                                  <tr key={'row_token_'+index+user.name+user.password}>
                                  <td className={s.td_token}>{user.token}</td>
                                  </tr>
                                  <tr key={'row_qr_'+index+user.name+user.password}>
                                  <td className={s.td_qr}><QRCodeCanvas className={s.qr} size={1024} style={{width:'100px',height:'100px'}}
                                                    level={"H"} id={user.name} value={user.token} />
                                      <a onClick={()=>{downloadQR(user.name, user.name)}}> Download QR </a>
                                  </td>
                                  </tr>

                                  </tbody>
                              </table>
                          )
                      })}
                      </tbody>
                  </table>
              </div>
            <div className={s.wrapper_user_list}>
                <div className={s.title_list}>Список пользователей</div>
            {toJS(userState.users).length>0?
                <>
                {toJS(userState.users).map((user)=>
                    <div className={s.rows_users}  key={"rows_"+user.id}>
                        <UserList  user={user}/>
                    </div>
                                   
                )}
               </>:<div>Нет пользователей</div>
               }
            </div>
        </div>
        </>
        
    );
}))

export default AddUsersPage;