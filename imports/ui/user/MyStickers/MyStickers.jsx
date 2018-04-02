import {Meteor} from "meteor/meteor";
import React from "react";
import NavBarUser from "../NavBarUser.js";
import {withTracker} from "meteor/react-meteor-data";
import {Sticker} from "../Components/Sticker.js";
import {Stickers} from "../../../api/collections/stickers.js";
import {Insert} from "./Insert.js";
import { Stadistics } from "../../../api/collections/stadistics.js";

export class MyStickers extends React.Component{

    renderSticker(){
        console.log("props de myStickers");
        console.log(this.props.stickers);
        return this.props.stickers.map((sticker) =>(
            <Sticker key={sticker._id} id={sticker._id} number={sticker.number} owner={sticker.owner} phone={sticker.phone} name={sticker.name} country={sticker.country}/>
        ));
    }

    render(){
        return(
            <div>
                <NavBarUser/>
                <div className="container-fluid">                    
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-sm-8">
                            
                            <h2> My repeated stickers</h2>
                            <div className="row">
                                {this.renderSticker()}
                            </div>
                        </div>
                        <div className = "col-sm-4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h2> Add repeated sticker </h2>
                                </div>
                            </div>
                            <div className="row">
                                <Insert/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker(()=>{
    Meteor.subscribe("stickers");
    let userId = Meteor.userId();
    return {
        stickers: Stickers.find({owner:userId}).fetch().reverse(),
    };
}) (MyStickers);