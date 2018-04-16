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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "noFilter",
            name:"",
            team:"",
            number:"",
            order: "",
            dropdownOpen: false
        }

        Session.set({status: "noFilter"});
        
        Session.set({order: undefined});
        Session.set({limit: 12});
        
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleMore = this.handleMore.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        
    }


    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    handleOrder(e){
        if(e.currentTarget.textContent !== "None"){
            Session.set({order: e.currentTarget.textContent});
            Session.set({limit: 12});
            this.setState({
                order: ""
            });
        }
        else{
            Session.set({order: undefined});
            this.setState({
                order: ""
            });
        }
    
    }

    handleMore(){
        let pLimit = Session.get("limit");
        if(!(this.props.stickers.length + 12 <= pLimit)){
            pLimit += 15;
            console.log("pLimit" + pLimit );
            console.log(this.props.stickers);
            Session.set({limit:pLimit});
        }
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

    handleReset(){
        Session.set({status: "noFilter"});
        this.setState({
            filter: "noFilter",
            name: "",
            team: "",
            number: ""
        });   
    }

    renderSticker(){
        console.log(this.props);
            return this.props.stickers.map((sticker) =>(
                <Sticker key={sticker._id} id={sticker._id} number={sticker.number} owner={sticker.owner} phone={sticker.phone} name={sticker.name} 
                country={sticker.country} stadistics={this.props.stadistics}/>
            ));
        
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
                            <Filter onFilter={this.handleFilter} onReset={this.handleReset} status="other"/>
                        </div>
                        <div className="col-sm-8">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h2>Recently added stickers! </h2>
                                    </div>
                                </div>
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
                                                        DateAdded
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
                                <div className="row">
                                    {this.renderSticker()}
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

        Meteor.subscribe("Otherstickers");
        Meteor.subscribe("stadistics");
        let userId = Meteor.userId();
        let pLimit = Session.get("limit");
        let pOrder = Session.get("order");
        let sortOrder = {};
        let status = Session.get("status");
        if(sortOrder.DateAdded === 1){
            sortOrder[pOrder] = -1;
        }
        sortOrder[pOrder] = 1;
        if(status === "noFilter"){
            return {
            stickers: Stickers.find({owner:{$ne:userId}},{sort: sortOrder, limit: pLimit}).fetch(),
            stadistics : Stadistics.find().fetch()
        };
        }
        else if(status === "numFilter"){
            let pNumber = Session.get("number");
            return {
                stickers: Stickers.find({owner:{$ne:userId}, number: pNumber},{sort: sortOrder, limit: pLimit}).fetch(),
                stadistics : Stadistics.find().fetch()
            };
        }
        else if(status === "nameFilter"){
            let pName = Session.get("name").slice(0, -3);
            return {
                stickers: Stickers.find({owner:{$ne:userId}, name:{$regex:pName}},{sort: sortOrder, limit: pLimit}).fetch(),
                stadistics : Stadistics.find().fetch()
            };
        }
        else{
            return {
                stickers: Stickers.find({owner:{$ne:userId}},{sort: sortOrder, limit: pLimit}).fetch(),
                stadistics : Stadistics.find().fetch()
            };
        }
    
}) (UserMenu));