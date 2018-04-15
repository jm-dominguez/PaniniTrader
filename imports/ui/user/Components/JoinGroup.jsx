import { Meteor } from "meteor/meteor";
import React from "react";
import NavBarUser from "../NavBarUser.js";
import { withTracker } from "meteor/react-meteor-data";
import { PeopleGroups } from "../../../api/collections/peopleGroups.js";
import { Group } from "../Components/Group.jsx";

class JoinGroup extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackGroups = this.handleBackGroups.bind(this);
    }

    handleBackGroups() {
        this.props.history.push("/menu/groups");
    }

    renderGroup() {
        console.log("History")
        console.log(this.props)
        return (
            this.props.peopleGroups.map((g) =>
                <Group key={g._id} id={g._id} user={g.user} name={g.name} detail={g.detail} location={g.location} history={this.props.history} messages={g.messages} />
            )
        );
    }
    render() {
        return (
            <div>
                <NavBarUser />
                <br />
                <div className="row">
                    <div className="col-sm-2">
                        <input type="submit" className="btn btn-success btn-sm" value="Back to groups" onClick={this.handleBackGroups} /></div>
                    <div className="col-sm-4">
                        <h2>Join a new group</h2>
                    </div>
                    <div className="col-sm-6">
                        {this.renderGroup()}
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    Meteor.subscribe("peopleGroups");
    let userId = Meteor.userId();
    return {
        peopleGroups: PeopleGroups.find({ user: { $ne: userId } }).fetch(),
    }
})(JoinGroup);