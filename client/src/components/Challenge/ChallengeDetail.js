import React, { useEffect, useState } from 'react'
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
    Table, 
    Statistic 
} from 'semantic-ui-react'
import RankTop from '../../asset/archievement/RankTop.png'
import { connect } from 'react-redux'
import { fetchChallenge, fetchChallengeCleanUp, joinChallenge, joinCleanUp } from '../../store/actions/challengeAction'
import MariamSpinner from '../Layout/MariamSpinner'
import { alertAction } from '../Challenge/Form'
import moment from 'moment'
const ChallengeDetail = props => {

    const [open, setOpen] = useState(false)
    const { challenge, isFetch } = props

    useEffect(() => {
        props.fetchChallenge(props.match.params.index)
        if (props.isJoined) {
            setOpen(false)
            alertAction("เข้าร่วมเรียบร้อยแล้ว", props.message, 'success')
        }
    }, [props.isJoined])

    useEffect(() => {
        return () => {
            props.fetchChallengeCleanUp()
            props.joinCleanUp()
        }
    }, [])

    const handleJoin = (index) => {
        setOpen(true)
        props.joinChallenge(index)
    }

    if (isFetch) {
        const actList = challenge.activities.map((act, index) =>
            <Grid.Column width={16} style={{ paddingTop: '1em' }} key={index}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image src={`https://ipfs.infura.io/ipfs/${act.image}`} size="small" />

                            <Item.Content>
                                <Item.Header as='h1'>{act.title.split(':,')[0]}</Item.Header>
                                <Item.Description as='h3'>วิธีการเล่น: {act.category === 'post' ? "โพสต์รูปภาพ" : "สแกนคิวอาโค้ด"}</Item.Description>
                                <Item.Description as='h3'>สถานที่เล่น: {act.title.split(':,')[1]}</Item.Description>
                                <Item.Extra style={{ textAlign: 'right' }}>
                                    <Statistic color='red' inverted>
                                        <Statistic.Value>{act.times}</Statistic.Value>
                                        <Statistic.Label style={{ color: 'black' }}>จำนวนครั้ง</Statistic.Label>
                                    </Statistic>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
        )

        const playList = challenge.players.map((player, index) =>
            <Table.Row key={index}>
                <Table.Cell>
                    <Header as='h4' image>
                        <Image src={player.photoURL} rounded size='mini' />
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4'>
                        {player.displayname}
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4'>
                        <Progress value={player.point} total={challenge.sum_point} color="green" progress='ratio' />
                    </Header>
                </Table.Cell>
            </Table.Row>
        )

        return (
            <Container style={{ paddingTop: '3em' }}>
                <Grid stackable >
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Image src={challenge.image}
                                size='large'
                                style={{ borderRadius: 20 }}
                                label={{ as: 'a', corner: 'left', icon: 'gem', color: 'red' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Item>
                                <Item.Content>
                                    <Item.Header as='h1'>{challenge.title}</Item.Header>
                                    <Item.Meta as='h3'>สร้างโดย Chayut Aroonsang</Item.Meta>
                                    <Item.Description as='h4' >
                                        {challenge.desc}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Label size="large" color="green">จำนวนผู้เข้าร่วม {challenge.players.length} คน</Label>
                                    </Item.Extra>
                                    <Item.Extra style={{ paddingTop: 10 }}>
                                        <Label size='large' color="blue">
                                            <Icon name="calendar alternate outline" />
                                            {moment(challenge.create_time).format('LL')} - {moment(challenge.end_time).format('LL')}
                                        </Label>
                                    </Item.Extra>
                                    <Item.Extra style={{ paddingTop: 30 }}>
                                        {!challenge.joined && <Button basic color="green" attached="bottom" onClick={e => handleJoin(props.match.params.index)}>เข้าร่วมชาเลนจ์</Button>}
                                        {challenge.joined && <Button  color="teal" attached="bottom" >เข้าร่วมเรียบร้อยแล้ว</Button>}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Grid.Column>

                    </Grid.Row>
                    <Divider />

                    <Grid.Row style={{ textAlign: 'center' }}>
                        <Grid.Column width={16}>
                            <Header as='h2' floated='left' >รางวัลที่จะได้รับ</Header>
                        </Grid.Column>
                        <Grid.Column width={5} style={{ paddingTop: '2em' }}>
                            <Image src={RankTop} />
                            ผู้เล่นที่เล่นภารกิจครบเสร็จ 3 อันดับแรกจะได้รับเหรียญ Top 3 ไปครอบครองแล้ว
                            เมื่อชาเลนจ์สิ้นสุดลงจะได้รับเหรียญเข้าร่วมอีก 1 เหรียญ
                            ส่วนผู้เล่นอื่นที่เข้าร่วมเล่นชาเลนจ์จะได้รับเหรียญเข้าร่วมเป็นการปลอบใจ
                    </Grid.Column>
                        <Grid.Column width={5} style={{ paddingTop: '2em' }}>
                            <Image src={RankTop} />
                            ผู้เล่นที่เข้าร่วมแล้วเล่นภารกิจภายในจะได้รับคะแนนในแต่ละภารกิจและจำนวนครั้ง
                            โดยสามารถดูคะแนนตัวเองติดอันดับได้บนกระดานคะแนนด้านล่าง
                    </Grid.Column>
                        <Grid.Column width={5} style={{ paddingTop: '2em' }}>
                            <Image src={RankTop} />
                            ผู้เล่นที่ทำภารกิจจนสำเร็จทั้งหมด จะได้รับ EXP Bonus เพื่อเพิ่มเลเวล Rank ของผู้เล่น
                            และรับได้รับ EXP ย่อยในแต่ละภารกิจ
                    </Grid.Column>
                    </Grid.Row>
                    <Divider />

                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header as='h2' floated="left" >ภารกิจ</Header>
                        </Grid.Column>
                        {actList}
                    </Grid.Row>
                    <Divider />

                    <Grid.Row>
                        <Grid.Column width={16} style={{ paddingTop: '1em' }}>
                            <Header as='h2' floated="left" >กระดานคะแนน</Header>
                        </Grid.Column>
                        <Grid.Column width={16} style={{ paddingTop: '1em' }}>
                            <Segment>
                                <Table basic="very">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='4'><Header as='h3'>กระดานคะแนน</Header></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>#</Table.HeaderCell>
                                            <Table.HeaderCell>ชื่อผู้เล่น</Table.HeaderCell>
                                            <Table.HeaderCell>คะแนนสะสม</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {playList}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <MariamSpinner open={open} />
            </Container >
        )
    } else {
        return <MariamSpinner open={true} />
    }

}
const mapStateToProps = state => {
    return {
        challenge: state.challenge.challenge,
        isFetch: state.challenge.isFetching,
        isJoined: state.challenge.isJoined,
        message: state.challenge.message
    }
}

export default connect(mapStateToProps, { fetchChallenge, fetchChallengeCleanUp, joinChallenge, joinCleanUp })(ChallengeDetail)