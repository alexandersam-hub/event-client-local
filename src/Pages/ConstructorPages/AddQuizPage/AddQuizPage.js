import React, { useCallback, useRef, useState } from 'react';
import s from './addQuiz.module.css'
import imageState from '../../../State/ImageState/ImageState'
// changeSelectedQuiz={changeSelectedQuiz(name, value)} save={saveQuiz()}

const AddQuizPage = (props) => {
    const fileRef = useRef(null);
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = useCallback( event => {
        event.preventDefault();

        if(!fileRef.current) return void null;
    
        const reader = new FileReader();
       
        reader.onloadend = async() => {
            const uint8Array = new Uint8Array(reader.result);
            setLoading(true);
            const imgURL = await imageState.uploadImg([...uint8Array]);
            props.changeSelectedQuiz('img', imgURL)
            setLoading(false)
        };
    
    
        // рекомендованный метод
        reader.readAsArrayBuffer(fileRef.current[0]);
    
        
      }, []);
    




    return (
        <div className={s.wrapper}>
        <table>
            <tbody>
            <tr className={s.row}>
                <td className={s.column_name}>
                    <span className={s.column_name_text}>Название</span>
                </td>

                <td  className={s.data}>
                    <input
                        onChange={(e)=>{props.changeSelectedQuiz('title', e.target.value)}}
                        id="title" type="text" className={s.data_input}
                        value={props.quiz.title}/>
                </td>
              
            </tr>
            <tr className={s.row}>
                <td className={s.column_name}>
                    <span className={s.column_name_text}>Описание</span>
                </td>
                <td  className={s.data}>
                    <input
                        onChange={(e)=>{props.changeSelectedQuiz('description', e.target.value)}}
                        id="description" type="text" className={s.data_input}
                        value={props.quiz.description}/>
                </td>
            </tr>
            <tr className={s.row}>
                <td className={s.column_name}>
                    <span className={s.column_name}>Категория</span>
                </td>
                <td  className={s.data}>
                    <input
                        onChange={(e)=>{props.changeSelectedQuiz('category', e.target.value)}}
                        id="category" type="text" className={s.data_input}
                        value={props.quiz.category} />
                </td>
              
            </tr>
            <tr className={s.row}>
                <td className={s.column_name}>
                    <span className={s.column_name}>Картинка</span>
                </td>
                <td  className={s.data}>
                    <input
                        onChange={(e)=>{props.changeSelectedQuiz('img', e.target.value)}}
                        id="img" type="text" className={s.data_input}
                        value={props.quiz.img}/>
                 
                 </td>
            </tr>
            </tbody>
            </table>
          
{/* --------------------------------------------------------------------------------------------------------------------- */}


            <div>

        <input
          onChange={e => fileRef.current = e.target.files}
          accept="image/*"
          type="file"
          id="button-file"
        />
         <button onClick={handleSubmit} type="submit">{loading ? 'Загружаю...' : 'Загрузить'}</button>
        {props.quiz.img?
        <div  className={s.imgQuiz}>
            <img alt='Картинка викторины' src={props.quiz.img}/> 
           
        </div>
        :
        
        <></>}
      
            </div>


{/* --------------------------------------------------------------------------------------------------------------------- */}

                <div>
                    <input
                        onChange={(e)=>{props.changeSelectedQuiz('isActive', e.target.checked)}}
                        id='isActive' type="checkbox"
                        checked={props.quiz.isActive} />
                    <span>Викторина доступна</span>
                </div>
         
        
        </div>
    );
};

export default AddQuizPage;