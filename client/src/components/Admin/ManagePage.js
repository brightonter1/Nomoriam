import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchChallengeOnApprove } from '../../store/actions/challengeAction'
import { Container, Header, Icon, Grid, Divider, Button } from 'semantic-ui-react'
import ChallengeList from './ChallengeList'
import MariamSpinner from '../Layout/MariamSpinner'

const ManagePage = props => {

    const { onApprove, isFetch } = props

    useEffect(() => {
        props.fetchChallengeOnApprove()
    }, [])


    if (onApprove) {
        return (
            <React.Fragment>
                <Container>
                    <Grid style={{ marginTop: '3em' }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h1'>
                                    <Icon name='settings' color="olive" />
                                    <Header.Content>
                                        Challenge Manage
                                    <Header.Subheader>Manage our challenges</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column>
                                {isFetch && <ChallengeList challenges={onApprove} />}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }else{
        return <MariamSpinner />
    }
}

const mapStateToProps = state => {
    return {
        isFetch: state.challenge.isFetching,
        onApprove: state.challenge.onApprove
    }
}

export default connect(mapStateToProps, { fetchChallengeOnApprove })(ManagePage)