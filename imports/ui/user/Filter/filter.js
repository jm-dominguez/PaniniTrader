import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Names } from "../../../api/collections/names.js";
import { Groups } from "../../../api/collections/groups.js";
import {withRouter} from "react-router-dom";
import "./filter.css";


class Filter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: "",
            name: "",
            team: ""
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleNumberSearch = this.handleNumberSearch.bind(this);
        this.handleNameSearch = this.handleNameSearch.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleTeamChange(e) {
        this.setState({
            team: e.target.value
        })
    }
    
    handleNumberChange(e){
        e.preventDefault();
        this.setState({
            number: e.target.value
        });
    }

    handleNumberSearch(e){
        e.preventDefault();
        if(this.state.number === ""){
            alert("You need to insert at least one number to search");
        }
        else if(this.state.number < 0 || this.state.number > 669){
            alert("The range of stickers in the album is (0-669)")
        }
        else{
            let filter = "numFilter"
            let number = this.state.number;
            let team = this.state.team;
            let name = this.state.name;
            Session.set({limit: 9});
            ReactDOM.findDOMNode(this.refs.searchNumberSubmit).value = "";
            this.props.onFilter(name, team, number, filter);

        }
    }

    handleNameSearch(e){
        e.preventDefault();
        if(this.state.name === ""){
            alert("You need to insert at least one letter to search");
        }
        else if(this.state.number < 0 || this.state.number > 669){
            alert("The range of stickers in the album is (0-669)")
        }
        else{
            let filter = "nameFilter"
            let number = this.state.number;
            let team = this.state.team;
            let name = this.state.name;
            Session.set({limit: 9});
            ReactDOM.findDOMNode(this.refs.searchPlayerSubmit).value = "";
            this.props.onFilter(name, team, number, filter);
        }
    }

    handleReset() {
        this.setState({
            number: "",
            name:"",
            team: ""
        });
        this.props.onReset();
    }

    render() {
        return (
            <div className="filterSelection">
                {
                    this.props.status === "My" ? <h2 id="filter-title">Search in your repeated stickers:</h2>: <h2 id="filter-title">Search your missing stickers:</h2>
                }
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                    <input type="submit" className="btn btn-danger btn-sm" value="Reset" onClick={this.handleReset} />
                        <br />
                        <br />
                        <h5>Player Name:</h5>
                        <div className="formFilter">
                            <form>
                                <label>
                                    <input list="players" name="players" ref="searchPlayerSubmit" placeholder="e.g. Neymar" onChange={this.handleNameChange}/>
                                    <datalist id="players">
                                        {
                                            this.props.names.map((name)=>(
                                                <option key = {name.Name + name.Num} value={name.Name}/>
                                            ))
                                        }
                                    </datalist>
                                </label>
                                <input type="submit" id="searchPlayerSubmit" className="btn btn-danger btn-sm" value="Search" onClick={this.handleNameSearch} />
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h5>Sticker Number:</h5>
                        <div className="formFilter">
                            <form>
                                <label>
                                    <input list="numbers" name="number" ref="searchNumberSubmit" placeholder="e.g. 153" onChange = {this.handleNumberChange}/>
                                    <datalist id="numbers">
                                        {this.props.names.map((stickerInfo)=>(
                                            <option key = {"number" + stickerInfo.Num} value= {stickerInfo.Num}/>
                                        ))}
                                    </datalist> 
                                </label>
                                <input type="submit" id="search-number-submit"  className="btn btn-danger btn-sm" value="Search" onClick={this.handleNumberSearch} />
                            </form>
                        </div>
                        <br />
                        <br />

                    </div>
                </div>
                <div className="row help-icon">
                     <i class="material-icons">help</i>
                </div>
            </div>
        );
    }
}

export default withRouter( withTracker(() => {
    Meteor.subscribe("names");
    Meteor.subscribe("groups");
    return {
        names: Names.find().fetch(),
        groups: Groups.find().fetch()
    };
})(Filter));