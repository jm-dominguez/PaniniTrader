import { Meteor } from "meteor/meteor";
import React from "react";
import NavBarUser from "../NavBarUser.js";
import { withTracker } from "meteor/react-meteor-data";
import { PeopleGroups } from "../../../api/collections/peopleGroups.js";
import "./GroupDetail.css";
import {Message} from "./Message.jsx";

class GroupDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: ""
        }

        Session.set({messages: this.props.location.state.id});

        this.handleBackGroups = this.handleBackGroups.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleBackGroups() {
        this.props.history.push("/menu/groups");
    }

    handleMessage(e) {
        this.setState({ msg: e.target.value });
    }

    handleSendMessage() {
        console.log(this.state.msg);
        if (this.state.msg == "") {
            alert("The message can't be empty!");
        }
        else {

            let idGrupo = this.props.location.state.id;
            Meteor.call("peopleGroups.findById", idGrupo, (err, result) => {

                let newMessages = result.messages;
                newMessages.push(this.state.msg + "|"+ Meteor.userId() + "|"+ Meteor.user().profile.firstName + "|" + Meteor.user().profile.surname);


                Meteor.call("peopleGroups.addMessage", idGrupo, result.user, result.name, result.detail, result.location, newMessages)
            });
        }
    }

    renderMessages() {

        let idGrupo = this.props.location.state.id;
        let mensajes = undefined;
        let pS = Session.get("messages");
        if(this.props.peopleGroups[0] != undefined){
            mensajes = this.props.peopleGroups[0].messages;
        }

        if(mensajes != undefined){
            return (
                mensajes.map((msj,i) => (
                    <Message key={i} message={msj.split("|")[0]} userId={msj.split("|")[1]} userName={msj.split("|")[2] + " " + msj.split("|")[3]}/>
                ))
                )
            ;
        }
        
    }

    render() {
        return (
            <div>
                <NavBarUser />
                <br />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <input type="submit" id="btnGroups" className="btn btn-success btn-sm" value="Back to groups" onClick={this.handleBackGroups} />
                        </div>
                        <div className="col-md-2">
                            <h4>Detail:</h4>
                            <p>{this.props.location.state.detail}</p>
                        </div>
                        <div className="col-md-7">
                            <h4>Chat:</h4>
                            <div id="chat-container">
                                {this.renderMessages()}
                            </div>
                            <input type="text" name="text" placeholder="Type a message" autoComplete="on" onChange={this.handleMessage} />
                            <input type="submit" id="btnGroups"className="btn btn-success btn-sm" value="Send message" onClick={this.handleSendMessage} />
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withTracker(() => {
    Meteor.subscribe("peopleGroups");
    let pS = Session.get("messages");
    return {
        peopleGroups: PeopleGroups.find({ _id : pS }).fetch(),
    }
})(GroupDetail);
