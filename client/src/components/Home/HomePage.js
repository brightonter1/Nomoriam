import React, { useState } from 'react'
import {
    Container,
    Grid,
    Header,
    Divider,
    Icon,
} from 'semantic-ui-react'
import ActivityBar from './ActivitiBar'

const HomePage = (props) => {




    return (
        <Grid style={{ paddingTop: '3em' }} stackable >
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
        </Grid>
    )
}

export default HomePage