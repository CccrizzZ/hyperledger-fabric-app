import React, { Component } from 'react'
import {
    Button,
    Window,
    WindowHeader,
    WindowContent,
    LoadingIndicator,
    Fieldset
} from 'react95'



// kyc state
// 1 none
// 2 uploaded
// 3 uploaded approved
// 4 uploaded rejected

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
                <div style={{ display: 'grid', justifyContent: 'center'}}>
                    <Fieldset label='Your Name' style={{width: "150px"}}>
                        {this.props.name}
                    </Fieldset>
                    <br />
                    <Fieldset label='Your ID' style={{width: "150px"}}>
                        {this.props.id}
                    </Fieldset>
                    <Fieldset label='Your Organization' style={{width: "150px"}}>
                        {this.props.org}
                    </Fieldset>
                </div>
                <hr />

                {/* the search form */}
                <div style={{ display: 'flex' }}>

                </div>

            </WindowContent>
        </Window>
        )
    }
}
