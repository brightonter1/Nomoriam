import React from 'react'
import { Segment, Item, Header, Button, Label, Icon, Modal, Grid } from 'semantic-ui-react'
import { doPost } from '../../store/actions/authAction'
import { connect } from 'react-redux'
import _ from 'lodash'
import ModalForm from './ModalForm'


class ActivityBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isClick: false
        }
    }

    onClickActivity = (index, count, post) => {
        this.props.doPost(index, count, this.props.userId, post)
    }

    render() {
        const challenges = this.props.myChallenge
        console.log(challenges)
        return (
            <Segment raised>
                <Header as='h3'>ภารกิจที่ดำเนินการอยู่</Header>
                {
                    challenges.map((challenge, i) => {
                        return (
                            <Segment key={i}>
                                <Header as='h5'># ชาเล้นจ์ - {challenge.title}</Header>
                                <Item.Group>
                                    {
                                        challenge.activities.map((act, index) => {
                                            return (
                                                <Item key={`${index}.${i}`}>
                                                    <Item.Image src={`https://ipfs.infura.io/ipfs/${act.image}`} size="tiny" />
                                                    <Item.Content>
                                                        <Item.Header>{act.title}</Item.Header>
                                                        <Item.Meta>ประเภท {act.category}</Item.Meta>
                                                        <Item.Extra>
                                                            <Label color="green">+ {act.point} point</Label>
                                                            <Label color="orange">+ {act.exp} exp</Label>
                                                            <Label color="blue">{Math.abs(act.times - challenge.myActivity[index].times)} / {act.times}</Label>
                                                            {/* <Button
                                                                primary floated='right'
                                                                onClick={e => { this.onClickActivity(act.category, challenge.index, index) }}
                                                            >
                                                                เล่น
                                                                <Icon name='right chevron' />
                                                            </Button> */}
                                                            <ModalForm
                                                                index={challenge.index}
                                                                count={index}
                                                                onSubmit={this.onClickActivity}
                                                            />
                                                        </Item.Extra>

                                                    </Item.Content>
                                                </Item>
                                            )
                                        })
                                    }
                                </Item.Group>
                            </Segment>
                        )
                    })
                }

            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { doPost })(ActivityBar)
