import React from 'react'
import { Header, Grid, Item, Icon, Label, Button } from 'semantic-ui-react'
import history from '../../api/history'
const ChallengeList = props => {

    const { challenges } = props
    console.log(challenges)

    const onClickShow = (index) => {
        history.push(`/admin/manage/${index}`)
    }

    const itemList = challenges.map((challenge, index) =>
        <Item key={index}>
            <Item.Image src={challenge.image} />
            <Item.Content>
                <Item.Header as='a'>ชื่อชาเลนจ์: {challenge.title}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>ไอดีผู้สร้าง: {challenge.owner}</span>
                </Item.Meta>
                <Item.Description>รายละเอียด: {challenge.desc}</Item.Description>
                <Item.Extra>
                    <br />
                    <Label color="green">{challenge.approved ? "ตรวจสอบเรียบร้อยแล้ว" : "รอการตรวจสอบ"}</Label>
                    <Label color="olive">{challenge.finished ? "ชาเลนจ์สิ้นสุดแล้ว" : "ชาเลนจ์กำลังดำเนินการอยู่"}</Label>
                    <Button primary floated='right' onClick={e => onClickShow(challenge.doc)}>
                        คลิ๊กดูรายละเอียด
                    <Icon name='right chevron' />
                    </Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    )



    return (
        <React.Fragment>
            <Item.Group divided>
                {itemList}
            </Item.Group>
            {
                challenges.length === 0 &&
                <Grid centered style={{ paddingTop: '5em' }}>
                    <Header as='a' >
                        Challenge not found
                        <Header.Subheader as='h1' style={{ paddingTop: '2em' }}>Please click buttom below or refresh this page</Header.Subheader>
                    </Header>

                </Grid>
            }
        </React.Fragment>
    )
}

export default ChallengeList