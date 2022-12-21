import React, {useEffect, useState} from 'react';
import categoryState from "../../../State/Category/CategoryState";
import Loader from "../../../Static/Loader/Loader";
import NavBarChoiceQuiz from "../../Static/NavBarChoiceQuiz";
import s from "../AssUsersPage/addUser.module.css";
import CategoryCard from "./categoryCard/CategoryCard";

const Category = () => {

    const [isLoad, setIsLoad] = useState(false)
    const [category, setCategory] = useState([])
    const [quizCategory, setQuizCategory] = useState([])

    const updateData = async (name, img)=>{
        const res = await categoryState.updateCategory({name, img})

        if(!res.warning){
            const categoryList = category
            const currentCategory = categoryList.find(item=>item.name === name)
            currentCategory.name = name
            currentCategory.img = img
            setCategory(categoryList)
        }
        return res
    }

    const saveData = async (name, img) =>{
       const res = await categoryState.addCategory({name, img})
        if(!res.warning){
            const categoryList = category
            categoryList.push({name, img})
            setCategory(category)
        }
        return res
    }

    const init = async () =>{
        setIsLoad(false)
        const categoryList = await categoryState.getCategory()
        const quizList = await categoryState.getQuiz()

        if(!categoryList.warning)
            setCategory(categoryList.category)
        const quizzes = []
        if(!quizList.warning){
            quizList.data.forEach(quiz=>{

                if(quizzes.indexOf(quiz.description)<0){
                    quizzes.push(quiz.description)
                }
            })

        }
        setQuizCategory(quizzes)
        setIsLoad(true)
    }

    useEffect(()=>{
        init()
    },[])

    if(!isLoad)
        return (
            <Loader/>
        )
    else
    return (
        <>
            <NavBarChoiceQuiz/>
            <a className={s.backButton} href="/constructor">{'<<Назад'}</a>

            <div>Категории с созданными викторинами</div>
            <div>{
                quizCategory.map((quiz,index)=>{
                    const categoryCurrent = category.find(item=>item.name===quiz)
                    if (categoryCurrent)
                        return(
                            <CategoryCard saveData={saveData} updateData={updateData} isActive={true} name={quiz} img={categoryCurrent.img} key={'category_quiz_'+index} />
                            )
                    else
                        return(
                            <CategoryCard saveData={saveData} updateData={updateData} isActive={false} name={quiz} key={'category_quiz_'+index} />
                        )
                })
            }</div>

            <div>Категории без викторин</div>
            <div>{
                category.map((cat,index)=>{
                    const quizCat = category.find(item=>item===cat.name)
                    if (quizCat)
                        return(
                            <CategoryCard saveData={saveData} updateData={updateData} isActive={true} name={cat.name} img={cat.name.img} key={'category_'+index} />
                        )

                })

            }</div>
        </>
    );

};

export default Category;