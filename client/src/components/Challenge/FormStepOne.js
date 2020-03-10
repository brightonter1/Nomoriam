import React from 'react'
import {
    Segment,
    Header,
    Grid,
    Form,
    Button,
    Image,
    Icon
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './FormValidate'
import { renderInput, renderTextArea, renderFileInput } from './Form'
import { connect } from 'react-redux'

let FormStepOne = props => {

    return (
        <Segment raised style={{ padding: '3em' }}>
            <Header>สร้างชาเล้นจ์</Header>
            <Grid stackable>
                <Grid.Column width={6}>
                    {
                        props.image ?
                            <Image src={props.image.imageFile} name="image-show" rounded />
                            :
                            <Image src={photo} name="image-show" rounded style={{ minHeight: 100 }} />
                    }
                </Grid.Column>
                <Grid.Column width={10}>
                    <Form  >
                        <Field name="image" component={renderFileInput} type="file" label="รูปภาพ" />
                        <Field name="name" component={renderInput} label="ชื่อชาเลนจ์" placeholder='ตัวอย่าง มาร่วมกันใช้ถุงผ้าในมหาลัยกันเถอะ!' />
                        <Field name="desc" component={renderTextArea} placeholder="รายละเอียดชาเล้นจ์" label="รายละเอียด" />
                        <Field name="create_time" component={renderInput} type="date" label="เวลาเริ่มชาเลนจ์" />
                        <Field name="end_time" component={renderInput} type="date" label="เวลาสิ้นสุดชาเลนจ์" />
                        <Button primary floated="right" type="button" onClick={props.nextStep} disabled={!props.fillCompleted}>
                            ถัดไป
                        <Icon name="arrow right" />
                        </Button>

                    </Form>
                </Grid.Column>
            </Grid>
        </Segment >
    )
}

const selector = formValueSelector('ChallengeForm')
FormStepOne = connect(state => {
    const { image, name, desc, create_time, end_time } = selector(
        state, 'image', 'name', 'desc', 'create_time', 'end_time'
    )

    return {
        image,
        fillCompleted: (image && name && desc && create_time && end_time) ? true : false
    }
})(FormStepOne)

export default reduxForm({
    form: 'ChallengeForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(FormStepOne)