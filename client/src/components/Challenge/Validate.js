const validate = values => {
    const errors = {}
    if (!values.name){
        errors.name = 'โปรดระบุชื่อชาเล้นจ์'
    }
    // return errors
}

export default validate