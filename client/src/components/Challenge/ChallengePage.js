import React from 'react'
import { Grid, Image, Header, Card, Icon, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchChallenges, joinChallenge } from '../../store/actions/challengeAction'
import moment from 'moment'

class ChallengePage extends React.Component {

    constructor(props) {
        super(props)
        this.handleOnJoin = this.handleOnJoin.bind(this)
        this.state = {
            isClick: false
        }
    }

    componentDidMount() {
        try {
            this.props.fetchChallenges(this.props.userId)
        }catch(err){

        }
    }


    handleOnJoin = (userId, index) => {
        this.props.joinChallenge(userId, index)
        this.setState({ isClick: true })
    }

    componentWillReceiveProps() {
        this.props.fetchChallenges(this.props.userId)
    }

    renderList() {
        if (this.props.challenges) {
            return (
                <Grid style={{ paddingTop: 50 }} stackable columns={2}>
                    {
                        this.props.challenges.map((challenge, index) => {
                            return (
                                this.checkDate(challenge.create_time) ?
                                    <Grid.Column key={index}>
                                        <Card fluid>
                                            <Image src={`https://ipfs.infura.io/ipfs/${challenge.image}`} />
                                            <Card.Content>
                                                <Card.Header><Link to={`/challenges/${index}/show`}>{challenge.title}</Link></Card.Header>
                                                <Card.Meta>
                                                    <span className='date'>ผู้สร้าง {challenge.displayName}</span>
                                                </Card.Meta>
                                                <Card.Description>

                                                </Card.Description>
                                            </Card.Content>

                                            <Card.Content extra>
                                                <Label color="orange">
                                                    <Icon name="calendar alternate outline" />
                                                    เหลืออีก {this.durationDate(challenge.end_time)} วัน
                                            </Label>
                                                <Label color="green">
                                                    <Icon name="plus" />
                                                    {challenge.sum_point} แต้ม
                                            </Label >
                                                {
                                                    this.checkDate(challenge.create_time) ? <Label color="blue">ชาเล้นจ์เปิดอยู่</Label> : null
                                                }
                                            </Card.Content>
                                            {
                                                !challenge.joined ?
                                                    <Button
                                                        name={`${challenge}.${index}`}
                                                        basic color="green"
                                                        onClick={(e) => this.handleOnJoin(this.props.userId, index)}
                                                        loading={this.state.isClick && this.props.isJoined}
                                                    >เข้าร่วมชาเล้นจ์</Button>
                                                    :
                                                    <Button
                                                        color="blue"
                                                        disabled
                                                    >เข้าร่วมเรียบร้อยแล้ว</Button>
                                            }
                                        </Card>
                                    </Grid.Column>
                                    : null
                            )
                        })
                    }
                </Grid>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }

    checkDate = start => {
        const str = start.split('-')
        const current = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
        start = str[0] + '-' + parseInt(str[1] - 1) + '-' + str[2]
        return (new Date(current).getTime() >= new Date(start).getTime())
    }


    durationDate = (end) => {
        const current = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
        const str = end.split('-')
        end = str[0] + '-' + parseInt(str[1] - 1) + '-' + str[2]
        var time = new moment.duration(Math.abs(new Date(current) - new Date(end)))
        return time.asDays()
    }

    render() {
        return (
            <div className="ui container" style={{ paddingTop: 60 }}>
                <Header as="h2" style={{ paddingTop: 30 }}>ชาเล้นจ์</Header>
                <Link to="/challenges/new" className="ui right floated button primary">สร้างภารกิจ</Link>
                <div className="ui">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    var joined = state.challenge.isJoined ? false : true
    return {
        challenges: state.challenge.challenges,
        userId: state.auth.userId,
        isJoined: joined
    }
}


export default connect(mapStateToProps, { fetchChallenges, joinChallenge })(ChallengePage)