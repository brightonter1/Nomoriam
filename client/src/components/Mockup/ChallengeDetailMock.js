// import React, { useState } from 'react'
// import {
//     Modal,
//     Grid,
//     Header,
//     Divider,
//     Segment,
//     Button,
//     Image,
//     Label,
//     Icon,
//     Card,
//     Feed,
//     Item,
//     Progress,
//     Accordion,
//     Placeholder,
//     Table,
//     Statistic
// } from 'semantic-ui-react'
// import photo from '../../asset/mariam/Header.jpg'
// import qrcode from '../../asset/category/qrcode.png'
// import post from '../../asset/category/post.png'
// import rank from '../../asset/archievement/RankTop.png'
// import award from '../../asset/archievement/award.png'
// import exp from '../../asset/icon/exp.png'
// import organize from '../../asset/icon/orgranize.png'
// import gold from '../../asset/archievement/gold.png'
// import silver from '../../asset/archievement/silver.png'
// import rank1 from '../../asset/Rank/rank_mid_01.png'
// import bronze from '../../asset/archievement/bronze.png'
// const ChallengeDetailMock = (props) => {

//     const [modal, setModal] = useState(false)
//     const [reward, setReward] = useState(false)

//     const Challenge = (
//         <React.Fragment>
//             <Grid.Column width={7}>
//                 <Image src={photo} style={{ borderRadius: '25px' }} />
//             </Grid.Column>
//             <Grid.Column width={9}>
//                 <Item>

//                     <Item.Content>
//                         <Item.Header as='h2'>
//                             ชื่อชาเลนจ์ : งดใช้ถุงพลาสติก
//                         </Item.Header>
//                         <Item.Meta as='a'>
//                             <p>สร้างโดย Chayut Aroonsang</p>
//                             <Label basic color='teal'>
//                                 <Icon name='calendar alternate outline' />
//                                 March 15, 2020 - April 30, 2020
//                             </Label>
//                         </Item.Meta>

//                         <Item.Description as='h4'>
//                             <p>
//                                 &nbsp; ลดการสร้างขยะจากถุงพลาสติก ที่ได้รับจากร้านสะดวกซื้อ และใช้ถุงผ้าทดแทนหรือถุงที่สามารถนำมาใช้ซ้ำได้ เพื่อที่จะไม่สร้างขยะจากพลาสติกมากขึ้น
//                             </p>
//                             <p>
//                                 คะแนนเป้าหมาย : &nbsp;
//                                 <Label icon='leaf' color='green' content={'3000 แต้ม'} />
//                             </p>
//                             <p>
//                                 วัตถุประสงค์ :
//                             </p>
//                             <p>
//                                 <Label as='a' tag color='yellow' content="ลดการใช้ (Reduce)" />
//                                 <Label as='a' tag color='orange' content="รีไซเคิล (Recycle)" />
//                             </p>
//                         </Item.Description>

//                         <Item.Extra>
//                             <Button size='large' floated='right' style={{ width: '150px' }} color='blue' >
//                                 <Icon name='sign-in alternate' />
//                                 เข้าร่วม
//                             </Button>
//                         </Item.Extra>
//                     </Item.Content>
//                 </Item>
//             </Grid.Column>
//         </React.Fragment>
//     )

//     const Reward = (
//         <React.Fragment>
//             <Grid.Column style={{ textAlign: 'center' }}>
//                 <Image src={rank} size='small' centered style={{ paddingBottom: '1em' }} />
//                 <span>
//                     &nbsp; ผู้เล่นที่สามรถทำภารกิจจนครบเป็น 3 อันดับแรก จะได้เหรียญอันดับพิเศษไปครอบครอง
//                 </span>
//             </Grid.Column>
//             <Grid.Column>
//                 <Image src={award} size='small' centered style={{ paddingBottom: '1em' }} />
//                 <span>
//                     &nbsp; ผู้เล่นที่สามารถทำภารกิจจนครบ (จะเป็น 3 อันดับแรกหรือไม่ก็ได้) จะได้รับถ้วยเข้าร่วมชาเลนจ์
//                 </span>
//             </Grid.Column>
//             <Grid.Column>
//                 <Image src={exp} size='small' centered style={{ paddingBottom: '1em' }} />
//                 <span>
//                     &nbsp; ผู้เล่นที่ทำภารกิจจะได้รับค่าประสบการณ์ (EXP) และคะแนนใบไม้ (POINT) ในแต่ละวิธีการเล่น โดยสามารถดูจำนวนที่ได้รับจากรายละเอียดแต่ละภารกิจ
//                 </span>
//             </Grid.Column>
//         </React.Fragment>
//     )

