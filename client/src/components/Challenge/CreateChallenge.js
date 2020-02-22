import React from 'react'
import { Header, Segment, Step, Grid, Label } from 'semantic-ui-react'
import ChallengeFormStepOne from './ChallengeFormStepOne'
import ChallengeFormStepTwo from './ChallengeFormStepTwo'
import ChallengeFormStepThree from './ChallengeFormStepThree'
import { createChallenge } from '../../store/actions/challengeAction'
import { connect } from 'react-redux'

class CreateChallenge extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.renderField = this.renderField.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label} autoComplete="off" />

                {
                    touched && error &&
                    <Label basic color='red' pointing>
                        {error}
                    </Label>
                }
            </div>
        </div>
    )

    renderStepBar() {
        const { page } = this.state
        return (
            <Grid centered style={{ paddingBottom: 20 }}>
                <Segment raised padded>
                    <Step.Group ordered>
                        <Step
                            active={page === 1 ? true : false}
                            completed={page !== 1 ? true : false}
                        >
                            <Step.Content>
                                <Step.Title>สร้างชาเล้นจ์</Step.Title>
                                <Step.Description>Choose your shipping options</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step
                            active={page === 2 ? true : false}
                            completed={page === 3 ? true : false}
                        >
                            <Step.Content>
                                <Step.Title>เพิ่มภารกิจ</Step.Title>
                                <Step.Description>Enter billing information</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step
                            active={page === 3 ? true : false}
                        >
                            <Step.Content>
                                <Step.Title>ยืนยันส่งคำขอ</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Segment>
            </Grid>
        )
    }

    onSubmit = (challenge, activities) => {
        this.props.createChallenge(challenge, activities, this.props.userId)
    }

    render() {
        const { page } = this.state
        return (
            <div className="ui container" style={{ paddingTop: 60 }}>
                <Header as="h2" style={{ paddingBottom: 30, paddingTop: 30 }}>สร้างภารกิจ</Header>
                {this.renderStepBar()}
                {page === 1 && <ChallengeFormStepOne
                    onSubmit={this.nextPage}
                    renderField={this.renderField}
                />}
                {page === 2 && <ChallengeFormStepTwo
                    onSubmit={this.nextPage}
                    previousPage={this.previousPage}
                    renderField={this.renderField}
                />}
                {page === 3 && <ChallengeFormStepThree
                    onSubmit={this.onSubmit}
                    previousPage={this.previousPage}
                    isSuccess={this.props.isSuccess}
                />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    var loading;
    if (state.challenge.isSuccess){
        loading = false
    }else{
        loading = true
    }
    return {
        userId: state.auth.userId,
        isSuccess: loading
    }
}

export default connect(mapStateToProps, { createChallenge })(CreateChallenge)