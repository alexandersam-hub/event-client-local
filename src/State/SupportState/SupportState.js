import { makeAutoObservable } from "mobx"
import config from "../../config"
import responseService from "../../Services/responseService"

class SupportState{
    message=''
    viewWindowSupport = false

    constructor() {
        makeAutoObservable(this)
    }

    checkViewWindowSupport(isVisible){
        this.viewWindowSupport=isVisible
    }

    async sendSupportMessage(username, mail, text){
        const responce = await responseService.responseApiServer(config.URL_SEND_SUPPORT, {username, mail, text})
        return responce
    }

    async getSupports(){
        const responce = await responseService.responseApiServer(config.URL_GET_SUPPORT)
        return responce
    }

    async delSupport(id){
        const responce = await responseService.responseApiServer(config.URL_DELETE_SUPPORT, {id})
        return responce
    }

    async updateSupport(post){
        const responce = await responseService.responseApiServer(config.URL_UPDATE_SUPPORT, {post})
        return responce
    }

}

export default new SupportState()