//     const ActivityList = (
//         <React.Fragment>
//             <Grid.Column >
//                 <Item.Group unstackable>
//                     <Item
//                         style={{
//                             padding: '2em 2em 1em 2em',
//                             borderRadius: '15px',
//                             border: '1px solid rgba(34,36,38,.15)'
//                         }}
//                     >
//                         <Item.Image size='tiny' src={qrcode}>
//                         </Item.Image>
//                         <Item.Content>
//                             <Item.Header style={{ color: '#2a2825' }}>
//                                 ซื้อของไม่รับถุงพลาสติก
//                                 </Item.Header>

//                             <Item.Description as='h4' >
//                                 <p>สถานที่ : มหาวิทยาลัย</p>
//                                 <Label style={{ border: '1px solid rgba(34,36,38,.15)', backgroundColor: 'white' }}>
//                                     <Image src={organize} size='tiny' centered />
//                                 </Label>
//                             </Item.Description>
//                             <Item.Extra>
//                                 <Label color='green' content={'+300 POINT'} />
//                                 <Label color='blue' content={'+500 EXP'} />
//                                 <Label color='red' content={'จำนวน 3 ครั้ง'} />
//                             </Item.Extra>
//                         </Item.Content>
//                     </Item>
//                 </Item.Group>
//             </Grid.Column>
//             <Grid.Column >
//                 <Item.Group unstackable>
//                     <Item style={{ backgroundColor: 'white', padding: '2em 2em 1em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
//                         <Item.Image size='tiny' src={qrcode}>
//                         </Item.Image>
//                         <Item.Content>
//                             <Item.Header style={{ color: '#0fcb1c' }}>
//                                 ซื้อของไม่รับถุงพลาสติก
//                                 </Item.Header>

//                             <Item.Description as='h4' style={{ color: '#4cb1e6' }}>
//                                 <p>สถานที่ : มหาวิทยาลัย</p>
//                                 <Label style={{ border: '1px solid rgba(34,36,38,.15)', backgroundColor: 'white' }}>
//                                     <Image src={organize} size='tiny' centered />
//                                 </Label>
//                             </Item.Description>
//                             <Item.Extra>
//                                 <Label color='orange' >+300 Point</Label>
//                                 <Label color='green' content='+500 EXP' />
//                                 <Label color='blue' >3 ครั้ง</Label>
//                             </Item.Extra>
//                         </Item.Content>
//                     </Item>
//                 </Item.Group>
//             </Grid.Column>
//             <Grid.Column>
//                 <Item.Group unstackable style={true && { paddingTop: '2em' }}>
//                     <Item style={{ backgroundColor: 'white', padding: '2em 2em 1em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
//                         <Item.Image size='tiny' src={qrcode}>
//                         </Item.Image>
//                         <Item.Content>
//                             <Item.Header style={{ color: '#0fcb1c' }}>
//                                 ซื้อของไม่รับถุงพลาสติก
//                                 </Item.Header>

//                             <Item.Description as='h4' style={{ color: '#4cb1e6' }}>
//                                 <p>สถานที่ : มหาวิทยาลัย</p>
//                                 <Label style={{ border: '1px solid rgba(34,36,38,.15)', backgroundColor: 'white' }}>
//                                     <Image src={organize} size='tiny' centered />
//                                 </Label>
//                             </Item.Description>
//                             <Item.Extra>
//                                 <Label color='orange' >+300 Point</Label>
//                                 <Label color='green' content='+500 EXP' />
//                                 <Label color='blue' >3 ครั้ง</Label>
//                             </Item.Extra>
//                         </Item.Content>
//                     </Item>
//                 </Item.Group>
//             </Grid.Column>
//         </React.Fragment>
//     )

