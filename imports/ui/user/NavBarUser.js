import React from "react";
import "./NavBarUser.css";
import { withRouter, Link } from "react-router-dom";

class NavBarUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(event){
        event.preventDefault();
        try{
            Meteor.logout();
            this.props.history.push("/");
        }
        catch(e){
            alert("There was an error logging out, please try again later");
        }
    }

    render() {
        return (
            <div id="navigation">
                <nav className="navbar navbar-expand-lg navbar-dark ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">PaniniTrader</a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">My Stickers</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/menu">
                                    <a className="nav-link">Search</a>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li>
                                <a className="nav-link" onClick={this.handleLogOut}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


export default withRouter(NavBarUser);