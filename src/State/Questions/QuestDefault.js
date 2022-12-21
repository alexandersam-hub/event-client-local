import Question from './QuestClass'

const defaultQuestData = ()=>{
    const quests = []
    for(let i=0;i<10;i++){
        const quest = new Question(i,'Вопрос '+i, 'Текст вопроса '+i, 'https://via.placeholder.com/150.png/09f/fff','quest', 'Ответ '+i)
        quests.push(quest)
    }
   // console.log(quests)
    return quests
}

export default  defaultQuestData