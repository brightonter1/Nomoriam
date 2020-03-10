import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import moment from 'moment'
import {
    Loader,
    Grid,
    Header,
    Segment,
    Button,
    Divider,
    Icon,
    Progress,
    Accordion,
    Item,
    Label,
    Modal,
    Image,
    Form,
    Card
} from 'semantic-ui-react'
import photo from '../../asset/mariam/Header.jpg'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { renderTextArea, renderFileInput } from '../Challenge/Form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Reward from '../../asset/archievement/TheFirst.png'

const MySwal = withReactContent(Swal)



class Test extends Component {
    state = {
        result: 'ยังไม่มีผลลัพธ์',
        time: '',
        open: false
    }

    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }

    time = () => {
        setInterval(() => {
            this.setState({ time: moment().format('MMMM Do YYYY, h:mm:ss a') })
        }, 1000)
    }

    test = () => {
        const current = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
        // const str = end.split('-')
        // end = str[0] + '-' + parseInt(str[1]) + '-' + str[2]
        var time = new moment.duration(Math.abs(new Date(current) - new Date('2020-3-5')))
        setInterval(() => {
            // console.log(moment().subtract(time.asDays(), 'days').format('h:mm:ss a'))
            // console.log(moment().format('L') + "-" + moment().format('LT'))
        }, 1000)
        // console.log(time.format('MMMM Do YYYY, h:mm:ss a'))
    }

    alert = () => (
        MySwal.fire({
            title: "ยินดีด้วยคุณทำสำเร็จ 1",
            text: "เริ่มต้นเรียนรู้ 5 ฟหกยาหฟยกายบฟหกาฟบยหากฟบยหกาบฟยหกาฟบยหากบฟหากบฟากบบยฟหากบฟาหก",
            // icon: "success",
            timerProgressBar: true,
            timer: 5000,
            showConfirmButton: false,
            imageUrl: Reward,
            imageWidth: 200,
            imageHeight: 200
        })
    )
    render() {
        return (
            <div style={{ paddingLeft: '5em', paddingTop: '5em' }}>
                {/* {this.time()}
                {this.state.time} 
                {this.modal()}
                 <QRCode value="asd-0asd-kqw-0eqw-0eqow0-eqwe0-iqwe0iqw-0eiq-0weiqw-0eiq-w0e" /> */}
                <QRCode
                    value="0x74f1680d63bd1b45c485ff538c5a3d6135c45a1d912d993bdd90210c978d9439"
                    level='M'
                    size={128}
                    style={{ minWidth: 180, minHeight: 180 }}
                /><br></br><br></br>
                <QRCode value="0xe8363e33d6d9f5f095ebca55fcf1cebdbca2b9f53610badab73dd4701ab20b98" level='M' /><br></br><br></br>
                <QRCode value="0x68578625832d73158122b0832bbf1351c26df9d6abf49a1956bf96c00ddff431" level='H' /><br></br><br></br>
                <QRCode value="0xa2bcd96d898ebfb0bc2d0cc5c51538e89846f4167023ce02c223f3b6295fc87b" /><br></br><br></br>
                <QRCode value="0x973af00d27e52dc4e9039605e491aaa31b34ac9cde0631a70dbe6873fd954f66" /><br></br><br></br>
                <Button primary onClick={() => this.alert()}>Click</Button>

            </div>
        )
    }
}

export default reduxForm({
    form: 'TestForm'
})(Test)