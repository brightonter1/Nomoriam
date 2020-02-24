import React from 'react'
import { connect } from 'react-redux'
import { fetchChallenge } from '../../store/actions/challengeAction'
import { Segment, Grid, Image, Card, Header, Item, Label, Button, Table, Tab } from 'semantic-ui-react'
import moment from 'moment'

class ChallengeShow extends React.Component {

    componentWillReceiveProps() {
        this.props.fetchChallenge(this.props.match.params.id, this.props.userId)
    }

    renderChallenge() {
        const challenge = this.props.challenge[this.props.match.params.id]
        if (challenge) {
            return (
                <Segment raised>
                    <Grid>
                        <Grid.Column width={16}>
                            <Card fluid>
                                <Image src={`https://ipfs.infura.io/ipfs/${challenge.image}`} style={{ height: 300 }} />
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Header as="h2">{challenge.title}</Header>
                            <Header as="h3">{challenge.desc}</Header>
                            <Label color="blue">วันที่เริ่ม {challenge.create_time}</Label>
                            <Label color="blue">วันสิ้นสุด {challenge.end_time}</Label>
                            <Label color="purple">เหลืออีก {this.durationDate(challenge.end_time)} วัน</Label>
                            <Label color="orange">จำนวนพ้อย 0/{challenge.sum_point}</Label>
                            {
                                !challenge.joined ? <Button positive floated="right">เข้าร่วมชาเล้นจ์</Button> :
                                    <Button primary floated="right" disabled>เข้าร่วมเรียบร้อยแล้ว</Button>
                            }
                        </Grid.Column>
                    </Grid>
                </Segment>
            )
        } else {
            return (
                <div>
                    Loading....
                </div>
            )
        }
    }

    durationDate = (end) => {
        const current = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
        const str = end.split('-')
        end = str[0] + '-' + parseInt(str[1] - 1) + '-' + str[2]
        var time = new moment.duration(Math.abs(new Date(current) - new Date(end)))
        return time.asDays()
    }

    renderActivites() {

        const challenge = this.props.challenge[this.props.match.params.id]
        if (challenge) {
            return (
                <Segment>
                    <Item.Group divided>
                        {
                            challenge.activities.map((act, index) => {
                                return (
                                    <Item key={index}>
                                        <Item.Image src={`https://ipfs.infura.io/ipfs/${act.image}`} size="tiny" />
                                        <Item.Content>
                                            <Item.Header as="a">{act.title}</Item.Header>
                                            <Item.Meta>ประเภท {act.category}</Item.Meta>
                                            <Item.Description>สถานที่ {act.location}</Item.Description>
                                            <Item.Extra>
                                                <Label color="blue">จำนวนเล่น {act.times} ครั้ง</Label>
                                                <Label color="green">+ {act.point} Point</Label>
                                                <Label color="green">+ {act.exp} Exp</Label>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                )
                            })
                        }
                    </Item.Group>
                </Segment>
            )
        } else {
            return null
        }
    }

    renderLeaderboard() {
        const challenge = this.props.challenge[this.props.match.params.id]
        if (challenge) {
            if (challenge.players) {
                return (
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
                                    <Table.HeaderCell>uid</Table.HeaderCell>
                                    <Table.HeaderCell>คะแนนสะสม</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    challenge.players.map((player, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    <Header as='h4' image>
                                                        <Image src={player.photo} rounded size='mini' />
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        {player.displayName}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        {player.userId}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        {player.point} / {challenge.sum_point}
                                                    </Header>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </Segment>
                )
            }
        } else {
            return null
        }
    }



    render() {
        return (
            <div className="ui container" style={{ paddingTop: 80 }}>
                {this.renderChallenge()}
                {this.renderActivites()}
                {this.renderLeaderboard()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        challenge: state.challenge,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchChallenge })(ChallengeShow)