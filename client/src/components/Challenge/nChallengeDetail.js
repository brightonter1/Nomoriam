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
    Item,
    Progress,
    Placeholder,
    Table,
    Card
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import qrcode from '../../asset/category/qrcode.png'
import post from '../../asset/category/post.png'
import rank from '../../asset/archievement/RankTop.png'
import award from '../../asset/archievement/award.png'
import exp from '../../asset/icon/exp.png'
import organize from '../../asset/icon/orgranize.png'
import home from '../../asset/icon/home.png'
import pin from '../../asset/icon/pin.png'
import store from '../../asset/icon/store.png'
import global from '../../asset/icon/global.png'
import gold from '../../asset/archievement/gold.png'
import silver from '../../asset/archievement/silver.png'
import rank1 from '../../asset/Rank/rank_mid_01.png'
import bronze from '../../asset/archievement/bronze.png'
import { connect } from 'react-redux'
import { fetchChallenge, fetchChallengeCleanUp, joinChallenge, joinCleanUp } from '../../store/actions/challengeAction'
import MariamSpinner from '../Layout/MariamSpinner'
import { alertAction } from '../Challenge/Form'
import moment from 'moment'
import QRCode from 'qrcode.react'

const NChallengeDetail = (props) => {

    const [modal, setModal] = useState(false)
    const [reward, setReward] = useState(false)
    const [qrcodeOpen, setQrcodeOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [qrcodeList, setQrcode] = useState(null)
    const { challenge, isFetch } = props
    const path = props.match.path === "/account/status/:index/show" ? true : false
    useEffect(() => {
        props.fetchChallenge(props.match.params.index)
        if (props.isJoined) {
            setOpen(false)
            alertAction("เข้าร่วมเรียบร้อยแล้ว", '', 'success')
            props.joinCleanUp()
        }
    }, [props.isJoined])

    useEffect(() => {
        return () => {
            props.fetchChallengeCleanUp()
        }
    }, [])

    const handleJoin = (index) => {
        setOpen(true)
        props.joinChallenge(index)
    }

    const HowToReward = (
        <Modal
            trigger={<React.Fragment ><Icon name='hand point right outline' />ของรางวัลเอาไปทำอะไรได้ ?</React.Fragment>}
            open={reward}
            onClose={() => setReward(false)}
            basic
            size='small'
            centered={false}
        >
            <Modal.Header style={{ paddingBottom: '3em' }}>
                <Header as='h2' icon='question circle outline' content='ของรางวัลเอาไปทำอะไรได้ ?' floated='left' style={{ color: 'white' }} />
                <Header icon='close' floated='right' onClick={() => setReward(false)} style={{ color: 'white' }} />
            </Modal.Header>

            <Modal.Content image scrolling>
                <Header as='h3' style={{ color: 'white' }}>
                    <p>1. เหรียญรางวัลซึ่งจะเป็นของรางวัลตอบแทนและยืนยันว่าผู้เล่นได้ทำสำเร็จจริง ๆ</p>
                    <p>&nbsp;&nbsp;&nbsp;ประเภทของเหรียญรางวัลมี 4 ประเภทด้วยกัน</p>
                    <p>&nbsp;&nbsp;&nbsp;- เหรียญตราอันดับที่ 1 (ได้รับเมื่อสำเร็จชาเลนจ์เป็นอันดับแรก) <Image src={gold} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
                    <p>&nbsp;&nbsp;&nbsp;- เหรียญตราอันดับที่ 2 (ได้รับเมื่อสำเร็จชาเลนจ์เป็นอันดับที่สอง)<Image src={silver} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
                    <p>&nbsp;&nbsp;&nbsp;- เหรียญตราอันดับที่ 3 (ได้รับเมื่อสำเร็จชาเลนจ์เป็นอันดับที่สาม)<Image src={bronze} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
                    <p>&nbsp;&nbsp;&nbsp;- ถ้วยรางวัลการเข้าร่วม (ได้รับเมื่อสำเร็จชาเลนจ์อันดับใดอันดับหนึ่ง) <Image src={award} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
                    <p>2. ค่าประสบการณ์ (EXP) และ คะแนนใบไม้ (POINT) คืออะไร ?</p>
                    <p>&nbsp;&nbsp;&nbsp;- ค่าประสบการณ์ (EXP) จะได้รับจากการทำในแต่ละภารกิจ</p>
                    <p>&nbsp;&nbsp;&nbsp;ซึ่งจะแตกต่างกันจากวิธีการเล่น เอาไว้เพิ่มระดับ Rank ของผู้เล่น</p>
                    <p>&nbsp;&nbsp;&nbsp;- คะแนนใบไม้ (POINT) จะได้รับจากการทำในแต่ละภารกิจ</p>
                    <p>&nbsp;&nbsp;&nbsp;ซึ่งจะแตกต่างกันจากวิธีการเล่น เอาไว้แลกของรางวัลภายในแอปพลิเคชัน</p>
                </Header>
            </Modal.Content>

        </Modal>
    )

    const HowToPlay = (
        <Modal
            trigger={<React.Fragment ><Icon name='hand point right outline' /> ดูขั้นตอนวิธีการเล่น</React.Fragment>}
            open={modal}
            onClose={() => setModal(false)}
            basic
            size='small'
            centered={false}
        >
            <Modal.Header style={{ paddingBottom: '3em' }}>
                <Header as='h2' icon='play circle outline' content='ขั้นตอนวิธีการเล่น' floated='left' style={{ color: 'white' }} />
                <Header icon='close' floated='right' onClick={() => setModal(false)} style={{ color: 'white' }} />
            </Modal.Header>

            <Modal.Content image scrolling>
                <Header as='h3' style={{ color: 'white' }}>
                    <p>1. ดูวิธีการเล่นของภารกิจที่ผู้เล่นจะสะดวกเล่น โดยแบ่งเป็น 2 รูปแบบคือ</p>
                    <p>&nbsp;&nbsp;&nbsp;- โพสต์รูปภาพ <Image src={post} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='tiny' /></p>
                    <p>&nbsp;&nbsp;&nbsp;- สแกนคิวอาโค้ด <Image src={qrcode} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='tiny' /></p>
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

    const Reward = (
        <React.Fragment>
            <Grid.Column style={{ textAlign: 'center' }}>
                <Image src={rank} size='small' centered style={{ paddingBottom: '1em' }} />
                <span>
                    &nbsp; ผู้เล่นที่สามรถทำภารกิจจนครบเป็น 3 อันดับแรก จะได้เหรียญอันดับพิเศษไปครอบครอง
                </span>
            </Grid.Column>
            <Grid.Column>
                <Image src={award} size='small' centered style={{ paddingBottom: '1em' }} />
                <span>
                    &nbsp; ผู้เล่นที่สามารถทำภารกิจจนครบ (จะเป็น 3 อันดับแรกหรือไม่ก็ได้) จะได้รับถ้วยเข้าร่วมชาเลนจ์
                </span>
            </Grid.Column>
            <Grid.Column>
                <Image src={exp} size='small' centered style={{ paddingBottom: '1em' }} />
                <span>
                    &nbsp; ผู้เล่นที่ทำภารกิจจะได้รับค่าประสบการณ์ (EXP) และคะแนนใบไม้ (POINT) ในแต่ละวิธีการเล่น โดยสามารถดูจำนวนที่ได้รับจากรายละเอียดแต่ละภารกิจ
                </span>
            </Grid.Column>
        </React.Fragment>
    )

    const handleClick = (qrcode) => {
        setQrcode(qrcode)
        setQrcodeOpen(true)
    }

    if (isFetch) {
        const Challenge = (
            <React.Fragment>
                <Grid.Column width={7}>
                    <Image src={challenge.image} style={{ borderRadius: '25px' }} />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Item>

                        <Item.Content>
                            <Item.Header as='h2'>
                                ชื่อชาเลนจ์ : งดใช้ถุงพลาสติก
                            </Item.Header>
                            <Item.Meta as='a'>
                                <p>สร้างโดย {challenge.owner}</p>
                                <Label basic color='teal'>
                                    <Icon name='calendar alternate outline' />
                                    ระยะเวลาชาเลนจ์ {moment(challenge.create_time.split('>time<')[0]).format('LL')} - {moment(challenge.end_time).format('LL')}
                                </Label>
                            </Item.Meta>

                            <Item.Description as='h4'>
                                <p>
                                    &nbsp; {challenge.desc.split('>,<')[0]}
                                </p>
                                <p>
                                    คะแนนเป้าหมาย : &nbsp;

                            </p>
                                <Label icon='leaf' color='green' content={`${challenge.sum_point} แต้ม`} />
                                <p>
                                    วัตถุประสงค์ :
                            </p>
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
                            </Item.Description>

                            <Item.Extra>
                                {
                                    challenge.joined ?
                                        <Button size='large' disabled floated='right' style={{ width: '150px' }} color='green' >
                                            <Icon name='check' />
                                            เข้าร่วมแล้ว
                                        </Button>
                                        :
                                        <Button size='large' loading={open} floated='right' style={{ width: '150px' }} color='blue' onClick={e => handleJoin(props.match.params.index)} >
                                            <Icon name='sign-in alternate' />
                                            เข้าร่วม
                                        </Button>
                                }

                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Grid.Column>
            </React.Fragment>
        )
        const ViewQRcode = () => (
            <Modal closeIcon open={qrcodeOpen} onClose={() => setQrcodeOpen(false)}>
                <Modal.Header><Header as='h3'>คิวอาโค้ดทั้งหมด</Header></Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>ภารกิจ</Header>
                        <p>
                            สามารถเอารูปบาร์โค้ดไปแปะตามจุดที่ต้องการให้ผู้เล่นสแกนได้เลย !
                            </p>
                        {
                            qrcodeList !== null &&
                            qrcodeList.map((res, index) => {
                                return (
                                    <Grid centered style={{ paddingTop: '1em' }} key={index}>
                                        <Card fluid>
                                            <QRCode
                                                value={res}
                                                level='M'
                                                size={290}
                                                className="ui fluid image centered"
                                                style={{ padding: '1em' }}
                                            />
                                            <Card.Content style={{ paddingTop: '1em' }}>
                                                <Card.Header># จุดที่ {index + 1}</Card.Header>
                                            </Card.Content>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => setQrcodeOpen(false)}>
                        <Icon name='close' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )


        const ActivityList = challenge.activities.map((act, index) => (
            <React.Fragment key={index}>
                <Grid.Column >
                    <Item.Group unstackable>
                        <Item
                            style={{
                                padding: '2em 2em 1em 2em',
                                borderRadius: '15px',
                                border: '1px solid rgba(34,36,38,.15)'
                            }}
                        >
                            <Item.Image size='tiny' src={act.category.split('>location<')[0] === 'qrcode' ? qrcode : post}>
                            </Item.Image>
                            <Item.Content>
                                <Item.Header style={{ color: '#2a2825' }}>
                                    {act.title}
                                </Item.Header>

                                <Item.Description as='h4' >
                                    <p>สถานที่ : &nbsp;
                                    {act.category.split('>location<')[1].split('>extra<')[0] === 'map' && "แผนที่"}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'anywhere' && "ที่ใดก็ได้"}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'store' && "ร้านสะดวกซื้อ"}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'school' && "สถานศึกษา"}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'home' && "บ้าน"}
                                    </p>
                                    <Label style={{ border: '1px solid rgba(34,36,38,.15)', backgroundColor: 'white' }}>
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'school' && <Image src={organize} size='tiny' centered />}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'store' && <Image src={store} size='tiny' centered />}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'map' && <Image src={pin} size='tiny' centered />}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'home' && <Image src={home} size='tiny' centered />}
                                        {act.category.split('>location<')[1].split('>extra<')[0] === 'anywhere' && <Image src={global} size='tiny' centered />}
                                    </Label>
                                    <p>
                                        {
                                            path &&
                                            <a onClick={() => handleClick(act.qrcode)}>คลิ๊กเพื่อดูคิวอาโค้ด</a>
                                        }
                                    </p>
                                </Item.Description>
                                <Item.Extra>
                                    <Label color='green' icon='leaf' content={`+${act.point} POINT`} />
                                    <Label color='blue' content={`+${act.exp} EXP`} />
                                    <Label color='red' content={`จำนวน ${act.times} ครั้ง`} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </React.Fragment>
        ))


        const leaderList = (
            <Grid.Column>
                <Segment>
                    <Table basic="very" textAlign='center' unstackable>
                        <Table.Header >
                            <Table.Row>
                                <Table.HeaderCell>อันดับ</Table.HeaderCell>
                                <Table.HeaderCell >แร้งค์</Table.HeaderCell>
                                <Table.HeaderCell >ผู้เล่น</Table.HeaderCell>
                                <Table.HeaderCell >คะแนน</Table.HeaderCell>
                                {/* <Table.HeaderCell width={3}>รางวัล</Table.HeaderCell> */}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                challenge.players.map((player, index) => (
                                    <Table.Row active={props.userId === player.uid ? true : false} key={index} >
                                        <Table.Cell>
                                            {index + 1}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Image src={rank1} rounded size='tiny' centered style={{ maxWidth: 'none' }} />
                                        </Table.Cell>
                                        <Table.Cell textAlign='left' style={{ paddingLeft: '5em' }}>
                                            {player.displayname}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {player.point}
                                        </Table.Cell>
                                        {/* <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src={gold} rounded size='small' />
                                                <Image src={award} rounded size='small' />
                                            </Header>

                                        </Table.Cell> */}
                                    </Table.Row>
                                ))
                            }

                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
        )

        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>
                <ViewQRcode />
                <Grid.Row>
                    {Challenge}
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='flag checkered' color="olive" />
                            <Header.Content >
                                รางวัลที่จะได้รับ
                                <Header.Subheader style={{ cursor: 'pointer' }} onClick={() => setReward(!reward)} >{HowToReward}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={3}  >
                    {Reward}
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="red">
                            <Icon name='tasks' color="red" />
                            <Header.Content >
                                ภารกิจ {`(${challenge.activities.length})`}
                                <Header.Subheader style={{ cursor: 'pointer' }} onClick={() => setModal(!modal)} >{HowToPlay}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                    {ActivityList}
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="black">
                            <Icon name='table' color="black" />
                            <Header.Content >
                                กระดานคะแนน {`(${challenge.players.length})`}
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    {challenge.players.length > 0 ? leaderList :
                        <Grid.Column width={16}>
                            <Header as='h2' style={{ textAlign: 'center', color: 'lightsteelblue', paddingTop: '2em' }} >
                                ยังไม่มีผู้เข้าร่วมในตอนนี้
                       </Header>
                        </Grid.Column>
                    }
                </Grid.Row>

            </Grid>
        )
    } else {
        return (
            <MariamSpinner open={true} />
        )
    }

}

const mapStateToProps = state => {
    return {
        challenge: state.challenge.challenge,
        isFetch: state.challenge.isFetching,
        isJoined: state.challenge.isJoined,
        message: state.challenge.message,
        userId: state.auth.userInfo.userId
    }
}
export default connect(mapStateToProps, { fetchChallenge, fetchChallengeCleanUp, joinChallenge, joinCleanUp })(NChallengeDetail)
