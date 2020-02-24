import React, { useState } from 'react'
import { Segment, Button, Header, Item, Label, Modal, Icon, Grid } from 'semantic-ui-react'
import Post from '../../asset/blog.png'
import Question from '../../asset/discuss-issue.png'
import Qrcode from '../../asset/qr-code.png'

const ChallengeList = props => {
    const challenges = props.challenges

    const handleSubmit = (challenge, activities) => {
        props.onSubmit(challenge, activities)
        setLoading(true)
    }


    const [process, setProcess] = useState(props.isLoading)
    const [loading, setLoading] = useState(false)


    return challenges.map((challenge, index) => {
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
                                    <Button positive floated="right" onClick={e => handleSubmit(challenge, challenge.activities)}>ยืนยัน</Button>
                                    <Button negative floated="right" >ปฏิเสธ</Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                    <Modal
                        dimmer='blurring'
                        open={process && loading}
                        size='mini'
                        style={{ padding: 50 }}
                    >
                        <Grid centered>
                            <div>
                                <Icon
                                    name="spinner"
                                    loading={process && loading}
                                    size="huge"
                                >
                                </Icon>
                                <p><span >กำลังบันทึกข้อมูล....</span></p>
                            </div>
                        </Grid>
                    </Modal>
                </Segment>
            </Segment.Group>
        )
    })
}

const renderAct = (act) => {
    return (
        <Segment.Group>
            {
                act.map((act, index) => {
                    var image = act.type === 'post' ? Post : act.type === 'question' ? Question : Qrcode
                    var type = act.type === 'post' ? "โพสต์รูปภาพพร้อมแคปชัน" : act.type === 'question' ? "ตอบคำถาม" : "สแกนคิวอาโค้ด"
                    return (
                        <Segment raised key={index}>
                            <Header as="h4"># {index + 1} ภารกิจ</Header>
                            <Item.Group divided>
                                <Item>
                                    <Item.Image src={image} size='small' />

                                    <Item.Content>
                                        <Item.Header as='a'>{act.title}</Item.Header>
                                        <Item.Meta>
                                            <span className='cinema'>{type}</span>
                                        </Item.Meta>
                                        <Item.Description>สถานที่ {act.location}</Item.Description>
                                        <Item.Extra>
                                            <Label>จำนวนครั้ง {act.times}</Label>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>
                    )
                })
            }
        </Segment.Group>
    )
}

export default ChallengeList