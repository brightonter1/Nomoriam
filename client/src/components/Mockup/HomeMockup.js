import React, { useState } from 'react'
import {
    Modal,
    Grid,
    Header,
    Divider,
    Segment,
    Button,
    Image,
    Label,
    Icon,
    Card,
    Feed,
    Item,
    Progress,
    Accordion,
    Placeholder
} from 'semantic-ui-react'
import photo from '../../asset/mariam/logo.png'
import rank from '../../asset/Rank/rank_mid_01.png'
import qrcode from '../../asset/category/qrcodeIcon.png'
import post from '../../asset/category/postIcon.png'
import organize from '../../asset/icon/orgranize.png'

const HomeMockup = (props) => {

    const [modal, setModal] = useState(false)


    const items = [
        {
            image: photo,
            timestamp: '1 hours ago',
            displayname: 'chayut aroonsang',
            caption: 'Nomoriam World Wide',
            photoURL: photo
        },
        {
            image: photo,
            timestamp: '1 hours ago',
            displayname: 'chayut aroonsang',
            caption: 'Nomoriam World Wide',
            photoURL: photo
        },
        {
            image: photo,
            timestamp: '1 hours ago',
            displayname: 'chayut aroonsang',
            caption: 'Nomoriam World Wide',
            photoURL: photo
        },
        {
            image: photo,
            timestamp: '1 hours ago',
            displayname: 'chayut aroonsang',
            caption: 'Nomoriam World Wide',
            photoURL: photo
        },
        {
            image: photo,
            timestamp: '1 hours ago',
            displayname: 'chayut aroonsang',
            caption: 'Nomoriam World Wide',
            photoURL: photo
        }
    ]

    const itemList = items.map((post, index) =>
        <Grid.Column key={index} style={{ paddingTop: '1em' }}>
            <Card fluid >
                <Image src={post.image} centered style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }} />
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image={post.photoURL} />
                            <Feed.Content>
                                <Feed.Date content={post.timestamp} />
                                <Feed.Summary>
                                    <Feed.User>
                                        {post.displayname}
                                    </Feed.User> ได้โพสต์
                                    </Feed.Summary>
                                {/* <Feed.Date content={post.signTransaction} /> */}

                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                    <Card.Description>
                        {post.caption}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='like' />
                        22
                                    </a>
                </Card.Content>
            </Card>
        </Grid.Column>
    )

    const activities = [
        {
            image: photo,
            title: 'แคมเปญ:,ลาดกระบัง',
            category: 'post',
            myTimes: 2,
            times: 4,
            point: 200,
            exp: 300
        }
    ]

    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

    const ActivityBtn = (
        <Modal
            trigger={<Button color='green' floated='right' size='small' onClick={() => setModal(true)}>ดูภารกิจทั้งหมด</Button>}
            open={modal}
            onClose={() => setModal(false)}
            basic
            size='small'
            centered={false}
        >

            <Modal.Header >
                <Header as='h2' icon='browser' content='ภารกิจ' floated='left' style={{ color: 'white' }} />
                <Header icon='close' floated='right' onClick={() => setModal(false)} style={{ cursor: 'pointer' }} style={{ color: 'white' }} />
            </Modal.Header>

            <Modal.Content image scrolling style={{ paddingTop: '0em' }}>
                <Modal.Description>
                    <Item.Group unstackable >
                        <Item style={{ backgroundColor: 'white', padding: '1.5em 1.5em 1em 1.5em', borderRadius: '25px' }}>
                            <Item.Image size='tiny' src={organize} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header>ลดการใช้ถุงพลาสติก</Item.Header>
                                <Item.Description >
                                    <p>สถานที่ : มหาวิทยาลัย</p>
                                    <p>จำนวนครั้ง</p>
                                    <Progress value='3' total='5' progress='ratio'
                                        color='red' style={{ backgroundColor: '#e5e5e5', margin: '0em 0em 0em' }}
                                    >
                                    </Progress>
                                </Item.Description>
                                <Item.Description >
                                    <Label.Group >
                                        เป้าหมาย : &nbsp;
                                    <Label as='a' tag color='yellow' content="ลดการใช้" style={{ fontSize: '0.7em' }} />
                                        <Label as='a' tag color='orange' content="รีไซเคิล " style={{ fontSize: '0.7em' }} />
                                    </Label.Group>
                                    <Label.Group >

                                        <Label icon='leaf' color='green' content={'+300'} />
                                        <Label color='blue' content={'EXP +500'} />
                                    </Label.Group>
                                    <Button color='orange' floated='right' size='tiny' style={{ borderRadius: '25px' }}>
                                        <Label as='a' image color='orange' >
                                            <img src={qrcode} />สแกนคิวอาโค้ด
                                    </Label>

                                        <Icon name='right chevron' />
                                    </Button>
                                </Item.Description>
                            </Item.Content>
                        </Item>

                        <Item style={{ backgroundColor: 'white', padding: '1.5em 1.5em 1em 1.5em', borderRadius: '25px' }}>
                            <Item.Image size='tiny' src={organize} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header>ลดการใช้ถุงพลาสติก</Item.Header>
                                <Item.Description >
                                    <p>สถานที่ : มหาวิทยาลัย</p>
                                    <p>จำนวนครั้ง</p>
                                    <Progress value='3' total='5' progress='ratio'
                                        color='red' style={{ backgroundColor: '#e5e5e5', margin: '0em 0em 0em' }}
                                    />
                                </Item.Description>
                                <Item.Description >
                                    <Label.Group >
                                        เป้าหมาย : &nbsp;
                                    <Label as='a' tag color='yellow' content="ลดการใช้" style={{ fontSize: '0.7em' }} />
                                        <Label as='a' tag color='orange' content="รีไซเคิล " style={{ fontSize: '0.7em' }} />
                                    </Label.Group>
                                    <Label.Group >

                                        <Label icon='leaf' color='green' content={'+300'} />
                                        <Label color='blue' content={'EXP +500'} />
                                    </Label.Group>
                                    <Button color='orange' floated='right' size='tiny' style={{ borderRadius: '25px' }}>
                                        <Label as='a' image color='orange' >
                                            <img src={post} />โพสต์รูปภาพ
                                    </Label>

                                        <Icon name='right chevron' />
                                    </Button>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Modal.Description>
            </Modal.Content>

        </Modal>
    )

    const profileBar = (
        <Grid.Column >
            <Segment color='olive'>
                <Item.Group unstackable >
                    <Item>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg'>
                            {/* <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder> */}
                        </Item.Image>

                        <Item.Content>
                            <Item.Header>
                                <span>
                                    Stevie Feliciano&nbsp;
                                </span>
                            </Item.Header>

                            <Item.Content>
                                {/* <Placeholder>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='short' />
                                        <Placeholder.Line length='very short' />
                                        <Placeholder.Line length='short' />
                                        <Placeholder.Line length='very short' />
                                    </Placeholder.Header>
                                </Placeholder> */}
                                <span>
                                    <Item.Image src={rank} size='mini' />
                                    Rank : ผู้พิทักษ์&nbsp;&nbsp;&nbsp;
                                    <Icon name='leaf' color='green' size='large' />
                                    2000 แต้ม (POINT)
                                </span>

                                <Item.Description >
                                    {/* <p><Icon name='leaf' color='green' /> 2000 แต้ม (POINT)</p> */}
                                    <p>ค่าประสบการณ์ (EXP)</p>
                                    <Progress color='orange' value={300} autoSuccess total={500} progress='ratio' active style={{ width: '400px', margin: '0em 0em 0em' }} />
                                    {/* <Progress color='orange' indicating percent={80} active style={{ width: '300px', marginTop: '1em' }} disabled /> */}
                                </Item.Description>
                            </Item.Content>
                            <Item.Extra>
                                {ActivityBtn}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    )

    return (
        <Grid stackable style={{ paddingTop: '3em', minHeight: 600 }} container>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h2' color="blue">
                        <Icon name='address card outline' color="blue" />
                        <Header.Content >
                            สถานะผู้เล่น
                            <Header.Subheader>รายละเอียดข้อมูลผู้เล่น</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {profileBar}
            </Grid.Row>
            <Divider />
            <Grid.Row>
                <Grid.Column >
                    <Header as='h2' color="orange">
                        <Icon name='globe' color="red" />
                        <Header.Content >
                            ความเคลื่อนไหวภารกิจทั้งหมด
                                    <Header.Subheader></Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
                {itemList}
            </Grid.Row>
        </Grid>
    )
}

export default HomeMockup