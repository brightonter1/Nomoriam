import React, { useState, useEffect } from 'react'
import {
    Segment,
    Header,
    Grid,
    Form,
    Button,
    Image,
    Icon,
    Dropdown,
    Divider,
    Item,
    Modal,
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
// import validate from './FormValidate'
import { renderInput, renderTextArea, renderFileInput, renderSelection } from './Form'
import { connect } from 'react-redux'
import GoogleMap from './MapGoogle'
import _ from 'lodash'
import { CreateChallenge, cleanUp } from '../../store/actions/challengeAction'
import { alertAction } from './Form'
import MariamSpinner from '../Layout/MariamSpinner'



const options = [
    { key: 'reuse', text: 'การใช้ซ้ำ [Reuse]', value: 'reuse' },
    { key: 'reduce', text: 'ลดการใช้ [Reduce]', value: 'reduce' },
    { key: 'refuse', text: 'การปฏิเสธ [Refuse]', value: 'refuse' },
    { key: 'recycle', text: 'นำกลับมาใช้ใหม่ [Recycle]', value: 'recycle' },
    { key: 'return', text: 'การตอบแทน [Return]', value: 'return' }
]

const selection = ({ input, label, message, placeholder }) => (
    <Form.Field >
        <Header as='h5' >
            <label style={{ textAlign: 'left' }} > {label} </label>
            {message && < Header.Subheader style={{ paddingTop: 10 }} > {message} </Header.Subheader>}
        </Header>
        <Dropdown
            placeholder={placeholder}
            multiple
            selection
            options={options}
            onChange={(param, data) => input.onChange(data.value)}
            style={{ borderRadius: 15 }} />
    </Form.Field>
)

const categoryRadio = ({ input, message, label }) => (
    <React.Fragment>
        <Form.Group style={{ paddingBottom: '1em' }}>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }} >
                    <input id={`${input.name}.post`} onChange={(param) => input.onChange(param.target.value)} type="radio" value="post" name={input.name} />
                    <label htmlFor={`${input.name}.post`} className="radio-image post" />
                    <span >โพสต์รูปภาพ</span>
                </Segment>
            </Form.Field>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
                    <input id={`${input.name}.qrcode`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="qrcode"
                    />
                    <label htmlFor={`${input.name}.qrcode`} className="radio-image qrcode" />
                    <span >สแกนคิวอาโค้ด</span>
                </Segment>
            </Form.Field>
        </Form.Group>
    </React.Fragment>
)

// const locationRadio = ({ input, message, label }) => (
//     <React.Fragment>
//         <Form.Group style={{ paddingBottom: '1em' }} >
//             <Form.Field>
//                 <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
//                     <input id={`${input.name}.home`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="home"
//                     />
//                     <label htmlFor={`${input.name}.home`} className="radio-image home" />
//                     <span >บ้าน</span>
//                 </Segment>
//             </Form.Field>
//             <Form.Field>
//                 <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
//                     <input id={`${input.name}.store`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="store"
//                     />
//                     <label htmlFor={`${input.name}.store`} className="radio-image store" />
//                     <span >ร้านสะดวกซื้อ</span>
//                 </Segment>
//             </Form.Field>
//             <Form.Field>
//                 <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
//                     <input id={`${input.name}.organize`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="school"
//                     />
//                     <label htmlFor={`${input.name}.organize`} className="radio-image organize" />
//                     <span >สถานศึกษา</span>
//                 </Segment>
//             </Form.Field>

//             <Form.Field>
//                 <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
//                     <input id={`${input.name}.pin`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="map"
//                     />
//                     <label htmlFor={`${input.name}.pin`} className="radio-image pin" />
//                     <span >จุดนัดพบ</span>
//                 </Segment>
//             </Form.Field>
//         </Form.Group>
//     </React.Fragment>
// )

