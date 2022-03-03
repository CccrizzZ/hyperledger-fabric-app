import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { Button, ListGroup } from 'react-bootstrap';
import User from './User'
import axios from 'axios'


export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    // fetch all user info on mount
    async componentDidMount() {
        console.log("mounted")
        this.getAllUser()
    }

    // get all users data and store in the state
    getAllUser = async () => {
        // send request to express server get all user data
        await axios({
            method: 'get',
            url: 'http://34.130.139.150:3001/giveallusers',
        })
        .then(async (response) => {
            console.log(response)
            this.setState({
                users: response.data
            })

        })

    }


    approveUser = async (userID, org) => {
        // send request to express server get all user data
        await axios({
            method: 'post',
            url: `http://34.130.139.150:3001/approve/${userID}`,
        })
        .then(async (response) => {
            console.log(response)
            if (response.status === 200){
                alert(`User ${userID} is Approved for KYC`)
            }else{
                alert(`Approval for User ${userID} failed`)
            }

            // refresh user list
            this.getAllUser()
            return response

        })

        // send request to express server get all user data
        await axios({
            method: 'post',
            url: `http://34.130.139.150:3001/addkyc/${userID}/${org}`,
        })
        .then(async (response) => {
            console.log(response)
            if (response.status === 200){
                alert(`User ${userID} is Approved for KYC`)
            }else{
                alert(`Approval for User ${userID} failed`)
            }

            // refresh user list
            this.getAllUser()
            return response

        })
    }

    removeUser = async (userID) => {
        // send request to express server get all user data
        await axios({
            method: 'post',
            url: `http://34.130.139.150:3001/remove/${userID}`,
        })
        .then(async (response) => {
            console.log(response)
            if (response.status === 200){
                alert(`User ${userID} KYC Removed`)
            }else{
                alert(`Removal KYC for User ${userID} failed`)
            }

            // refresh user list
            this.getAllUser()
            return response

        })
    }

    rejectUser = async (userID) => {
        // send request to express server get all user data
        await axios({
            method: 'post',
            url: `http://34.130.139.150:3001/reject/${userID}`,
        })
        .then(async (response) => {
            console.log(response)
            if (response.status === 200){
                alert(`User ${userID} KYC Document Rejected`)
            }else{
                alert(`Rejection of Doc from User ${userID} failed`)
            }

            // refresh user list
            this.getAllUser()
            return response

        })
    }


    render() {
        return (
            <div>
                <h1>👑EKYC ADMIN👑</h1>
                <ListGroup style={{width: "80vw"}}>
                    {
                        this.state.users.length > 0 ?
                        this.state.users.map((user) => {
                            return(
                                <User 
                                    key={user.doc._id}
                                    name={user.doc.name}
                                    id={user.doc._id}
                                    kyc={user.doc.kyc}
                                    rejected={user.doc.rejected}
                                    uploaded={user.doc.uploaded}
                                    approve={this.approveUser}
                                    remove={this.removeUser}
                                    reject={this.rejectUser}

                                />
                            )
                        }) 
                        : undefined
                    }
                </ListGroup>
            </div>
        )
    }
}
