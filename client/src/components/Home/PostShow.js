import React from 'react'
import { Segment, Grid, Image, Card, Icon, Label } from 'semantic-ui-react'

const styleSegment = {
    marginLeft: 20,
    marginRight: 20
}

const PostShow = props => {


    const { posts } = props

    return (
        posts.map((post, index) => {
            return (
                <Segment style={styleSegment} key={index}>
                    <Grid columns={1}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    Title
                                        </Card.Header>
                            </Card.Content>
                            <Image src={post.image} size="medium" centered />
                            <Card.Content>
                                <Card.Header>
                                    <Image src={post.userPhoto} size="mini" circular spaced />
                                    {post.displayname}
                                </Card.Header>
                                <Card.Meta>
                                    <span className='date'>{post.date}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {post.caption}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name="like" />
                                    Like
                                        </Label>
                            </Card.Content>
                        </Card>
                    </Grid>
                </Segment>
            )
        })
    )
    // return (



    // )
}

export default PostShow

// return posts.map((post, index) => {
//     return (
//         <Segment key={index} style={styleSegment}>
//             <Grid columns={1}>
//                 <Card fluid>
//                     <Card.Content>
//                         <Card.Header>
//                             Title
//                             </Card.Header>
//                     </Card.Content>
//                     <Image src={post.image} size="medium" centered />
//                     <Card.Content>
//                         <Card.Header>
//                             <Image src={post.userPhoto} size="mini" circular spaced />
//                             {post.displayname}
//                         </Card.Header>
//                         <Card.Meta>
//                             <span className='date'>{post.date}</span>
//                         </Card.Meta>
//                         <Card.Description>
//                             {post.caption}
//                         </Card.Description>
//                     </Card.Content>
//                     <Card.Content extra>
//                         <Label>
//                             <Icon name="like" />
//                             Like
//                             </Label>
//                     </Card.Content>
//                 </Card>
//             </Grid>
//         </Segment>
//     )
// })