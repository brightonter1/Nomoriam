import {
    Header,
    Progress,
    Grid,
    Container,
    Image,
    Item,
    Label,
    Icon,
    Divider,
    Button,
    Segment,
    Table,
    Statistic,
    Modal,
    Card
} from 'semantic-ui-react'

import React from 'react'

const LeaderboardPage = () => {
    return (
        <Grid style={{ paddingTop: '3em', minHeight: 600 }} stackable >
            <Container>
                <Grid.Row style={{ paddingBottom: '5em' }}>
                    <Grid.Column floated="left" width={5}>
                        <Header as='h1' color="olive">
                            <Icon name='flag checkered' color="olive" />
                            <Header.Content >
                                ชาเลนจ์ทั้งหมด
                                <Header.Subheader>เลือกชาเลนจ์และเข้าร่วมได้เลย!</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                    <Divider />
                    <Grid.Column floated="right" width={5}>
                            
                    </Grid.Column>
                </Grid.Row>
            </Container>
            <Grid.Row columns="equal">
            </Grid.Row>
        </Grid>
    )
}

export default LeaderboardPage