import {
    Modal, Image, Header
} from 'semantic-ui-react'
import React from 'react'
import MariamLoading from '../../asset/mariam/Mariam-loading.gif'

const MariamSpinner = ({ open }) => {

    return (
        <Modal
            id="mariamLoading"
            size='mini'
            open={open}
            centered
            dimmer='inverted'
            style={{ maxWidth: 150 }}
        >
            <Image src={MariamLoading} size='huge' />
        </Modal>
    )
}

export default MariamSpinner
