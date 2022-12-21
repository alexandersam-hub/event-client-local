import React, { useCallback, useRef, useState } from 'react';
import s from './addQuestion.module.css'
import imageState from '../../../State/ImageState/ImageState'

// changeSelectedQuestion={props.changeSelected}
// save={props.saveQuiz}
// question={props.selectedItem}

const AddQuestionPage = (props) => {
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
            props.changeSelectedQuestion('img', imgURL)
            setLoading(false)
        };
    
    
        // рекомендованный метод
        reader.readAsArrayBuffer(fileRef.current[0]);
    
        
      }, []);
    
    return (
        <div className={s.wrapper}>
            <table>
            <tbody>
            <tr>
                <td className={s.title_table}>
                    <label>Название</label>
                </td>
                <td  className={s.data_table}>
                    <input id="title" type="text"
                           className={s.text_box}
                           onChange={(e)=>props.changeSelectedQuestion('title',e.target.value)}
                            value={props.question.title}
                    />
                  
                </td>
            </tr>
            <tr>
                <td className={s.title_table}>
                    <label>Цена вопроса</label>
                </td>
                <td  className={s.data_table}>
                    <input id="title" type="text"
                           className={s.text_box}
                           onChange={(e)=>props.changeSelectedQuestion('price',e.target.value)}
                           value={props.question.price}
                    />

                </td>
            </tr>
            <tr>
                <td className={s.title_table}>
                    <label>Тип задания</label>
                </td>
                <td>
                    <input id="type" type="text" 
                       className={s.text_box}
                           onChange={(e)=>{
                               props.changeSelectedQuestion('type', e.target.value)
                           }}
                        value={props.question.type}
                    />
                   
                </td>
            </tr>
            <tr>
                <td className={s.title_table}>
                    <label>Текст задания</label>
                </td>
                <td>
                <textarea
                    className={s.text_ansver_box}
                    id="text"
                    rows="3"
                    onChange={(e)=>{
                        props.changeSelectedQuestion('text', e.target.value)
                    }}
                    value={props.question.text}
                />
                </td>
            </tr>
            <tr>
                <td className={s.title_table}>
                    <label>Перевод текста задания</label>
                </td>
                <td>
                <textarea
                    className={s.text_ansver_box}
                    id="translationText"
                    rows="3"
                    onChange={(e)=>{
                        props.changeSelectedQuestion('translationText', e.target.value)
                    }}
                    value={props.question.translationText}
                />
                </td>
            </tr>

            <tr>
                <td className={s.title_table}>
                    <label>Дополнительный вопрос</label>
                </td>
                <td>
                <textarea
                    className={s.text_ansver_box}
                    id="textAdditional"
                    rows="3"
                    onChange={(e)=>{
                        props.changeSelectedQuestion('textAdditional', e.target.value)
                    }}
                    value={props.question.textAdditional}
                />
                </td>
            </tr>

            <tr>
                <td className={s.title_table}>
                    <label>Перевод дополнительного вопроса</label>
                </td>
                <td>
                <textarea
                    className={s.text_ansver_box}
                    id="translationTextAdditional"
                    rows="3"
                    onChange={(e)=>{
                        props.changeSelectedQuestion('translationTextAdditional', e.target.value)
                    }}
                    value={props.question.translationTextAdditional}
                />
                </td>
            </tr>
            <tr>
                <td className={s.title_table}>
                    <label>Ответ на задание</label>
                </td>
                <td >
                    <input id="answer" type='text' 
                       className={s.text_box}
                           onChange={(e)=>{
                               props.changeSelectedQuestion('answer',e.target.value )
                           }}
                           value={props.question.answer}
                    />
                 
                </td>
            </tr>
            <tr>
                <td className={s.title_table}>
                    <label>Перевод ответа на задание</label>
                </td>
                <td >
                    <input id="translationAnswer" type='text'
                       className={s.text_box}
                           onChange={(e)=>{
                               props.changeSelectedQuestion('translationAnswer',e.target.value )
                           }}
                           value={props.question.translationAnswer}
                    />

                </td>
            </tr>

            <tr>
                <td >
                    <label htmlFor="img" className={props.question.img?'active':''}>Картинка</label>
                </td>
                <td >
                    <input id="img" type="text" 
                       className={s.text_box}
                            onChange={(e)=>{
                                props.changeSelectedQuestion('img', e.target.value)
                            }}
                           value={props.question.img}
                    />
                  
                </td>
            </tr>

            <tr>
                <td className="input-field col s12">
                    <label className={props.question.video?'active':''} htmlFor="video">Видео</label>
                </td>
                <td>
                    <input id="video" type="text" 
                       className={s.text_box}
                           onChange={(e)=>{
                               props.changeSelectedQuestion('video', e.target.value)
                           }}
                           value={props.question.video}
                    />
                   
                </td>
            </tr>
            </tbody>
            </table>
            
            <div>

        <input
          onChange={e => fileRef.current = e.target.files}
          accept="image/*"
          type="file"
          id="button-file"
        />
        <button className={s.loadImg} onClick={handleSubmit} type="submit">{loading ? 'Загружаю...' : 'Загрузить'}</button>
        {props.question.img?
        <div  className={s.imgQuiz}>
            <img alt='Картинка к вопросу' src={props.question.img}/>
        </div>
        :
        
        <></>}
        

            </div>

                <label>
                    <input id='isActive' type="checkbox"
                       className={s.check_box}
                           checked={props.question.isActive}
                           onChange={(e)=>props.changeSelectedQuestion('isActive', e.target.checked)}
                    />
                    <span>Вопрос доступен</span>
                </label>
          
          
        </div>
    );
};

export default AddQuestionPage;