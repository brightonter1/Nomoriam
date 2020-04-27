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
    Statistic
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
                <Table basic="very" textAlign='center' unstackable >
                    <Table.Header >
                        <Table.Row >
                            <Table.HeaderCell width={1}>อันดับ</Table.HeaderCell>
                            <Table.HeaderCell width={1}>แร้งค์</Table.HeaderCell>
                            <Table.HeaderCell width={2}>ผู้เล่น</Table.HeaderCell>
                            <Table.HeaderCell width={3}>ค่าประสบการณ์ (EXP)</Table.HeaderCell>
                            <Table.HeaderCell width={2}><Icon name='leaf' /> คะแนน (POINT)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row active >
                            <Table.Cell>
                                <Header as='h3'>
                                    16
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Image src={rank1} rounded size='tiny' centered />
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={photo} rounded size='small' />
                                    <Header.Content>
                                        Chayut Aroonsang
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Progress value={100} total={500} progress='ratio' color='orange' autoSuccess style={{ margin: '0em 0em 0em' }} />
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h4'>
                                    800
                                </Header>

                            </Table.Cell>
                        </Table.Row>

                        <Table.Row >
                            <Table.Cell>
                                <Header as='h3'>
                                    1
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Image src={rank1} rounded size='tiny' centered />
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={photo} rounded size='small' />
                                    <Header.Content>
                                        Chayut Aroonsang
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Progress value={450} total={500} progress='ratio' color='orange' autoSuccess style={{ margin: '0em 0em 0em' }} />
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h4'>
                                    3400
                                </Header>

                            </Table.Cell>
                        </Table.Row>

                        <Table.Row >
                            <Table.Cell>
                                <Header as='h3'>
                                    2
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Image src={rank1} rounded size='tiny' centered />
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={photo} rounded size='small' />
                                    <Header.Content>
                                        Chayut Aroonsang
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Progress value={300} total={500} progress='ratio' color='orange' autoSuccess style={{ margin: '0em 0em 0em' }} />
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h4'>
                                    2000
                                </Header>
                            </Table.Cell>
                        </Table.Row>
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
                {leaderList}
            </Grid.Row>
        </Grid>
    )
}

export default LeaderBoardMock