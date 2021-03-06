import { Form, Label, TextArea, Dropdown, Header } from 'semantic-ui-react'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import home from '../../asset/icon/home.png'
import global from '../../asset/icon/global.png'
import store from '../../asset/icon/store.png'
import pin from '../../asset/icon/pin.png'
import organize from '../../asset/icon/orgranize.png'
const MySwal = withReactContent(Swal)

export const alertAction = (title, message, icon) => {
    MySwal.fire({
        title: title,
        text: message,
        icon: icon,
        timerProgressBar: true,
        timer: 5000,
        showConfirmButton: false,
    })
}

export const alertMedal = (title, text, image) => (
    MySwal.fire({
        title: title,
        text: text,
        timerProgressBar: true,
        timer: 5000,
        showConfirmButton: false,
        imageUrl: `https://ipfs.infura.io/ipfs/${image}`,
        imageWidth: 200,
        imageHeight: 200
    })
)

export const renderInput = ({ input, label, placeholder, message, type, width, meta: { touched, error } }) => (
    <React.Fragment>
        <Form.Field width={width}>
            <Header as='h5' style={{ width: '105px' }}>
                <label style={{ textAlign: 'left' }} >{label}</label>
                {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
            </Header>
            <input {...input} type={type} placeholder={placeholder} autoComplete="off" style={{ borderRadius: 15, paddingLeft: '1em' }} />
        </Form.Field>
        {
            touched && error &&
            <Label basic color='red' pointing >
                {error}
            </Label>
        }
    </React.Fragment>
)

export const renderTextArea = ({ input, label, message, placeholder, meta: { touched, error } }) => (
    <React.Fragment>
        <Form.Field>
            <Header as='h5'>
                <label style={{ textAlign: 'left' }} >{label}</label>
                {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
            </Header>
            <TextArea {...input} placeholder={placeholder} autoComplete="off" style={{ borderRadius: 15, minHeight: 100 }} />
        </Form.Field>
        {
            touched && error &&
            <Label basic color='red' pointing >
                {error}
            </Label>
        }
    </React.Fragment>
)

export const renderFileInput = ({ id, input, label, message, type, meta: { touched, error } }) => (
    <React.Fragment>
        <Form.Field>
            <Header as='h5'>
                <label style={{ textAlign: 'left' }} >{label}</label>
                {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
            </Header>
            <input
                name={input.name}
                type={type}
                onChange={e => handleFileInput(e, input)}
                style={{ borderRadius: 15 }}
                id={id}
                accept=".png, .jpg, .jpeg"
            />
        </Form.Field>
        {
            touched && error &&
            <Label basic color='red' pointing >
                {error}
            </Label>
        }
    </React.Fragment>
)


const handleFileInput = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(imageFile);
    reader.onloadend = async () => {
        input.onChange({ image: Buffer(reader.result), imageFile: URL.createObjectURL(imageFile) })
    }
}

export const POST = 'https://firebasestorage.googleapis.com/v0/b/crytonomoriam.appspot.com/o/category%2Fpost.png?alt=media&token=37f6891b-d183-44f5-9fc3-ccd3e3a9d20e'
export const QUESTION = 'https://firebasestorage.googleapis.com/v0/b/crytonomoriam.appspot.com/o/category%2Fquestion.png?alt=media&token=212900e6-4683-4ae7-bf97-75b53aaf3f8d'
export const QRCODE = 'https://firebasestorage.googleapis.com/v0/b/crytonomoriam.appspot.com/o/category%2Fqrcode.png?alt=media&token=a936aad6-052b-4858-9489-be1be533f241'
const category = [
    {
        key: '0',
        text: 'บ้าน',
        value: 'home',
        image: { avatar: true, src: home }
    },
    {
        key: '1',
        text: 'ร้านสะดวกซื้อ',
        value: 'store',
        image: { avatar: true, src: store }
    },
    {
        key: '2',
        text: 'สถานศึกษา',
        value: 'school',
        image: { avatar: true, src: organize }
    },
    {
        key: '3',
        text: 'ที่ไหนก็ได้',
        value: 'anywhere',
        image: { avatar: true, src: global }
    },
    {
        key: '4',
        text: 'แผนที่',
        value: 'map',
        image: { avatar: true, src: pin }
    }
]



export const renderSelection = ({ input, label, message, placeholder, meta: { touched, error } }) => {

    return (
        <React.Fragment>
            <Form.Field>
                <Header as='h5'>
                    <label style={{ textAlign: 'left' }} >{label}</label>
                    <Header.Subheader style={{ paddingTop: 10 }}>
                        <p>&nbsp; สถานที่จะเป็นจุดที่ผู้เล่นเข้าใจได้ว่าในแต่ภารกิจ</p>
                        <p>นั้นจะต้องเล่นสถานที่ใด</p>
                    </Header.Subheader>
                </Header>

                <Dropdown
                    selection {...input}
                    options={category}
                    onChange={(param, data) => input.onChange(data.value)}
                    placeholder="เลือกวิธีการเล่น"
                    style={{ borderRadius: 15 }}
                />

            </Form.Field>
        </React.Fragment>
    )
}



