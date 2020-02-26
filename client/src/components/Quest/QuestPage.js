import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchActivityByOwner, doPost } from '../../store/actions/authAction'
import QuestList from './QuestList';



const QuestPage = (props) => {

    const { userId, myChallenge, isFetch } = props;

    useEffect(() => {
        if (userId) {
            props.fetchActivityByOwner(userId)
        }
    }, [userId, myChallenge])

    const onSubmit = (index, count, post) => {
        props.doPost(index, count, userId , post)
    }



    return (
        <div className="ui container" style={{ paddingTop: 80 }}>
            {
                isFetch ? <QuestList
                    challenges={myChallenge}
                    onSubmit={onSubmit}
                /> : "Loading..."
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        myChallenge: state.auth.myChallenge,
        isFetch: state.auth.isLoading
    }
}


export default connect(mapStateToProps, { fetchActivityByOwner, doPost })(QuestPage)