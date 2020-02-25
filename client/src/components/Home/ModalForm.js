import React from 'react'
import { Modal, Grid, Form, Button, Label, Image, Header } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

class ModalForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: 'https://react.semantic-ui.com/images/wireframe/square-image.png'
        }
    }

    renderFileInput = ({ input, label, type }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input
                    name={input.name}
                    type={type}
                    onChange={event => this.handleChange(event, input)}
                />
            </div>
        );
    }

    handleChange = (event, input) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        let fileName = event.target.files[0].name
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(imageFile);
        reader.onloadend = async () => {
            this.setState({ buffer: Buffer(reader.result) });
            input.onChange({ buffer: this.state.buffer, fileName })

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
            this.setState({ image: localImageUrl })
        }
    }

    onSubmit = (post) => {
        this.props.onSubmit(
            this.props.index,
            this.props.count,
            post
        )
    }

    render() {
        return (
            <Modal
                trigger={<Button primary floated='right'>เล่น</Button>}
                dimmer='blurring'
            >
                <Modal.Header>โพสต์และแชร์</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Image src={this.state.image} centered size="medium" />
                        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <Form.Field>
                                <label>แคปชัน</label>
                                <Field name='caption' component="textarea" type="textarea" />
                            </Form.Field>
                            <Form.Field>
                                <label>เลือกรูปภาพ</label>
                                <Field name='image' component={this.renderFileInput} type="file" />
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
}

export default reduxForm({
    form: 'postForm'
})(ModalForm)