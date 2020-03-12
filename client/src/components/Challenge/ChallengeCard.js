import React, { useEffect, useState } from 'react'
import { Card, Header, Image, Icon, Grid, Segment, Label, Button, Statistic, Divider, Progress, Loader, Container } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchChallenges, joinChallenge, joinCleanUp } from '../../store/actions/challengeAction'
import history from '../../api/history'
import { alertAction } from '../Challenge/Form'
import MariamSpinner from '../Layout/MariamSpinner'


const durationDate = (end) => {
    const current = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    const str = end.split('-')
    end = str[0] + '-' + parseInt(str[1]) + '-' + str[2]
    var time = new moment.duration(Math.abs(new Date(current) - new Date(end)))

    return "เหลืออีก " + time.asDays() + " วัน"
}


const ChallengeCard = props => {

    const { challenges } = props
    const [open, setOpen] = useState(false)

    useEffect(() => {
        props.fetchChallenges()
        if (props.isJoined) {
            setOpen(false)
            alertAction("เข้าร่วมเรียบร้อยแล้ว", props.message, 'success')
        }

        return () => {
            props.joinCleanUp()
        }
    }, [props.isJoined])

    const handleJoin = (index) => {
        setOpen(true)
        props.joinChallenge(index)
    }

    if (props.isFetch) {

        const challengesList = challenges.map((challenge, index) =>
            <Grid.Column width={5} style={{ paddingTop: '1em' }} key={index} >
                <Segment style={{ borderRadius: 20, minHeight: 'auto', padding: 'auto' }} padded >
                    {!challenge.joined && challenge.finished && <Label as='a' color='teal' ribbon>ชาเลนจ์สิ้นสุดแล้ว</Label>}
                    {challenge.joined && challenge.finished && <Label as='a' color='teal' ribbon>ชาเลนจ์สิ้นสุดแล้ว</Label>}
                    {challenge.joined && !challenge.finished && <Label as='a' color='orange' ribbon>ชาเลนจ์เปิดอยู่</Label>}
                    {!challenge.joined && !challenge.finished && <Label as='a' color='orange' ribbon>ชาเลนจ์เปิดอยู่</Label>}
                    <Image src={challenge.image} size="massive" centered style={{ height: 450, objectFit: 'cover', objectPosition: 'center center', marginTop: 10, borderRadius: 20 }} />
                    <Card fluid style={{ borderRadius: 20 }}>
                        <Card.Content>
                            <Card.Header as='a' onClick={() => history.push(`/challenges/${index}`)} style={{minHeight: 70}}>{challenge.title}</Card.Header>
                            <Card.Meta>สร้างโดย {challenge.owner}</Card.Meta>
                            <Divider />
                            <Card.Description textAlign="center">
                                <Statistic inverted color="green" size="small">
                                    <Statistic.Value>{challenge.actCount}</Statistic.Value>
                                    <Statistic.Label style={{ color: 'green' }} content="ภารกิจทั้งหมด" />
                                </Statistic>
                                <Statistic inverted color="green" size="small">
                                    <Statistic.Value>{challenge.sum_point}</Statistic.Value>
                                    <Statistic.Label style={{ color: 'green' }} content="คะแนนเต็ม" />
                                </Statistic>

                                <Statistic inverted color="green" size="small">
                                    <Statistic.Value>+200</Statistic.Value>
                                    <Statistic.Label style={{ color: 'green' }} content="โบนัสค่าประสบการ์ณ" />
                                </Statistic>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra >
                            <Label size="large" color="orange">
                                <Icon name="user" />
                                จำนวนผู้เข้าร่วม {challenge.playerCount} คน
                        </Label>
                        </Card.Content>
                    </Card>
                    <Card fluid style={{ borderRadius: 20 }}>
                        <Card.Content textAlign="center">
                            <Card.Header>{durationDate(challenge.end_time)}</Card.Header>
                        </Card.Content>
                    </Card>
                    {!challenge.joined && !challenge.finished && <Button color="orange" fluid style={{ borderRadius: 20 }} onClick={() => handleJoin(index)}>เข้าร่วม</Button>}
                    {!challenge.joined && challenge.finished && <Button color="green" fluid style={{ borderRadius: 20 }} disabled>เข้าร่วม</Button>}
                    {challenge.joined && !challenge.finished && <Button color="teal" fluid style={{ borderRadius: 20 }} >เข้าร่วมเรียบร้อยแล้ว</Button>}
                    {challenge.joined && challenge.finished && <Button color="teal" fluid style={{ borderRadius: 20 }} disabled>เข้าร่วมเรียบร้อยแล้ว</Button>}
                </Segment>
            </Grid.Column>
        )


        return (
            <React.Fragment>
                {challengesList}
                <MariamSpinner open={open} />
            </React.Fragment>
        )
    } else {
        return <Loader active inline='centered' content="กำลังดึงข้อมูล" />
    }
}

const mapStateToProps = state => {
    return {
        challenges: state.challenge.challenges,
        isFetch: state.challenge.isFetch,
        isJoined: state.challenge.isJoined,
        message: state.challenge.message
    }
}
export default connect(mapStateToProps, { fetchChallenges, joinChallenge, joinCleanUp })(ChallengeCard)