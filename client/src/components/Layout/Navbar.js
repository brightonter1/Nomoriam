import React from 'react'
import { Menu, Button, Header, Modal, Segment, Grid, Divider, Icon, Dropdown } from 'semantic-ui-react'
import mariamPhoto from '../../asset/mariam.jpg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignIn, SignOut } from '../../store/actions/authAction'
import firebase from '../../api/firebase'


class Navbar extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.SignIn(user.uid)
            }
        })
    }

    renderMenu() {
        return (
            <Menu fixed='top' color="green" inverted secondary >

                <Link to="/" className="item"><img src={mariamPhoto} alt="" /></Link>

                <Link to="/" className="item">หน้าหลัก</Link>

                <Link to="/challenges" className="item">ชาเล้นจ์</Link>

                <Link to="/hallOfframe" className="item">กระดานคะแนน</Link>

                <Menu.Menu position="right">
                    {
                        this.props.isSignedIn && this.props.isAdmin ?
                            <Dropdown text="Admin" simple item>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        ดูคำร้องขอ
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={(e) => this.handleSignOut()}
                                    >
                                        ออกจากระบบ
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : this.props.isSignedIn && !this.props.isAdmin ?
                                <Dropdown text={this.props.playerName} simple item>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            โปรไฟล์
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            สถานะชาเล้นจ์
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            การแจ้งเตือน
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={(e) => this.handleSignOut()}
                                        >
                                            ออกจากระบบ
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                :
                                <Menu.Item>
                                    {this.renderModalLogin()}
                                </Menu.Item>
                    }

                </Menu.Menu>

            </Menu>
        )
    }

    handleSignIn = social => {
        this.props.SignIn(social)
    }

    handleSignOut = () => {
        this.props.SignOut()
    }

    renderModalLogin() {
        return (
            <Modal trigger={<Button primary>เริ่มเลย!</Button>}>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>เข้าสู่ระบบด้วย</Divider>

                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon>
                                    <Icon name='facebook' color="blue" />
                                </Header>
                                <Button
                                    color='facebook'
                                    size="large"
                                    onClick={(e) => this.handleSignIn('facebook.com')}
                                >
                                    <Icon name='facebook' /> Facebook
                                </Button>

                            </Grid.Column>

                            <Grid.Column>
                                <Header icon>
                                    <Icon name='google' color="red" />
                                </Header>
                                <Button
                                    color='google plus'
                                    size="large"
                                    onClick={(e) => this.handleSignIn('google.com')}
                                >
                                    <Icon name='google plus' /> Google
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Modal>
        )
    }

    render() {
        return (
            <div className="ui container">
                {this.renderMenu()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        playerName: state.auth.name,
        isSignedIn: state.auth.isSignedIn,
        isAdmin: state.auth.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SignIn: (user) => dispatch(SignIn(user)),
        SignOut: () => dispatch(SignOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)