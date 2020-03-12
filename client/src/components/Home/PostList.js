import React, { useEffect } from 'react'

import {
    Container,
    Grid,
    Header,
    Divider,
    Icon,
    Feed,
    Label,
    Image,
    Card
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { connect } from 'react-redux'
import MariamSpinner from '../Layout/MariamSpinner'
import { fetchActivities } from '../../store/actions/challengeAction'
import moment from 'moment'

const PostList = (props) => {

    useEffect(() => {
        props.fetchActivities()
    }, [props.posts])

    if (props.isPost) {

        const itemList = props.posts.map((post, index) =>
            <Grid.Column width={5} style={{ paddingTop: '2em' }} key={index}>
                <Card fluid >
                    <Image src={post.image} centered style={{ height: 380, objectFit: 'cover', objectPosition: 'center center' }} />
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
                    <Card.Content extra>
                        <a>
                            <Icon name='like' />
                            22
                                    </a>
                    </Card.Content>
                </Card>
            </Grid.Column>
        )

        return (
            <React.Fragment>
                {itemList}
            </React.Fragment>
        )
    } else {
        return (
            <MariamSpinner open={true} />
        )
    }

}

const mapStateToProps = state => {
    return {
        posts: state.challenge.posts,
        isPost: state.challenge.isPost
    }
}

export default connect(mapStateToProps, { fetchActivities })(PostList)