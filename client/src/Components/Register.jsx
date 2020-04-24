import React from "react";
import {Button, Col, Form, FormGroup} from "reactstrap";
import axios from 'axios';
import {Redirect} from 'react-router-dom'
// import {BrowserRouter as Router, Link} from "react-router-dom";

export default class Register extends React.Component {
    state = {
        redirect: false,
        credentials: {
            name: "",
            email: "",
            password: ""
        },
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/register', this.state.credentials)
            .then(async res => {
                this.setState({redirect: true});
                alert("User Registered Successfully");
            })
            .catch(err => {
                console.log(err);
                alert("Error Registering in. Try Again");
            })
    };

    handleChange = async (e) => {
        const {name, value} = e.target;
        const cred = {...this.state["credentials"]};
        cred[name] = value;
        await this.setState({ credentials: cred });
        // console.log(this.state)
    };

    render() {
        const {redirect} = this.state;
        // console.log(this.state.credentials.name);
        if (redirect === true && this.state.credentials.name) {
            return <Redirect push to={`/uploadImage/${this.state.credentials.name}`} />
        }
        return (
            <div className="col-sm-12">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col/>
                        <Col sm={12}>
                            {/* "changeName" calls a function that changes the state of "name" every time the value of the feild is updated */}
                            <div className="input-container">
                                <i className="fa fa-user icon fa-2x" />
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="NAME"
                                    name="name"
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
                            {/* "changeName" calls a function that changes the state of "name" every time the value of the feild is updated */}
                            <div className="input-container">
                                <i className="fa fa-envelope-open-text icon fa-2x" />
                                <input
                                    className="input-field"
                                    type="email"
                                    placeholder="EMAIL"
                                    name="email"
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
                            {/* "changeName" calls a function that changes the state of "name" every time the value of the feild is updated */}
                            <div className="input-container">
                                <i className="fa fa-lock icon fa-2x" />
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder="PASSWORD"
                                    name="password"
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
                            <div className="register-button-container">
                                <Button
                                    type="submit"
                                    className="register-Button"
                                >
                                    Register
                                </Button>
                            </div>
                        </Col>
                        <Col/>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}