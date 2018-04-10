import {Meteor} from "meteor/meteor";
import React from "react";
import {withRouter} from "react-router-dom";
import NavBarUser from "./NavBarUser.js";
import "./UserMenu.css";
import Filter from "./Filter/filter.js";
import {withTracker} from "meteor/react-meteor-data";
import {Stickers} from "../../api/collections/stickers.js";
import{Sticker} from "./Components/Sticker.js";
import {Names} from "../../api/collections/names.js";
import { Stadistics } from "../../api/collections/stadistics.js";
import {Tracker} from "meteor/tracker";
import {Session} from "meteor/session";

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "noFilter",
            name:"",
            team:"",
            number:""
        }
        
        Session.set({limit: 5});
        
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleMore = this.handleMore.bind(this);
        
    }

    handleMore(){
        let pLimit = Session.get("limit");
        pLimit += 5;
        Session.set({limit:pLimit});
    }

    handleFilter(pname, pteam, pnumber){
        this.setState({
            filter: "filter",
            name: pname,
            team: pteam,
            number: pnumber
        });
    }

    handleReset(){
        this.setState({
            filter: "noFilter",
            name: "",
            team: "",
            number: ""
        });   
    }

    renderSticker(){
        if(this.state.filter === "noFilter"){
            return this.props.stickers.map((sticker) =>(
                <Sticker key={sticker._id} id={sticker._id} number={sticker.number} owner={sticker.owner} phone={sticker.phone} name={sticker.name} 
                country={sticker.country} stadistics={this.props.stadistics}/>
            ));
        }
        else{
            if(this.state.number !== ""){
                let array = [];
                this.props.stickers.map((sticker)=>{
                    if(sticker.number === this.state.number){
                        array.push(sticker);
                    }
                });

                return array.map((sticker) =>(
                    <Sticker key={sticker._id} id={sticker._id} number={sticker.number} owner={sticker.owner} phone={sticker.phone} name={sticker.name} 
                    country={sticker.country} stadistics={this.props.stadistics}/>
                ));


            }

            else if(this.state.name !== ""){
                let players = Names.find({Name:{$regex: this.state.name} }).fetch();
                
                let numbers = [];
                players.map((player)=>{
                    numbers.push(player.Num);
                });

                console.log(numbers);

                let array = [];
                this.props.stickers.map((sticker)=>{
                    if(numbers.indexOf(parseInt(sticker.number)) >= 0){
                        array.push(sticker);
                    }
                });

                return array.map((sticker) =>(
                    <Sticker key={sticker._id} id={sticker._id} number={sticker.number} owner={sticker.owner} phone={sticker.phone} name={sticker.name} 
                    country={sticker.country} stadistics={this.props.stadistics}/>
                ));

            }
        }
        
    }

    render() {
        return (
            <div>
                <NavBarUser />
                <br />
                <div className="container-fluid">
                    <h1>Welcome! </h1>
                    <br />
                    <div className="row">
                        <div className="col-sm-4">
                            <Filter onFilter={this.handleFilter} onReset={this.handleReset}/>
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h2> Most Recent Publications! </h2>
                                </div>
                            </div>
                            <div className="row">
                            {
                                console.log("props")
                            }
                            {
                                console.log(this.props)
                            }
                                {this.renderSticker()}
                            </div>
                            <div className="row">
                                <div className="container-fluid">
                                    <button type="button" onClick={this.handleMore}>See More...</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter( withTracker(()=>{

        Meteor.subscribe("stickers");
        Meteor.subscribe("stadistics");
        let userId = Meteor.userId();
        let pLimit = Session.get("limit");
        return {
            stickers: Stickers.find({owner:{$ne:userId}}, {limit: pLimit}).fetch(),
            stadistics : Stadistics.find().fetch()
        };
    
}) (UserMenu));