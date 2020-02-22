import React, { useState } from 'react'
import { Grid, Segment, Button, Icon, Image, Header, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'

let ChallengeFormStepThree = (props) => {
    const { onSubmit, previousPage, challenge, activities, isSuccess } = props

    const summaryDate = (start, end) => {
        var time = new moment.duration(Math.abs(new Date(start) - new Date(end)))
        return time.asDays()
    }

    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading({ loading: true })
        onSubmit(challenge, activities)
    }



    return (
        <div style={{ paddingTop: 50 }}>
            <Header>รายละเอียดชาเล้นจ์</Header>
            <Grid stackable columns={2}>
                <Grid.Column>
                    <Segment>
                        <Image src={`https://ipfs.infura.io/ipfs/${challenge.image}`} size="large" />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Header as="h3" >ชื่อชาเล้นจ์ : </Header>{challenge.name}
                        <Header as="h4">รายละเอียด : </Header>{challenge.desc}
                        <Header as="h4">วันที่เริ่ม : </Header>    {challenge.create_time}
                        <Header as="h4">วันสิ้นสุด : </Header>{challenge.end_time}
                        <Header as="h4">ระยะเวลา : </Header> {summaryDate(challenge.create_time, challenge.end_time)} วัน
                    </Segment>
                </Grid.Column>
            </Grid>

            <Segment>
                <Item.Group>
                    {
                        activities.map((act, index) => {
                            const image = act.type === 'post' ? 'Qmb5dijLC5KZHqkeeDuBswD3r325fG1bxAkkiTHiMRfL3A' :
                                act.type === 'question' ? 'QmP7B9ETssp1PpyVWEADibv7q1k7wzUQ1gA5yMqmXKi1ZH' :
                                    'QmUmbQRtnYqi156qK1Qf1maH6oivq72exzNfwuGVCK8ose'
                            return (
                                <Item key={index}>
                                    <Item.Image size='tiny' src={`https://ipfs.infura.io/ipfs/${image}`} />

                                    <Item.Content>
                                        <Item.Header as='a'>{act.title}</Item.Header>
                                        <Item.Meta>วิธีเล่น : {act.type}</Item.Meta>
                                        <Item.Description>
                                            สถานที่เล่น : {act.location}
                                        </Item.Description>
                                        <Item.Extra>จำนวนครั้งที่ต้องเล่น {act.times}</Item.Extra>
                                    </Item.Content>
                                </Item>
                            )
                        })
                    }

                </Item.Group>
            </Segment>

            <Button primary type="button" onClick={previousPage}>
                <Icon name="arrow left" />
                ย้อนกลับ
            </Button>
            <Button
                positive
                type="submit"
                floated="right"
                onClick={handleSubmit}
                disabled={ isSuccess && loading ? true : false }
            >
                {
                    loading && isSuccess ? <Icon
                        name="spinner"
                        loading={isSuccess && loading ? true : false}
                    /> : null
                }
                ยืนยัน
            </Button>
        </div>
    )
}

ChallengeFormStepThree = connect(state => {
    const challenge = state.form.ChallengeForm.values
    const activities = state.form.ActivityForm.values.activities
    return {
        challenge,
        activities
    }
})(ChallengeFormStepThree)

export default ChallengeFormStepThree
