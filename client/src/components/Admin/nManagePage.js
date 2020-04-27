import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchChallengeOnApprove } from '../../store/actions/challengeAction'
import {
    Item,
    Header,
    Icon,
    Grid,
    Divider,
    Button,
    Placeholder,
    Label
} from 'semantic-ui-react'
import history from '../../api/history'

const ManagePage = props => {

    const { onApprove, isFetch } = props

    useEffect(() => {
        props.fetchChallengeOnApprove()
    }, [])

    const itemList = (
        <Grid.Column style={{ paddingTop: '1em' }}>
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


    if (onApprove) {
        console.log(onApprove)
        const itemApprove = (
            <Grid.Column style={{ paddingTop: '1em' }}>
                <Item.Group >
                    {
                        onApprove.map((challenge, index) => (
                            <Item key={index} style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src={challenge.image} />
                                <Item.Content>

                                    <Item.Header>{challenge.title}</Item.Header>
                                    <Item.Description style={{ color: 'cadetblue' }}>
                                        <p>สร้างโดย {challenge.owner}</p>

                                    </Item.Description>
                                    <Item.Description>
                                        &nbsp;&nbsp; {challenge.desc}
                                    </Item.Description>
                                    <Item.Extra>
                                        {
                                            !challenge.approved ? <Label icon='group' color='yellow' content='รอการตรวจสอบ' />
                                                :
                                                <Label icon='group' color='green' content='ได้รับการยืนยันเรียบร้อยแล้ว' />
                                        }

                                    </Item.Extra>

                                    <Item.Extra>
                                        <Button primary floated='right' onClick={() => history.push(`/admin/manage/${challenge.documentId}`)}>
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

        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='settings' color="olive" />
                            <Header.Content >
                                จัดการชาเลนจ์
                            <Header.Subheader >เลือกชาเลนจ์และตรวจสอบ</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row columns='1'  >
                    {
                        (isFetch && onApprove.length > 0) ? itemApprove
                            :
                            <Grid.Column width={16}>
                                <Header as='h2' style={{ textAlign: 'center', color: 'lightsteelblue', paddingTop: '2em' }} >
                                    ไม่พบชาเลนจ์ที่ยืนยันแล้ว
                               </Header>
                            </Grid.Column>
                    }

                </Grid.Row>
            </Grid>
        )
    } else {
        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='settings' color="olive" />
                            <Header.Content >
                                จัดการชาเลนจ์
                            <Header.Subheader >เลือกชาเลนจ์และตรวจสอบ</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row columns='1'>
                    {itemList}
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetch: state.challenge.isFetching,
        onApprove: state.challenge.onApprove
    }
}

export default connect(mapStateToProps, { fetchChallengeOnApprove })(ManagePage)