import RoomClass from "./RoomClass";
import responseService from "../../Services/responseService";
import config from "../../config";

class RoomState{

    async addRoom(room){
        try {

            const result = await responseService.responseApiServer(config.URL_ADD_ROOM, {room})
            return result
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

    async getRomsByQuizId(quiz_id){
        try {
            console.log(quiz_id)
            return await responseService.responseApiServer(config.URL_GET_ROOMS, {quiz_id})
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

    async delRoom(id){
        try {
            return await responseService.responseApiServer(config.URL_DEL_ROOM, {id})
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

    async updateRoom(room){
        try {
            return await responseService.responseApiServer(config.URL_UPDATE_ROOM, {room})
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

    async getRoomById(id){
        try {
            return await responseService.responseApiServer(config.URL_GET_ROOM_BY_ID, {id})
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

    async getTokenForRoom(team,room ){
        try {
            return await responseService.responseApiServer(config.URL_GET_TOKEN_ROOM, {team,room})
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

    getEmptyRoom(){
        return new RoomClass({})
    }

    async resetScore(room){
        try {
            return await responseService.responseApiServer(config.URL_RESET_SCORE, {room})
        }catch (e) {
            return {warning:true, message:'Ошибка сервера'}
        }
    }

}

export default new RoomState