import React, { useState, useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label } from 'semantic-ui-react'
import Logo2 from '../../asset/mariam/logo2.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignUp } from '../../store/actions/authAction'
import MariamLoading from '../../asset/mariam/Mariam-loading.gif'
import MariamSpinner from './MariamSpinner'

const style = {
    height: '130vh',
    backgroundColor: '#b5cc17'
}

const styleSegment = {
    borderRadius: 25,
    backgroundColor: '#c9e02a'
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
        <Grid textAlign='center' style={style} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 500 }}>
                <Image src={Logo2} size='large' centered />

                <Segment stacked style={styleSegment}>
                    <Header as='h2' style={{ paddingBottom: 25, color: '#434343', paddingTop: 25 }}>สมัครสมาชิก</Header>
                    <Form onSubmit={props.handleSubmit(createUser)}>
                        <Field name="displayname" type="text" placeholder="ชื่อ" component={renderField} />
                        <Field name="email" type="email" placeholder="อีเมล์" component={renderField} />
                        <Field name="pwd" type="password" placeholder="รหัสผ่าน" component={renderField} />
                        <Button
                            size='large'
                            style={{ marginBottom: 10, borderRadius: 50, backgroundColor: '#b5cc17' }}
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

                <Message style={{ borderRadius: 25, backgroundColor: '#c9e02a' }}>
                    มีบัญชีอยู่แล้ว? <Link to="/">เข้าสู่ระบบ</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
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