import { Meteor } from "meteor/meteor";
import React from "react";
import NavBarUser from "../NavBarUser.js";
import { withTracker } from "meteor/react-meteor-data";
import { PeopleGroups } from "../../../api/collections/peopleGroups.js";
import { Group } from "../Components/Group.jsx";

export class Groups extends React.Component {
    constructor(props) {
        super(props);
    }


    renderGroup() {
        return (
            this.props.peopleGroups.map((g) =>
                <Group key={g._id} user={g.user} name={g.name} detail={g.detail} location={g.location} />
            )
        );
    }

    handleCreateGroup() {
        console.log("Crear grupo");
    }

    handleJoinGroup() {
        console.log("Unir grupo");
    }

    render() {
        return (
            <div>
                <NavBarUser />
                <br />
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-8">
                        <h2>My Groups</h2>
                        <br />
                        <br />
                        <div className="row">
                            {this.renderGroup()}
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <br />
                        <br />
                        <br />
                        <input type="submit" className="btn btn-success btn-sm" value="Create group" onClick={this.handleCreateGroup} />
                        <br />
                        <br />
                        <br />
                        <input type="submit" className="btn btn-success btn-sm" value="Join group" onClick={this.handleJoinGroup} />
                    </div>
                </div>
            </div>
        );
    }
}


export default withTracker(() => {
    Meteor.subscribe("peopleGroups");
    let userId = Meteor.userId();
    return {
        peopleGroups: PeopleGroups.find({ user: userId }).fetch(),
    }
})(Groups);