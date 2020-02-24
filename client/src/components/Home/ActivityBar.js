import React from 'react'
import { Segment, Item, Header, Button, Label, Icon } from 'semantic-ui-react'
import _ from 'lodash'

class ActivityBar extends React.Component {

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
                                                            <Button primary floated='right'>
                                                                เล่น
                                                                <Icon name='right chevron' />
                                                            </Button>
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

export default ActivityBar
