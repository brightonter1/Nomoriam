import React from 'react'
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
    Button,
    Image,
    Divider,
    Icon,
    Card,
    Feed,
    Item,
    Label,
    Placeholder
} from 'semantic-ui-react'
import photo from '../../asset/mariam/logo.png'
import history from '../../api/history'

const ChallnegeMockup = (props) => {

    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

    const itemList = (
        <Grid.Column>
            <Item.Group >
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
    )


    return (
        <Grid stackable style={{ paddingTop: '3em' }} container>
            <Grid.Row columns='equal' >
                <Grid.Column>
                    <Header as='h2' color="olive">
                        <Icon name='flag checkered' color="olive" />
                        <Header.Content >
                            ชาเลนจ์ทั้งหมด
                                    <Header.Subheader>เลือกชาเลนจ์และเข้าร่วมได้เลย!</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
                <Divider />
                <Grid.Column floated="right" width={5}>
                    <Button color="olive" size='small' icon labelPosition='left' floated="right">
                        <Icon name="add" />
                        สร้างชาเลนจ์
                            </Button>
                </Grid.Column>
            </Grid.Row>
            <Divider />

            <Grid.Row columns='equal'>
                {itemList}
            </Grid.Row>
        </Grid>
    )
}

export default ChallnegeMockup