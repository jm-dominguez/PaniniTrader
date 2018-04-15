import { Meteor } from "meteor/meteor";
import React from "react";
import NavBarUser from "../NavBarUser.js";
import { withTracker } from "meteor/react-meteor-data";
import { PeopleGroups } from "../../../api/collections/peopleGroups.js";

export default class NewGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            name: "",
            description: ""
        }

        this.handleDescription = this.handleDescription.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackGroups = this.handleBackGroups.bind(this);
    }

    handleBackGroups() {
        this.props.history.push("/menu/groups");
    }

    handleLocation(e) {
        this.setState({ location: e.target.value });
    }

    handleName(e) {
        this.setState({ name: e.target.value });
    }

    handleDescription(e) {
        this.setState({ description: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.location === "") {
            alert("You must type a location");
        }

        else if (this.state.name === "") {
            alert("You must type a name");
        }

        else if (this.state.description === "") {
            alert("You must type a description");
        }

        else {
            let pMessages = [];
            let pUser = [];
            pUser.push(Meteor.userId());

            Meteor.call("peopleGroups.addGroup", this.state.name, pUser, this.state.description, this.state.location, pMessages);
            //"peopleGroups.addGroup"(pName,pUser,pDetail,pLocation,pMessages)

            alert("Group created!")

            this.props.history.push("/menu/groups");
        }

    }
    render() {
        return (
            <div>
                <NavBarUser />
                <br />
                <div className="row">
                    <div className="col-md-2">
                        <input type="submit" id="btnGroups" className="btn btn-success btn-md" value="Back to groups" onClick={this.handleBackGroups} />
                    </div>
                    <div className="col-md-4">
                        <h2>Create a new group</h2>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-2">
                                <p className="textFormulario">Name:</p>
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="text" placeholder="Enter a name" autoComplete="on" onChange={this.handleName} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-2">
                                <p className="textFormulario">Description:</p>
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="text" placeholder="Enter a description" autoComplete="on" onChange={this.handleDescription} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <p className="textFormulario"> Location:</p>
                            </div>
                            <div className="col-md-6">
                                <input type="email" name="text" placeholder="Enter the location" autoComplete="email" onChange={this.handleLocation} />
                            </div>
                        </div>
                        <br />
                        <div className="row" id="signup-button-zone">
                            <input type="submit" value="Create group" className="btn btn-success btn-md" onClick={this.handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
