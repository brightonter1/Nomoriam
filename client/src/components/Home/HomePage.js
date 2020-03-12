import React, { useState } from 'react'
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
import ActivityBar from './ActivitiBar'
import photo from '../../asset/mariam/Header.jpg'
import PostList from './PostList'
const HomePage = (props) => {




    return (
        <Grid style={{ paddingTop: '3em', minHeight: 600 }} stackable >
            <Container>
                <Grid.Row style={{ paddingBottom: '2em' }}>
                    <Grid.Column floated="left" width={16}>
                        <Header as='h1' color="olive">
                            <Icon name='tasks' color="olive" />
                            <Header.Content >
                                ภารกิจทั้งหมด
                                    <Header.Subheader>เลือกภารกิจและเล่นได้เลย!</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                    <Divider />
                </Grid.Row>
            </Container>

            <Container>
                <Grid.Row>
                    <ActivityBar />
                </Grid.Row>
            </Container>

            <Grid.Row style={{ paddingLeft: '4%' }}>
                <PostList />
            </Grid.Row>
        </Grid>
    )
}

export default HomePage