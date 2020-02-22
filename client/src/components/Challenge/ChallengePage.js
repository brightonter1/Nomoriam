import React from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ChallengePage extends React.Component {

    renderList() {
        return (
            <Grid style={{ paddingTop: 70 }}>
                <Grid.Column width={4}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                </Grid.Column>
            </Grid>
        )
    }


    render() {
        return (
            <div className="ui container" style={{ paddingTop: 60 }}>
                <Header as="h2" style={{ paddingTop: 30 }}>ชาเล้นจ์</Header>
                <Link to="/challenges/new" className="ui right floated button primary">สร้างภารกิจ</Link>
                <div className="ui">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}


export default ChallengePage