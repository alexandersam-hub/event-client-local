class QuizClass{
    id
    title
    description
    category
    img
    isActive

    constructor(id='', title='', description='', category='', img='', isActive=true) {
        this.id = id
        this.title = title;
        this.description = description;
        this.category = category
        this.img = img
        this.isActive = isActive
    }
}

export default QuizClass