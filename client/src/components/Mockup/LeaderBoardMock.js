import React, { useState } from 'react'
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
    Statistic,
    Responsive,
    Container
} from 'semantic-ui-react'
import gold from '../../asset/archievement/gold.png'
import silver from '../../asset/archievement/silver.png'
import rank1 from '../../asset/Rank/rank_mid_01.png'
import bronze from '../../asset/archievement/bronze.png'
import photo from '../../asset/mariam/Header.jpg'
import award from '../../asset/archievement/award.png'


const LeaderBoardMock = (props) => {

    const leaderList = (
        <Grid.Column>
            <Segment>
                <Table basic="very" textAlign='center' fixed unstackable >
                    <Table.Header >
                        <Table.Row >
                            <Table.HeaderCell width={2} >อันดับ</Table.HeaderCell>
                            <Table.HeaderCell width={3} >แร้งค์</Table.HeaderCell>
                            <Table.HeaderCell width={4}>ผู้เล่น</Table.HeaderCell>
                            <Table.HeaderCell width={4}>ค่าประสบการณ์ <p>(EXP)</p></Table.HeaderCell>
                            <Table.HeaderCell width={3}><Icon name='leaf' /> คะแนน <p>(POINT)</p></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row active >
                            <Table.Cell>
                                16
                            </Table.Cell>
                            <Table.Cell>
                                <Image src={rank1} rounded size='tiny' centered style={{ maxWidth: 'none' }} />
                            </Table.Cell>
                            <Table.Cell>
                                Chayut Aroonsang
                            </Table.Cell>
                            <Table.Cell>
                                800
                            </Table.Cell>
                            <Table.Cell>
                                800

                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
            </Segment>
        </Grid.Column >
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
                {leaderList}
            </Grid.Row>
        </Grid>
    )
}

export default LeaderBoardMock