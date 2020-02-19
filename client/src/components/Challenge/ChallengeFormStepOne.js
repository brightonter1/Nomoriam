import React, { useState } from 'react'
import { Grid, Segment, Form, Button, Icon, Image, Header, Dropdown } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import validate from './Validate'
import image from '../../asset/challenge/image'

const ChallengeFormStepOne = (props) => {

    const [photo, setPhoto] = useState('https://react.semantic-ui.com/images/wireframe/square-image.png')
    const { handleSubmit, renderField } = props

    const handlePicker = (data) => {
        setPhoto(`https://ipfs.infura.io/ipfs/${data.value}`)
        return data.value
    }

    const renderImageSelector = ({ input, meta: { touched, error } }) => {
        return (
            <Dropdown
                selection {...input}
                value={input.value}
                onChange={(param, data) => input.onChange(() => handlePicker(data))}
                options={image}
                placeholder="เลือกรูปภาพประกอบ"
            />
        )
    }

    return (
        <div>
            <Segment raised>
                <Header>สร้างชาเล้นจ์</Header>
                <Grid stackable>
                    <Grid.Column width={5}>
                        <Image src={photo} size='large' rounded />
                        <Field name="image" component={renderImageSelector} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>ชื่อชาเล้นจ์</label>
                                <Field name="name" component={renderField} placeholder='ตัวอย่าง มาร่วมกันใช้ถุงผ้าในมหาลัยกันเถอะ!' />
                            </Form.Field>
                            <Form.Field>
                                <label>รายละเอียด</label>
                                <Field name="desc" component="textarea" placeholder="รายละเอียดชาเล้นจ์" />
                            </Form.Field>
                            <Form.Field>
                                <label>เวลาเริ่ม</label>
                                <Field name="create_time" component={renderField} type="date" />
                            </Form.Field>
                            <Form.Field>
                                <label>เวลาสิ้นสุด</label>
                                <Field name="end_time" component={renderField} type="date" />
                            </Form.Field>
                            <Button primary floated="right">
                                ถัดไป
                            <Icon name="arrow right" />
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}


export default reduxForm({
    form: 'ChallengeForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(ChallengeFormStepOne)