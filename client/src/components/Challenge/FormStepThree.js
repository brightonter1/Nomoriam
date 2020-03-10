import React, { useState, useEffect } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import validate from './FormValidate'
import { Header, Grid, Segment, Image, Item, Button } from 'semantic-ui-react'
import { QRCODE, QUESTION, POST, alertAction } from './Form'
import moment from 'moment'
import MariamSpinner from '../Layout/MariamSpinner'
import { cleanUp } from '../../store/actions/challengeAction'


const summaryDate = (start, end) => {
    var time = new moment.duration(Math.abs(new Date(start) - new Date(end)))
    return time.asDays()
}

let FormStepThree = props => {
    const { challenge, activity } = props
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.isCompleted === true) {
            setOpen(false)
            alertAction("สร้างชาเลนจ์สำเร็จ", props.message, 'success')
        } else if (props.isCompleted === false) {
            setOpen(false)
            alertAction("เกิดข้อผิดพลาดโปรดลองอีกครั้ง", props.message, 'error')
        }
    }, [props.isCompleted, props.message])

    useEffect(() => {
        return () => {
            props.cleanUp()
        }
    }, [])

    const handleSubmit = (challenge, activity) => {
        setOpen(true)
        props.onSubmit(challenge, activity)
    }

    const itemList = activity.map((val, index) => (
        <Grid.Column width={16} key={index}>
            <Segment style={{ borderRadius: 20 }}>
                <Item.Group style={{ padding: '1em 0em 1em 1em' }}>
                    <Item >
                        {val.category === 'qrcode' && <Item.Image size='tiny' src={QRCODE} />}
                        {val.category === 'post' && <Item.Image size='tiny' src={POST} />}
                        {val.category === 'question' && <Item.Image size='tiny' src={QUESTION} />}
                        <Item.Content>
                            <Item.Header as='a'>ชื่อ : {val.title}</Item.Header>
                            <Item.Meta>วิธีเล่น :
                                {val.category === 'qrcode' && " สแกนคิวอาโค้ด"}
                                {val.category === 'post' && " โพสต์"}
                                {val.category === 'question' && " ตอบคำถาม"}
                            </Item.Meta>
                            <Item.Description>
                                สถานที่เล่น : {val.location}
                            </Item.Description>
                            <Item.Extra>จำนวนครั้งที่ต้องเล่น {val.times} ครั้ง </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    ))
    return (
        <React.Fragment>
            <Header as='h2'>สรุปรายละเอียดชาเลนจ์</Header>

            <Grid.Column width={16}>
                <Segment style={{ borderRadius: 20 }}>
                    <Image src={challenge.image.imageFile} style={{ padding: '2em 0em 2em 0em' }} size="massive" centered />
                </Segment>
            </Grid.Column>

            <Grid.Column width={16} style={{ paddingTop: '2em' }}>
                <Segment style={{ borderRadius: 20 }}>
                    <Header as="h3" >ชื่อชาเล้นจ์ : {challenge.name} </Header>
                    <Header as="h4">รายละเอียด : {challenge.desc} </Header>
                    <Header as="h4">วันที่เริ่ม : {challenge.create_time} </Header>
                    <Header as="h4">วันสิ้นสุด : {challenge.end_time}</Header>
                    <Header as="h4">ระยะเวลา : {summaryDate(challenge.create_time, challenge.end_time)} วัน  </Header>
                </Segment>
            </Grid.Column>
            <Header as='h2' floated='left'>ภารกิจทั้งหมด 4</Header>
            {itemList}

            <Grid.Column width={16} style={{ paddingTop: '2em' }}>
                <Button floated="right" onClick={() => handleSubmit(challenge, activity)}>ยืนยันสร้าง</Button>
                <Button floated="right" type="button" onClick={props.previousStep}>ย้อนกลับ</Button>
            </Grid.Column>
            <MariamSpinner open={open} />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const challenge = state.form.ChallengeForm.values
    const activity = state.form.ActivityForm.values.activities
    return {
        challenge,
        activity,
        isCompleted: state.challenge.isCompleted,
        message: state.challenge.message
    }
}

FormStepThree = connect(mapStateToProps, { cleanUp })(FormStepThree)

export default reduxForm({
    form: 'ChallengeForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(FormStepThree)