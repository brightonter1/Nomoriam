import React, { useState } from 'react'
import {
    Icon,
    Step,
    Grid,
    Header,
    Segment,
    Image,
    Form,
    Button,
    Label
} from 'semantic-ui-react'
import FormStepOne from './FormStepOne'
import FormStepTwo from './FormStepTwo'
import FormStepThree from './FormStepThree'
import { CreateChallenge } from '../../store/actions/challengeAction'
import { connect } from 'react-redux'


const ChallengeForm = props => {

    var [page, setPage] = useState(1)

    const nextStep = (prevPage) => {
        setPage(page + 1)
    }

    const previousStep = () => {
        setPage(page - 1)
    }

    const onSubmit = (challenge, activity) => {
        props.CreateChallenge(challenge, activity)
    }


    return (
        <Grid centered style={{ padding: '1em 2em 0em 2em' }}>
            <Grid.Row>
                <Step.Group stackable='tablet' fluid>
                    <Step
                        active={page === 1 ? true : false}
                        completed={page !== 1 ? true : false}
                    >
                        <Icon name='chess' color="orange" />
                        <Step.Content>
                            <Step.Title>สร้างชาเลนจ์</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step
                        active={page === 2 ? true : false}
                        completed={page === 3 ? true : false}
                    >
                        <Icon name='tasks' color="blue" />
                        <Step.Content>
                            <Step.Title>สร้างภารกิจ</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step
                        active={page === 3 ? true : false}
                        completed={false}
                    >
                        <Icon name='flag checkered' color="green" />
                        <Step.Content>
                            <Step.Title>ยืนยันการสร้าง</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </Grid.Row>


            <Grid.Row>
                {
                    page === 1 && <FormStepOne
                        nextStep={nextStep}
                    />
                }
                {
                    page === 2 && <FormStepTwo
                        nextStep={nextStep}
                        previousStep={previousStep}
                    />
                }
                {
                    page === 3 && <FormStepThree
                        previousStep={previousStep}
                        onSubmit={onSubmit}
                    />
                }
            </Grid.Row>
        </Grid>
    )
}
export default connect(null, { CreateChallenge })(ChallengeForm)