//     const leaderList = (
//         <Grid.Column>
//             <Segment>
//                 <Table basic="very" textAlign='center' unstackable>
//                     <Table.Header >
//                         <Table.Row >
//                             <Table.HeaderCell width={1}>อันดับ</Table.HeaderCell>
//                             <Table.HeaderCell width={1}>แร้งค์</Table.HeaderCell>
//                             <Table.HeaderCell width={3}>ผู้เล่น</Table.HeaderCell>
//                             <Table.HeaderCell width={3}>คะแนน</Table.HeaderCell>
//                             <Table.HeaderCell width={1}>รางวัล</Table.HeaderCell>
//                         </Table.Row>
//                     </Table.Header>
//                     <Table.Body>
//                         <Table.Row >
//                             <Table.Cell>
//                                 <Header as='h3'>
//                                     1
//                                 </Header>
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <Image src={rank1} rounded size='tiny' centered />
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <Header as='h4' image>
//                                     <Image src={photo} rounded size='small' />
//                                     <Header.Content>
//                                         Chayut Aroonsang
//                                     </Header.Content>
//                                 </Header>
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <Progress value={100} total={500} progress='ratio' color='orange' autoSuccess style={{ margin: '0em 0em 0em' }} />
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <Header as='h4' image>
//                                     <Image src={gold} rounded size='small' />
//                                     <Image src={award} rounded size='small' />
//                                 </Header>

//                             </Table.Cell>
//                         </Table.Row>



//                     </Table.Body>
//                 </Table>
//             </Segment>
//         </Grid.Column>
//     )

//     const HowToReward = (
//         <Modal
//             trigger={<React.Fragment ><Icon name='hand point right outline' />ของรางวัลเอาไปทำอะไรได้ ?</React.Fragment>}
//             open={reward}
//             onClose={() => setReward(false)}
//             basic
//             size='small'
//             centered={false}
//         >
//             <Modal.Header style={{ paddingBottom: '3em' }}>
//                 <Header as='h2' icon='question circle outline' content='ของรางวัลเอาไปทำอะไรได้ ?' floated='left' style={{ color: 'white' }} />
//                 <Header icon='close' floated='right' onClick={() => setReward(false)} style={{ color: 'white' }} />
//             </Modal.Header>

//             <Modal.Content image scrolling>
//                 <Header as='h3' style={{ color: 'white' }}>
//                     <p>1. เหรียญรางวัลซึ่งจะเป็นของรางวัลตอบแทนและยืนยันว่าผู้เล่นได้ทำสำเร็จจริง ๆ</p>
//                     <p>&nbsp;&nbsp;&nbsp;ประเภทของเหรียญรางวัลมี 4 ประเภทด้วยกัน</p>
//                     <p>&nbsp;&nbsp;&nbsp;- เหรียญตราอันดับที่ 1 (ได้รับเมื่อสำเร็จชาเลนจ์เป็นอันดับแรก) <Image src={gold} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
//                     <p>&nbsp;&nbsp;&nbsp;- เหรียญตราอันดับที่ 2 (ได้รับเมื่อสำเร็จชาเลนจ์เป็นอันดับที่สอง)<Image src={silver} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
//                     <p>&nbsp;&nbsp;&nbsp;- เหรียญตราอันดับที่ 3 (ได้รับเมื่อสำเร็จชาเลนจ์เป็นอันดับที่สาม)<Image src={bronze} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
//                     <p>&nbsp;&nbsp;&nbsp;- ถ้วยรางวัลการเข้าร่วม (ได้รับเมื่อสำเร็จชาเลนจ์อันดับใดอันดับหนึ่ง) <Image src={award} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='small' /></p>
//                     <p>2. ค่าประสบการณ์ (EXP) และ คะแนนใบไม้ (POINT) คืออะไร ?</p>
//                     <p>&nbsp;&nbsp;&nbsp;- ค่าประสบการณ์ (EXP) จะได้รับจากการทำในแต่ละภารกิจ</p>
//                     <p>&nbsp;&nbsp;&nbsp;ซึ่งจะแตกต่างกันจากวิธีการเล่น เอาไว้เพิ่มระดับ Rank ของผู้เล่น</p>
//                     <p>&nbsp;&nbsp;&nbsp;- คะแนนใบไม้ (POINT) จะได้รับจากการทำในแต่ละภารกิจ</p>
//                     <p>&nbsp;&nbsp;&nbsp;ซึ่งจะแตกต่างกันจากวิธีการเล่น เอาไว้แลกของรางวัลภายในแอปพลิเคชัน</p>
//                 </Header>
//             </Modal.Content>

//         </Modal>
//     )

