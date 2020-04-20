import React, { useState } from 'react'
import {
    Segment,
    Header,
    Grid,
    Form,
    Button,
    Image,
    Icon,
    Dropdown,
    Label,
    Container,
    Step,
    Accordion,
    Message,
    Divider,
    Item,
    Radio,
    Dimmer
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import validate from '../Challenge/FormValidate'
import { renderInput, renderTextArea, renderFileInput, renderSelection } from '../Challenge/Form'
import { connect } from 'react-redux'
import postPNG from '../../asset/category/post.png'
import qrcodePNG from '../../asset/category/qrcode.png'

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

const locationRadio = ({ input, message, label }) => (
    <React.Fragment>
        <Form.Group style={{ paddingBottom: '1em' }}>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
                    <input id={`${input.name}.home`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="home"
                    />
                    <label htmlFor={`${input.name}.home`} className="radio-image home" />
                    <span >บ้าน</span>
                </Segment>
            </Form.Field>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
                    <input id={`${input.name}.store`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="store"
                    />
                    <label htmlFor={`${input.name}.store`} className="radio-image store" />
                    <span >ร้านสะดวกซื้อ</span>
                </Segment>
            </Form.Field>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
                    <input id={`${input.name}.organize`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="organize"
                    />
                    <label htmlFor={`${input.name}.organize`} className="radio-image organize" />
                    <span >สถานศึกษา</span>
                </Segment>
            </Form.Field>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }} >
                    <input id={`${input.name}.global`} onChange={(param) => input.onChange(param.target.value)} type="radio" value="global" name={input.name} />
                    <label htmlFor={`${input.name}.global`} className="radio-image global" />
                    <span >ที่ใดก็ได้</span>
                </Segment>
            </Form.Field>
            <Form.Field>
                <Segment style={{ paddingTop: '0px', borderRadius: '15px' }}>
                    <input id={`${input.name}.pin`} onChange={(param) => input.onChange(param.target.value)} type="radio" name={input.name} value="pin"
                    />
                    <label htmlFor={`${input.name}.pin`} className="radio-image pin" />
                    <span >จุดนัดพบ</span>
                </Segment>
            </Form.Field>
        </Form.Group>
    </React.Fragment>
)

const renderRange = ({ input, label, message, width }) => (
    <React.Fragment>
        <Form.Field width={width} style={{ paddingTop: '1em' }}>
            <Header as='h5' style={{ width: '110px' }}>
                <label style={{ textAlign: 'left' }} >{label}</label>
                {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
            </Header>
            <input type='range' name={input.name} onChange={(param) => input.onChange(param.target.value)} min={0} max={5} step={1} defaultValue={1} />
        </Form.Field>
    </React.Fragment>
)


const renderActivity = ({ fields }) => {
    return (
        <React.Fragment>
            <Grid.Column width={16} >
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
                        <Grid.Column width={16} style={{ paddingTop: '1em' }} key={index} >
                            <Segment style={{ paddingTop: '10px' }} raised>
                                <Icon name="remove"
                                    style={
                                        { position: 'absolute', color: 'red', right: '10px', cursor: 'pointer' }}
                                    onClick={
                                        () => fields.remove(index)} />
                                <Item.Group divided style={
                                    { padding: '0em 1em 1em 1em' }} >
                                    <Header as='h3' > ภารกิจที่ {index + 1} </Header>
                                    <Item >
                                        <Item.Content >
                                            <Form style={{ paddingTop: '1em' }} >

                                                <Form.Group>
                                                    <Field
                                                        name={`${act}.title`}
                                                        component={renderInput}
                                                        label="ชื่อภารกิจ"
                                                        width={7}
                                                        placeholder="ตัวอย่าง ใช้ถุงผ้าเมื่อออกจากบ้าน" />

                                                    <Field
                                                        name={`${act}.times`}
                                                        component={renderRange}
                                                        width={7}
                                                        label='จำนวนครั้ง'
                                                        type='range'
                                                    />
                                                </Form.Group>
                                                <Form.Field style={{ paddingTop: '1em' }}>
                                                    <Header as='h5' >
                                                        <label style={{ textAlign: 'left' }} >วิธีเล่น</label>
                                                        <Header.Subheader style={{ paddingTop: 10 }}>
                                                            <p>&nbsp;รูปแบบวิธีการเล่นจะได้รับคะแนนที่แตกต่างกัน โดยที่จะแบ่งเป็น 2 วิธีการ</p>
                                                            <p>&nbsp;&nbsp; 1. โพสต์รูปภาพจะได้รับ 100 คะแนน </p>
                                                            <p>&nbsp;&nbsp; 2. สแกนคิวอาโค้ดจะได้รับ 200 คะแนน </p>
                                                        </Header.Subheader>
                                                    </Header>
                                                </Form.Field>
                                                <Form.Group>
                                                    <Field
                                                        name={`${act}.category`}
                                                        label='วิธีเล่น'
                                                        type='radio'
                                                        component={categoryRadio}
                                                    />
                                                </Form.Group>
                                                <Form.Field>
                                                    <Header as='h5' >
                                                        <label style={{ textAlign: 'left' }} >เลือกสถานที่</label>
                                                        <Header.Subheader style={{ paddingTop: 10 }}>
                                                            <p>&nbsp; สถานที่จะเป็นจุดที่ผู้เล่นเข้าใจได้ว่าในแต่ภารกิจนั้นจะต้องเล่นสถานที่ใด</p>
                                                        </Header.Subheader>
                                                    </Header>
                                                </Form.Field>
                                                <Form.Group>
                                                    <Field
                                                        name={`${act}.location`}
                                                        label='สถานที่'
                                                        type='radio'
                                                        component={locationRadio}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                    )
                })
            }

            {
                /* <Grid.Column width={16} style={{ paddingTop: '2em' }}>
                                {fields.length > 0 && <Button primary floated="right" type="button" >
                                    ถัดไป<Icon name="arrow right" />
                                </Button>}
                                <Button primary floated="right" type="button" ><Icon name="arrow left" />ย้อนกลับ</Button>
                            </Grid.Column> */
            }
        </React.Fragment>
    )
}

