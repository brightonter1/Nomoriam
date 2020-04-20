import { Form, Label, TextArea, Dropdown, Header } from 'semantic-ui-react'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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

export const renderInput = ({ input, label, placeholder, message, type, width,  meta: { touched, error } }) => (
    <React.Fragment>
        <Form.Field width={width}>
            <Header as='h5' style={{width:'105px'}}>
                <label style={{ textAlign: 'left' }} >{label}</label>
                {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
            </Header>
            <input {...input} type={type} icon="" placeholder={placeholder} autoComplete="off" style={{ borderRadius: 15, paddingLeft: '1em' }} />
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

export const renderFileInput = ({ input, label, message, type, meta: { touched, error } }) => (
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
        //QmTVAbNEUe3mtLQibRcWB2drchJgiWxQCaKmaZJB43WMAs
        key: '0',
        text: 'โพสต์รูปภาพ',
        value: 'post',
        image: { avatar: true, src: POST }
    },
    {
        //QmRPj4nmcSUyRKTK5KSP73t7Lkj1Tnmaqgkt5pFHQZTPkf
        key: '1',
        text: 'สแกนคิวอาโค้ด',
        value: 'qrcode',
        image: { avatar: true, src: QRCODE }
    }
]

export const renderSelection = ({ input, label, message, placeholder, meta: { touched, error } }) => (
    <React.Fragment>
        <Form.Field>
            <Header as='h5'>
                <label style={{ textAlign: 'left' }} >{label}</label>
                {message && <Header.Subheader style={{ paddingTop: 10 }}>{message}</Header.Subheader>}
            </Header>
            <Dropdown
                selection {...input}
                value={input.value}
                options={category}
                onChange={(param, data) => input.onChange(data.value)}
                placeholder="เลือกวิธีการเล่น"
                style={{ borderRadius: 15 }}
            />
        </Form.Field>
    </React.Fragment>
)


