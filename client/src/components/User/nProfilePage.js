import React, { useState, useEffect } from 'react'
import {
    Modal,
    Grid,
    Header,
    Divider,
    Segment,
    Button,
    Image,
    Label,
    Icon,
    Feed,
    Item,
    Progress,
    Form,
    Menu
} from 'semantic-ui-react'
import photo from '../../asset/mariam/content.png'
import gold from '../../asset/archievement/gold.png'
import silver from '../../asset/archievement/silver.png'
import bronze from '../../asset/archievement/bronze.png'
import award from '../../asset/archievement/award.png'
import history from '../../api/history'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { renderFileInput, renderInput, renderTextArea } from '../Challenge/Form'
import { connect } from 'react-redux'
import { FetchProfile, load, EditPhoto, EditProfile, EditClean, isSignIn } from '../../store/actions/authAction'
import { fetchJoinedChallenge, clearJoinedChallenge } from '../../store/actions/challengeAction'
import MariamSpinner from '../Layout/MariamSpinner'
import { alertAction } from '../Challenge/Form'
import moment from 'moment'


let NProfilePage = (props) => {

    useEffect(() => {
        props.fetchJoinedChallenge()
    }, [props.challenges])

    useEffect(() => {
        props.FetchProfile()
    }, [props.isFetch])

    useEffect(() => {
        if (props.isCompleted === true) {
            setLoading(false)
            alertAction("สำเร็จ", null, 'success')
            props.EditClean()
            props.isSignIn()
        } else if (props.isCompleted === false) {
            setLoading(false)
            alertAction("ไม่สำเร็จ", "โปรดลองอีกครั้ง", 'error')
        }
    }, [props.isCompleted])


    useEffect(() => {
        return () => {
            props.EditClean()
            props.clearJoinedChallenge()
        }
    }, [])

    const [active, setActive] = useState('สถานะ')
    const [open, setOpen] = useState(false)
    const { userInfo, userProfile, isFetch } = props
    const [form, setForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = (profile) => {
        setOpen(false)
        setLoading(true)
        props.EditPhoto(profile)
    }

    const handleFormSubmit = (profile) => {
        setForm(false)
        setLoading(true)
        props.EditProfile(profile)
    }
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

    if (isFetch && props.fetchJoined) {
        const ModalForm = () => (
            <Modal open={form} size='tiny' dimmer="inverted" onClose={() => setForm(false)}>
                <Modal.Header><Header as='h3'>แก้ไขโปรไฟล์</Header></Modal.Header>
                <Modal.Content>
                    <Form onSubmit={props.handleSubmit(handleFormSubmit)} >
                        <Field name="displayname" component={renderInput} label="ชื่อ" />
                        <Field name="bio" component={renderTextArea} label="bio" />
                        <Button fluid color='orange'>ยืนยัน</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )

        const ModalPhoto = () => (
            <Modal open={open} size='tiny' dimmer="inverted" onClose={() => setOpen(false)}>
                <Modal.Header><Header as='h3'>แก้ไขโปรไฟล์</Header></Modal.Header>
                <Image name='image' src={props.image ? props.image.imageFile : photo} centered style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }} />
                <Modal.Content>
                    <Form.Field style={{ paddingBottom: '1em' }}>
                        <label className='ui label blue' htmlFor='image' style={{ display: 'unset', textAlign: 'center', cursor: 'pointer', left: '80%', right: '20%', position: 'relative' }}>
                            <Icon name='edit' /> อัพรูปภาพ
                        </label>
                    </Form.Field>
                    <Form style={{ width: '.1px', height: '.1px', opacity: 0, overflow: 'hidden', zIndex: -1 }} >
                        <Field name='image' id='image' component={renderFileInput} type="file" label="เลือกรูปภาพ" />
                    </Form>
                    <Form onSubmit={props.handleSubmit(handleSubmit)}>
                        <Button fluid color='orange'>ยืนยัน</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )

        const handleEdit = () => {
            setOpen(true)
            props.load(data)
        }
        const handleForm = () => {
            setForm(true)
            props.load(data)
        }
        const data = {
            image: userInfo.photoURL,
            displayname: userInfo.displayname,
            bio: userInfo.bio
        }

        const Profile = (
            <React.Fragment>
                <Grid.Column width={5}>
                    <Image
                        name="image"
                        circular
                        src={userInfo.photoURL}
                        style={{ height: 250, objectFit: 'cover', objectPosition: 'center center' }}
                    />
                    <Button circular icon="magic" floated='right' color='yellow' onClick={() => handleEdit()} />
                </Grid.Column>
                <Grid.Column width={11} style={{ paddingLeft: '5em' }}>
                    <Item.Group>
                        <Item style={{ paddingTop: '2em' }}>
                            <Item.Content>
                                <Item.Header>
                                    <Header as='h1'>
                                        {userInfo.displayname}
                                        <Label icon='setting' style={{ cursor: 'pointer' }} circular color='blue' onClick={() => handleForm()} />
                                    </Header>

                                </Item.Header>
                                <Item.Description style={{ paddingTop: '2em' }}>
                                    <Header as='h2'>Bio :
                                                <Item.Meta>
                                            {userInfo.bio}
                                        </Item.Meta>
                                    </Header>

                                </Item.Description>
                            </Item.Content>

                        </Item>
                    </Item.Group>
                </Grid.Column>
            </React.Fragment>
        )

        const Status = () => (
            <Segment style={{ minHeight: 450 }}>
                <Item.Group>
                    <Item style={{ paddingTop: '1em', paddingLeft: '1em' }}>
                        <Item.Image src={userInfo.rankImage} size='small' />
                        <Item.Content style={{ paddingTop: '1em' }}>
                            <Item.Header as='a' floated='left' >Rank : {userInfo.rankName}</Item.Header>
                            <Item.Meta >
                                <Icon name='leaf' color='green' size='large' />
                                &nbsp;{userInfo.POINT} แต้ม (POINT)
                            </Item.Meta>
                            <Item.Description>
                                ค่าประสบการณ์ (EXP)
                                <Progress
                                    color='orange'
                                    autoSuccess
                                    value={Number(userInfo.EXP - userInfo.rankStart) % 10 === 0 ?
                                        Number(userInfo.EXP - userInfo.rankStart) :
                                        (Number(userInfo.EXP - userInfo.rankStart) + 1)}
                                    total={userInfo.rankExp}
                                    progress='ratio'
                                    style={{ margin: '0em 0em 0em', width: 400 }}
                                />
                            </Item.Description>

                        </Item.Content>
                    </Item>
                </Item.Group>

                <Grid centered style={{ paddingTop: '4em', paddingLeft: '1em' }} >
                    <Grid.Column width={3} textAlign='center' >
                        <Item.Group>
                            <Image src={gold} size='tiny' centered />
                            <Item>
                                <Item.Content>
                                    <Item.Header as='a'>
                                        <Label circular color='yellow' content={userProfile.oneCount.length} size='large' />
                                    </Item.Header>
                                    <Item.Description>
                                        <Item.Header as='h3'>ผู้ชนะอันดับที่ 1</Item.Header>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                        <Item.Group>
                            <Image src={silver} size='tiny' centered />
                            <Item>
                                <Item.Content>
                                    <Item.Header as='a'>
                                        <Label circular color='blue' content={userProfile.twoCount.length} size='large' />
                                    </Item.Header>
                                    <Item.Description>
                                        <Item.Header as='h3'>ผู้ชนะอันดับที่ 2</Item.Header>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                        <Item.Group>
                            <Image src={bronze} size='tiny' centered />
                            <Item>
                                <Item.Content>
                                    <Item.Header as='a'>
                                        <Label circular color='brown' content={userProfile.threeCount.length} size='large' />
                                    </Item.Header>
                                    <Item.Description>
                                        <Item.Header as='h3'>ผู้ชนะอันดับที่ 3</Item.Header>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                        <Item.Group>
                            <Image src={award} size='tiny' centered />
                            <Item>
                                <Item.Content>
                                    <Item.Header as='a'>
                                        <Label circular color='green' content={userProfile.fourCount.length} size='large' />
                                    </Item.Header>
                                    <Item.Description>
                                        <Item.Header as='h3'>รางวัลการเข้าร่วม</Item.Header>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                </Grid>
            </Segment>
        )

        const Reward = () => {
            return (
                <Segment style={{ minHeight: 500, paddingTop: '3em' }}>
                    <Grid >
                        {
                            userProfile.medals.map((medal, index) => {
                                return (
                                    <Grid.Column width={4} textAlign='center' key={index}>
                                        <Item.Group>
                                            <Image src={medal.image} size='tiny' centered />
                                            <Item>
                                                <Item.Content>
                                                    <Item.Header as='a'>
                                                        {medal.challenge}
                                                    </Item.Header>
                                                    <Item.Meta>{moment(medal.end_time).format('LL')}</Item.Meta>
                                                    <Item.Description>
                                                        {medal.title}
                                                    </Item.Description>
                                                </Item.Content>
                                            </Item>
                                        </Item.Group>
                                    </Grid.Column>
                                )
                            })
                        }
                    </Grid>
                </Segment>
            )
        }
        const MyChallenge = () => {
            return (
                <Segment style={{ minHeight: 300, paddingTop: '3em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Item.Group style={{ overflow: 'scroll', maxHeight: 'calc(70vh)' }} >
                                    {
                                        props.challenges.map((challenge, i) => (
                                            <Item key={i} style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                                <Item.Image size='small' src={challenge.image} />

                                                <Item.Content>

                                                    <Item.Header>{challenge.title}</Item.Header>
                                                    <Item.Description>
                                                        <p>สร้างโดย {challenge.owner}</p>
                                                        &nbsp;&nbsp;{challenge.desc.split('>,<')[0]}

                                                    </Item.Description>
                                                    <Item.Extra>

                                                        <Label icon='group' color='blue' content={`ผู้เข้าร่วม ${challenge.playerCount} คน`} />
                                                        <Label icon='tasks' color='black' content={`${challenge.actCOunt} ภารกิจ`} />
                                                        <Label icon='leaf' color='green' content={`${challenge.sum_point} แต้ม`} />
                                                    </Item.Extra>
                                                    <Item.Extra>
                                                        <Label.Group tag>
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
                                                    </Item.Extra>
                                                    <Item.Extra>
                                                        <Button primary floated='right' onClick={() => history.push(`/challenges/${challenge.index}`)}>
                                                            ดูรายละเอียด
                                                        <Icon name='right chevron' />
                                                        </Button>
                                                    </Item.Extra>

                                                </Item.Content>
                                            </Item>
                                        ))
                                    }

                                </Item.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        }

        const Activity = () => {
            return (
                <Segment style={{ minHeight: 300 }}>
                    <Grid stackable style={{ overflow: 'scroll', maxHeight: 'calc(70vh)' }} >
                        {
                            userProfile.posts.map((post, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Grid.Row style={{ paddingLeft: '1em', paddingTop: '2em' }} >
                                            <Feed>
                                                <Feed.Event>
                                                    <Feed.Label image={userInfo.photoURL} />
                                                    <Feed.Content>
                                                        <Feed.Summary>
                                                            <Feed.User>{userInfo.displayname}</Feed.User> ได้โพสต์
                                                    <Feed.Date>{moment(post.timestamp, 'DD-MM-YYYY HH:mm:ss').fromNow()}</Feed.Date>
                                                        </Feed.Summary>
                                                        <Feed.Date style={{ paddingTop: 10 }}>{post.signTransaction.slice(0, 30) + '...'}</Feed.Date>
                                                        <Feed.Extra text>
                                                            {post.caption}
                                                        </Feed.Extra>
                                                    </Feed.Content>
                                                </Feed.Event>
                                            </Feed>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Image src={post.image} centered size='large' />
                                        </Grid.Row>
                                        {/* <Grid.Row style={{ paddingLeft: '1em' }}>
                                            <Label size='large' image>
                                                <Icon name='like' /> 23
                                    </Label>
                                        </Grid.Row> */}
                                        <Divider />
                                    </React.Fragment>
                                )
                            })
                        }
                    </Grid>
                </Segment>
            )
        }

        const menuBar = (
            <React.Fragment>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item active={active === 'สถานะ' ? true : false} onClick={() => setActive('สถานะ')}><Header as='h3' content="สถานะ" /></Menu.Item>
                        <Menu.Item active={active === 'ชาเลนจ์ที่เข้าร่วมแล้ว' ? true : false} onClick={() => setActive('ชาเลนจ์ที่เข้าร่วมแล้ว')}><Header as='h3' content="ชาเลนจ์ที่เข้าร่วมแล้ว" /></Menu.Item>
                        <Menu.Item active={active === 'รางวัลที่ได้รับ' ? true : false} onClick={() => setActive('รางวัลที่ได้รับ')}><Header as='h3' content={`รางวัลที่ได้รับ (${userProfile.medals.length})`} /></Menu.Item>
                        <Menu.Item active={active === 'กิจกรรม' ? true : false} onClick={() => setActive('กิจกรรม')}><Header as='h3' content={`กิจกรรม (${userProfile.posts.length})`} /></Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    {
                        active === 'สถานะ' ? Status()
                            : active === 'รางวัลที่ได้รับ' ? Reward()
                                : active === 'กิจกรรม' ? Activity()
                                    : MyChallenge()
                    }
                </Grid.Column>
            </React.Fragment>
        )


        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>
                <Grid.Row>
                    {Profile}
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    {menuBar}
                </Grid.Row>
                <ModalForm />
                <ModalPhoto />
                <MariamSpinner open={loading} />
            </Grid>
        )
    }
    return (
        <MariamSpinner open={true} />
    )
}

NProfilePage = reduxForm({
    form: 'profileForm'
})(NProfilePage)

const selector = formValueSelector('profileForm')

const mapStateToProps = state => {
    const image = selector(state, 'image')

    return {
        initialValues: state.auth.profile,
        userInfo: state.auth.userInfo,
        userProfile: state.auth.userProfile,
        isFetch: state.auth.isFetch,
        image,
        isCompleted: state.auth.isCompleted,
        challenges: state.challenge.JOINED_CHALLENGES,
        fetchJoined: state.challenge.JOINED
    }
}

export default connect(mapStateToProps, { FetchProfile, load, EditPhoto, EditProfile, EditClean, isSignIn, fetchJoinedChallenge, clearJoinedChallenge })(NProfilePage)
