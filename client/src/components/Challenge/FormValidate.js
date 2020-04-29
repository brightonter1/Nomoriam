const validate = values => {
    console.log(values)
    const errors = {}
    if(!values.caption){
        errors.caption = 'โปรดใส่แคปชัน'
    }
    if (!values.name) {
        errors.name = 'โปรดระบุชื่อชาเล้นจ์'
    }
    if (!values.desc) {
        errors.desc = 'โปรดระบุรายละเอียด'
    }
    if (!values.create_time) {
        errors.create_time = "โปรดระบุเวลาเริ่ม"
    }
    if (values.create_time) {
        if (!checkStart(values.create_time)) {
            errors.create_time = "ไม่สามารถเลือกวันที่ผ่านมาแล้วได้"
        }
    }
    if (!values.end_time) {
        errors.end_time = "โปรดระบุเวลาสิ้นสุด"
    }
    if (values.end_time) {
        if (values.create_time) {
            if (!checkDuration(values.create_time, values.end_time)) {
                errors.end_time = "วันสิ้นสุดต้องเกิดหลังวันที่เริ่มชาเลนจ์"
            }
        }
    }

    return errors
}

const checkStart = start => {
    const str = start.split('-')
    const current = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    start = str[0] + '-' + parseInt(str[1]) + '-' + str[2]
    return (new Date(current).getTime() <= new Date(start).getTime())
}

const checkDuration = (start, end) => {
    const str = start.split('-')
    start = str[0] + '-' + parseInt(str[1]) + '-' + str[2]
    const str2 = end.split('-')
    end = str2[0] + '-' + parseInt(str2[1]) + '-' + str2[2]
    return (new Date(start).getTime() < new Date(end).getTime())
}

export default validate