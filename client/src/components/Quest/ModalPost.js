import React, { useState } from 'react'
import { Modal, Grid, Form, Button, Image } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

const ModalPost = props => {

    const [image, setImage] = useState('https://react.semantic-ui.com/images/wireframe/image.png')

    const renderFileInput = ({ input, label, type }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input
                    name={input.name}
                    type={type}
                    onChange={event => handleChange(event, input)}
                />
            </div>
        );
    }

    const handleChange = (event, input) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        let fileName = event.target.files[0].name
        const reader = new window.FileReader();

        reader.readAsArrayBuffer(imageFile);
        reader.onloadend = async () => {
            input.onChange({ buffer: Buffer(reader.result), fileName })
        }

        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            const imageObject = new window.Image();

            imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth;
                imageFile.height = imageObject.naturalHeight;
                URL.revokeObjectURL(imageFile);
            };
            imageObject.src = localImageUrl;
            setImage(localImageUrl)
        }
    }

    const onSubmit = post => {
        props.onSubmit(props.index, props.count, post)
    }


    return (
        <Modal
            trigger={<Button primary floated='right'>เล่น</Button>}
            dimmer='blurring'
        >
            <Modal.Header>โพสต์และแชร์</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Image src={image} centered size="medium" />
                    <Form onSubmit={props.handleSubmit(onSubmit)}>
                        <Form.Field>
                            <label>แคปชัน</label>
                            <Field name='caption' component="textarea" type="textarea" />
                        </Form.Field>
                        <Form.Field>
                            <label>เลือกรูปภาพ</label>
                            <Field name='image' component={renderFileInput} type="file" />
                        </Form.Field>
                        <Form.Field>
                            <Button primary>โพสต์</Button>
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default reduxForm({
    form: 'postForm'
})(ModalPost)