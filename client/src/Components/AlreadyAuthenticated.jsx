import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Login_Register from "./LoginRegister";

export default function AlreadyAuthenticated(ComponentToProtect) {
    return class extends Component {
        state = {
            loading: false,
            redirect: false,
        };
        componentDidMount() {
            fetch('/checkToken')
                .then(async res => {
                    // console.log(res)
                    if (res.status === 401) {
                        await this.setState({ redirect: true });
                    } else {
                        console.log('Already Logged in');
                        await this.setState({ redirect: false, loading: true });
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: true, redirect: false });
                });
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return <Redirect to="/user" />
            }

            if (redirect) {
                // eslint-disable-next-line
                return <Login_Register />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}