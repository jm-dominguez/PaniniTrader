import React from "react";
import "./NavBarUser.css";
import { withRouter, Link } from "react-router-dom";
import {Session} from "meteor/session";

class NavBarUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleStickersClick = this.handleStickersClick.bind(this);
        this.handleGroupClick = this.handleGroupClick.bind(this);
    }

    handleSearchClick(e){
        e.preventDefault();
        this.props.history.push("/menu");

    }

    handleGroupClick(e){
        e.preventDefault();
        console.log(this.props);
        this.props.history.push("/menu/groups");
    }


    handleStickersClick(e){
        e.preventDefault();
        this.props.history.push("/menu/myrepeated");
    }

    handleLogOut(event){
        event.preventDefault();
        try{

            Meteor.logout((err)=>{
                if(err){
                    throw err;
                }
                else{
                    this.props.history.push("/");
                    
                }
            });
        }
        catch(e){
            alert("There was an error logging out, please try again later");
        }
    }

    render() {
        return (
            <div id="navigation">
                <nav className="navbar navbar-expand-md navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">PaniniTrader</a>                        
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleStickersClick}>My Repeated Stickers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleSearchClick}>Search</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleGroupClick}>Groups</a>
                            </li>
                            <li>
                                <button className="btn btn-danger my-2 my-sm-0" id="logout-button" type="submit" onClick={this.handleLogOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


export default withRouter(NavBarUser);