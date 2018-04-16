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
            Session.set({Myorder: e.currentTarget.textContent});
            Session.set({Mylimit: 12});
            this.setState({
                order: e.currentTarget.textContent
            })
        }
        else{
            Session.set({Myorder: undefined});
            this.setState({
                order: ""
            });
        }
    
    }

    handleReset(){
        Session.set({Mystatus: "noFilter"});
        this.setState({
            filter: "noFilter",
            name: "",
            team: "",
            number: ""
        });   
    }


    handleMore(){
        let pLimit = Session.get("Mylimit");
        if(!(this.props.stickers.length + 12 <= pLimit)){
            pLimit += 12;
            console.log("pLimit" + pLimit );
            console.log(this.props.stickers);
            Session.set({Mylimit:pLimit});
        }
    }

    handleFilter(pname, pteam, pnumber, pfilter){
        Session.set({Myname: pname});
        Session.set({Mynumber: pnumber});
        Session.set({Mystatus: pfilter});
        this.setState({
            filter: pfilter,
            name: pname,
            team: pteam,
            number: pnumber
        });
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
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    componentDidMount(){
        window.addEventListener("scroll", this.onScroll, false);
    }

    componentWillMount(){
        Session.set({Mystatus: "noFilter", Mylimit:12, Myorder:undefined});
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
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default withRouter( withTracker(()=>{
    Meteor.subscribe("Mystickers");
        
        let userId = Meteor.userId();
        let pLimit = Session.get("Mylimit");
        let pOrder = Session.get("Myorder");
        let sortOrder = {};
        let status = Session.get("Mystatus");
        
        sortOrder[pOrder] = 1;
        if(sortOrder.DateAdded === 1){
            sortOrder[pOrder] = -1;
        }
        if(status === "noFilter"){
            return {
            stickers: Stickers.find({},{sort: sortOrder, limit: pLimit}).fetch(),
            
        };
        }
        else if(status === "numFilter"){
            let pNumber = Session.get("Mynumber");
            return {
                stickers: Stickers.find({number: pNumber},{sort: sortOrder, limit: pLimit}).fetch(),
               
            };
        }
        else if(status === "nameFilter"){
            let pName = Session.get("Myname").slice(0, -3);
            return {
                stickers: Stickers.find({name:{$regex:pName}},{sort: sortOrder, limit: pLimit}).fetch(),
                
            };
        }
        else{
            return {
                stickers: Stickers.find({},{sort: sortOrder, limit: pLimit}).fetch(),
                
            };
        }
}) (MyStickers));