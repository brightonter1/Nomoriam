import React, { useEffect } from 'react'
import {
    Grid,
    Header,
    Button,
    Divider,
    Icon,
    Item,
    Label,
    Placeholder
} from 'semantic-ui-react'
import history from '../../api/history'
import { connect } from 'react-redux'
import { fetchMyChallenges, cleanUp } from '../../store/actions/challengeAction'
import moment from 'moment'

const StatusPage = props => {

    useEffect(() => {
        props.fetchMyChallenges()
    }, [props.isFetch])

    useEffect(() => {
        return () => {
            props.cleanUp()
        }
    }, [])

    console.log(props)


    const itemList = (
        <Grid.Column>
            <Item.Group >
                <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                    <div className="ui small image">
                        <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder>
                    </div>

                    <Item.Content>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                            </Placeholder.Paragraph>
                        </Placeholder>
                        <Item.Extra>
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Item.Extra>

                        <Item.Extra>
                            <Button primary floated='right' disabled>
                                ดูรายละเอียด
                                <Icon name='right chevron' />
                            </Button>
                        </Item.Extra>

                    </Item.Content>
                </Item>
            </Item.Group>
        </Grid.Column>
    )

    if (props.isFetch) {
        const itemApproved = (
            <Grid.Column>
                <Item.Group >
                    {
                        props.challengeApproved.map((challenge, index) => (
                            <Item key={index} style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src={challenge.image}
                                />
                                <Item.Content>
                                    <Item.Header>{challenge.title}</Item.Header>
                                    <Item.Description style={{ color: 'cadetblue' }}>
                                        <p>สร้างเมื่อ {moment(challenge.create_time.split('>time<')[1], 'DD-MM-YYYY HH:mm:ss').format('LL')}</p>
                                    </Item.Description>
                                    <Item.Description>
                                        &nbsp;&nbsp;{challenge.desc}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Label color='red' icon='tasks' content={`จำนวน ${challenge.actCount} ภารกิจ`} />
                                        {
                                            !challenge.approved ? <Label icon='group' color='yellow' content='รอการตรวจสอบ' />
                                                :
                                                <Label icon='group' color='green' content='ได้รับการยืนยันเรียบร้อยแล้ว' />
                                        }

                                    </Item.Extra>

                                    <Item.Extra>
                                        <Button primary floated='right' onClick={() => history.push(`/account/status/${challenge.index}/show`)}>
                                            ดูรายละเอียด
                                    <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>

                                </Item.Content>
                            </Item>
                        ))
                    }
                </Item.Group>
            </Grid.Column>
        )

        const itemApprove = (
            <Grid.Column>
                <Item.Group >
                    {
                        props.challengeNotApprove.map((challenge, index) => (
                            <Item key={index} style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src={challenge.image}
                                />

                                <Item.Content>

                                    <Item.Header>{challenge.title}</Item.Header>
                                    <Item.Description style={{ color: 'cadetblue' }}>
                                        <p>สร้างเมื่อ {moment(challenge.timestamp, 'DD-MM-YYYY HH:mm:ss').format('LL')}</p>

                                    </Item.Description>
                                    <Item.Description>
                                        &nbsp;&nbsp;{challenge.desc}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Label color='red' icon='tasks' content={`จำนวน ${challenge.activities.length} ภารกิจ`} />
                                        {
                                            !challenge.approved ? <Label icon='group' color='yellow' content='รอการตรวจสอบ' />
                                                :
                                                <Label icon='group' color='green' content='ได้รับการยืนยันเรียบร้อยแล้ว' />
                                        }
                                    </Item.Extra>

                                    {/* <Item.Extra>
                                        <Button primary floated='right' onClick={() => history.push(`/account/status/${challenge.documentId}/show`)}>
                                            ดูรายละเอียด
                                    <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra> */}

                                </Item.Content>
                            </Item>
                        ))
                    }
                </Item.Group>
            </Grid.Column>
        )

        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>

                <Grid.Row columns='equal' >
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='flag checkered' color="olive" />
                            <Header.Content >
                                ชาเลนจ์ที่รอการยืนยัน
                                        <Header.Subheader>เลือกดูรายละเอียดชาเลนจ์</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row columns='equal'>
                    {
                        props.challengeNotApprove.length > 0 ? itemApprove
                            :
                            <Grid.Column width={16}>
                                <Header as='h2' style={{ textAlign: 'center', color: 'lightsteelblue', paddingTop: '2em' }} >
                                    ยังไม่มีชาเลนจ์ที่รอยืนยัน
                               </Header>
                            </Grid.Column>
                    }
                </Grid.Row>


                <Grid.Row columns='equal' >
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='flag checkered' color="olive" />
                            <Header.Content >
                                ชาเลนส์ที่ยืนยันแล้ว
                                        <Header.Subheader>เลือกดูรายละเอียดชาเลนจ์</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row columns='equal'>
                    {
                        props.challengeApproved.length > 0 ? itemApproved
                            :
                            <Grid.Column width={16}>
                                <Header as='h2' style={{ textAlign: 'center', color: 'lightsteelblue', paddingTop: '2em' }} >
                                    ยังไม่มีชาเลนจ์ที่ยืนยันแล้ว
                               </Header>
                            </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
        )
    } else {
        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>

                <Grid.Row columns='equal' >
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='flag checkered' color="olive" />
                            <Header.Content >
                                ชาเลนจ์ที่รอการยืนยัน
                                        <Header.Subheader>เลือกดูรายละเอียดชาเลนจ์</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row columns='equal'>
                    {itemList}
                </Grid.Row>


                <Grid.Row columns='equal' >
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='flag checkered' color="olive" />
                            <Header.Content >
                                ชาเลนส์ที่ยืนยันแล้ว
                                        <Header.Subheader>เลือกดูรายละเอียดชาเลนจ์</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row columns='equal'>
                    {itemList}
                </Grid.Row>
            </Grid>
        )
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