import React from "react";
import Login from "./Login";
import Register from "./Register";

export default class Login_Register extends React.Component {
    render() {
        return (
            <div className="Login-register-container container-fluid">

                <div className="row Login-register-container-row">
                    <div className="register-container col-lg-6 col-sm-12">
                        <div className="row header">
                            <div className="col-sm-12">
                                Register
                            </div>
                        </div>
                        <div className="row">
                            <Register />
                        </div>
                        <div className="row pushdown-container">
                            <div className="col-sm-12">
                                <a href="#login-section">Already have an account? LOGIN here</a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="login-container col-lg-6 col-sm-12"
                        id="login-section"
                    >
                        <div className="row header">
                            <div className="col-sm-12">
                                Login
                            </div>
                        </div>
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
}