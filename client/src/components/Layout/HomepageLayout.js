import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Dropdown
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { SignOut } from '../../store/actions/authAction'
import { connect } from 'react-redux'
import history from '../../api/history'
import logo from '../../asset/mariam/logo.png'


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    {/* <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button> */}
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            // style={{ minHeight: 1, padding: '1em 0em', backgroundColor: '#009e8b' }}
            style={{ padding: '1em 0em' }}
            color="olive"
            vertical
          >
            <Menu
              // fixed={fixed ? 'top' : null}
              inverted={!fixed}
              // pointing={!fixed}
              secondary={!fixed}
              size='tiny'
            >
              <Container>
                <Menu.Item>
                  {/* <Image size='tiny' src={logo} style={{ marginRight: '1.5em' }} /> */}
                </Menu.Item>
                <Menu.Item onClick={() => history.push('/')}  >
                  <Header as='h4' content="หน้าหลัก" style={{ color: 'white' }} />
                </Menu.Item>
                <Menu.Item onClick={() => history.push('/challenges')}><Header as='h4' content="ชาเลนจ์" style={{ color: 'white' }} /></Menu.Item>
                <Menu.Item onClick={() => history.push('/hallofframe')}><Header as='h4' content="หอเกียรติยศ" style={{ color: 'white' }} /></Menu.Item>
                <Menu.Item position='right'>
                  <Dropdown
                    item
                    simple
                    as='h4'
                    text={this.props.displayname}
                  >
                    <Dropdown.Menu>
                      {this.props.roleAdmin && <Dropdown.Item text="จัดการชาเลนจ์" onClick={() => history.push('/admin/manage')} />}
                      {!this.props.roleAdmin && <Dropdown.Item text="โปรไฟล์" onClick={() => history.push('/account/profile')} />}
                      {!this.props.roleAdmin && <Dropdown.Item text="สถานะชาเลนจ์" onClick={() => history.push('/account/status')} />}
                      <Dropdown.Item text="ออกจากระบบ" onClick={e => this.props.SignOut()} />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive >
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = state => {
  return {
    displayname: state.auth.userInfo.displayname,
    roleAdmin: state.auth.userInfo.roleAdmin
  }
}

DesktopContainer = connect(mapStateToProps, { SignOut })(DesktopContainer)

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item active onClick={() => (history.push('/'), this.setState({ sidebarOpened: false }))}>
            หน้าหลัก
          </Menu.Item>
          <Menu.Item onClick={() => (history.push('/challenges'), this.setState({ sidebarOpened: false }))}
          >ชาเลนจ์</Menu.Item>
          <Menu.Item onClick={() => (history.push('/hallofframe'), this.setState({ sidebarOpened: false }))}
          >หอเกียรติยศ</Menu.Item>
          {this.props.roleAdmin && <Menu.Item content="จัดการชาเลนจ์" onClick={() => (history.push('/admin/manage'), this.setState({ sidebarOpened: false }))} />}
          {console.log(this.props.roleAdmin)}
          {/* <Menu.Item onClick={() => (history.push('/'), this.setState({ sidebarOpened: false }))} >กระดานคะแนน</Menu.Item> */}
          <Menu.Item onClick={() => (history.push('/account/profile'), this.setState({ sidebarOpened: false }))}>โปรไฟล์</Menu.Item>
          <Menu.Item onClick={() => (history.push('/account/status'), this.setState({ sidebarOpened: false }))}>สถานะชาเลนจ์</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            // style={{ minHeight: 550, padding: '1em 0em', backgroundColor: '#009e8b' }}
            style={{ padding: '1em 0em' }}
            vertical
            color={"olive"}
          >
            <Container>
              <Menu inverted secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }} onClick={e => this.props.SignOut()}>
                    ออกจากระบบ
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}


MobileContainer = connect(mapStateToProps, { SignOut })(MobileContainer)



const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = ({ children }) => (
  <ResponsiveContainer>
    {children}
  </ResponsiveContainer>
)

export default HomepageLayout