import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMyChallenge } from '../../store/actions/challengeAction'
import photo from '../../asset/mariam/Header.jpg'
import {
    Header,
    Progress,
    Grid,
    Container,
    Image,
    Item,
    Label,
    Icon,
    Divider,
    Button,
    Segment,
    Table,
    Statistic,
    Modal,
    Card
} from 'semantic-ui-react'
import MariamSpinner from '../Layout/MariamSpinner'
import QRCode from 'qrcode.react'
import moment from 'moment'



const ShowDetail = props => {

    useEffect(() => {
        props.fetchMyChallenge(props.match.params.index)
    }, [])

    const [open, setOpen] = useState(false)
    const { challenge } = props
    const [qrcode, setQrcode] = useState(null)


    if (props.isFetch) {

        const ViewQRcode = () => (
            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header><Header as='h3'>{challenge.title}</Header></Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                        <Header>ภารกิจ</Header>
                        <p>
                            สามารถเอารูปบาร์โค้ดไปแปะตามจุดที่ต้องการให้ผู้เล่นสแกนได้เลย !
                        </p>
                        {
                            qrcode !== null &&
                            qrcode.map((res, index) => {
                                return (
                                    <Grid centered style={{ paddingTop: '1em' }} key={index}>
                                        <Card fluid>
                                            <QRCode
                                                value={res}
                                                level='M'
                                                size={290}
                                                className="ui fluid image centered"
                                                style={{ padding: '1em' }}
                                            />
                                            <Card.Content style={{ paddingTop: '1em' }}>
                                                <Card.Header># จุดที่ {index + 1}</Card.Header>
                                            </Card.Content>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => setOpen(false)}>
                        ปิด
                    </Button>
                </Modal.Actions>
            </Modal>
        )

        const handleClick = (qrcode) => {
            setQrcode(qrcode)
            setOpen(true)
        }

        const actsList = props.challenge.activities.map((act, index) =>
            <Segment.Group key={index}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image src={act.image} size="small" />
                            <Item.Content>
                                <Item.Header as='h1'>{act.title.split(':.')[0]}</Item.Header>
                                <Item.Description as='h3'>วิธีการเล่น: {act.category === 'qrcode' ? "สแกนคิวอาโค้ด" : "โพสต์รูปภาพ"} </Item.Description>
                                <Item.Description as='h3'>สถานที่เล่น: {act.title.split(':.')[1]}</Item.Description>
                                <Item.Extra style={{ textAlign: 'right' }}>
                                    <Statistic color='red' inverted>
                                        <Statistic.Value>{act.times}</Statistic.Value>
                                        <Statistic.Label style={{ color: 'black' }}>จำนวนครั้ง</Statistic.Label>
                                    </Statistic>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                        <Grid centered>
                            {
                                act.category === 'qrcode' &&
                                <Button
                                    fluid
                                    color='teal'
                                    style={{ marginBottom: '1em' }}
                                    onClick={() => handleClick(act.qrcode)}>
                                    <Icon name='qrcode' />
                                    ดู Qrcode ทั้งหมด
                                </Button>
                            }
                        </Grid>
                    </Item.Group>
                </Segment>
            </Segment.Group>
        )

        const playersList = props.challenge.players.map((player, index) =>
            <Table.Row key={index} >
                <Table.Cell >
                    <Header as='h4' image>
                        <Image src={player.photoURL} rounded size='mini' />
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4'>
                        {player.displayname}
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4'>
                        ผู้พิทักษ์
                                                </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4'>
                        <Progress value={player.point} total={challenge.sum_point} color="green" progress='ratio' />
                    </Header>
                </Table.Cell>
            </Table.Row>

        )



        return (
            <Container style={{ paddingTop: '3em' }}>
                <ViewQRcode />
                <Grid stackable >
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Image src={photo}
                                size='large'
                                style={{ borderRadius: 20 }}
                                label={{ as: 'a', corner: 'left', icon: 'gem', color: 'red' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Item>
                                <Item.Content>
                                    <Item.Header as='h1'>{challenge.title}</Item.Header>
                                    <Item.Meta as='h3'>สร้างโดย Chayut Aroonsang</Item.Meta>
                                    <Item.Description as='h4' >
                                        {challenge.desc}
                                    </Item.Description>
                                    <Item.Extra style={{ paddingTop: 10 }}>
                                        <Label size='large' color="blue">
                                            <Icon name="calendar alternate outline" />
                                            {moment(challenge.create_time).format('LL')} - {moment(challenge.end_time).format('LL')}
                                        </Label>
                                    </Item.Extra>
                                    <Item.Extra style={{ paddingTop: 10 }}>
                                        {!challenge.finished && <Label color='olive' size='large'>ชาเลนจ์เปิดอยู่</Label>}
                                        {challenge.finished && <Label color='green' size='large'>ชาเลนจ์สิ้นสุดแล้ว</Label>}
                                    </Item.Extra>
                                    <Item.Extra style={{ paddingTop: 30 }}>
                                        <Button color="red" attached="bottom" >ปิดชาเลนจ์</Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Grid.Column>


                    </Grid.Row>
                    <Divider />

                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header as='h2' floated="left" >ภารกิจ</Header>
                        </Grid.Column>

                        <Grid.Column width={16} style={{ paddingTop: '1em' }}>
                            {actsList}
                        </Grid.Column>


                    </Grid.Row>
                    <Divider />

                    <Grid.Row>
                        <Grid.Column width={16} style={{ paddingTop: '1em' }}>
                            <Header as='h2' floated="left" >กระดานคะแนน</Header>
                        </Grid.Column>
                        <Grid.Column width={16} style={{ paddingTop: '1em' }}>
                            <Segment>
                                <Table basic="very">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='4'><Header as='h3'>กระดานคะแนน</Header></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>#</Table.HeaderCell>
                                            <Table.HeaderCell>ชื่อผู้เล่น</Table.HeaderCell>
                                            <Table.HeaderCell>Rank</Table.HeaderCell>
                                            <Table.HeaderCell>คะแนนสะสม</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {playersList}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container >
        )
    } else {
        return <MariamSpinner open={true} />
    }
}

const mapStateToProps = state => {
    return {
        challenge: state.challenge.myChallenge,
        isFetch: state.challenge.getData
    }
}

export default connect(mapStateToProps, { fetchMyChallenge })(ShowDetail)