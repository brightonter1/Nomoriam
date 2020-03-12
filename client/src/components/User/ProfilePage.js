import React, { useState, useEffect } from 'react'
import {
    Header,
    Progress,
    Grid,
    Container,
    Image,
    Item,
    Label,
    Icon,
    Divider,
    Button,
    Segment,
    Menu,
    Modal,
    Form,
    Feed
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import rank from '../../asset/archievement/newbee.png'
import gold from '../../asset/archievement/gold.png'
import silver from '../../asset/archievement/silver.png'
import bronze from '../../asset/archievement/bronze.png'
import award from '../../asset/archievement/award.png'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { renderFileInput, renderInput, renderTextArea } from '../Challenge/Form'
import { connect } from 'react-redux'
import { FetchProfile, load, EditPhoto, EditProfile, EditClean, isSignIn } from '../../store/actions/authAction'
import MariamSpinner from '../Layout/MariamSpinner'
import { alertAction } from '../Challenge/Form'
import moment from 'moment'


let ProfilePage = props => {

    useEffect(() => {
        props.FetchProfile()
    },[props.isFetch])

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
    const ModalPhoto = () => (
        <Modal open={open} size='tiny' dimmer="inverted" onClose={() => setOpen(false)}>
            <Modal.Header><Header as='h3'>แก้ไขโปรไฟล์</Header></Modal.Header>
            <Image name='image' src={props.image ? props.image.imageFile : photo} centered style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }} />
            <Modal.Content>
                <Form onSubmit={props.handleSubmit(handleSubmit)} >
                    <Field name='image' component={renderFileInput} type="file" label="เลือกรูปภาพ" />
                    <Button fluid color='orange'>ยืนยัน</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )

    const handleFormSubmit = (profile) => {
        setForm(false)
        setLoading(true)
        props.EditProfile(profile)
    }

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


    if (isFetch) {

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

        const Status = () => (
            <Segment style={{ minHeight: 450 }}>
                <Item.Group>
                    <Item style={{ paddingTop: '3em', paddingLeft: '1em' }}>
                        <Item.Image src={rank} size='tiny' />
                        <Item.Content style={{ paddingTop: '1em' }}>
                            <Item.Header as='a' floated='left' >Rank: ราชาฝึกหัด</Item.Header>
                            <Item.Meta>{userProfile.exp} แต้ม</Item.Meta>
                            <Item.Description>
                                <Progress percent={70} indicating />
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
                                                        {medal.title}
                                                    </Item.Header>
                                                    <Item.Meta>{medal.end_time}</Item.Meta>
                                                    <Item.Description>
                                                        {/* {medal.challenge} */}
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

        const Activity = () => {
            return (
                <Segment style={{ minHeight: 500 }}>
                    <Grid stackable>
                        {
                            userProfile.posts.map((post, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Grid.Row style={{ paddingLeft: '1em', paddingTop: '2em' }}>
                                            <Feed>
                                                <Feed.Event>
                                                    <Feed.Label image={userInfo.photoURL ? userInfo.photoURL : photo} />
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
                                        <Grid.Row style={{ paddingLeft: '1em' }}>
                                            <Label size='large' image>
                                                <Icon name='like' /> 23
                                    </Label>
                                        </Grid.Row>
                                        <Divider />
                                    </React.Fragment>
                                )
                            })
                        }
                    </Grid>
                </Segment>
            )
        }

        return (
            <Container style={{ paddingTop: '3em', minHeight: 600 }}>
                <ModalPhoto />
                <ModalForm />
                <MariamSpinner open={loading} />
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image
                                name="image"
                                src={userInfo.photoURL ? userInfo.photoURL : photo}
                                circular size='massive'
                                style={{ height: 300, objectFit: 'cover', objectPosition: 'center center' }}
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
                                                <Label icon='setting' circular color='blue' onClick={() => handleForm()} />
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
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Menu fluid vertical tabular>
                                <Menu.Item active={active === 'สถานะ' ? true : false} onClick={() => setActive('สถานะ')}><Header as='h3' content="สถานะ" /></Menu.Item>
                                <Menu.Item active={active === 'รางวัลที่ได้รับ' ? true : false} onClick={() => setActive('รางวัลที่ได้รับ')}><Header as='h3' content="รางวัลที่ได้รับ" /></Menu.Item>
                                <Menu.Item active={active === 'กิจกรรม' ? true : false} onClick={() => setActive('กิจกรรม')}><Header as='h3' content="กิจกรรม" /></Menu.Item>
                            </Menu>
                        </Grid.Column>

                        <Grid.Column stretched width={13}>
                            {
                                active === 'สถานะ' ? Status()
                                    : active === 'รางวัลที่ได้รับ' ? Reward()
                                        : Activity()
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container >
        )
    } else {
        return <MariamSpinner open={true} />
    }



}

ProfilePage = reduxForm({
    form: 'profileForm'
})(ProfilePage)

const selector = formValueSelector('profileForm')

const mapStateToProps = state => {
    const image = selector(state, 'image')
    return {
        initialValues: state.auth.profile,
        userInfo: state.auth.userInfo,
        userProfile: state.auth.userProfile,
        isFetch: state.auth.isFetch,
        image,
        isCompleted: state.auth.isCompleted
    }
}

export default connect(mapStateToProps, { FetchProfile, load, EditPhoto, EditProfile, EditClean,isSignIn })(ProfilePage)