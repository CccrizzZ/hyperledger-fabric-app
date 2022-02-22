import React, { Component } from 'react'
import {
    Button,
    Window,
    WindowHeader,
    WindowContent,
    LoadingIndicator,
    TextField
} from 'react95'


export default class QueryKYC extends Component {
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

          {/* the search form */}
          <div style={{ display: 'flex' }}>
              <TextField
                  // value={}
                  placeholder='Type here...'
                  // onChange={handleChange}
                  fullWidth
              />
              <Button style={{ marginLeft: 4 }}>Reset</Button>
          </div>
          <hr />

          {/* submit button */}
          <Button fullWidth onClick={this.onSubmitPressed}>Search</Button>
      
      </WindowContent>
  </Window>
    )
  }
}
