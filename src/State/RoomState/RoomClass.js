class RoomClass{

    id
    title
    description
    teamsName
    type
    quiz
    countTeam
    progress
    isActive

    constructor(module) {

        this.id = module.id?module.id:'new'
        this.title = module.title?module.title:''
        this.description = module.description?module.description:''
        this.teamsName = module.teamsName?module.teamsName:[]
        this.type = module.type?module.type:''
        this.quiz = module.quiz?module.quiz:''
        this.countTeam = module.countTeam?module.countTeam:1
        this.progress = module.progress?module.progress:{}
        this.isActive = module.isActive?module.isActive:true

    }
}
export default RoomClass