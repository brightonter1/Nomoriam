import React from 'react'
import {
    Segment,
    Header,
    Grid,
    Form,
    Button,
    Icon,
    Item
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import validate from './FormValidate'
import { renderSelection, renderInput } from './Form'
import { QRCODE, QUESTION, POST } from './Form'
import { connect } from 'react-redux'
import _ from 'lodash'

let FormStepTwo = (props) => {


    const renderActivity = ({ fields }) => {
        return (
            <React.Fragment>
                <Grid.Column width={16}>
                    <Button color="olive" size='big' icon labelPosition='left' floated="right" onClick={() => fields.push({})} >
                        <Icon name="add" />
                        สร้างภารกิจ
                </Button>
                </Grid.Column>
                <Grid.Column width={16} style={{ paddingTop: '1em' }}>
                    {
                        fields.map((act, index) => {
                            var element = ''
                            try {
                                element = document.getElementsByName(`${act}.category`)[0].getElementsByClassName('text')[0].innerText
                            } catch (error) { element = "เลือกวิธีเล่น" }
                            return (
                                <Segment style={{ paddingTop: '3em' }} key={index}>
                                    <Button floated="right" icon="remove" style={{ paddingBottom: '1em' }} onClick={() => fields.remove(index)} />
                                    <Item.Group divided style={{ padding: '0em 1em 1em 1em' }}>
                                        <Header as='h3'># ภารกิจที่ {index}</Header>
                                        <Item>
                                            {
                                                element === 'สแกนคิวอาโค้ด' ?
                                                    <Item.Image src={QRCODE} fluid />
                                                    : element === 'โพสต์รูปภาพ' ?
                                                        <Item.Image src={POST} fluid />
                                                        : element === 'ตอบคำถาม' ?
                                                            <Item.Image src={QUESTION} />
                                                            : <Item.Image src={photo} fluid />
                                            }
                                            <Item.Content>
                                                <Form style={{ paddingTop: '1em' }}>
                                                    <Field name={`${act}.title`} component={renderInput} label="ชื่อภารกิจ" placeholder="ตัวอย่าง ใช้ถุงผ้าเมื่อออกจากบ้าน" />
                                                    <Form.Group widths='equal' >
                                                        <Field name={`${act}.category`} component={renderSelection} label='วิธีเล่น' />
                                                        <Field name={`${act}.times`} component={renderInput} type="number" label="จำนวนครั้ง" />
                                                        <Field name={`${act}.location`} component={renderInput} label="สถานที่" />
                                                    </Form.Group>
                                                </Form>
                                            </Item.Content>
                                        </Item>
                                    </Item.Group>
                                </Segment>
                            )
                        })
                    }
                </Grid.Column>

                <Grid.Column width={16} style={{ paddingTop: '2em' }}>
                    {fields.length > 0 && <Button primary floated="right" type="button" onClick={props.nextStep} disabled={!props.fillCompleted}>
                        ถัดไป<Icon name="arrow right" />
                    </Button>}
                    <Button primary floated="right" type="button" onClick={props.previousStep}><Icon name="arrow left" />ย้อนกลับ</Button>
                </Grid.Column>
            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            <FieldArray name='activities' component={renderActivity} />
        </React.Fragment>
    )
}

const selector = formValueSelector('ChallengeForm')
FormStepTwo = connect(state => {
    const act = state.form.ActivityForm.values
    var total = 0
    var count = 0
    if (act) {
        total = act.activities.length * 4
        act.activities.map((act) => {
            _.forEach(act, () => {
                count++
            })
        })
    }
    return {
        fillCompleted: total === count ? true : false
    }
})(FormStepTwo)

export default reduxForm({
    form: 'ActivityForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(FormStepTwo)