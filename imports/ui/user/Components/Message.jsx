import { Meteor } from "meteor/meteor";
import React from "react";
import "./Message.css";

export class Message extends React.Component {
    constructor(props) {
        super(props);
    }


    renderMessage() {
        if (Meteor.userId() === this.props.userId) {
            return (
                <div className="my-message">
                    <p> <strong> {this.props.userName} : </strong> {this.props.message}</p>
                </div>
            )
        }

        else{
            return (
                <div className="other-message">
                    <p> <strong> {this.props.userName} : </strong> {this.props.message}</p>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                {this.renderMessage()}
            </div>
        );
    }
}