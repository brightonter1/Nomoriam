import React, { useState, useEffect } from 'react'
import {
    Grid,
    Header,
    Divider,
    Button,
    Image,
    Label,
    Icon,
    Item,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchChallengeByIndex, approveChallenge, fetchChallengeByIndexCleanUp, cleanUp } from '../../store/actions/challengeAction'
import { alertAction } from '../Challenge/Form'
import moment from 'moment'
import qrcode from '../../asset/category/qrcode.png'
import post from '../../asset/category/post.png'
import organize from '../../asset/icon/orgranize.png'
import global from '../../asset/icon/global.png'
import store from '../../asset/icon/store.png'
import home from '../../asset/icon/home.png'
import pin from '../../asset/icon/pin.png'
import MariamSpinner from '../Layout/MariamSpinner'


const NchallengeDetail = (props) => {

    const [open, setOpen] = useState(false)

    const { challenge } = props
    useEffect(() => {
        props.fetchChallengeByIndex(props.match.params.index)
        if (props.isCompleted === true) {
            setOpen(false)
            alertAction("ยืนยันชาเลนจ์เสร็จสิ้น", props.txHash, 'success')
        }
    }, [props.isCompleted])

    useEffect(() => {
        return () => {
            props.fetchChallengeByIndexCleanUp()
            props.cleanUp()
        }
    }, [])

    const handleSubmit = (challenge) => {
        setOpen(true)
        props.approveChallenge(challenge)
    }

    if (props.challenge) {
        const Challenge = (
            <React.Fragment>
                <Grid.Column width={7}>
                    <Image src={challenge.image} style={{ borderRadius: '25px' }} size='large' />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Item>

                        <Item.Content>
                            <Item.Header as='h2'>
                                ชื่อชาเลนจ์ : {challenge.title}
                            </Item.Header>
                            <Item.Meta as='a'>
                                <p>สร้างเมื่อ {moment(challenge.timestamp, 'DD-MM-YYYY HH:mm:ss').format('LL')}</p>
                                <Label basic color='teal'>
                                    <Icon name='calendar alternate outline' />
                                    ระยะเวลาชาเลนจ์ {moment(challenge.create_time).format('LL')} - {moment(challenge.end_time).format('LL')}
                                </Label>
                            </Item.Meta>

                            <Item.Description as='h4'>
                                <p>
                                    &nbsp; {challenge.desc}
                                </p>
                                <span>
                                    วัตถุประสงค์ : &nbsp;
                                {
                                        props.challenge.goal.map((goal, index) => (
                                            <React.Fragment key={index}>
                                                {goal === 'return' && <Label as='a' tag color='green' content='ตอบแทนธรรมชาติ (Return)' />}
                                                {goal === 'reduce' && <Label as='a' tag color='blue' content='ลดการใช้งาน (Reduce)' />}
                                                {goal === 'refuse' && <Label as='a' tag color='red' content='การปฏิเสธการใช้ (Refuse)' />}
                                                {goal === 'reuse' && <Label as='a' tag color='olive' content='การใช้งานซ้ำ (Reuse)' />}
                                                {goal === 'recycle' && <Label as='a' tag color='orange' content='การนำกลับมาใช้ใหม่ (Recycle)' />}
                                            </React.Fragment>
                                        ))
                                    }
                                </span>
                                <br></br>
                                <br></br>
                                <span>
                                    สถานะ : &nbsp;
                                    {!challenge.approved && <Label as='a' color='yellow' content='รอการตรวจสอบ' />}
                                    {challenge.approved && <Label as='a' color='green' content='ได้รับการยืนยันเรียบร้อยแล้ว' />}
                                </span>
                            </Item.Description>

                            <Item.Extra>
                                {
                                    challenge.approved ?
                                        <Button size='large' floated='right' color='green' >
                                            <Icon name='check' />
                                            ตรวจสอบแล้ว
                                        </Button>
                                        :
                                        <Button size='large' floated='right' color='blue' loading={open} onClick={e => handleSubmit(challenge)} >
                                            <Icon name='zoom-in' />
                                            &nbsp;ยืนยัน
                                        </Button>
                                }
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Grid.Column>
            </React.Fragment>
        )

        const ActivityList = (
            <React.Fragment>
                {
                    props.challenge.activities.map((act, index) => (
                        <Grid.Column key={index} >
                            <Item.Group unstackable>
                                <Item
                                    style={{
                                        padding: '2em 2em 1em 2em',
                                        borderRadius: '15px',
                                        border: '1px solid rgba(34,36,38,.15)'
                                    }}
                                >
                                    <Item.Image size='tiny' src={act.category === 'qrcode' ? qrcode : post}>
                                    </Item.Image>
                                    <Item.Content>
                                        <Item.Header style={{ color: '#2a2825' }}>
                                            {act.title}
                                        </Item.Header>

                                        <Item.Description as='h4' style={{ color: 'cadetblue' }} >
                                            <p>สถานที่ : &nbsp;
                                            {
                                                act.location === 'map' ?
                                                act.extra 
                                                : act.location === 'home' ? "บ้าน" 
                                                : act.location === 'store' ? "ร้านสะดวกซื้อ"
                                                : act.location === 'school' ? "สถานศึกษา"
                                                : "ที่ใดก็ได้"
                                            }
                                            </p>
                                            <Label style={{ border: '1px solid rgba(34,36,38,.15)', backgroundColor: 'white' }}>
                                                {
                                                    act.location === 'home' ?
                                                        <Image src={home} size='tiny' centered />
                                                        : act.location === 'store' ?
                                                            <Image src={store} size='tiny' centered />
                                                            : act.location === 'school' ?
                                                                <Image src={organize} size='tiny' centered />
                                                                : act.location === 'anywhere' ?
                                                                    <Image src={global} size='tiny' centered />
                                                                    : <Image src={pin} size='tiny' centered />
                                                }
                                            </Label>
                                        </Item.Description>
                                        <Item.Extra>
                                            <Label color='red' content={'เล่น 3 ครั้ง'} />
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                    ))
                }
            </React.Fragment>
        )

        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>

                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="red">
                            <Icon name='flag checkered' color="red" />
                            <Header.Content >
                                ชาเลนจ์
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    {Challenge}
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="red">
                            <Icon name='tasks' color="red" />
                            <Header.Content >
                                ภารกิจ ({challenge.activities.length})
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                    {ActivityList}
                </Grid.Row>

            </Grid>
        )
    } else {
        return <MariamSpinner open={true} />
    }


}

const mapStateToProps = state => {
    return {
        challenge: state.challenge.challenge,
        isCompleted: state.challenge.isCompleted,
        message: state.challenge.txHash
    }
}
export default connect(mapStateToProps, { fetchChallengeByIndex, approveChallenge, fetchChallengeByIndexCleanUp, cleanUp })(NchallengeDetail)