const renderRange = ({ input, label, message, width, placeholder }) => {
    return (
        <React.Fragment>
            <Form.Field width={width}>
                <Header as='h5' style={{ width: '105px' }}>
                    <label style={{ textAlign: 'left' }} >{label}</label>
                    {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
                </Header>
                <input onChange={(param) => input.onChange(param.target.value)} defaultValue={0} min={1} max={5} type='number' placeholder={placeholder} autoComplete="off" style={{ borderRadius: 15, paddingLeft: '1em', textAlign: 'center' }} />
            </Form.Field>
        </React.Fragment>
    )
}


const renderActivity = ({ fields, acts }) => {

    return (
        <React.Fragment>
            <Grid.Column width={16}>
                <Button color="olive"
                    icon labelPosition='left'
                    floated="left"
                    onClick={
                        () => fields.length < 4 && fields.push({})} >
                    <Icon name="add" />
                    สร้างภารกิจ </Button>
            </Grid.Column> {
                fields.map((act, index) => {

                    return (
                        <Grid.Column width={8} style={{ paddingTop: '1em', paddingBottom: '1em' }} key={index} >
                            <Segment style={{ paddingTop: '10px' }} raised>
                                {/*  */}
                                <Item.Group divided style={
                                    { padding: '0em 1em 1em 1em' }} >
                                    <Header as='h3' > ภารกิจที่ {index + 1} </Header>
                                    <Item >
                                        <Item.Content >
                                            <Form style={{ paddingTop: '1em' }} unstackable >
                                                <Form.Group >
                                                    <Field
                                                        name={`${act}.title`}
                                                        component={renderInput}
                                                        label="ชื่อภารกิจ"
                                                        width={12}
                                                        placeholder="ตัวอย่าง ใช้ถุงผ้าเมื่อออกจากบ้าน" />

                                                    <Field
                                                        name={`${act}.times`}
                                                        component={renderRange}
                                                        label='จำนวนครั้ง'
                                                        width={4}
                                                        type='range'
                                                    />
                                                </Form.Group>
                                                <Form.Field style={{ paddingTop: '1em' }}>
                                                    <Header as='h5' >
                                                        <label style={{ textAlign: 'left' }} >วิธีเล่น</label>
                                                        <Header.Subheader style={{ paddingTop: 10 }}>
                                                            <p>&nbsp;รูปแบบวิธีการเล่นจะได้รับคะแนนที่แตกต่างกัน</p>
                                                            <p>โดยที่จะแบ่งเป็น 2 วิธีการ</p>
                                                            <p>&nbsp;&nbsp; 1. โพสต์รูปภาพจะได้รับ 100 คะแนน </p>
                                                            <p>&nbsp;&nbsp; 2. สแกนคิวอาโค้ดจะได้รับ 200 คะแนน </p>
                                                        </Header.Subheader>
                                                    </Header>
                                                </Form.Field>
                                                <Field
                                                    name={`${act}.category`}
                                                    label='วิธีเล่น'
                                                    type='radio'
                                                    component={categoryRadio}
                                                />
                                                <Field
                                                    name={`${act}.location`}
                                                    label='เลือกสถานที่'
                                                    type='radio'
                                                    component={renderSelection}
                                                />

                                                {
                                                    acts[index].location === 'map' ?
                                                        <GoogleMap
                                                            name={`${act}`}
                                                            show={true}
                                                        /> :
                                                        <GoogleMap
                                                            name={`${act}`}
                                                            show={false}
                                                        />
                                                }

                                            </Form>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                    )
                })
            }
        </React.Fragment>
    )
}

let FormChallenge = props => {

    const [modal, setModal] = useState(false)
    const [open, setOpen] = useState(false)

    const Guide = (
        <Modal
            trigger={<React.Fragment ><Icon name='question circle outline' /> ดูขั้นตอนการสร้างชาเลนจ์</React.Fragment>}
            open={modal}
            onClose={() => setModal(false)}
            basic
            size='small'
            centered={false}
        >
            <Modal.Header style={{ paddingBottom: '3em' }}>
                <Header as='h2' icon='setting' content='ขั้นตอนการสร้างชาเลนจ์' floated='left' style={{ color: 'white' }} />
                <Header icon='close' floated='right' onClick={() => setModal(false)} style={{ color: 'white' }} />
            </Modal.Header>

            <Modal.Content image scrolling>
                <Header as='h3' style={{ color: 'white' }}>
                    <p>1. ดูวิธีการเล่นของภารกิจที่ผู้เล่นจะสะดวกเล่น โดยแบ่งเป็น 2 รูปแบบคือ</p>
                    {/* <p>&nbsp;&nbsp;&nbsp;- สแกนคิวอาโค้ด <Image src={qrcode} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='tiny' /></p> */}
                    <p>2. สถานที่ในแต่ละภารกิจจะระบุถึงขอบเขตสถานที่ในการทำแต่ละภารกิจ</p>
                    <p>&nbsp;&nbsp;&nbsp;ยกตัวอย่างเช่น </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สแกนคิวอาโค้ดเมื่อไม่รับถุงพลาสติกที่ร้านสะดวกซื้อ</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ผู้เล่นไปยังสถานที่ที่ภารกิจระบุ</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ทำตามครบเงื่อนไข ก็คือไม่รับถุงพลาสติก</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เปิดแอปพลิเคชันและสแกนคิวอาโค้ด</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เสร็จสิ้น</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โพสต์รูปภาพเมื่อไม่รับถุงพลาสติกที่ร้านสะดวกซื้อ</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ผู้เล่นไปร้านสะดวกซื้อที่ใดก็ได้</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เมื่อไม่รับถุงและถ่ายรูปภาพประกอบ</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เปิดแอปพลิเคชันและโพสต์รูปภาพ</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เสร็จสิ้น</p>
                    <p>3. คะแนนทั้งหมดได้รับหลังจากทำภารกิจอย่างใดอย่างนึง ใช้เวลาประมาณ 10-15 วินาที </p>
                    <p>4. จำนวนครั้ง หมายถึง จำนวนครั้งแต่ละภารกิจผู้เล่นจะต้องทำซ้ำจนครบ</p>
                </Header>
            </Modal.Content>

        </Modal>
    )

    const onSubmit = (result) => {
        setOpen(true)
        var challenge = {
            name: result.name,
            desc: result.desc,
            goal: result.goal,
            create_time: result.create_time,
            end_time: result.end_time,
            image: result.image,
            activities: result.activities
        }
        props.CreateChallenge(challenge)
    }

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

    return (
        <Grid container stackable style={{ paddingTop: '3em' }}  >
            <MariamSpinner open={open} />
            <Grid.Row >
                <Grid.Column width={16} >
                    <Header as='h2' >
                        <Icon name='setting' />
                        <Header.Content >
                            สร้างชาเลนจ์
                            <Header.Subheader style={{ cursor: 'pointer' }} onClick={() => setModal(!modal)} >
                                {Guide}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8} >
                    <Image
                        src={!props.image ? photo : props.image}
                        name="image-show"
                        centered
                        label={
                            <label className='ui label blue' htmlFor='image' id='upload'>
                                <Icon name='edit' /> อัพรูปภาพ
                            </label>
                        }
                        rounded
                        style={{ minHeight: '400px', minWidth: '450px', maxHeight: '400px', maxWidth: '450px', objectFit: 'cover', objectPosition: 'center center' }}
                    />
                    <Form style={{ paddingTop: 10 }}
                        style={{ width: '.1px', height: '.1px', opacity: 0, overflow: 'hidden', zIndex: -1 }}
                    >
                        <Field
                            name="image"
                            component={renderFileInput}
                            type="file"
                            label="เลือกรูปภาพ"
                            id='image'
                        />
                    </Form>

                </Grid.Column>
                <Grid.Column width={8} >
                    <Form >

                        <Field
                            name="name"
                            component={renderInput}
                            label="ชื่อชาเลนจ์"
                            placeholder='ตัวอย่าง มาร่วมกันใช้ถุงผ้าในมหาลัยกันเถอะ!' />
                        <Field name="desc"
                            component={renderTextArea}
                            placeholder="รายละเอียดชาเลนจ์"
                            label="รายละเอียด" />
                        <Field
                            name="goal"
                            component={selection}
                            label="เป้าหมาย"
                            placeholder="Tag" />
                        <Form.Group widths='equal' >
                            <Field
                                name="create_time"
                                component={renderInput}
                                type="date"
                                label="เวลาเริ่มชาเลนจ์" />
                            <Field
                                name="end_time"
                                component={renderInput}
                                type="date"
                                label="เวลาสิ้นสุดชาเลนจ์" />
                        </Form.Group>

                    </Form>
                </Grid.Column>
            </Grid.Row>
            <Divider />

            <Grid.Row >
                <Grid.Column width={16} >
                    <Header as='h3' >
                        <Icon name='tasks' />

                        <Header.Content >
                            เพิ่มภารกิจ
                <Header.Subheader >
                                กรอกรายละเอียดให้ครบถ้วน
                </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row >
                <FieldArray name='activities'
                    component={renderActivity}
                    acts={props.acts}
                />
            </Grid.Row>


            <Grid.Row>
                <Grid.Column width={16} style={{ paddingTop: '2em' }} textAlign='center' verticalAlign='bottom'>

                    {
                        props.fillCompleted ?
                            <Form onSubmit={props.handleSubmit(onSubmit)} >
                                <Button size='massive' primary
                                    style={{ borderRadius: '45px', paddingBottom: '1em' }}
                                    type='submit'
                                >
                                    สร้างชาเลนจ์
                                </Button>
                            </Form>
                            : null
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const selector = formValueSelector('challengeForm')
const mapStateToProps = state => {
    const imageFile = selector(state, 'image')
    const acts = selector(state, 'activities')
    const { image, name, desc, create_time, end_time, goal } = selector(
        state, 'image', 'name', 'desc', 'create_time', 'end_time', 'goal'
    )
    var count = 0
    var total = 6
    try {
        if (acts) {
            total += (acts.length * 6)
            count += image ? 1 : 0
            count += name ? 1 : 0
            count += desc ? 1 : 0
            count += create_time ? 1 : 0
            count += end_time ? 1 : 0
            count += goal ? 1 : 0
            acts.map((act) => {
                _.forEach(act, () => {
                    count++
                })
            })
        }
    } catch (error) { }

    if (acts) {
        if (imageFile) {
            return {
                image: imageFile.imageFile,
                acts: acts,
                fillCompleted: total === count ? true : false,
                isCompleted: state.challenge.isCompleted,
                message: state.challenge.message
            }
        } else {
            return {
                acts: acts,
                fillCompleted: total === count ? true : false,
                isCompleted: state.challenge.isCompleted,
                message: state.challenge.message
            }
        }
    }

    if (image) {
        return {
            image: image.imageFile,
            fillCompleted: total === count ? true : false,
            isCompleted: state.challenge.isCompleted,
            message: state.challenge.message
        }
    }
}

FormChallenge = connect(mapStateToProps, { CreateChallenge, cleanUp })(FormChallenge)

export default reduxForm({
    form: 'challengeForm'
})(FormChallenge)