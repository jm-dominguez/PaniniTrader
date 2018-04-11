import { Meteor } from "meteor/meteor";
import React from "react";
import "./Sticker.css";

export class Group extends React.Component {
    render(){
        return(
            <div>
                <div className="container">
                            <h5> <strong> Name of the group: </strong>{this.props.name}</h5>
                            <br/>
                            <h5> <strong>Location: </strong> {this.props.location} </h5>
                            <br/>
                            <input type="submit" className="btn btn-success btn-sm" value="See group" onClick={this.handleDetailGroup} />
                            <br/>
                            <br/>
                </div>
            </div>
        );

    }
}