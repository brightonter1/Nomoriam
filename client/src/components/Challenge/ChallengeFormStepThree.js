import React from 'react'
import { Grid, Segment, Card, Button, Icon, Image, Header, Container } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

let ChallengeFormStepThree = (props) => {
    const { handleSubmit, previousPage, challenge, activities } = props
    console.log(challenge, activities)
    return (
        <div>
            <Segment raised>
                
            </Segment>
            <Button primary floated="right" type="button" onClick={previousPage}>
                <Icon name="arrow left" />
                ย้อนกลับ
            </Button>
        </div>
    )
}

ChallengeFormStepThree = connect(state => {
    const challenge = state.form.ChallengeForm.values
    const activities = state.form.ActivityForm.values
    return {
        challenge,
        activities
    }
})(ChallengeFormStepThree)

export default ChallengeFormStepThree
