import {Meteor} from "meteor/meteor";
import React from "react";
import NavBarUser from "../NavBarUser.js";
import {withTracker} from "meteor/react-meteor-data";
import {Sticker} from "../Components/Sticker.js";
import {Stickers} from "../../../api/collections/stickers.js";
import {Insert} from "./Insert.js";
import { Stadistics } from "../../../api/collections/stadistics.js";
import Filter from "../Filter/filter.js";
import {Session} from "meteor/session";
import "./MyStickers.css";

export class MyStickers extends React.Component{

    constructor(props){
        super(props);
        Session.set({limit: 12});
        Session.set({status: "noFilter"});
        Session.set({order: undefined});
        Session.set({limit: 12});
        this.onScroll = this.onScroll.bind(this);
        this.handleMore = this.handleMore.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset(){
        Session.set({status: "noFilter"});
        this.setState({
            filter: "noFilter",
            name: "",
            team: "",
            number: ""
        });   
    }

    handleMore(){
        let pLimit = Session.get("limit");
        pLimit += 12;
        Session.set({limit:pLimit});
    }

    handleFilter(pname, pteam, pnumber, pfilter){
        Session.set({name: pname});
        Session.set({number: pnumber});
        Session.set({status: pfilter});
    }

    onScroll(){
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
            this.props.stickers.length &&
            !this.props.isLoading
          ) {
            this.handleMore();
          }
        

    }

    componentDidMount(){
        window.addEventListener("scroll", this.onScroll, false);
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.onScroll, false);
    }

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
                            <div className="row" id="insert-row" >
                                <Insert/>
                            </div>
                            <div className="row">
                                <Filter onFilter={this.handleFilter} onReset={this.handleReset} status="My"/>
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
    let pLimit = Session.get("limit");
    let sortOrder = {};
    let status = Session.get("status");
    let pOrder = Session.get("order");
        
    sortOrder[pOrder] = 1;
    if(status === "noFilter") {
        return {
            stickers: Stickers.find({owner:userId}, {limit: pLimit}).fetch().reverse(),
        };
    }
    else if(status === "numFilter"){
        let pNumber = Session.get("number");
        return {
            stickers: Stickers.find({owner:userId, number: pNumber},{sort: sortOrder, limit: pLimit}).fetch(),
            stadistics : Stadistics.find().fetch()
        };
    }
    else if(status === "nameFilter"){
        let pName = Session.get("name").slice(0, -3);
        return {
            stickers: Stickers.find({owner:userId, name:{$regex:pName}},{sort: sortOrder, limit: pLimit}).fetch(),
            stadistics : Stadistics.find().fetch()
        };
    }
    else{
        return {
            stickers: Stickers.find({owner:userId}, {limit: pLimit}).fetch().reverse(),
        };
    }
}) (MyStickers);