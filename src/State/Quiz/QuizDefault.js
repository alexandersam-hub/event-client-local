import Quiz from './QuizClass'

const defaultData = ()=>{
    const quizzes = []
    for(let i = 0; i<5; i++){
        quizzes.push(new Quiz(i,'Название квиза '+i, 'Описание квиза '+i,i))
    }
    return quizzes
}

export default defaultData