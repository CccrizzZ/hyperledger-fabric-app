import React, { Component } from 'react'
import {
    Button,
    Window,
    WindowHeader,
    WindowContent,
    Fieldset
} from 'react95'


export default class QueryKYC extends Component {

    constructor(props) {
        super(props)
        this.state = { 

        }
    }

    kycState = () => {
        if(this.props.rejected === "true"){
            return (
                <h2>KYC Rejected, Please Retry</h2>
            )
        }

        if (this.props.kyc === "true") {
            if (this.props.uploaded === "true") {
                return (
                    <h2>KYC Approved</h2>
                )
            }
        }else{
            if (this.props.uploaded === "true") {
                return (
                    <h2>Uploaded, Processing...</h2>
                )
            }else{
                return (
                    <h2>Please Upload Documents</h2>
                )
            }
        }


    }


    render() {
        return (
            <Window style={{ maxWidth: '500px', width: '500px', marginTop: 'calc(50vh - 350px)', marginLeft: 'calc(50vw - 250px)' }}>
                <WindowHeader>
                    <span>🔍</span>
                    QueryKYC.app
                </WindowHeader>
                <WindowContent style={{ padding: '0.25rem' }}>
                            
                        {/* the user file image */}
                        <hr />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img alt="userfiles" src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Places-server-database-icon.png" />
                            </div>
                        <hr />

                        {/* the form */}
                        <div style={{ display: 'flex' }}>

                        <Fieldset label='KYC state'>
                            {this.kycState()}
                        </Fieldset>
                    </div>
                    <hr />

                </WindowContent>
            </Window>
        )
    }
}
