import React, {useState} from 'react';
import s from './Description.module.css'
import userState from '../../State/UserState/UserState'

const Description = () => {

    const [description, setDescription] = useState()
    const [warning, setWarning] = useState(false)
    return (
        <div className={s.modal_wrapper}>
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.title}>Введите название Вашей организации</div>
                <div  className={s.description_text}>
                        <textarea className={warning?s.warning_area:s.area} rows={4} placeholder={warning?'Название не может быть пустым':'Название организации'} type="text" onChange={(e)=>{
                            setDescription(e.target.value)
                            }} value={description}/>
                </div>

                <div className={s.btn_save}>
                    <button onClick={async (e)=>{
                        if (!description){
                            setWarning(true)
                            return
                        }else{
                            if(warning)
                                setWarning(false)
                        }
                        e.target.innerText = 'Сохраняю...'
                        const res = await userState.addDescription(description)

                        if(!res.warning){
                            e.target.innerText = 'Сохранено'
                            setTimeout(()=>{ e.target.innerText = 'Сохранить'},1500)
                            document.location.reload()
                        }

                        else{
                            e.target.innerText = 'Не удалось сохранить'
                            setTimeout(()=>{ e.target.innerText = 'Сохранить'},1500)
                        }

                    }}>Сохранить</button>
                </div>

            </div>


        </div>
        </div>
    );
};

export default Description;