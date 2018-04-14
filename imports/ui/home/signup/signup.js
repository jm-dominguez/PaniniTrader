import React from "react";
import "./signup.css";
import { withRouter } from "react-router-dom";
class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            surname: "",
            password: "",
            cPassword: "",
            mail:"",
            cellphone:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlefName = this.handlefName.bind(this);
        this.handleSurname = this.handleSurname.bind(this);
        this.handleMail = this.handleMail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleCPassword = this.handleCPassword.bind(this);
        this.handleCellphone = this.handleCellphone.bind(this);
    }
    handleCellphone(e){
        this.setState({
            cellphone: e.target.value
        })
    }
    handlefName(e){
        this.setState({
            firstName: e.target.value
        });
    }
    handleSurname(e){
        this.setState({
            surname: e.target.value
        });
    }
    handleMail(e){
        this.setState({
            mail: e.target.value
        });
    }
    handlePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    handleCPassword(e){
        this.setState({
            cPassword: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let numbers = /^[0-9]+$/;
        if(this.state.firstName === ""){
            alert("You must type your first name");
        }
        else if(this.state.surname === ""){
            alert("You must type your surname");
        }
        else if(this.state.mail === ""){
            alert("You must type a valid e-mail");
        }
        else if(!this.state.mail.match(/.+@.+/)){
            alert("You must type a valid e-mail");
        }
        else if(this.state.cellphone.length !== 10){
            alert("Your cellphone must have 10 digits");
        }
        else if(!(this.state.cellphone.match(numbers))){
            alert("Your cellphone can only containe numeric values");
        }
        else if(this.state.password === ""){
            alert("You must type a password");
        }
        else if(this.state.cPassword === ""){
            alert("You must confirm your password");
        }
        else if(this.state.password !== this.state.cPassword){
            alert("The passwords do not match");
        }
        else{
            try{
                Accounts.createUser({
                    email: this.state.mail,
                    password: this.state.password,
                    profile: {
                        firstName: this.state.firstName,
                        surname: this.state.surname,
                        phone: this.state.cellphone
                    }
                }, (err)=>{
                    if(err){
                        return err;
                    }
                    else{
                        alert("Account Succesfully Created");

                        this.props.history.push("/menu");
        
                    
                        Meteor.call("sendVerification");

                    }
                });
            }
            catch(e){
                alert(e);
            }
        }
    }
    render() {
        return (
            <div>
                <div className="container-fluid" id="signup-container">
                    <h2 id="signup-title"> Sign up </h2>
                    <form>
                        <label className="form-object">
                            <div className="row">
                                <div className="col-sm-5">
                                    First Name:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="text" name="text" placeholder="Enter your name" autoComplete="on" onChange={this.handlefName} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-5">
                                    Surname:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="text" name="text" placeholder="Enter your surname" autoComplete="on" onChange={this.handleSurname} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-5">
                                    E-Mail:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="email" name="text" placeholder="Enter your email" autoComplete="email" onChange={this.handleMail} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-5">
                                    Cellphone:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="tel" name="tel" placeholder="Enter your cellphone" autoComplete="off" minLength="10" maxLength="10" onChange={this.handleCellphone} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-5">
                                    Password:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="password" name="password" placeholder="Password"  onChange={this.handlePassword} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-5">
                                    Confirm Password:
                                    </div>
                                <div className="col-sm-7">
                                    <input type="password" name="password" placeholder="Confirm Password" autoComplete="off" onChange={this.handleCPassword} />
                                </div>
                            </div>
                            <br />
                            <div className="row" id="signup-button-zone">
                                <input type="submit" value="Sign Up" className="btn btn-danger btn-sm" onClick={this.handleSubmit} />
                            </div>

                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);