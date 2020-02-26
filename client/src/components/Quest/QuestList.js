import React from 'react'
import { Segment, Header, Item, Label } from 'semantic-ui-react'
import ModalPost from './ModalPost'

const QuestList = props => {
    const { challenges } = props

    const onSubmit = (index, count, post) => {
        props.onSubmit(index, count, post)
    }

    return (
        <Segment raised>
            <Header as='a'>ภารกิจที่ดำเนินอยู่</Header>
            {
                challenges.map((challenge, i) => {
                    return (
                        <Segment key={i}>
                            <Header as='a'># ชาเล้นจ์ - {challenge.title}</Header>
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
                                                        <Label color="blue">{Math.abs(act.times - challenge.myActivity[index].times)} / {act.times} ครั้ง</Label>
                                                        <ModalPost 
                                                            index={challenge.index}
                                                            count={index}
                                                            onSubmit={onSubmit}
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

export default QuestList