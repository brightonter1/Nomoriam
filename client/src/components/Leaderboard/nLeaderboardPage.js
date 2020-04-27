import React, { useState, useEffect } from 'react'
import {
    Modal,
    Grid,
    Header,
    Divider,
    Segment,
    Button,
    Image,
    Label,
    Icon,
    Card,
    Feed,
    Item,
    Progress,
    Accordion,
    Placeholder,
    Table,
    Statistic
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchPlayers, clearPlayers } from '../../store/actions/challengeAction'
import _ from 'lodash'
import MariamSpinner from '../Layout/MariamSpinner'

const NLeaderBoard = (props) => {

    const [state, setState] = useState({
        column: null,
        data: props.players,
        direction: null
    })

    useEffect(() => {
        props.fetchPlayers()
        setState({
            column: null,
            data: props.players,
            direction: null
        })
    }, [props.isPlayers])

    useEffect(() => {
        return () => {
            props.clearPlayers()
        }
    }, [])

    const { players, isPlayers, userInfo } = props

    if (players) {
        const handleSort = (clickedColumn) => () => {
            const { column, data, direction } = state
            if (column !== clickedColumn) {

                setState({
                    column: clickedColumn,
                    data: _.sortBy(data, [clickedColumn]),
                    direction: 'ascending',
                })

                return
            }

            setState({
                data: data.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            })
        }
        const playerList = (
            <Grid.Column>
                <Segment>
                    <Table basic="very" textAlign='center' unstackable sortable celled fixed >
                        <Table.Header >
                            <Table.Row >
                                <Table.HeaderCell
                                    width={2}
                                    sorted={state.column === 'rankNumber' ? state.direction : null}
                                    onClick={handleSort('rankNumber')}
                                >อันดับ</Table.HeaderCell>
                                <Table.HeaderCell
                                    width={3}
                                    sorted={state.column === 'rankNumber' ? state.direction : null}
                                    onClick={handleSort('rankNumber')}
                                >แร้งค์</Table.HeaderCell>
                                <Table.HeaderCell
                                    width={6}
                                    sorted={state.column === 'displayname' ? state.direction : null}
                                    onClick={handleSort('displayname')}
                                >ผู้เล่น</Table.HeaderCell>
                                <Table.HeaderCell
                                    width={5}
                                    sorted={state.column === 'exp' ? state.direction : null}
                                    onClick={handleSort('exp')}
                                >ค่าประสบการณ์ (EXP)</Table.HeaderCell>
                                {/* <Table.HeaderCell width={3}><Icon name='leaf' /> คะแนน (POINT)</Table.HeaderCell> */}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {_.map(state.data, (player, index) => (
                                <Table.Row key={index} active={player.uid === userInfo.userId ? true : false}>
                                    <Table.Cell>
                                        <Header as='h3'>
                                            {player.rankNumber}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Image src={player.rankImage} rounded size='tiny' centered />
                                    </Table.Cell>
                                    <Table.Cell textAlign='left' style={{ paddingLeft: '4em' }}>
                                        <Header as='h4' image>
                                            <Image src={player.photoURL} rounded size='small' />
                                            <Header.Content>
                                                {player.displayname}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {player.exp}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
        )

        return (
            <Grid stackable style={{ paddingTop: '3em' }} container>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='chess king' color="olive" />
                            <Header.Content >
                                หอเกียรติยศ
                                <Header.Subheader >ตารางระดับยศ</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    {playerList}
                </Grid.Row>
            </Grid>
        )
    }
    return (
        <MariamSpinner open={true} />
    )
}

const mapStateToProps = state => {
    return {
        players: state.challenge.players,
        isPlayers: state.challenge.isPlayers,
        userInfo: state.auth.userInfo
    }
}
export default connect(mapStateToProps, { fetchPlayers, clearPlayers })(NLeaderBoard)
