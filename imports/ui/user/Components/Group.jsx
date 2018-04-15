import { Meteor } from "meteor/meteor";
import React from "react";
import "./Sticker.css";
import { GroupDetail } from "./GroupDetail.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter, Link } from "react-router-dom";

export class Group extends React.Component {
    constructor(props) {
        super(props);

        this.handleJoinGroup = this.handleJoinGroup.bind(this);
    }

    handleJoinGroup() {
        console.log("mensajes")
        console.log(this.props)
        let userP = this.props.user;
        Meteor.call("peopleGroups.addMember", this.props.id, userP, this.props.name, this.props.detail, this.props.location, this.props.messages);
        //"peopleGroups.addMember"(id,userP,nameP,detailP,locationP,messagesP
        alert("Unido correctamente");
    }

    renderButton() {
        //<input type="submit" className="btn btn-success btn-sm" value="See group"a />
        let userId = Meteor.userId();
        let esta = false;

        this.props.user.map((u, i) => {
            if (u === userId) {
                esta = true;
            }
        })

        if (esta === true) {
            return (
                <Link to={{ pathname: "/menu/groupDetail", state: { detail: this.props.detail, id: this.props.id } }}>
                    <input type="submit" className="btn btn-success btn-sm" value="See group"  />
                </Link>
            )
        }

        else {
            return (
                <Link to={{ pathname: "/menu/groupDetail", state: { detail: this.props.detail, id: this.props.id } }}>
                    <input type="submit" className="btn btn-success btn-sm" value="Join group"  onClick={this.handleJoinGroup} />
                </Link>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h5> <strong> Name of the group: </strong>{this.props.name}</h5>
                    <br />
                    <h5> <strong>Location: </strong> {this.props.location} </h5>
                    <br />

                    {this.renderButton()}

                    {
                        console.log("Group")
                    }
                    {
                        console.log(this.props)
                    }
                    <br />
                    <br />
                </div>
            </div>
        );

    }
}

export default withRouter(Group);