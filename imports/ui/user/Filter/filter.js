import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Names } from "../../../api/collections/names.js";
import { Groups } from "../../../api/collections/groups.js";
import {withRouter} from "react-router-dom";


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
        this.numberChange = this.numberChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
        ReactDOM.findDOMNode(this.refs.nameInput).value=e.target.value;
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
        ReactDOM.findDOMNode(this.refs.numberInput).value=e.target.value;
    }

    numberChange(e) {
        e.preventDefault();
        this.setState({
            number: e.target.value
        });
        ReactDOM.findDOMNode(this.refs.numberInput).value=e.target.value;
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

        ReactDOM.findDOMNode(this.refs.numberInput).value="";
        ReactDOM.findDOMNode(this.refs.nameInput).value="";

        this.props.onReset();
    }

    render() {
        return (
            <div className="filterSelection">
                <h2 className="filterSelection">Filter your selection:</h2>
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <input type="submit" className="submit resetBtn" value="Reset filter" onClick={this.handleReset} />
                        <br />
                        <br />
                        <h5>Search by name:</h5>
                        <div className="formFilter">
                            <form>
                                <label>
                                    <select onChange={this.handleNameChange}>
                                        {this.props.names.map((name) => (
                                            <option className="dropdown-item" key={name.Num}>{name.Name}</option>
                                        ))}
                                    </select>
                                </label>
                            </form>
                            <input type="text" ref="nameInput" name="text" placeholder="Name" onChange={this.handleNameChange} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h5>Search by number:</h5>

                        <div className="formFilter">
                            <form>
                                <label>
                                    <select onChange={this.handleNumberChange}>
                                        {this.props.names.map((stickerInfo) => (
                                            <option key={stickerInfo.Num}>{stickerInfo.Num}</option>
                                        ))}
                                    </select>
                                </label>
                            </form>

                        </div>
                        <input type="number" ref="numberInput" name="number" placeholder="number" onChange={this.numberChange} />
                        <input type="submit" className="submit" value="Search" onClick={this.handleSearch} />
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