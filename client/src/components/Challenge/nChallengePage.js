import React, { useEffect, useState } from 'react'
import {
    Grid,
    Header,
    Dropdown,
    Button,
    Image,
    Divider,
    Icon,
    Item,
    Label,
    Placeholder,
    Input
} from 'semantic-ui-react'
import { fetchChallenges, joinChallenge, joinCleanUp } from '../../store/actions/challengeAction'
import history from '../../api/history'
import { Link } from 'react-router-dom'
import { alertAction } from '../Challenge/Form'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
const durationDate = (end) => {

    if (end === '2020-05-31'){
        end = '2020-05-30'
    } 
    const current = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    const str = end.split('-')
    end = str[0] + '-' + parseInt(str[1]) + '-' + str[2]
    var d1 = current.split('-')
    var d2 = end.split('-')
    var a = moment([d1[0], d1[1], d1[2]]);
    var b = moment([d2[0], d2[1], d2[2]]);
    return (Math.abs(a.diff(b)) / 86400000) === 0 ? "วันสุดท้าย" : "เหลือ " + (Math.abs(a.diff(b)) / 86400000) + " วัน"
}

const checkTimeOut = (end) => {
    const current = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    const str = end.split('-')
    end = str[0] + '-' + parseInt(str[1]) + '-' + str[2]

    return new Date(current) > new Date(end)
}

