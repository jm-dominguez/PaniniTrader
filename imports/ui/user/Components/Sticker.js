import { Meteor } from "meteor/meteor";
import React from "react";
import "./Sticker.css";
import { Stickers } from "../../../api/collections/stickers.js";
import { Stadistics } from "../../../api/collections/stadistics.js";
import { Names } from "../../../api/collections/names.js";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

export class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isMounted: false,
            image: ""
        }
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleContactClick = this.handleContactClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    handleRemoveClick() {
        /*
        Meteor.call("names.findByNum", parseInt(this.props.number), (err, result) => {
            let toRemove = String(result.Num);

            Meteor.call("stadistics.findByNum", toRemove, (err, result) => {
                let quantityUpdate = parseInt(result.quantity) - 1;
                Meteor.call("stadistics.updatesInfo", result._id, quantityUpdate, toRemove);

            });
        });

        */



        Meteor.call("stickers.remove", this.props.id);
        this.setState({
            modal: false
        })
    }

    componentWillUnmount(){
        this.setState({
            isMounted : false
        });
        
    }

    componentWillMount(){
        this.setState({
            isMounted: true
        });
    }

    componentDidMount(){


        if(this.state.isMounted === true){
            Meteor.call("names.findByNum", parseInt(this.props.number), (err, result) => {
                let img = result.img;
                if(img === undefined){     
                    this.setState({
                        image: "/images/soon.png"
                    });
                    
                }
                else{
                    
                    this.setState({
                        image: img
                    });
                    
                }
                
            });

        } 
    }

    handleContactClick() {
        let cel = this.props.phone;
        let url = "https://api.whatsapp.com/send?phone=57";
        let number = this.props.number;
        let finalUrl = url + cel;
        window.open(finalUrl, "_blank");

    }

    renderButton() {
        let userId = Meteor.userId();
        if (this.props.owner === userId) {
            return <button type="button" onClick={this.toggle} className="btn btn-danger btn-sm btn-block">Remove</button>
        }
        else {
            
            return (
                <div>
                    {/**<p>{q} </p> */}
                    <button type="button" onClick={this.handleContactClick} className="btn btn-success btn-sm btn-block">
                        Contact
                        <img className="WhatsAppLogo" alt="whatsapp logo" src="/images/wapp.png"/>
                    </button>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="container" id="sticker-container">
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
                    <div className="row" id="image-row">
                        <div className="col-sm-12">
                            <img src= {this.state.image} alt="Player image" />
                            
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
                    <ModalBody>
                        Are you sure you want to remove the current sticker?<br/>
                        Sticker Number: {this.props.number} <br/>
                        Name: {this.props.name} <br/>
                        Country: {this.props.country} <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleRemoveClick}>Delete</Button>{' '}
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}