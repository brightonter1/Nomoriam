import React, { useEffect, useState } from 'react'
import { Header, Grid, Container, Image, Item, Label, Icon, Divider, Button, Segment, Statistic } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchChallengeByIndex, approveChallenge, fetchChallengeByIndexCleanUp, cleanUp } from '../../store/actions/challengeAction'
import post from '../../asset/category/post.png'
import qrcode from '../../asset/category/qrcode.png'
import MariamSpinner from '../Layout/MariamSpinner'
import history from '../../api/history'
import { alertAction } from '../Challenge/Form'

const ChallengeShow = props => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        props.fetchChallengeByIndex(props.match.params.index)
        if (props.isCompleted === true) {
            setOpen(false)
            alertAction("ยืนยันชาเลนจ์เสร็จสิ้น", props.txHash, 'success')
        }
    }, [props.isCompleted])

    useEffect(() => {
        return () => {
            props.fetchChallengeByIndexCleanUp()
            props.cleanUp()
        }
    }, [])


    const { challenge } = props

    const handleSubmit = (challenge) => {
        setOpen(true)
        props.approveChallenge(challenge)
    }

    if (challenge) {
        const listAct = challenge.activities.map((act, index) =>
            <Grid.Column width={16} style={{ paddingTop: '1em' }} key={index}>
                <Segment>
                    <Item.Group>
                        <Item>
                            {act.category === 'post' && <Item.Image src={post} size="small" />}
                            {act.category === 'qrcode' && <Item.Image src={qrcode} size="small" />}

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

        return (
            <React.Fragment>
                <Button primary style={{ marginTop: '3em' }} onClick={e => history.push('/admin/manage')}><Icon name="arrow left" />ย้อนกลับ</Button>
                <Container style={{ paddingTop: '3em' }}>
                    <Grid stackable >
                        <Grid.Row >
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
                                        <Item.Meta as='h3'>สร้างโดย {challenge.owner}</Item.Meta>
                                        <Item.Description as='h4' >
                                            รายละเอียด - {challenge.desc}
                                        </Item.Description>
                                        <Item.Extra style={{ paddingTop: 10 }}>
                                            <Label size='large' color="blue">
                                                <Icon name="calendar alternate outline" />
                                                วันที่ {challenge.create_time} - {challenge.end_time}
                                            </Label>
                                        </Item.Extra>
                                        <Item.Extra style={{ paddingTop: 30 }}>
                                            {!challenge.approved && <Button basic color="green" attached="bottom" onClick={e => handleSubmit(challenge)}>ตรวจสอบและยืนยัน</Button>}
                                            {challenge.approved && <Button color="green" attached="bottom" disabled>ยืนยันเรียบร้อยแล้ว</Button>}
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as='h2' floated="left" >ภารกิจ</Header>
                            </Grid.Column>
                            {listAct}
                        </Grid.Row>
                        <Divider />
                    </Grid>
                </Container>
                <MariamSpinner open={open} />
            </React.Fragment>
        )
    } else {
        return <MariamSpinner open={true} />
    }
}
const mapStateToProps = state => {
    return {
        challenge: state.challenge.challenge,
        isCompleted: state.challenge.isCompleted,
        message: state.challenge.txHash
    }
}

export default connect(mapStateToProps, { fetchChallengeByIndex, approveChallenge, fetchChallengeByIndexCleanUp, cleanUp })(ChallengeShow)