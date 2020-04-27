import React, { useState, useEffect } from 'react'
import {
    Grid,
    Header,
    Divider,
    Image,
    Label,
    Icon,
    Card,
    Feed,
    Loader
} from 'semantic-ui-react'
import photo from '../../asset/mariam/logo.png'

import organize from '../../asset/icon/orgranize.png'
import { connect } from 'react-redux'
import { fetchActivities } from '../../store/actions/challengeAction'
import moment from 'moment'
import NActivityBar from './nActivityBar'

const NHomePage = (props) => {


    useEffect(() => {
        props.fetchActivities()
    }, [props.isPost])

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

    const loadList = items.map((post, index) =>
        <Grid.Column key={index} style={{ paddingTop: '1em' }}>
            <Card fluid >
                <Image src={post.image} centered
                    style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }}
                    label={
                        <Label as='a' image size='small' attached='top right' >
                            <img src={organize} />
                            มหาวิทยาลัย
                </Label>
                    }
                />
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
    var itemList = ''
    if (props.isPost) {
        itemList = props.posts.map((post, index) =>
            <Grid.Column key={index} style={{ paddingTop: '1em' }}>
                <Card fluid >
                    <Image src={post.image} centered
                        style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }}
                        // label={
                        //     <Label as='a' image size='small' attached='top right' >
                        //         <img src={organize} />
                        //         มหาวิทยาลัย
                        //     </Label>
                        // }
                    />
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image={post.photoURL} />
                                <Feed.Content>
                                    <Feed.Date content={moment(post.timestamp, 'DD-MM-YYYY HH:mm:ss').fromNow()} />
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
                    {/* <Card.Content extra>
                        <a>
                            <Icon name='like' />
                            22
                                    </a>
                    </Card.Content> */}
                </Card>
            </Grid.Column>
        )
    }

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
                <NActivityBar />
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
                {props.isPost ? itemList : <Loader active inline='centered' />}
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.challenge.posts,
        isPost: state.challenge.isPost
    }
}

export default connect(mapStateToProps, { fetchActivities })(NHomePage)
