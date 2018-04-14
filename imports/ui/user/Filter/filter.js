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
        this.handleSearch = this.handleSearch.bind(this);
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

    handleSearch(){
        if(this.state.number === "" && this.state.team === "" && this.state.name === ""){
            alert("You need to insert at least one param to search");
        }
        else if(this.state.number < 0 || this.state.number > 669){
            alert("The range of stickers in the album is (0-669)")
        }
        else{
            let number = this.state.number;
            let team = this.state.team;
            let name = this.state.name;
            Session.set({limit: 9});
            this.props.onFilter(name, team, number);

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
                <h2 id="filter-title">Filter:</h2>
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                    <input type="submit" className="btn btn-danger btn-sm" value="Reset filter" onClick={this.handleReset} />
                        <br />
                        <br />
                        <h5>Name:</h5>
                        <div className="formFilter">
                            <form>
                                <label>
                                    <input list="players" name="players" onChange={this.handleNameChange}/>
                                    <datalist id="players">
                                        {
                                            this.props.names.map((name)=>(
                                                <option key = {name.Name + name.Num} value={name.Name}/>
                                            ))
                                        }
                                    </datalist>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h5>Number:</h5>
                        <div className="formFilter">
                            <form>
                                <label>
                                    <input list="numbers" name="number" onChange = {this.handleNumberChange}/>
                                    <datalist id="numbers">
                                        {this.props.names.map((stickerInfo)=>(
                                            <option key = {"number" + stickerInfo.Num} value= {stickerInfo.Num}/>
                                        ))}
                                    </datalist> 
                                </label>
                            </form>

                        </div>
                        <input type="submit" className="btn btn-danger btn-sm" value="Search" onClick={this.handleSearch} />
                        <br />
                        <br />

                    </div>
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