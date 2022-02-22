import React, { Component } from 'react'
import {
    Button,
    Window,
    WindowHeader,
    WindowContent,
    LoadingIndicator,
    Fieldset
} from 'react95'


export default class Home extends Component {
  render() {
    return (
        <Window style={{ maxWidth: '500px', width: '500px', marginTop: 'calc(50vh - 350px)', marginLeft: 'calc(50vw - 250px)' }}>
            <WindowHeader>
                <span>🌆</span>
                Home.app
            </WindowHeader>
            <WindowContent style={{ padding: '0.25rem' }}>
                        
                {/* the user file image */}
                <hr />
                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                        <Fieldset label='Upload eKYC Documents'>
                            Click on "Upload Documents" tab and proceed to upload your KYC documents.
                        </Fieldset>
                        <br />
                        <Fieldset label='Label here'>
                            Click on "Query eKYC Record" tab to search for specific records.
                        </Fieldset>
                    </div>
                <hr />

                {/* the search form */}
                <div style={{ display: 'flex' }}>

                </div>
                <hr />

            </WindowContent>
        </Window>
    )
  }
}
