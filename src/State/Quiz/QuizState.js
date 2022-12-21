import responseService from "../../Services/responseService";
import config from "../../config";
import QuizClass from "./QuizClass";

class QuizState {

    isLoad
    quizzes

    constructor() {
        this.isLoad = false
        this.quizzes = []
    }
    async init(isAdmin=false){

        const to = config.URL_GET_QUIZ + (isAdmin?'_admin':'')
        const result = await responseService.responseApiServer(to)
        if(result.warning){
            return result
        }else{
            this.isLoad = true
            this.quizzes = result.data
            return {warning:false, quizzes:this.quizzes}
        }
    }

    async getQuizzes(){
        if(this.isLoad){
            return {warning:false, quizzes:this.quizzes}
        }else{
            return await this.init()
        }
    }



    getEmptyGame(){
        return {...new QuizClass()}
    }

    async saveQuiz(quiz){
        let to
        if(quiz.id)
             to = config.URL_UPDATE_QUIZ
        else
            to = config.URL_SAVE_QUIZ

        await responseService.responseApiServer(to,{quiz:{...quiz}})
        return await this.init(true)
    }

    async removeQuiz(id){
        const to = config.URL_REMOVE_QUIZ
        await responseService.responseApiServer(to,{id})
        return await this.init(true)
    }
    async getQuizNameById(id){
        if(this.isLoad){
            const currentQuiz = this.quizzes.find(quiz=>quiz.id === id)
            return currentQuiz.title
        }else{
            await this.init()
            return await this.getQuizNameById(id)
        }
    }
}

const quizState = new QuizState();

export default quizState;

