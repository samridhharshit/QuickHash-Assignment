import React from "react";
import axios from 'axios';
import {Redirect} from 'react-router';
import {Col, Button, Form, FormGroup} from 'reactstrap';
import {connect} from 'react-redux'

class Login extends React.Component {
    state = {
        password: "",
        email: "",
        redirect: false,
        name: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/login', this.state)
            .then(async res => {
                console.log(res.data);
                if (res.statusText === "OK") {
                    await this.setState({redirect: true, name: res.data});
                    this.props.provideUserDetails(this.state.name);
                    alert("User Logged in Successfully! Refresh The page once");
                } else {
                    alert(res.data);
                }
            })
            .catch(err => console.log(err));
    };

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: [value]
        })
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect push to={`/user/${this.state.name}`} />
        } else {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col/>
                                <Col sm={12}>
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
                                    <div className="Login-button-container">
                                        <Button
                                            type="submit"
                                            className="Login-Button"
                                        >
                                            Login
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

const mapDispatchToProps = (dispatch) => {
    return {
        provideUserDetails: (id) => {dispatch({type: 'MOUNT_USER', id})}
    }
};

export default connect(null, mapDispatchToProps)(Login)