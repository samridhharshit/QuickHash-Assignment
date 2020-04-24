import React from "react";
import {Redirect} from 'react-router';
import {Button, Col, Form, FormGroup} from "reactstrap";
import axios from 'axios';

export default class UploadImage extends React.Component {
    state = {
        redirect: false,
        file: null
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post("/upload",formData,config)
            .then(async (res) => {
                if (res.status === 200) {
                    const data = res.data;
                    data.params = this.props.match.params.name;
                    await axios.post("/saveImageData", data)
                        .then(async res => {
                            if (res.status === 200) {
                                alert('Image uploaded successfully');
                                await this.setState({redirect: true})
                            }
                        })
                }
            }).catch((error) => {
                alert("Upload Unsuccessful")
        });
    };

    handleChange = async (e) => {
        await this.setState({
            file: e.target.files[0]
        })
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect push to={`/user/${this.props.match.params.name}`} />
        } else {
            return (
                <div className="row uploadImage-row">
                    <div className="col-sm-12 uploadImage">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col/>
                                <Col sm={12}>
                                    <div className="input-container image">
                                        <i className="fa fa-image icon fa-2x" />
                                        <input
                                            className="input-field"
                                            type="file"
                                            placeholder="Select Image"
                                            name="myImage"
                                            onChange={this.handleChange}
                                            required={true}
                                        />
                                    </div>
                                </Col>
                                <Col/>
                            </FormGroup>
                            <FormGroup row>
                                <Col/>
                                <Col sm={12}>
                                    <div className="Login-button-container">
                                        <Button
                                            type="submit"
                                            className="Login-Button"
                                        >
                                            Upload
                                        </Button>
                                    </div>
                                </Col>
                                <Col/>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}