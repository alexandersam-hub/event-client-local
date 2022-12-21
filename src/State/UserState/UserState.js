import {makeAutoObservable, makeObservable, runInAction, toJS} from "mobx"
import responseService from "../../Services/responseService";
import config from "../../config";
import UserClass from "./UserClass";


class UserState {

    isLoad = false
    warning = false
    warningSave = false
    users = []
    count = 0
    message = ''
    messageUpdate = ''
    messageDelete=''
    tokenURL = ''

    constructor() {
        // this.currentQuizId = 0
        // this.quizzes = quizDefault()
        //console.log(quizDefault())
        // this.currentQuizId = this.quizzes[0].id
        makeAutoObservable(this)
    }

    async init(){
        this.isLoad = false
        this.warning = false
        const result = await responseService.responseApiServer(config.URL_GET_USERS)
        runInAction(()=>{
            //console.log('result',result)
            if(!result.warning){
                this.count = result.data.length
                this.users = result.data
                this.warning = false
                
            }else{
                this.warning  = true

            }
            this.isLoad = true
        })
    }

    async generateToken(username, password){
        const result = await responseService.responseApiServer(config.URL_GENERATION_TOKEN, {username,password})
            if(!result.warning){
                return result.data.token
            }else{
                this.warning  = result.message
            }


        
    }

    async automaticRegistrationAndGenerateCard(prefix, index_start, index_stop){
        const result = await responseService.responseApiServer(config.URL_CREATED_CARD, {prefix, index_start, index_stop})
        console.log(result)
    }

    async addUser(username, password, isActive, description){
        this.isLoad = false
        this.warningSave = false
        const userData = toJS(this.users)

        if(!username || !password){
            this.isLoad = true
            this.warningSave = true
            return false
        }  
        const newUser = new UserClass(username, password, 'user', isActive, 'new', description )
        const result = await responseService.responseApiServer(config.URL_REGISTRATION_USER, {...newUser})

        runInAction(()=>{
            this.tokenURL=''
           
            if(!result.warning){
                userData.push({...newUser})
                this.users = userData
                this.isLoad = true
                this.warningSave = true
                this.message ='Сохранено'
                return true
            }else{
              
                this.warningSave = true
                this.isLoad = true
                this.message = result.data.message? result.data.message: 'Не удалось сохранить'
                console.log(this.message)
                return false
               
            }
           
        })
    }

    async updateUser(userid, username,isActive, description, role="user"){
        console.log(userid, username,isActive, description, role="user");
        this.messageUpdate = 'Сохраняю...'
        const result = await  responseService.responseApiServer(config.URL_UPDATE_DATA_USER, {user:{id:userid, username, isActive, role:role, description}})
        runInAction(()=>{
        if(!result.warning){
            this.messageUpdate = 'Сохранено'
        }
        else{
            this.messageUpdate = 'Ошибка. '+ result.message
        }})
    }

    async updatePassword(userid, password){
        this.messageUpdate = 'Сохраняю'
        const result = await  responseService.responseApiServer(config.URL_UPDATE_USER_PASSWORD, {userid, password})
        //console.log(result)
        runInAction(()=>{
        if(!result.warning){
            this.messageUpdate = 'Сохранено'
        }
        else{
            this.messageUpdate = 'Ошибка. '+ result.message
        }})
    }

    async deleteUser(userid){
        this.messageDelete = 'Удаляю'
        const result = await  responseService.responseApiServer(config.URL_DELETE_USER, {userid})
        //console.log(result)
        runInAction(()=>{
        if(!result.warning){
            this.messageUpdate = 'Удалено'
        }
        else{
            this.messageUpdate = 'Ошибка. '+ result.message
        }})
    }

    async addDescription(descriptionText){
        const result = await  responseService.responseApiServer(config.URL_ADD_DESCRIPTION, {descriptionText})
        return result
    }


    
}

const quizState = new UserState();

export default quizState;