//     const HowToPlay = (
//         <Modal
//             trigger={<React.Fragment ><Icon name='hand point right outline' /> ดูขั้นตอนวิธีการเล่น</React.Fragment>}
//             open={modal}
//             onClose={() => setModal(false)}
//             basic
//             size='small'
//             centered={false}
//         >
//             <Modal.Header style={{ paddingBottom: '3em' }}>
//                 <Header as='h2' icon='play circle outline' content='ขั้นตอนวิธีการเล่น' floated='left' style={{ color: 'white' }} />
//                 <Header icon='close' floated='right' onClick={() => setModal(false)} style={{ color: 'white' }} />
//             </Modal.Header>

//             <Modal.Content image scrolling>
//                 <Header as='h3' style={{ color: 'white' }}>
//                     <p>1. ดูวิธีการเล่นของภารกิจที่ผู้เล่นจะสะดวกเล่น โดยแบ่งเป็น 2 รูปแบบคือ</p>
//                     <p>&nbsp;&nbsp;&nbsp;- โพสต์รูปภาพ <Image src={post} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='tiny' /></p>
//                     <p>&nbsp;&nbsp;&nbsp;- สแกนคิวอาโค้ด <Image src={qrcode} style={{ paddingLeft: '3em', paddingTop: '1em' }} size='tiny' /></p>
//                     <p>2. สถานที่ในแต่ละภารกิจจะระบุถึงขอบเขตสถานที่ในการทำแต่ละภารกิจ</p>
//                     <p>&nbsp;&nbsp;&nbsp;ยกตัวอย่างเช่น </p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สแกนคิวอาโค้ดเมื่อไม่รับถุงพลาสติกที่ร้านสะดวกซื้อ</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ผู้เล่นไปยังสถานที่ที่ภารกิจระบุ</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ทำตามครบเงื่อนไข ก็คือไม่รับถุงพลาสติก</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เปิดแอปพลิเคชันและสแกนคิวอาโค้ด</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เสร็จสิ้น</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โพสต์รูปภาพเมื่อไม่รับถุงพลาสติกที่ร้านสะดวกซื้อ</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ผู้เล่นไปร้านสะดวกซื้อที่ใดก็ได้</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เมื่อไม่รับถุงและถ่ายรูปภาพประกอบ</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เปิดแอปพลิเคชันและโพสต์รูปภาพ</p>
//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - เสร็จสิ้น</p>
//                     <p>3. คะแนนทั้งหมดได้รับหลังจากทำภารกิจอย่างใดอย่างนึง ใช้เวลาประมาณ 10-15 วินาที </p>
//                     <p>4. จำนวนครั้ง หมายถึง จำนวนครั้งแต่ละภารกิจผู้เล่นจะต้องทำซ้ำจนครบ</p>
//                 </Header>
//             </Modal.Content>

//         </Modal>
//     )
//     return (
//         <Grid stackable style={{ paddingTop: '3em' }} container>
//             <Grid.Row>
//                 {Challenge}
//             </Grid.Row>
//             <Divider />

//             <Grid.Row>
//                 <Grid.Column>
//                     <Header as='h2' color="olive">
//                         <Icon name='flag checkered' color="olive" />
//                         <Header.Content >
//                             รางวัลที่จะได้รับ
//                             <Header.Subheader style={{ cursor: 'pointer' }} onClick={() => setReward(!reward)} >{HowToReward}</Header.Subheader>
//                         </Header.Content>
//                     </Header>
//                 </Grid.Column>
//             </Grid.Row>

//             <Grid.Row columns={3}  >
//                 {Reward}
//             </Grid.Row>
//             <Divider />

//             <Grid.Row>
//                 <Grid.Column>
//                     <Header as='h2' color="red">
//                         <Icon name='tasks' color="red" />
//                         <Header.Content >
//                             ภารกิจ (3)
//                             <Header.Subheader style={{ cursor: 'pointer' }} onClick={() => setModal(!modal)} >{HowToPlay}</Header.Subheader>
//                         </Header.Content>
//                     </Header>
//                 </Grid.Column>
//             </Grid.Row>

//             <Grid.Row columns={2}>
//                 {ActivityList}
//             </Grid.Row>
//             <Divider />

//             <Grid.Row>
//                 <Grid.Column>
//                     <Header as='h2' color="black">
//                         <Icon name='table' color="black" />
//                         <Header.Content >
//                             กระดานคะแนน (2)
//                         </Header.Content>
//                     </Header>
//                 </Grid.Column>
//             </Grid.Row>

//             <Grid.Row>
//                 {leaderList}
//             </Grid.Row>

//         </Grid>
//     )
// }

// export default ChallengeDetailMock