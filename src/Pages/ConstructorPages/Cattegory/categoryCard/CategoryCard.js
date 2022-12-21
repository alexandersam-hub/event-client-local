import React, {useCallback, useRef, useState} from 'react';
import s from './category_card.module.css'
import imageState from "../../../../State/ImageState/ImageState";

const CategoryCard = (props) => {
    const [img, setImg] = useState(props.img)


    const fileRef = useRef(null);
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = useCallback( event => {
        event.preventDefault();

        if(!fileRef.current) return void null;

        const reader = new FileReader();

        reader.onloadend = async() => {
            setLoading(true);
            const uint8Array = new Uint8Array(reader.result);
            const imgURL = await imageState.uploadSvg([...uint8Array]);
            setImg(imgURL)
            // props.changeSelectedQuiz('img', imgURL)
            setLoading(false)
        };


        // рекомендованный метод
        reader.readAsArrayBuffer(fileRef.current[0]);


    }, []);
    return (
        <div className={s.wrapper}>
            {props.isActive?<div>Создано</div>:<div className={s.not_post}>Не создано</div>}
            <div>Название</div>
            <input onChange={()=>{}} readOnly={true} type="text" value={props.name}/>
            <div>Картинка</div>


            <input onChange={(e)=>{
                setImg(e.target.value)
            }} type="text" value={img} />

            <div>
                <input
                    onChange={e => {return fileRef.current = e.target.files}}
                    accept="image/*"
                    type="file"
                    id="button-file-category"

                />

                <button onClick={handleSubmit} type="submit">{loading ? 'Загружаю...' : 'Загрузить'}</button>

                {img?
                    <div  className={s.imgQuiz}>
                        <img alt='Картинка викторины' src={img}/>
                    </div>
                    :
                    <></>}

                {!props.isActive?
                    <button onClick={async (e)=>{
                        e.target.innerText = 'Сохраняю...'
                        const res = await props.saveData(props.name, img)
                        if(res){
                            e.target.innerText = 'Сохранено'
                        }else {
                            e.target.innerText = 'Не удалось сохранить'
                        }
                        setTimeout(()=>{ e.target.innerText = 'Сохранить' }, 1500)
                    }}>Сохранить</button>:
                    <button onClick={async (e)=>{

                        e.target.innerText = 'Сохраняю...'
                        const res = await props.updateData(props.name, img)
                        if(res){
                            e.target.innerText = 'Сохранено'
                        }else {
                            e.target.innerText = 'Не удалось сохранить'
                        }
                        setTimeout(()=>{ e.target.innerText = 'Изменить' }, 1500)
                }}>Изменить</button>
                }

            </div>
        </div>
    );
};

export default CategoryCard;