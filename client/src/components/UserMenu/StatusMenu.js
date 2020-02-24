import React from 'react'
import { connect } from 'react-redux'
import { Image, Segment, Header, Item, Button, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { fetchChallengesByOwner } from '../../store/actions/authAction'

class StatusMenu extends React.Component {


    componentDidMount() {
        this.props.fetchChallengesByOwner(this.props.match.params.userId)
    }


    render() {
        console.log(this.props.myChallenge)
        if (this.props.myChallenge) {
            return (
                <div className="ui container" style={{ paddingTop: 80 }}>
                    {this.renderOnApprove()}
                    {this.renderOnApproved()}
                    {this.renderOnFished()}
                </div>
            )
        } else {
            return (
                <div className="ui container" style={{ paddingTop: 80 }}>
                    ยังไม่มีชาเล้นจ์ของตัวเอง
                </div>
            )
        }
    }

    renderList = (challenge, index) => {
        return (
            <Segment.Group key={index}>
                <Segment raised >
                    <Header as="h2"># {index + 1}</Header>
                    <Item.Group divided>
                        <Item >
                            <Item.Image src={`https://ipfs.infura.io/ipfs/${challenge.image}`} />
                            <Item.Content>
                                <Item.Header as='a'>{challenge.name}</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>{challenge.owner}</span>
                                </Item.Meta>
                                <Item.Description>{challenge.desc}</Item.Description>
                                <Item.Extra>
                                    <Label>วันที่เริ่ม {challenge.start_time}</Label>
                                    <Label>วันสิ้นสุด {challenge.end_time}</Label>
                                    {challenge.approve ? <Label color='green'>ยืนยันเรียบร้อยแล้ว</Label> : <Label color='blue'>รอการยืนยัน</Label>}
                                    {challenge.approve && challenge.finish ? <Label color='teal'>ชาเล้นจ์สิ้นสุดเรียบร้อยแล้ว</Label> :
                                        challenge.approve && !challenge.finish ? <Label color='green'>ชาเล้นจ์ยังดำเนินการอยู่</Label> : null}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment.Group>
        )
    }


    renderOnApproved() {
        const result = _.filter(this.props.myChallenge, { 'approve': true, 'finish': false })
        return (
            <Segment>
                <Header>ชาเล้นจ์ที่ยืนยันแล้ว</Header>
                {result.map((challenge, index) => {
                    return this.renderList(challenge, index)
                })}
            </Segment>
        )
    }

    renderOnApprove() {
        const result = _.filter(this.props.myChallenge, { 'approve': false })
        return (
            <Segment>
                <Header>รอการยืนยันชาเล้นจ์</Header>
                {result.map((challenge, index) => {
                    return this.renderList(challenge, index)
                })}
            </Segment>
        )
    }

    renderOnFished() {
        const result = _.filter(this.props.myChallenge, { 'approve': true, 'finish': true })
        return (
            <Segment>
                <Header>ชาเล้นจ์ที่สิ้นสุดแล้ว</Header>
                {result.map((challenge, index) => {
                    return this.renderList(challenge, index)
                })}
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        myChallenge: state.auth.myChallenge
    }
}

export default connect(mapStateToProps, { fetchChallengesByOwner })(StatusMenu)