const NChallengePage = (props) => {

    const { challenges } = props
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        category: null,
        data: props.challenges,
        direction: null
    })

    useEffect(() => {
        props.fetchChallenges()
        setState({
            column: null,
            data: props.challenges,
            direction: null
        })

        if (props.isJoined) {
            setOpen(false)
            alertAction("เข้าร่วมเรียบร้อยแล้ว", props.message, 'success')
        }

        return () => {
            props.joinCleanUp()
        }
    }, [props.isJoined])

    const loadList = (
        <Grid.Column>
            <Item.Group >
                <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                    <div className='ui small image' style={{ paddingBottom: '2em' }}>
                        <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder>
                    </div>
                    <Item.Content >
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>

                        <Item.Extra>
                            <Button primary floated='right' disabled >
                                ดูรายละเอียด
                                <Icon name='right chevron' />
                            </Button>
                        </Item.Extra>

                    </Item.Content>
                </Item>
                <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                    <div className='ui small image' style={{ paddingBottom: '2em' }}>
                        <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder>
                    </div>
                    <Item.Content >
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>

                        <Item.Extra>
                            <Button primary floated='right' disabled >
                                ดูรายละเอียด
                                <Icon name='right chevron' />
                            </Button>
                        </Item.Extra>

                    </Item.Content>
                </Item>
                <Item style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                    <div className='ui small image' style={{ paddingBottom: '2em' }}>
                        <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder>
                    </div>
                    <Item.Content >
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='medium' />

                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>

                        <Item.Extra>
                            <Button primary floated='right' disabled >
                                ดูรายละเอียด
                                <Icon name='right chevron' />
                            </Button>
                        </Item.Extra>

                    </Item.Content>
                </Item>

            </Item.Group>
        </Grid.Column>
    )

    const tagOptions = [
        {
            key: 'Reduce',
            text: 'ลดการใช้งาน (Reduce)',
            value: 'reduce',
            label: { color: 'blue', empty: true, circular: true },
        },
        {
            key: 'Refuse',
            text: 'การปฏิเสธการใช้ (Refuse)',
            value: 'refuse',
            label: { color: 'red', empty: true, circular: true },
        },
        {
            key: 'Reuse',
            text: 'การใช้งานซ้ำ (Reuse)',
            value: 'reuse',
            label: { color: 'olive', empty: true, circular: true },
        },
        {
            key: 'Recycle',
            text: 'การนำกลับมาใช้ใหม่ (Recycle)',
            value: 'recycle',
            label: { color: 'orange', empty: true, circular: true },
        },
        {
            key: 'Return',
            text: 'ตอบแทนธรรมชาติ (Return)',
            value: 'return',
            label: { color: 'green', empty: true, circular: true },
        },
    ]

    if (props.isFetch) {

        const handleSort = (result) => {
            var category = result.value
            const { column, data, direction } = state

            if (column !== category) {
                console.log(data)
            }
            // if (column !== clickedColumn) {

            //     setState({
            //         column: clickedColumn,
            //         data: _.sortBy(data, [clickedColumn]),
            //         direction: 'ascending',
            //     })

            //     return
            // }

            // setState({
            //     data: data.reverse(),
            //     direction: direction === 'ascending' ? 'descending' : 'ascending',
            // })
        }


        const itemList = (
            <Grid.Column >
                <Item.Group >
                    {
                        challenges.map((challenge, index) => (
                            !checkTimeOut(challenge.end_time) &&
                            <Item key={index} style={{ backgroundColor: 'white', padding: '2em 2em .5em 2em', borderRadius: '15px', border: '1px solid rgba(34,36,38,.15)' }}>
                                <Item.Image size='small' src={challenge.image}
                                    label={{
                                        as: 'a',
                                        color: 'yellow',
                                        content: durationDate(challenge.end_time),
                                        icon: 'clock outline',
                                        ribbon: true,
                                    }}
                                >
                                </Item.Image>
                                <Item.Content>
                                    <Item.Header>{challenge.title}</Item.Header>
                                    <Item.Description >
                                        <p style={{ color: 'cadetblue' }}>สร้างโดย {challenge.owner}</p>
                                        {/* <p style={{ color: 'cadetblue' }}>&nbsp;&nbsp; สร้างเมื่อ {moment(challenge.create_time.split('>time<')[1], 'DD-MM-YYYY HH:mm:ss').format('LL')}</p> */}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{challenge.desc.split('>,<')[0]}

                                    </Item.Description>
                                    <Item.Extra>

                                        <Label icon='group' color='purple' content={`ผู้เข้าร่วม ${challenge.playerCount} คน`} />
                                        <Label icon='tasks' color='black' content={`${challenge.actCount} ภารกิจ`} />
                                        <Label icon='leaf' color='green' content={challenge.sum_point} />
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Label.Group tag>
                                            {
                                                challenge.desc.split('>,<')[1].split(',').map((goal, index) => (
                                                    <React.Fragment key={index}>
                                                        {goal === 'return' && <Label as='a' tag color='green' content='ตอบแทนธรรมชาติ (Return)' />}
                                                        {goal === 'reduce' && <Label as='a' tag color='blue' content='ลดการใช้งาน (Reduce)' />}
                                                        {goal === 'refuse' && <Label as='a' tag color='red' content='การปฏิเสธการใช้ (Refuse)' />}
                                                        {goal === 'reuse' && <Label as='a' tag color='olive' content='การใช้งานซ้ำ (Reuse)' />}
                                                        {goal === 'recycle' && <Label as='a' tag color='orange' content='การนำกลับมาใช้ใหม่ (Recycle)' />}
                                                    </React.Fragment>
                                                ))
                                            }
                                        </Label.Group>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button color='teal' floated='right' onClick={() => history.push(`/challenges/${index}`)}>
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
                {console.log(state.data)}
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
                        <Link to="/challenges/new" style={{ color: 'white' }} >
                            <Button color="purple" size='small' icon labelPosition='left' floated="right"
                                onClick={() => history.push('/challenges/new')}
                            >
                                <Icon name="add" />
                                สร้างชาเลนจ์
                                </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            text='ค้นหาด้วย tags'
                            icon='filter'
                            floating
                            labeled
                            button
                            className='icon'
                            style={{ backgroundColor: 'gold' }}
                        >
                            <Dropdown.Menu>
                                <Dropdown.Menu scrolling>
                                    {tagOptions.map((option) => (
                                        <Dropdown.Item key={option.value} {...option} onClick={(param, data) => handleSort(data)} />
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns='equal'>
                    {itemList}
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
                                ชาเลนจ์ทั้งหมด
                                        <Header.Subheader>เลือกชาเลนจ์และเข้าร่วมได้เลย!</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                    <Divider />
                    <Grid.Column floated="right" width={5}>
                        <Link to="/challenges/new" style={{ color: 'white' }} >
                            <Button color="olive" size='small' icon labelPosition='left' floated="right"
                                onClick={() => history.push('/challenges/new')}
                            >
                                <Icon name="add" />
                                สร้างชาเลนจ์
                                </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Divider />

                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            text='ค้นหาด้วย tags'
                            icon='filter'
                            floating
                            labeled
                            button
                            className='icon'
                            style={{ backgroundColor: 'gold' }}
                        >
                            <Dropdown.Menu>
                                <Dropdown.Header icon='tags' content='Tags' />
                                <Dropdown.Menu scrolling>
                                    {tagOptions.map((option) => (
                                        <Dropdown.Item key={option.value} {...option} />
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns='equal'>
                    {loadList}
                </Grid.Row>
            </Grid>
        )
    }


}

const mapStateToProps = state => {
    return {
        challenges: state.challenge.challenges,
        isFetch: state.challenge.isFetch,
        isJoined: state.challenge.isJoined,
        message: state.challenge.message
    }
}
export default connect(mapStateToProps, { fetchChallenges, joinChallenge, joinCleanUp })(NChallengePage)