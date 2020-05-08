import React, { useState, useEffect } from 'react'
import {
    Label,
    Grid,
    Header,
    Segment,
    Image,
    Icon,
    Table,
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

        const colors = ['floralwhite', '#f2ede2']

        const playerList = (
            <Grid.Column>
                <Segment raised id="BRIGHT" style={{ backgroundColor: 'floralwhite' }}>
                    <Table basic="very" textAlign='center' unstackable sortable  >
                        <Table.Header >
                            <Table.Row style={{ backgroundColor: '#eae2d2' }} >
                                <Table.HeaderCell
                                    style={{ borderLeft: 'none' }}
                                    sorted={state.column === 'rankNumber' ? state.direction : null}
                                    onClick={handleSort('rankNumber')}
                                >อันดับ</Table.HeaderCell>
                                <Table.HeaderCell
                                    style={{ borderLeft: 'none' }}
                                    sorted={state.column === 'rankNumber' ? state.direction : null}
                                    onClick={handleSort('rankNumber')}
                                >แร้งค์</Table.HeaderCell>
                                <Table.HeaderCell
                                    style={{ borderLeft: 'none' }}
                                    sorted={state.column === 'displayname' ? state.direction : null}
                                    onClick={handleSort('displayname')}
                                >ผู้เล่น</Table.HeaderCell>
                                <Table.HeaderCell
                                    style={{ borderLeft: 'none' }}
                                    sorted={state.column === 'exp' ? state.direction : null}
                                    onClick={handleSort('exp')}
                                >ค่าประสบการณ์ <p>(EXP)</p></Table.HeaderCell>
                                {/* <Table.HeaderCell width={3}><Icon name='leaf' /> คะแนน (POINT)</Table.HeaderCell> */}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {_.map(state.data, (player, index) => (
                                <Table.Row key={index} active={player.uid === userInfo.userId ? true : false} style={{ backgroundColor: colors[index % 2] }}>
                                    <Table.Cell>
                                        {player.rankNumber}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Image src={player.rankImage} rounded size='mini' centered style={{ maxWidth: 'none' }} />
                                    </Table.Cell>
                                    <Table.Cell textAlign='left' style={{ paddingLeft: '4em' }}>
                                        {player.displayname}
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
            <Grid stackable style={{ paddingTop: '3em', minHeight: '600px' }} container>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' color="olive">
                            <Icon name='chess pawn' color="olive" />
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
