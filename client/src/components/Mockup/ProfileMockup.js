import React from 'react'
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
import photo from '../../asset/mariam/Header.jpg'

const ProfileMockup = (props) => {
    const Profile = (
        <React.Fragment>
            <Grid.Column width={5}>
                <Image src={photo} circular
                    style={{ minHeight: 250, objectFit: 'cover', objectPosition: 'center center' }}
                />
                <Button circular icon="magic" floated='right' color='yellow' />
            </Grid.Column>
        </React.Fragment>
    )
    return (
        <Grid stackable style={{ paddingTop: '3em' }} container>
            <Grid.Row>
                {Profile}
            </Grid.Row>
        </Grid>
    )
}

export default ProfileMockup