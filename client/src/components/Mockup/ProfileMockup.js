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
    Placeholder,
    Table,
    Statistic,
    Menu
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import gold from '../../asset/archievement/gold.png'
import silver from '../../asset/archievement/silver.png'
import bronze from '../../asset/archievement/bronze.png'
import award from '../../asset/archievement/award.png'
import rank from '../../asset/Rank/rank_mid_01.png'
import history from '../../api/history'


const ProfileMockup = (props) => {

    const [active, setActive] = useState('สถานะ')

    const Status = () => (
        <Segment style={{ minHeight: 450 }}>
            <Item.Group>
                <Item style={{ paddingTop: '1em', paddingLeft: '1em' }}>
                    <Item.Image src={rank} size='small' />
                    <Item.Content style={{ paddingTop: '1em' }}>
                        <Item.Header as='a' floated='left' >Rank: ผู้พิทักษณ์</Item.Header>
                        <Item.Meta >
                            <Label color='green'>
                                <Icon name='leaf' />
                            </Label> {3000} แต้ม (POINT)
                        </Item.Meta>
                        <Item.Description>
                            ค่าประสบการณ์ (EXP)
                            <Progress value='300' total='700' progress='ratio' color='red' style={{ backgroundColor: '#e5e5e5', margin: '0em 0em 0em', width: 400 }} />
                        </Item.Description>

                    </Item.Content>
                </Item>
            </Item.Group>

            <Grid centered style={{ paddingTop: '4em', paddingLeft: '1em' }} >
                <Grid.Column width={3} textAlign='center' >
                    <Item.Group>
                        <Image src={gold} size='tiny' centered />
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>
                                    <Label circular color='yellow' content={3} size='large' />
                                </Item.Header>
                                <Item.Description>
                                    <Item.Header as='h3'>ผู้ชนะอันดับที่ 1</Item.Header>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3} textAlign='center'>
                    <Item.Group>
                        <Image src={silver} size='tiny' centered />
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>
                                    <Label circular color='blue' content={4} size='large' />
                                </Item.Header>
                                <Item.Description>
                                    <Item.Header as='h3'>ผู้ชนะอันดับที่ 2</Item.Header>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3} textAlign='center'>
                    <Item.Group>
                        <Image src={bronze} size='tiny' centered />
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>
                                    <Label circular color='brown' content={5} size='large' />
                                </Item.Header>
                                <Item.Description>
                                    <Item.Header as='h3'>ผู้ชนะอันดับที่ 3</Item.Header>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3} textAlign='center'>
                    <Item.Group>
                        <Image src={award} size='tiny' centered />
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>
                                    <Label circular color='green' content={8} size='large' />
                                </Item.Header>
                                <Item.Description>
                                    <Item.Header as='h3'>รางวัลการเข้าร่วม</Item.Header>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )

    const Reward = () => {
        return (
            <Segment style={{ minHeight: 500, paddingTop: '3em' }}>
                <Grid >
                    {/* {
                        userProfile.medals.map((medal, index) => {
                            return ( */}
                    <Grid.Column width={4} textAlign='center' key={1}>
                        <Item.Group>
                            <Image src={gold} size='tiny' centered />
                            <Item>
                                <Item.Content>
                                    <Item.Header as='a'>
                                        {"Challange Title"}
                                    </Item.Header>
                                    <Item.Meta>{10 / 20 / 2019}</Item.Meta>
                                    <Item.Description>
                                        {'ผู้ชนะอันดับที่ 1'}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    
                    {/* )
                        })
                    } */}
                </Grid>
            </Segment>
        )
    }

    const Activity = () => {
        return (
            <Segment style={{ minHeight: 1200 }}>
                <Grid stackable style={{overflow: 'scroll', maxHeight: 'calc(80vh)'}} >
                    {/* {
                        userProfile.posts.map((post, index) => {
                            return ( */}
                    <React.Fragment key={0}>
                        <Grid.Row style={{ paddingLeft: '1em', paddingTop: '2em' }} >
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={photo}  />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>Chayut Aroonsang</Feed.User> ได้โพสต์
                                                <Feed.Date>1 hours ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Date style={{ paddingTop: 10 }}>#asdasdasdasdasd</Feed.Date>
                                        <Feed.Extra text>
                                            Hello Nomoriam
                                                    </Feed.Extra>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Row>
                        <Grid.Row>
                            <Image src={photo} centered style={{ minHeight: '300px', minWidth: '350px', maxHeight: '300px', maxWidth: '350px', objectFit: 'cover', objectPosition: 'center center' }} />
                        </Grid.Row>
                        {/* <Grid.Row style={{ paddingLeft: '1em' }}>
                                        <Label size='large' image>
                                            <Icon name='like' /> 23
                                </Label>
                                    </Grid.Row> */}
                        <Divider />
                        <Grid.Row style={{ paddingLeft: '1em', paddingTop: '2em' }}>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={photo} />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>Chayut Aroonsang</Feed.User> ได้โพสต์
                                                <Feed.Date>1 hours ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Date style={{ paddingTop: 10 }}>#asdasdasdasdasd</Feed.Date>
                                        <Feed.Extra text>
                                            Hello Nomoriam
                                                    </Feed.Extra>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Row>
                        <Grid.Row>
                            <Image src={photo} centered size='large' />
                        </Grid.Row>
                        {/* <Grid.Row style={{ paddingLeft: '1em' }}>
                                        <Label size='large' image>
                                            <Icon name='like' /> 23
                                </Label>
                                    </Grid.Row> */}
                        <Divider />
                    </React.Fragment>
                    {/* )
                })
            } */}
                </Grid>
            </Segment>
        )
    }
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

    const MyChallenge = () => (
        <Segment style={{ minHeight: 300, paddingTop: '3em' }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Item.Group style={{ overflow: 'scroll', maxHeight: 'calc(70vh)' }} >
                            <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg'
                                    label={{
                                        as: 'a',
                                        color: 'yellow',
                                        content: 'เหลือ 11 วัน',
                                        icon: 'clock outline',
                                        ribbon: true,
                                        // attached: 'top left'
                                    }}
                                >
                                    {/* <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder> */}
                                </Item.Image>

                                <Item.Content>
                                    {/* <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder> */}
                                    <Item.Header>Stevie Feliciano</Item.Header>
                                    <Item.Description>
                                        <p>สร้างโดย Chayut Aroonsang</p>
                                        {paragraph}

                                    </Item.Description>
                                    <Item.Extra>

                                        <Label icon='group' color='blue' content={'4 เข้าร่วมแล้ว'} />
                                        <Label icon='tasks' color='red' content={'2 ภารกิจ'} />
                                        <Label icon='leaf' color='green' content={'3000 แต้ม'} />
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Label.Group tag>
                                            <Label as='a' tag color='yellow' content="ลดการใช้ (Reduce)" />
                                            <Label as='a' tag color='orange' content="รีไซเคิล (Recycle)" />
                                        </Label.Group>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button primary floated='right' onClick={() => history.push('/challenges/1')}>
                                            ดูรายละเอียด
                                <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>

                                </Item.Content>
                            </Item>

                            <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg'
                                    label={{
                                        as: 'a',
                                        color: 'yellow',
                                        content: 'เหลือ 11 วัน',
                                        icon: 'clock outline',
                                        ribbon: true,
                                        // attached: 'top left'
                                    }}
                                >
                                    {/* <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder> */}
                                </Item.Image>

                                <Item.Content>
                                    {/* <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder> */}
                                    <Item.Header>Stevie Feliciano</Item.Header>
                                    <Item.Description>
                                        <p>สร้างโดย Chayut Aroonsang</p>
                                        {paragraph}

                                    </Item.Description>
                                    <Item.Extra>

                                        <Label icon='group' color='blue' content={'4 เข้าร่วมแล้ว'} />
                                        <Label icon='tasks' color='red' content={'2 ภารกิจ'} />
                                        <Label icon='leaf' color='green' content={'3000 แต้ม'} />
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Label.Group tag>
                                            <Label as='a' tag color='yellow' content="ลดการใช้ (Reduce)" />
                                            <Label as='a' tag color='orange' content="รีไซเคิล (Recycle)" />
                                        </Label.Group>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button primary floated='right' onClick={() => history.push('/challenges/1')}>
                                            ดูรายละเอียด
                                <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>

                                </Item.Content>
                            </Item>

                            <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg'
                                    label={{
                                        as: 'a',
                                        color: 'yellow',
                                        content: 'เหลือ 11 วัน',
                                        icon: 'clock outline',
                                        ribbon: true,
                                        // attached: 'top left'
                                    }}
                                >
                                    {/* <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder> */}
                                </Item.Image>

                                <Item.Content>
                                    {/* <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder> */}
                                    <Item.Header>Stevie Feliciano</Item.Header>
                                    <Item.Description>
                                        <p>สร้างโดย Chayut Aroonsang</p>
                                        {paragraph}

                                    </Item.Description>
                                    <Item.Extra>

                                        <Label icon='group' color='blue' content={'4 เข้าร่วมแล้ว'} />
                                        <Label icon='tasks' color='red' content={'2 ภารกิจ'} />
                                        <Label icon='leaf' color='green' content={'3000 แต้ม'} />
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Label.Group tag>
                                            <Label as='a' tag color='yellow' content="ลดการใช้ (Reduce)" />
                                            <Label as='a' tag color='orange' content="รีไซเคิล (Recycle)" />
                                        </Label.Group>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button primary floated='right' onClick={() => history.push('/challenges/1')}>
                                            ดูรายละเอียด
                                <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>

                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )

    const menuBar = (
        <React.Fragment>
            <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                    <Menu.Item active={active === 'สถานะ' ? true : false} onClick={() => setActive('สถานะ')}><Header as='h3' content="สถานะ" /></Menu.Item>
                    <Menu.Item active={active === 'ชาเลนจ์ที่เข้าร่วมแล้ว' ? true : false} onClick={() => setActive('ชาเลนจ์ที่เข้าร่วมแล้ว')}><Header as='h3' content="ชาเลนจ์ที่เข้าร่วมแล้ว" /></Menu.Item>
                    <Menu.Item active={active === 'รางวัลที่ได้รับ' ? true : false} onClick={() => setActive('รางวัลที่ได้รับ')}><Header as='h3' content="รางวัลที่ได้รับ" /></Menu.Item>
                    <Menu.Item active={active === 'กิจกรรม' ? true : false} onClick={() => setActive('กิจกรรม')}><Header as='h3' content="กิจกรรม" /></Menu.Item>
                </Menu>
            </Grid.Column>

            <Grid.Column stretched width={12}>
                {
                    active === 'สถานะ' ? Status()
                        : active === 'รางวัลที่ได้รับ' ? Reward()
                            : active === 'กิจกรรม' ? Activity()
                                : MyChallenge()
                }
            </Grid.Column>
        </React.Fragment>
    )

    const Profile = (
        <React.Fragment>
            <Grid.Column width={5}>
                <Image
                    name="image"
                    src={photo}
                    circular

                    style={{ height: 250, objectFit: 'cover', objectPosition: 'center center' }}
                />
                <Button circular icon="magic" floated='right' color='yellow' />
            </Grid.Column>
            <Grid.Column width={11} style={{ paddingLeft: '5em' }}>
                <Item.Group>
                    <Item style={{ paddingTop: '2em' }}>
                        <Item.Content>
                            <Item.Header>
                                <Header as='h1'>
                                    Chayut Aroonsang
                                    <Label icon='setting' circular color='blue' />
                                </Header>

                            </Item.Header>
                            <Item.Description style={{ paddingTop: '2em' }}>
                                <Header as='h2'>Bio :
                                            <Item.Meta>
                                        Hello Nomoriam
                                    </Item.Meta>
                                </Header>

                            </Item.Description>
                        </Item.Content>

                    </Item>
                </Item.Group>
            </Grid.Column>
        </React.Fragment>
    )
    return (
        <Grid stackable style={{ paddingTop: '3em' }} container>
            <Grid.Row>
                {Profile}
            </Grid.Row>
            <Divider />
            <Grid.Row>
                {menuBar}
            </Grid.Row>
        </Grid>
    )
}

export default ProfileMockup