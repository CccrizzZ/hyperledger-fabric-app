import React, { Component } from 'react'
import { Button, ListGroup } from 'react-bootstrap';

export default class User extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    // approve user's kyc by id
    approve = () => {
        this.props.approve(this.props.id, this.props.org)
    }
   
    // remove user's kyc by id
    remove = () => {
        this.props.remove(this.props.id, this.props.org)
    }

    // reject user's kyc by id
    reject = () => {
        this.props.reject(this.props.id, this.props.org)
    }

    render() {
        return (
            <div>
                <ListGroup.Item> 
                    <p>name: {this.props.name}</p>
                    <p>id: {this.props.id} </p>
                    <p>org: {this.props.org} </p>
                    <p>kyc: {this.props.kyc}</p>
                    <p>uploaded: {this.props.uploaded}</p>
                    <p>rejected: {this.props.rejected}</p>

                    {
                        !(this.props.kyc === "true" || this.props.uploaded === "false" || this.props.rejected === "true") ?
                        undefined :
                        <>
                            <Button onClick={this.approve} style={{right: '10px', position: 'absolute', bottom: '5px'}} variant="success">Approve</Button>
                            <Button onClick={this.reject} style={{right: '110px', position: 'absolute', bottom: '5px'}} variant="warning">Reject</Button>
                            <Button onClick={this.remove} style={{right: '200px', position: 'absolute', bottom: '5px'}} variant="danger">Remove KYC</Button>
                        </>

                    }
                </ListGroup.Item>
            </div>
        )
    }
}
