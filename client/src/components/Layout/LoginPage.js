import React, { useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label } from 'semantic-ui-react'
import Logo from '../../asset/mariam/logo.png'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { SignInGoogle, SignIn } from '../../store/actions/authAction'
import { connect } from 'react-redux'
import { alertAction } from '../Challenge/Form'

const style = {
    height: '130vh',
    backgroundColor: '#b5cc17'
}

const styleSegment = {
    borderRadius: 25,
    backgroundColor: '#cfe4ea'
}

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <Form.Field>
        <input {...input} type={type} placeholder={placeholder} autoComplete="off" style={{ borderRadius: 50 }} />
        {
            touched && error &&
            <Label basic color='red' pointing>
                {error}
            </Label>
        }
    </Form.Field>
)



let LoginPage = (props) => {


    useEffect(() => {
        if (props.isSignedIn === true) {
            alertAction("เข้าสู่ระบบเรียบร้อยแล้ว", "ระบบกำลังพาไปยังหน้าหลัก", 'success')
        }
    }, [props.isSignedIn])

    const onSignIn = (user) => {
        props.SignIn(user)
    }

    return (
        <div style={{ backgroundColor: 'rgb(181,204,23' }}>
            <Grid textAlign='center' style={style} verticalAlign='middle' container>
                <Grid.Row >
                    <Grid.Column style={{ maxWidth: 500, padding: '1em 1em 1em 1em'  }} >
                        <Image src={Logo} size='large' centered />

                        <Segment stacked style={styleSegment}>
                            <Header as='h2' style={{ paddingBottom: 25, color: '#434343', paddingTop: 25 }}>เข้าสู่ระบบด้วยบัญชี</Header>
                            <Form onSubmit={props.handleSubmit(onSignIn)}>
                                <Field name="email" type="email" placeholder="อีเมล์" component={renderField} />
                                <Field name="pwd" type="password" placeholder="รหัสผ่าน" component={renderField} />
                                <Button fluid size='large' style={{ color:'white', backgroundColor: '#0bd501', marginBottom: 10, borderRadius: 50}}>
                                    เข้าสู่ระบบ
                    </Button>

                                <span>หรือ</span>

                            </Form>

                            <Button color='google plus' fluid size='large' style={{ marginTop: 10, borderRadius: 50 }} onClick={e => props.SignInGoogle()} >
                                <Icon name="google plus" />
                                เข้าสู่ระบบด้วย Google
                    </Button>

                            {
                                props.message ?
                                    <Message warning>
                                        {props.message}
                                    </Message>
                                    : null
                            }

                        </Segment>

                        <Message style={{ borderRadius: 25, backgroundColor: '#007bd3', color:'white' }}>
                            ไม่มีบัญชี? <Link to="/signup" style={{color: 'white', textDecoration: 'underline'}}>สมัครสมาชิก</Link>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        message: state.auth.message,
        isSignedIn: state.auth.isSignedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SignInGoogle: () => dispatch(SignInGoogle()),
        SignIn: (user) => dispatch(SignIn(user))
    }
}

LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage)

export default reduxForm({
    form: 'LoginForm'
})(LoginPage)