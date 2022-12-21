import  responseService from '../../Services/responseService'
import config from '../../config'

class CategoryState{
    async getCategory(){
        const res = await responseService.responseApiServer(config.URL_GET_CATEGORY)
        return res
    }

    async addCategory(category){
        const res = await responseService.responseApiServer(config.URL_ADD_CATEGORY, {category})
        return res
    }

    async delCategory(id){
        const res = await responseService.responseApiServer(config.URL_DEL_CATEGORY, {id})
        return res
    }

    async updateCategory(category){
        const res = await responseService.responseApiServer(config.URL_UPDATE_CATEGORY, {category})
        return res
    }

    async getQuiz(){

        const res = await responseService.responseApiServer(config.URL_GET_QUIZ+'_admin' )
        return res
    }

}

export default new CategoryState()