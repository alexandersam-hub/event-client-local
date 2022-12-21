
const config = {


    URL_PLAYER:'http://192.168.1.65:3001',
    URL_API:'http://127.0.0.1:8011/api/',
    SERVER_SOCKET:'ws://192.168.1.65:8100',
    //
    // SERVER_SOCKET:'wss://quizserver.vityazgroup.ru:8500',
    // URL_API:'https://quizserver.vityazgroup.ru:8500/api/',
    // URL_PLAYER:'https://quizclient.rodnyeigry.ru',

    URL_GET_QUIZ:'quiz/get_all',
    URL_GET_QUESTIONS:'questions/get_by_id',
    URL_LOGIN:'auth/login',
    URL_LOGIN_QR:'auth/login_qr',
    URL_CREATED_CARD:'auth/card_qr/generate',
    URL_SAVE_QUIZ:'constructor/quiz/add',
    URL_UPDATE_QUIZ:'constructor/quiz/update',
    URL_SAVE_QUESTION:'constructor/question/add',
    URL_UPDATE_QUESTION:'constructor/question/update',
    URL_COMPLETED_QUIZ:'completed',
    URL_REMOVE_QUIZ:'constructor/quiz/remove',
    URL_REMOVE_QUESTION:'constructor/question/remove',
    URL_REGISTRATION_USER:'auth/registration',
    URL_GENERATION_TOKEN:'auth/generate_token',
    URL_UPDATE_DATA_USER:'auth/update_user',
    URL_GET_USERS:'auth/get_users',
    URL_UPDATE_USER_PASSWORD:'auth/update_user_password',
    URL_DELETE_USER:'auth/delete_user',
    URL_ADD_DESCRIPTION:'auth/add_description',
    URL_UPLOAD_IMG:'image/upload',
    URL_UPLOAD_SVG:'image/upload_svg',
    URL_GET_STATISTIC:'completed/get_progress',

    URL_SEND_SUPPORT:'support/add',
    URL_GET_SUPPORT:'support/get',
    URL_DELETE_SUPPORT:'support/delete',
    URL_UPDATE_SUPPORT:'support/update',
    GENERAL_CATEGORY:'Россия',

    URL_GET_CATEGORY:'category/get',
    URL_ADD_CATEGORY:'category/add',
    URL_UPDATE_CATEGORY:'category/update',
    URL_DEL_CATEGORY:'category/del',

    URL_GET_ROOMS:'room/get_by_quiz_id',
    URL_ADD_ROOM:'room/add',
    URL_UPDATE_ROOM:'room/update',
    URL_RESET_SCORE:'room/reset_score',
    URL_DEL_ROOM:'room/del',
    URL_GET_TOKEN_ROOM:'room/get_token',
    URL_GET_ROOM_BY_ID:'room/get_room_by_id'

}

export default config

