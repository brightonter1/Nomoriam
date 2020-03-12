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
    Card
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ChallengeCard from './ChallengeCard'


const ChallengePage = () => {

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
                        <Link to="/challenges/new" style={{ color: 'white' }} >
                            <Button color="olive" size='big' icon labelPosition='left' floated="right">
                                <Icon name="add" />
                                สร้างชาเลนจ์
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Container>
            <Grid.Row columns="equal">
                <ChallengeCard />
            </Grid.Row>
        </Grid>
    )
}

export default ChallengePage