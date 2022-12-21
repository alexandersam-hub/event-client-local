import responseService from "../../Services/responseService";
import config from "../../config";
import {makeAutoObservable, runInAction} from "mobx";
import Cookies from 'js-cookie';

class AuthState {

    isError=false
    message

    constructor() {
        // this.questions = defaultQuestData()
        makeAutoObservable(this)
    }

    async login_qr(token){
       // console.log(token)
        const response = await responseService.responseApiServer(config.URL_LOGIN_QR,{token_qr:token})
        runInAction(()=>{
            // console.log(response)
            if(response.warning){
                this.isError = true
                this.message = response.message
                console.log(response.message)
            }
            else{
                this.isError = false
                //console.log(response)
                const token = response.data.token

                Cookies.set('token', token, { expires: 800 })
                window.location.replace('/')

            }
        })
    }

    async login(login, password){
        // console.log(login, password)
        const response = await responseService.responseApiServer(config.URL_LOGIN,{username:login.toLowerCase(), password})
        //console.log(response)
        runInAction(()=>{
            if(response.warning){
                this.isError = true
                this.message = response.message
                console.log(response.message)
            }
            else{

                this.isError = false
                const token = response.data.token
                Cookies.set('token', token, { expires: 365 })
                window.location.reload('/')

            }
        })
    }
}
const authState = new AuthState()
export default  authState