import {makeAutoObservable, makeObservable, runInAction, toJS} from "mobx"
import Question from "./QuestClass";
import responseService from "../../Services/responseService";
import config from "../../config";
import Cookies from 'js-cookie';

class QuestionState {

    questions = []
    currentQuestNumber= 0
    currentQuest
    isLoad = false
    isInit = false
    quizId = 'not'
    countQuestions
    countResponse = 0
    quizName=''
    categoryImg=''
    isSimple=false

    constructor() {
        // this.questions = defaultQuestData()
        makeAutoObservable(this)
    }

    async init(quizId, isAdmin=false, type='init'){
        // console.log('init'+quizId)
        if(quizId === this.quizId && type==='init')
            return
        this.questions =[]
        this.isInit = true
        this.isLoad = false
        this.currentQuestNumber = 0
        const to = config.URL_GET_QUESTIONS + (isAdmin?'_admin':'')
        const result = await responseService.responseApiServer( to ,{quizId})
        runInAction(()=>{
            if(!result.warning){
                this.isSimple =  result.simple
                const currentQuestion =  result.data.questions
                currentQuestion.sort((item, next)=>item.price - next.price)
                this.questions = currentQuestion
                //console.log('result', result)
                this.quizId = quizId
                this.countQuestions = result.data.questions.length
                this.currentQuest =result.data.questions[0]
                this.countResponse++
                this.isLoad = true
               
                this.quizName = result.data.quizName
                this.categoryImg = result.data.categoryImg?result.data.categoryImg:''

                //console.log('init')
            }

            // console.log( this.currentQuest)
        })

    }
    setCountQuestion(questNumber){
        console.log(questNumber)
        this.currentQuestNumber = questNumber
        this.currentQuest = this.questions[this.currentQuestNumber]
    }

    nextQuestion(){
        this.currentQuestNumber ++
        this.currentQuest = this.questions[this.currentQuestNumber]
       // console.log( this.currentQuest)
    }

    closeQuiz(teams=null){
        this.isLoad = false
        this.currentQuestNumber = 0
        this.currentQuest = this.questions[0]
        this.completedQuiz(teams)
    }

    getEmptyQuestion(){
       return new Question({quiz:this.quizId})
    }

    async saveQuestion(question){
        let to
        if(question.id  && question.id !=='new')
            to = config.URL_UPDATE_QUESTION
        else
            to = config.URL_SAVE_QUESTION
        //console.log(question)

        await responseService.responseApiServer(to,{question:{...question}})
        await this.init(this.quizId,true, 'reload')
    }

    async removeQuestion(id){
        const to = config.URL_REMOVE_QUESTION
        await responseService.responseApiServer(to,{id})
        await this.init(this.quizId, true, 'reload')
    }

    async completedQuiz(teams){
        const token = Cookies.get('token')

        if (teams)
           await responseService.responseApiServer(config.URL_COMPLETED_QUIZ,{token, quiz:this.quizId, description:teams})
        else
          await responseService.responseApiServer(config.URL_COMPLETED_QUIZ,{token, quiz:this.quizId})

        document.location.href(window.location.origin+'/rvio_quiz')
    }


}

const questionState = new QuestionState();

export default questionState;

