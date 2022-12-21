// import {makeAutoObservable, makeObservable, runInAction, toJS} from "mobx"
import responseService from "../../Services/responseService";
import config from "../../config";


class ImageState {

    // questions = []
    // currentQuestNumber= 0
    // currentQuest
    // isLoad = false
    // isInit = false
    // quizId = 'not'
    // countQuestions
    // countResponse = 0
    // quizName=''

    // constructor() {
    //     // this.questions = defaultQuestData()
    //     makeAutoObservable(this)
    // }

    async uploadImg(img){
        
        const res = await responseService.responseApiServer(config.URL_UPLOAD_IMG,{img})
        if(!res.warning){
            //console.log(res)
            return res.data.img
        }
        return null
    }
    async uploadSvg(img){

        const res = await responseService.responseApiServer(config.URL_UPLOAD_SVG,{img})
        if(!res.warning){
            //console.log(res)
            return res.data.img
        }
        return null
    }


}

const questionState = new ImageState();

export default questionState;

