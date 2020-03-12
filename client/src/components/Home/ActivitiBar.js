import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Loader,
    Grid,
    Header,
    Segment,
    Button,
    Divider,
    Icon,
    Progress,
    Accordion,
    Item,
    Label,
    Modal,
    Image,
    Form
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { renderFileInput, renderTextArea } from '../Challenge/Form'
import { Post, PostClean, doQRcodeClean, doQRcode, fetchActivity } from '../../store/actions/challengeAction'
import { alertAction, alertMedal } from '../Challenge/Form'
import MariamSpinner from '../Layout/MariamSpinner'
import QrReader from 'react-qr-reader'


let ActivityBar = props => {

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
                alertAction('สำเร็จ', `รอสักพักคะแนนจะขึ้นนะครับ ^^\n${props.message}`, "success")
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

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = active === index ? -1 : index
        setActive(newIndex)
    }

    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(0)
    const [image, setImage] = useState(photo)
    const [index, setIndex] = useState('')
    const [count, setCount] = useState('')
    const { challenges } = props
    const [modalQR, setModalQR] = useState(false)
    const [modalPost, setModalPost] = useState(false)
    const [result, setResult] = useState("QRCode ไม่ถูกต้อง โปรดลองใหม่")
    const [qrcode, setQrcode] = useState(null)
    const [color, setColor] = useState('red')
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
                <Image src={image ? image : photo} centered style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }} />
                <Modal.Content>
                    <Form onSubmit={props.handleSubmit(onSubmit)}>
                        <Field name="image" component={renderFileInput} type="file" label="เลือกรูปภาพ" />
                        <Field name="caption" component={renderTextArea} label="แคปชัน" />
                        <Button fluid color='orange'>โพสต์</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }

    if (props.isFetch) {
        const challegeList = challenges.map((challenge, index) =>
            <Grid.Column width={16} key={index} style={{ paddingTop: '1em' }}>
                <Accordion>
                    <Segment raised stacked>
                        <Accordion.Title
                            index={index}
                            onClick={handleClick}
                        >
                            <Header as='h3' content={challenge.title} />
                            <Header.Content>
                                <Progress percent={Math.floor((challenge.myPoint / challenge.sum_point) * 100)} color='orange' progress />
                            </Header.Content>

                        </Accordion.Title>
                        <Accordion.Content
                            active={active === index}
                        >
                            <Divider />
                            <Grid.Column floated="left" width={16}>
                                <Item.Group>
                                    {
                                        challenge.activities.map((act, index) =>
                                            <Item key={index}>
                                                <Item.Image src={`https://ipfs.infura.io/ipfs/${act.image}`} size="tiny" />
                                                <Item.Content>
                                                    <Item.Header as='a'>{act.title.split(':,')[0]}</Item.Header>
                                                    <Item.Meta>
                                                        สถานที่ :{" " + act.title.split(':,')[1]}
                                                    </Item.Meta>
                                                    <Item.Description>
                                                        <span className='cinema'>วิธีเล่น :{act.category === 'post' ? " โพสต์รูปภาพ" : " สแกนคิวอาโค้ด"}</span>

                                                    </Item.Description>
                                                    <Item.Extra>
                                                        <Label color='green'>+{act.point} POINT</Label>
                                                        <Label color='orange'>+{act.exp} EXP</Label>
                                                        <Label color="blue">จำนวน {Math.abs(act.myTimes - act.times)}/{act.times} ครั้ง</Label>
                                                        {
                                                            act.category === 'post' ?
                                                                <Button primary floated='right' onClick={() => handlePost(challenge.index, index)}>
                                                                    เล่นภารกิจ
                                                                <Icon name='right chevron' />
                                                                </Button>
                                                                :
                                                                <Button color="olive" floated='right' onClick={() => handleQRCode(challenge.index, index, act.qrcode)}>
                                                                    สแกนคิวอาโค้ด
                                                                    <Icon name='right chevron' />
                                                                </Button>
                                                        }
                                                    </Item.Extra>
                                                </Item.Content>
                                            </Item>
                                        )
                                    }
                                </Item.Group>
                            </Grid.Column>
                        </Accordion.Content>
                    </Segment>
                </Accordion>
            </Grid.Column>
        )

        return (
            <React.Fragment>
                {challegeList}
                <MariamSpinner open={loading} />
                <ModalForm />
                <ModalQRcode />
            </React.Fragment>
        )
    } else {
        return (
            <Loader active inline='centered' content="กำลังโหลดข้อมูล" />
        )
    }
}

ActivityBar = reduxForm({
    form: 'postForm'
})(ActivityBar)
const selector = formValueSelector('postForm')
const mapStateToProps = state => {
    const image = selector(state, 'image')
    return {
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

export default connect(mapStateToProps, { fetchActivity, Post, PostClean, doQRcode, doQRcodeClean })(ActivityBar)