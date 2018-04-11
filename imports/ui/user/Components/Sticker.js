import { Meteor } from "meteor/meteor";
import React from "react";
import "./Sticker.css";
import { Stickers } from "../../../api/collections/stickers.js";
import { Stadistics } from "../../../api/collections/stadistics.js";
import { Names } from "../../../api/collections/names.js";

export class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleContactClick = this.handleContactClick.bind(this);
    }

    handleRemoveClick() {
        Meteor.call("names.findByNum", parseInt(this.props.number), (err, result) => {
            console.log(result);
            let toRemove = String(result.Num);

            Meteor.call("stadistics.findByNum", toRemove, (err, result) => {
                let quantityUpdate = parseInt(result.quantity) - 1;
                console.log("final:" + quantityUpdate);
                Meteor.call("stadistics.updatesInfo", result._id, quantityUpdate, toRemove);

            });
        });



        Meteor.call("stickers.remove", this.props.id);
    }

    handleContactClick() {
        let cel = this.props.phone;
        let url = "https://api.whatsapp.com/send?phone=57";
        let number = this.props.number;
        let finalUrl = url + cel;
        console.log(finalUrl);
        window.open(finalUrl, "_blank");

    }

    renderButton() {
        let userId = Meteor.userId();
        if (this.props.owner === userId) {
            return <button type="button" onClick={this.handleRemoveClick} className="btn btn-danger btn-sm btn-block">Remove</button>
        }
        else {
            let arreglo = this.props.stadistics;
            console.log(this.props);
            let q = undefined;
            if (arreglo[this.props.number] !== undefined){
                q =  arreglo[this.props.number].quantity;
            }

            console.log("q"+q);
            return (
                <div>
                    <p>{q} </p>
                    <button type="button" onClick={this.handleContactClick} className="btn btn-success btn-sm btn-block">Contact</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <p> {this.props.country} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p> {this.props.name} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png" alt="Player image" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p> {this.props.number} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {this.renderButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}