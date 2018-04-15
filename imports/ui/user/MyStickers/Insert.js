import { Meteor } from "meteor/meteor"
import React from "react";
import "./Insert.css";
import { Stickers } from "../../../../imports/api/collections/stickers.js";
import { Names } from "../../../api/collections/names.js";
import { Stadistics } from "../../../api/collections/stadistics.js";

export class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: ""
        }

        this.numberChange = this.numberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    numberChange(e) {
        this.setState({
            number: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.number < 0 || this.state.number > 669) {
            alert("The range of stickers in the album is (0-669)")
        }
        else {
            let id = Meteor.userId();
            let cellphone = Meteor.user().profile.phone;
            //let player = Names.findOne({Num: parseInt(this.state.number)});
            Meteor.call("names.findByNum", parseInt(this.state.number), (err, result) => {
                console.log(result);
                let player = result;
                let pName = player.Name.slice(0, -3);
                let pCountry = player.Country;
                Meteor.call("stickers.insert", this.state.number, id, cellphone, pName, pCountry);
                alert("Your sticker was succesfully added");
                
            });
            Meteor.call("stadistics.findByNum", this.state.number, (err, result) => {
                let quantityUpdate = parseInt(result.quantity) + 1;
                console.log("final:" + quantityUpdate);
                Meteor.call("stadistics.updatesInfo", result._id, quantityUpdate, this.state.number);

            });


        }

    }

    render() {
        return (
            <div>
                <div className="container" id="add-container">
                    <div className="row">
                        <div className="col-sm-12">
                            <p> Add a new repeated sticker </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Enter Sticker Number:
                                    <input type="number" name="number" placeholder="Sticker Number, e.g. 203" onChange={this.numberChange} />
                                </label>
                                <input type="submit" className="submit" value="Add" />
                            </form>
                        </div>
                    </div>
                    <div className="row help-icon">
                        <div className = "col-sm-10">
                        </div>
                        <div className = "col-sm-2">
                            <i className="material-icons" data-toggle="modal" data-target="#addStickerHelp">help</i>
                        </div>
                    </div>
                    <div className="modal fade" id="addStickerHelp" tabIndex="-1" role="dialog" aria-labelledby="Sticker help Modal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Help for adding a Sticker</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            You've got a new repeated sticker? <br/>
                            Just insert the number and click on the add button.
                        </div>
                        <div className="modal-footer">
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}