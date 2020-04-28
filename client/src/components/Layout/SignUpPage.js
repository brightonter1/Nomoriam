import React, { useState, useEffect } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label } from 'semantic-ui-react'
import Logo2 from '../../asset/mariam/logo2.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignUp } from '../../store/actions/authAction'
import MariamLoading from '../../asset/mariam/Mariam-loading.gif'
import MariamSpinner from './MariamSpinner'

const style = {
    height: '120vh',
    backgroundColor: '#b5cc17'
}

const styleSegment = {
    borderRadius: 25,
    backgroundColor: '#cfe4ea'
}
const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <Form.Field>
        <input {...input} required type={type} placeholder={placeholder} autoComplete="off" style={{ borderRadius: 50 }} />
        {
            touched && error &&
            <Label basic color='red' pointing>
                {error}
            </Label>
        }
    </Form.Field>
)





let SignUpPage = (props) => {

    const createUser = (user) => {
        props.SignUp(user)
    }

    const [open, setOpen] = useState(false)

    useEffect(() => {

        if (props.isCompleted === true) {
            setOpen(false)
        } else if (props.isCompleted === false) {
            setOpen(false)
        }
    })

    return (
        <div style={{ backgroundColor: 'rgb(181,204,23' }}>
            <Grid textAlign='center' style={style} verticalAlign='middle' container >
                <Grid.Row >
                    <Grid.Column style={{ maxWidth: 500, padding: '1em 1em 1em 1em' }}>
                        <Image src={Logo2} size='large' centered />

                        <Segment stacked style={styleSegment}>
                            <Header as='h2' style={{ paddingBottom: 25, color: '#434343', paddingTop: 25 }}>สมัครสมาชิก</Header>
                            <Form onSubmit={props.handleSubmit(createUser)}>
                                <Field name="displayname" type="text" placeholder="ชื่อ" component={renderField} />
                                <Field name="email" type="email" placeholder="อีเมล์" component={renderField} />
                                <Field name="pwd" type="password" placeholder="รหัสผ่าน" component={renderField} />
                                <Button
                                    size='large'
                                    disabled={props.fillCompleted === true ? false : true}
                                    style={{ color: 'white', backgroundColor: '#0bd501', marginBottom: 10, borderRadius: 50 }}
                                    onClick={e => setOpen(true)}
                                >
                                    สมัครสมาชิก
                        </Button>
                            </Form>
                            {
                                props.isCompleted ?
                                    <Message color="blue" style={{ borderRadius: 25 }}>
                                        <p>{props.message}</p>
                                    </Message>
                                    : props.isCompleted === false ?
                                        <Message warning style={{ borderRadius: 25 }}>
                                            <p>{props.message}</p>
                                        </Message>
                                        : null
                            }

                            <MariamSpinner open={open} />

                        </Segment>

                        <Message style={{ borderRadius: 25, backgroundColor: '#007bd3', color: 'white' }}>
                            มีบัญชีอยู่แล้ว? <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>เข้าสู่ระบบ</Link>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
const selector = formValueSelector('SignUpForm')
const mapStateToProps = state => {
    const { displayname, email, pwd } = selector(state, 'displayname', 'email', 'pwd')
    var sum = false
    if (displayname && email && pwd) {
        sum = true
    }
    return {
        fillCompleted: sum,
        isCompleted: state.auth.isCompleted,
        message: state.auth.message
    }
}

SignUpPage = connect(
    mapStateToProps, { SignUp }
)(SignUpPage)


export default reduxForm({
    form: 'SignUpForm'
})(SignUpPage)