import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Header,
    Segment,
    Button,
    Divider,
    Icon,
    Progress,
    Placeholder,
    Item,
    Label,
    Modal,
    Image,
    Form
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import QRCODE from '../../asset/category/qrcodeIcon.png'
import post from '../../asset/category/postIcon.png'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { renderFileInput, renderTextArea } from '../Challenge/Form'
import { Post, PostClean, doQRcodeClean, doQRcode, fetchActivity } from '../../store/actions/challengeAction'
import { alertAction, alertMedal } from '../Challenge/Form'
import { isSignIn } from '../../store/actions/authAction'
import MariamSpinner from '../Layout/MariamSpinner'
import QrReader from 'react-qr-reader'
import organize from '../../asset/icon/orgranize.png'
import store from '../../asset/icon/store.png'
import pin from '../../asset/icon/pin.png'
import global from '../../asset/icon/global.png'
import home from '../../asset/icon/home.png'

let NActivityBar = props => {

    const [modal, setModal] = useState(false)

    useEffect(() => {
        props.isSignIn()

    }, [props.userProfile])

    useEffect(() => {
        if (props.image) {
            setImage(props.image.imageFile)
        }
    }, [props.image])

    useEffect(() => {
        props.fetchActivity()
    }, [props.challenges])

    useEffect(() => {
        if (props.isPosted === true) {
            if (props.medal) {
                setLoading(false)
                alertMedal(props.medal.title.split(':.')[0], props.medal.title.split(':.')[1], props.medal.image)
            } else {
                setLoading(false)
                // alertAction('สำเร็จ', `รอสักพักคะแนนจะขึ้นนะครับ ^^\n${props.message}`, "success")
                alertAction('สำเร็จ', `รอสักพักคะแนนจะขึ้นนะครับ ^^`, "success")
            }
        } else if (props.isPosted === false) {
            setLoading(false)
            alertAction('ไม่สำเร็จ', props.message, "error")
        }
        return () => {
            props.PostClean()
        }

    }, [props.isPosted])

    useEffect(() => {
        if (props.isQRCODED === true) {
            if (props.medal) {
                setLoading(false)
                alertMedal(props.medal.title.split(':.')[0], props.medal.title.split(':.')[1], props.medal.image)
            } else {
                setLoading(false)
                alertAction('สำเร็จ', `รอสักพักคะแนนจะขึ้นนะครับ ^^\n${props.messageQR}`, 'success')

            }
        } else if (props.isQRCODED === false) {
            setLoading(false)
            alertAction('ไม่สำเร็จ', props.messageQR, 'error')
        }
        return () => {
            props.doQRcodeClean()
        }
    }, [props.isQRCODED])

    const { challenges, userProfile } = props
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(0)
    const [image, setImage] = useState(photo)
    const [index, setIndex] = useState('')
    const [count, setCount] = useState('')
    const [modalQR, setModalQR] = useState(false)
    const [modalPost, setModalPost] = useState(false)
    const [result, setResult] = useState("QRCode ไม่ถูกต้อง โปรดลองใหม่")
    const [qrcode, setQrcode] = useState(null)
    const [color, setColor] = useState('red')

    // doPost
    const handlePost = (index, count) => {
        setIndex(index)
        setCount(count)
        setModalPost(true)
    }

    const onSubmit = (post) => {
        setLoading(true)
        props.Post(post, index, count)
        setModalPost(false)
    }

    // doQRcode
    const handleQRCode = (index, count, qrcode) => {
        setIndex(index)
        setCount(count)
        setModalQR(true)
        setQrcode(qrcode)
    }

    const onSubmitQRcode = () => {
        setLoading(true)
        props.doQRcode(index, count, result)
        setResult("QRCode ไม่ถูกต้อง โปรดลองใหม่")
        setModalQR(false)
        setColor('red')
    }

    const handleScan = data => {
        if (data !== result && data !== null) {
            for (var i = 0; i < qrcode.length; i++) {
                if (data === qrcode[i]) {
                    setResult(data)
                    setColor('green')
                }
            }
        }
    }

    const handleError = err => {
        console.error(err)
    }


    const ModalQRcode = () => {
        return (
            <Modal open={modalQR} size='tiny' dimmer="inverted" onClose={() => setModalQR(false)}>
                <Modal.Header><Header as='h3'>สแกนคิวอาโค้ด</Header></Modal.Header>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
                <Modal.Content>
                    <Header as='h4'><Label color={color}>ผลลัพธ์</Label> : {result.slice(0, 30) + "...."}</Header>
                </Modal.Content>
                <Modal.Content>
                    <Button fluid color='orange' onClick={() => onSubmitQRcode()}>ส่งผลลัพธ์</Button>
                </Modal.Content>
            </Modal>
        )
    }

    const ModalForm = () => {
        return (
            <Modal open={modalPost} size='tiny' dimmer="inverted" onClose={() => setModalPost(false)}>
                <Modal.Header><Header as='h3'>โพสต์รูปภาพพร้อมแคปชัน</Header></Modal.Header>
                <Image
                    src={image ? image : photo}
                    name="image-show"
                    centered
                    fluid
                    label={
                        <label className='ui label blue' htmlFor='image' id='upload'>
                            <Icon name='edit' /> อัพรูปภาพ
                            </label>
                    }
                    rounded
                    style={{ minHeight: '400px', minWidth: '450px', maxHeight: '350px', maxWidth: '450px', objectFit: 'cover', objectPosition: 'center center' }}
                />

                <Modal.Content>
                    <Form style={{ width: '.1px', height: '.1px', opacity: 0, overflow: 'hidden', zIndex: -1 }}>
                        <Field name="image" component={renderFileInput} id='image' type="file" label="เลือกรูปภาพ" />
                    </Form>
                    <Form onSubmit={props.handleSubmit(onSubmit)}>
                        <Field name="caption" component={renderTextArea} label="แคปชัน" />
                        <Button fluid color='orange' loading={loading}>โพสต์</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }



    const loadBar = (
        <Grid.Column >
            <Segment color='olive'>
                <Item.Group unstackable >
                    <Item>
                        <div className='ui tiny image'>
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        </div>

                        <Item.Content>

                            <Item.Content>
                                <Placeholder>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='short' />
                                        <Placeholder.Line length='very short' />
                                        <Placeholder.Line length='short' />
                                        <Placeholder.Line length='very short' />
                                    </Placeholder.Header>
                                </Placeholder>

                                <Item.Description >
                                    <Progress color='orange' indicating percent={80} active style={{ width: '300px', marginTop: '1em' }} disabled />
                                </Item.Description>
                            </Item.Content>
                            <Item.Extra>
                                <Button color='green' disabled floated='right' size='small' >ดูภารกิจทั้งหมด</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    )

    if (props.isFetch) {
        const ActivityBtn = (
            <Modal
                trigger={<Button color='green' floated='right' size='small' onClick={() => setModal(true)}>ดูภารกิจทั้งหมด</Button>}
                open={modal}
                onClose={() => setModal(false)}
                basic
                size='large'
                centered={false}
            >

                <Modal.Header >
                    <Header as='h2' icon='browser' content='ภารกิจ' floated='left' style={{ color: 'white' }} />
                    <Header icon='close' floated='right' onClick={() => setModal(false)} style={{ cursor: 'pointer' }} style={{ color: 'white' }} />
                </Modal.Header>

                {
                    challenges.length === 0 ?
                        <Modal.Content>
                            <Modal.Description>
                                <Header as='h2' style={{ textAlign: 'center', color: 'lightsteelblue', paddingTop: '2em' }} >
                                    ยังไม่มีภารกิจในตอนนี้ คลิ๊กเข้าร่วมชาเลนจ์เพื่อทำภารกิจ !
                               </Header>
                            </Modal.Description>
                        </Modal.Content>
                        :

                        <Modal.Content image scrolling style={{ paddingTop: '0em' }}>
                            <Modal.Description>
                                <Item.Group unstackable >
                                    {
                                        challenges.map((challenge, i) => (
                                            challenge.activities.map((act, index) => (
                                                <Item key={index} style={{ backgroundColor: 'white', padding: '1.5em 1.5em 1em 1.5em', borderRadius: '25px' }}>
                                                    {act.category.split('>location<')[1].split('>extra<')[0] === 'school' && <Item.Image src={organize} size='tiny' />}
                                                    {act.category.split('>location<')[1].split('>extra<')[0] === 'store' && <Item.Image src={store} size='tiny' />}
                                                    {act.category.split('>location<')[1].split('>extra<')[0] === 'map' && <Item.Image src={pin} size='tiny' />}
                                                    {act.category.split('>location<')[1].split('>extra<')[0] === 'home' && <Item.Image src={home} size='tiny' />}
                                                    {act.category.split('>location<')[1].split('>extra<')[0] === 'anywhere' && <Item.Image src={global} size='tiny' />}
                                                    <Item.Content verticalAlign='middle'>
                                                        <Item.Header>{act.title}</Item.Header>
                                                        <Item.Description >
                                                            <p>สถานที่ : &nbsp;
                                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'map' && "แผนที่"}
                                                                {act.category.split('>location<')[1].split('>extra<')[0] === 'anywhere' && "ที่ใดก็ได้"}
                                                                {act.category.split('>location<')[1].split('>extra<')[0] === 'store' && "ร้านสะดวกซื้อ"}
                                                                {act.category.split('>location<')[1].split('>extra<')[0] === 'school' && "สถานศึกษา"}
                                                                {act.category.split('>location<')[1].split('>extra<')[0] === 'home' && "บ้าน"}
                                                            </p>

                                                            <p>จำนวนครั้ง</p>
                                                            <Progress autoSuccess value={Math.abs(Number(act.myTimes) - Number(act.times))} total={act.times} progress='ratio'
                                                                color='red' style={{ width: '400px', backgroundColor: '#e5e5e5', margin: '0em 0em 0em' }}
                                                            >
                                                                จำนวน {`${Math.abs(Number(act.myTimes) - Number(act.times))}/${act.times}`} ครั้ง
                                                    </Progress>
                                                        </Item.Description>
                                                        <Item.Description style={{ paddingTop: '1.2em' }} >
                                                            <Label.Group >
                                                                เป้าหมาย : &nbsp;
                                                        {
                                                                    challenge.desc.split('>,<')[1].split(',').map((goal, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {goal === 'return' && <Label as='a' tag color='green' content='ตอบแทนธรรมชาติ (Return)' />}
                                                                            {goal === 'reduce' && <Label as='a' tag color='blue' content='ลดการใช้งาน (Reduce)' />}
                                                                            {goal === 'refuse' && <Label as='a' tag color='red' content='การปฏิเสธการใช้ (Refuse)' />}
                                                                            {goal === 'reuse' && <Label as='a' tag color='olive' content='การใช้งานซ้ำ (Reuse)' />}
                                                                            {goal === 'recycle' && <Label as='a' tag color='orange' content='การนำกลับมาใช้ใหม่ (Recycle)' />}
                                                                        </React.Fragment>
                                                                    ))
                                                                }
                                                            </Label.Group>
                                                            <Label.Group >

                                                                <Label icon='leaf' color='green' content={`+ ${act.point}`} />
                                                                <Label color='blue' content={`+ ${act.exp}`} />
                                                            </Label.Group>

                                                            {
                                                                act.myTimes !== '0' ?
                                                                    act.category.split('>location<')[0] !== 'post' ?
                                                                        <Button color='orange' floated='right' size='tiny' style={{ borderRadius: '25px' }}
                                                                            onClick={() => handleQRCode(challenge.index, index, act.qrcode)}
                                                                        >
                                                                            <Label as='a' image color='orange' >
                                                                                <img src={QRCODE} />สแกนคิวอาโค้ด
                                                                             </Label>

                                                                            <Icon name='right chevron' />
                                                                        </Button>
                                                                        :
                                                                        <Button color='orange' floated='right' size='tiny' style={{ borderRadius: '25px' }}
                                                                            onClick={() => handlePost(challenge.index, index)}
                                                                        >
                                                                            <Label as='a' image color='orange' >
                                                                                <img src={post} />โพสต์รูปภาพ
                                                                            </Label>

                                                                            <Icon name='right chevron' />
                                                                        </Button>
                                                                    :
                                                                    <Button color='blue' floated='right' size='tiny' style={{ borderRadius: '25px' }}
                                                                    >
                                                                        <Label as='a' image color='blue'  >
                                                                            <Icon name='check' />
                                                                            สำเร็จแล้ว
                                                                            </Label>

                                                                    </Button>
                                                            }
                                                        </Item.Description>
                                                    </Item.Content>
                                                </Item>
                                            ))
                                        ))
                                    }
                                </Item.Group>
                            </Modal.Description>
                        </Modal.Content>
                }

            </Modal>
        )

        const profileBar = (
            <Grid.Column >
                <Segment color='olive'>
                    <Item.Group unstackable >
                        <Item>
                            <Item.Image size='tiny' src={userProfile.photoURL}>
                            </Item.Image>

                            <Item.Content>
                                <Item.Header>
                                    <span>
                                        {userProfile.displayname}&nbsp;
                                    </span>
                                </Item.Header>

                                <Item.Content>
                                    <span>
                                        <Item.Image src={userProfile.rankImage} size='mini' />
                                        Rank : {userProfile.rankName}&nbsp;&nbsp;&nbsp;
                                        <Icon name='leaf' color='green' size='large' />
                                        {userProfile.POINT} แต้ม (POINT)
                                    </span>

                                    <Item.Description >
                                        <p>ค่าประสบการณ์ (EXP)</p>
                                        <Progress color='orange'
                                            value={Number(userProfile.EXP - userProfile.rankStart) % 10 === 0 ?
                                                Number(userProfile.EXP - userProfile.rankStart) :
                                                (Number(userProfile.EXP - userProfile.rankStart) + 1)}
                                            autoSuccess total={userProfile.rankExp}
                                            progress='ratio'
                                            active
                                            style={{ width: '400px', margin: '0em 0em 0em' }}
                                        >
                                            {`${userProfile.EXP}/${userProfile.rankExp}`}
                                        </Progress>

                                    </Item.Description>
                                </Item.Content>
                                <Item.Extra>
                                    {ActivityBtn}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
        )

        return (
            <React.Fragment>
                {profileBar}
                <ModalForm />
                <ModalQRcode />
                <MariamSpinner open={loading} />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {loadBar}
        </React.Fragment>
    )


    // if (props.isFetch) {
    //     const challegeList = challenges.map((challenge, index) =>
    //         <Grid.Column width={16} key={index} style={{ paddingTop: '1em' }}>
    //             <Accordion>
    //                 <Segment raised stacked>
    //                     <Accordion.Title
    //                         index={index}
    //                         onClick={handleClick}
    //                     >
    //                         <Header as='h3' content={challenge.title} />
    //                         <Header.Content>
    //                             <Progress percent={Math.floor((challenge.myPoint / challenge.sum_point) * 100)} color='orange' progress />
    //                         </Header.Content>

    //                     </Accordion.Title>
    //                     <Accordion.Content
    //                         active={active === index}
    //                     >
    //                         <Divider />
    //                         <Grid.Column floated="left" width={16}>
    //                             <Item.Group>
    //                                 {
    //                                     challenge.activities.map((act, index) =>
    //                                         <Item key={index}>
    //                                             <Item.Image src={`https://ipfs.infura.io/ipfs/${act.image}`} size="tiny" />
    //                                             <Item.Content>
    //                                                 <Item.Header as='a'>{act.title.split(':,')[0]}</Item.Header>
    //                                                 <Item.Meta>
    //                                                     สถานที่ :{" " + act.title.split(':,')[1]}
    //                                                 </Item.Meta>
    //                                                 <Item.Description>
    //                                                     <span className='cinema'>วิธีเล่น :{act.category === 'post' ? " โพสต์รูปภาพ" : " สแกนคิวอาโค้ด"}</span>

    //                                                 </Item.Description>
    //                                                 <Item.Extra>
    //                                                     <Label color='green'>+{act.point} POINT</Label>
    //                                                     <Label color='orange'>+{act.exp} EXP</Label>
    //                                                     <Label color="blue">จำนวน {Math.abs(act.myTimes - act.times)}/{act.times} ครั้ง</Label>
    //                                                     {
    //                                                         act.category === 'post' ?
    //                                                             <Button primary floated='right' onClick={() => handlePost(challenge.index, index)}>
    //                                                                 เล่นภารกิจ
    //                                                             <Icon name='right chevron' />
    //                                                             </Button>
    //                                                             :
    //                                                             <Button color="olive" floated='right' onClick={() => handleQRCode(challenge.index, index, act.qrcode)}>
    //                                                                 สแกนคิวอาโค้ด
    //                                                                 <Icon name='right chevron' />
    //                                                             </Button>
    //                                                     }
    //                                                 </Item.Extra>
    //                                             </Item.Content>
    //                                         </Item>
    //                                     )
    //                                 }
    //                             </Item.Group>
    //                         </Grid.Column>
    //                     </Accordion.Content>
    //                 </Segment>
    //             </Accordion>
    //         </Grid.Column>
    //     )

    //     return (
    //         <React.Fragment>
    //             {challegeList}
    //             <MariamSpinner open={loading} />
    //             <ModalForm />
    //             <ModalQRcode />
    //         </React.Fragment>
    //     )
    // } else {
    //     return (
    //         <Loader active inline='centered' content="กำลังโหลดข้อมูล" />
    //     )
    // }

}

NActivityBar = reduxForm({
    form: 'postForm'
})(NActivityBar)
const selector = formValueSelector('postForm')
const mapStateToProps = state => {
    const image = selector(state, 'image')
    return {
        userProfile: state.auth.userInfo,
        challenges: state.challenge.activity,
        isFetch: state.challenge.isActivity,
        image,
        isPosted: state.challenge.isPosted,
        message: state.challenge.message,
        isQRCODED: state.challenge.isQRcoded,
        messageQR: state.challenge.messageQR,
        medal: state.challenge.medal
    }
}

export default connect(mapStateToProps, { fetchActivity, Post, PostClean, doQRcode, doQRcodeClean, isSignIn })(NActivityBar)