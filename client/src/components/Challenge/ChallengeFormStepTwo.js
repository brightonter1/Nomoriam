import React from 'react'
import { Grid, Segment, Form, Button, Dropdown, Image, Header, Popup, Icon } from 'semantic-ui-react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Post from '../../asset/blog.png'
import Question from '../../asset/discuss-issue.png'
import Qrcode from '../../asset/qr-code.png'


const ChallengeFormStepTwo = (props) => {
    const category = [
        {
            key: "โพสต์",
            text: "โพสต์",
            value: "โพสต์"
        },
        {
            key: "ตอบคำถาม",
            text: "ตอบคำถาม",
            value: "ตอบคำถาม"
        },
        {
            key: "คิวอาโค้ด",
            text: "คิวอาโค้ด",
            value: "คิวอาโค้ด"
        }
    ]
    const { handleSubmit, previousPage, renderField } = props

    const handleCategory = (name, value) => {
        const image = document.getElementsByName(name)[0]
        if (value === 'โพสต์') {
            image.src = Post
        } else if (value === 'ตอบคำถาม') {
            image.src = Question
        } else if (value === 'คิวอาโค้ด') {
            image.src = Qrcode
        }
        return value
    }

    const renderTypeSelector = ({ input, meta: { touched, error } }) => {
        return (
            <Dropdown
                selection {...input}
                value={input.value}
                onChange={(param, data) => input.onChange(handleCategory(input.name, data.value))}
                options={category}
                placeholder="เลือกวิธีการเล่น"
            />
        )
    }

    const renderActivity = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <Button primary onClick={() => fields.push({})}><Icon name="add" />เพิ่มภารกิจ</Button>
                {
                    fields.map((activity, index) => {
                        return (
                            <Segment key={index}>
                                <Button color="red" floated="right" icon="remove" onClick={() => fields.remove(index)} />
                                <Header># ภารกิจที่ {index + 1}</Header>
                                <Grid stackable>
                                    <Grid.Column width={4}>
                                        <Image name={`${activity}.type`} src="https://react.semantic-ui.com/images/wireframe/image.png" size='medium' rounded />
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <Form>
                                            <Form.Field>
                                                <label>ชื่อภารกิจ</label>
                                                <Field name={`${activity}.title`} component={renderField} placeholder="ตัวอย่าง ใช้ถุงผ้าเมื่อออกจากบ้าน" />
                                            </Form.Field>
                                            <Form.Group widths='equal'>
                                                <Form.Field>
                                                    <label>ประเภทวิธีเล่น</label>
                                                    <Field name={`${activity}.type`} component={renderTypeSelector} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>จำนวนครั้งเล่น</label>
                                                    <Field name={`${activity}.times`} component={renderField} type="number" />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>สถานที่</label>
                                                    <Field name={`${activity}.location`} component={renderField} />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field>
                                                    <label>คำถาม</label>
                                                    <Field name={`${activity}.question`} component={renderField} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>คำตอบ</label>
                                                    <Field name={`${activity}.answer`} component={renderField} />
                                                </Form.Field>
                                            </Form.Group>
                                        </Form>

                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            <Segment raised>
                <Header>เพิ่มภารกิจ</Header>
                <FieldArray name="activities" component={renderActivity} />


            </Segment>

            <div style={{paddingBottom:50}}>
                <Button primary floated="right" type="button" onClick={handleSubmit}>
                    ถัดไป
                    <Icon name="arrow right" />
                </Button>
                <Button primary floated="right" type="button" onClick={previousPage}>
                    <Icon name="arrow left" />
                    ย้อนกลับ
            </Button>
            </div>
        </div>
    )
}

export default reduxForm({
    form: 'ActivityForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ChallengeFormStepTwo)