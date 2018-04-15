import {Meteor} from "meteor/meteor";
import React from "react";
import {withRouter} from "react-router-dom";
import NavBarUser from "../NavBarUser.js";
import {withTracker} from "meteor/react-meteor-data";
import {Sticker} from "../Components/Sticker.js";
import {Stickers} from "../../../api/collections/stickers.js";
import {Insert} from "./Insert.js";
import { Stadistics } from "../../../api/collections/stadistics.js";
import Filter from "../Filter/filter.js";
import {Session} from "meteor/session";
import "./MyStickers.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export class MyStickers extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filter: "noFilter",
            name:"",
            team:"",
            number:"",
            order: "",
            dropdownOpen: false
        }
        Session.keys = {}
        Session.set({status: "noFilter", limit:12, order:undefined});

        
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleMore = this.handleMore.bind(this);
        this.onScroll = this.onScroll.bind(this);
        
        
        this.handleOrder = this.handleOrder.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleOrder(e){
        if(e.currentTarget.textContent !== "None"){
            Session.set({order: e.currentTarget.textContent});
            Session.set({limit: 12});
        }
        else{
            Session.set({order: undefined});
            this.setState({
                order: ""
            });
        }
    
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
        if(!(this.props.stickers.length + 12 <= pLimit)){
            pLimit += 12;
            console.log("pLimit" + pLimit );
            console.log(this.props.stickers);
            Session.set({limit:pLimit});
        }
    }

    handleFilter(pname, pteam, pnumber, pfilter){
        Session.set({name: pname});
        Session.set({number: pnumber});
        Session.set({status: pfilter});
        this.setState({
            filter: pfilter,
            name: pname,
            team: pteam,
            number: pnumber
        });
    }

    onScroll(){
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50) &&
            this.props.stickers.length &&
            !this.props.isLoading
          ) {
            this.handleMore();
          }
        

    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    componentDidMount(){
        window.addEventListener("scroll", this.onScroll, false);
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.onScroll, false);
    }

    renderSticker(){
        console.log(this.props);
            return this.props.stickers.map((sticker) =>(
                <Sticker key={sticker._id} id={sticker._id} number={sticker.number} owner={sticker.owner} phone={sticker.phone} name={sticker.name} 
                country={sticker.country} stadistics={this.props.stadistics}/>
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
                            <div className = "row">
                            <div className="row">
                                    <div className="col-sm-1">
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                            <DropdownToggle caret>
                                                {this.state.order === "" ? "Sort By": this.state.order}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem >
                                                    <div onClick={this.handleOrder}>
                                                        number
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <div onClick={this.handleOrder}>
                                                        name
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <div onClick = {this.handleOrder}>
                                                        country
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <div onClick = {this.handleOrder}>
                                                        None
                                                    </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
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

export default withRouter( withTracker(()=>{
    Meteor.subscribe("stickers");
        
        let userId = Meteor.userId();
        let pLimit = Session.get("limit");
        let pOrder = Session.get("order");
        let sortOrder = {};
        let status = Session.get("status");
        
        sortOrder[pOrder] = 1;
        if(status === "noFilter"){
            return {
            stickers: Stickers.find({owner:userId},{sort: sortOrder, limit: pLimit}).fetch().reverse(),
            
        };
        }
        else if(status === "numFilter"){
            let pNumber = Session.get("number");
            return {
                stickers: Stickers.find({owner: userId,number: pNumber},{sort: sortOrder, limit: pLimit}).fetch(),
               
            };
        }
        else if(status === "nameFilter"){
            let pName = Session.get("name").slice(0, -3);
            return {
                stickers: Stickers.find({owner:userId, name:{$regex:pName}},{sort: sortOrder, limit: pLimit}).fetch(),
                
            };
        }
        else{
            return {
                stickers: Stickers.find({owner:userId},{sort: sortOrder, limit: pLimit}).fetch().reverse(),
                
            };
        }
}) (MyStickers));