let FormChallenge = props => {

    const [active, setActive] = useState(false)

    const handleHide = () => {
        setActive(false)
    }

    return (
        <Dimmer.Dimmable dimmed={active} style={{ paddingBottom: '10em' }} >
            <Dimmer
                active={active}
                onClickOutside={handleHide}
                style={{ paddingTop: '5em', textAlign: 'left', justifyContent: 'unset', zIndex: 0 }}
            >

                <Grid container stackable>
                    <Grid.Row style={{ visibility: 'hidden' }} >
                        <Grid.Column width={16} >
                            <Header as='h3' inverted >
                                <Icon name='flag checkered' />
                                <Header.Content >
                                    สร้างชาเลนจ์ <Header.Subheader >
                                        กรอกรายละเอียดให้ครบถ้วน </Header.Subheader>
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
                                rounded
                                style={{ height: 350, objectFit: 'cover', objectPosition: 'center center', visibility: 'hidden' }}
                            />
                            <Form style={{ paddingTop: 10 }} >
                                <Field name="image"
                                    component={renderFileInput}
                                    type="file"
                                    label="เลือกรูปภาพ" />

                            </Form>

                        </Grid.Column>
                        <Grid.Column width={8} >
                            <Form >

                                <Field
                                    name="name"
                                    component={renderInput}
                                    label="ชื่อชาเลนจ์"
                                    width={10}
                                    navigation={active}
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
                                        เลือกภารกิจตามต้องการ
                                </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>



            </Dimmer>
            <Grid container stackable style={{ paddingTop: '5em' }}  >
                <Grid.Row >
                    <Grid.Column width={16} >
                        <Header as='h3' >
                            <Icon name='flag checkered' />
                            <Header.Content >
                                สร้างชาเลนจ์ <Header.Subheader >
                                    กรอกรายละเอียดให้ครบถ้วน </Header.Subheader>
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
                            rounded
                            style={{ height: 'auto', objectFit: 'cover', objectPosition: 'center center' }}
                            // label={<Label circular attached='bottom right' style={{cursor: 'pointer'}}><Icon name='edit'/>เปลี่ยนรูปภาพ</Label>}
                        />
                        <Form style={{ paddingTop: 10 }} >
                            <Field name="image"
                                component={renderFileInput}
                                type="file"
                                label="เลือกรูปภาพ" />

                        </Form>

                    </Grid.Column>
                    <Grid.Column width={8} >
                        <Form >

                            <Field
                                name="name"
                                component={renderInput}
                                label="ชื่อชาเลนจ์"
                                width={10}
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
                                    เลือกภารกิจตามต้องการ
                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <FieldArray name='activities'
                        component={renderActivity}
                    />
                </Grid.Row>
            </Grid>
        </Dimmer.Dimmable>
    )
}

const selector = formValueSelector('challengeForm')
FormChallenge = connect(state => {
    const image = selector(state, 'image')
    if (image) {
        return {
            image: image.imageFile
        }
    }
})(FormChallenge)

export default reduxForm({
    form: 'challengeForm'
})(FormChallenge)