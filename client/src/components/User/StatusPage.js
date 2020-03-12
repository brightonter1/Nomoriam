import React, { useEffect } from 'react'
import {
    Grid,
    Container,
    Header,
    Icon,
    Image,
    Divider,
    Segment,
    Item,
    Button,
    Label
}
    from 'semantic-ui-react'
import history from '../../api/history'
import { connect } from 'react-redux'
import { fetchMyChallenges, cleanUp } from '../../store/actions/challengeAction'
import MariamSpinner from '../Layout/MariamSpinner'

const StatusPage = props => {
    useEffect(() => {
        props.fetchMyChallenges()
    }, [props.isFetch])

    useEffect(() => {
        return () => {
            props.cleanUp()
        }
    }, [])

    if (props.isFetch) {

        const approvedList = props.challengeApproved.map((challenge, index) => (
            <Container key={index}>
                <Grid.Column width={16}>
                    <Segment raised>
                        <Item.Group>
                            <Item>
                                <Item.Image src={challenge.image} />

                                <Item.Content>
                                    <Item.Header as='a'>{challenge.title}</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>สร้างเมื่อ {challenge.create_time}</span>
                                    </Item.Meta>
                                    <Item.Description>{challenge.desc}</Item.Description>
                                    <Item.Extra>
                                        {
                                            challenge.approved &&
                                            <Label size='large' color='green'>ได้รับการยืนยันเรียบร้อยแล้ว</Label>
                                        }
                                        {
                                            challenge.finished ?
                                                <Label size='large' color='green'>ชาเลนจ์สิ้นสุดแล้ว</Label>
                                                :
                                                <Label size='large' color="yellow">ชาเลนจ์กำลังดำเนินการอยู่</Label>
                                        }
                                        <Button primary floated='right' onClick={() => history.push(`/account/status/${challenge.index}/show`)} >
                                            ดูรายละเอียด
                                                <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Grid.Column>
            </Container>
        ))

        const notApproveList = props.challengeNotApprove.map((challenge, index) => (
            <Container key={index}>
                <Grid.Column width={16}>
                    <Segment raised>
                        <Item.Group>
                            <Item>
                                <Item.Image src={challenge.image} />
                                <Item.Content>
                                    <Item.Header as='a'>{challenge.title}</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>สร้างเมื่อ {challenge.create_time}</span>
                                    </Item.Meta>
                                    <Item.Description>{challenge.desc}</Item.Description>
                                    <Item.Extra>
                                        {
                                            !challenge.approved &&
                                            <Label size='large' color='olive'>รอการตรวจสอบ</Label>
                                        }
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Grid.Column>
            </Container>
        ))


        return (
            <Grid style={{ paddingTop: '3em', minHeight: 600 }} stackable >
                <Container>
                    <Grid.Row >
                        <Grid.Column floated="left" width={16}>
                            <Header as='h1' color="orange">
                                <Icon name='flag checkered' color="olive" />
                                <Header.Content >
                                    ชาเลนส์ที่ยืนยันแล้ว
                                        <Header.Subheader>เลือกเพื่อดูรายละเอียดชาเลนจ์</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Divider />
                    </Grid.Row>
                </Container>
                <Grid.Row>
                    {
                        approvedList.length === 0 ?
                            <Container>
                                <Grid.Column width={16}>
                                    <a>ไม่พบชาเลนจ์ที่ยืนยันแล้ว</a>
                                </Grid.Column>
                            </Container>
                            : approvedList
                    }
                </Grid.Row>

                <Container style={{ paddingTop: '3em' }} >
                    <Grid.Row >
                        <Grid.Column floated="left" width={16}>
                            <Header as='h1' color="olive">
                                <Icon name='flag checkered' color="olive" />
                                <Header.Content >
                                    ชาเลนจ์ที่รอการยืนยัน
                                        <Header.Subheader>เลือกเพื่อดูรายละเอียดชาเลนจ์</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Divider />
                    </Grid.Row>
                </Container>
                <Grid.Row>
                    {
                        notApproveList.length === 0 ?
                            <Container>
                                <Grid.Column width={16}>
                                    <a>ไม่พบชาเลนจ์ที่ยังไม่ได้ยืนยัน</a>
                                </Grid.Column>
                            </Container>
                            : notApproveList
                    }
                </Grid.Row>
            </Grid>
        )
    } else {
        return <MariamSpinner open={true} />
    }
}

const mapStateToProps = state => {
    return {
        isFetch: state.challenge.isAllFetch,
        challengeApproved: state.challenge.challengeApproved,
        challengeNotApprove: state.challenge.challengeNotApprove
    }
}

export default connect(mapStateToProps, { fetchMyChallenges, cleanUp })(StatusPage)