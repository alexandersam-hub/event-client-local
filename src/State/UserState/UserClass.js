class UserClass{
    id
    username
    password
    role
    isActive
    description

    constructor( username,
        password,
        role,
        isActive = true,id='new', description='' ){
            this.id = id
            this.username = username
            this.password = password
            this.role =role
            this.isActive = isActive
            this.description = description
        }
}
 
export default  UserClass;