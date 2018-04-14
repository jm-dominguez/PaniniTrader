import React from "react";
import "./login.css";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleMailChange(e) {
        this.setState({
            mail: e.target.value
        });
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.mail === "") {
            alert("You must enter a valid e-mail");
        }
        else if (!this.state.mail.match(/.+@.+/)) {
            alert("You must type a valid e-mail");
        }
        else if (this.state.password === "") {
            alert("You must enter a password");
        }
        else {

            Meteor.loginWithPassword(this.state.mail, this.state.password, (err) => {
                if (err) {
                    throw (err);
                }
                else {
                    this.props.history.push("/menu");
                }
            });
        }

    }
    render() {
        return (
            <div>
                <div className="container-fluid" id="login-container">
                    <h2 id="login-title"> Login </h2>
                    <form>
                        <label className="form-object">
                            <div className="row">
                                <div className="col-sm-5">
                                    E-Mail:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="text" name="text" placeholder="Mail" autoComplete="on" onChange={this.handleMailChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-5">
                                    Password:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange} />
                                </div>
                            </div>
                            <br />
                            <div className="row" id="login-button-zone">
                                <input type="submit" value="Login" className="btn btn-danger btn-sm" onClick={this.handleSubmit} />
                            </div>

                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);