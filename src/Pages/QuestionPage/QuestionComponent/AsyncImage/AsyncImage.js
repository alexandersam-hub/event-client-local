import React from 'react';
import s from './asyncImage.module.css'

const AsyncImage = (props) => {
    const [loadedSrc, setLoadedSrc] = React.useState(null);
    React.useEffect(() => {
        setLoadedSrc(null);
        if (props.src) {
            const handleLoad = () => {
                setLoadedSrc(props.src);
            };
            const image = new Image();
            image.addEventListener('load', handleLoad);
            image.src = props.src;
            return () => {
                image.removeEventListener('load', handleLoad);
            };
        }
    }, [props.src]);
    if (loadedSrc === props.src) {
        return (
            <img className={props.stl} src={props.src} alt='Фото'/>
        );
    }
    return (
        <img src={props.loadImg} className={s.loadImg} alt='Загрузка'/>
    )
};

export default AsyncImage