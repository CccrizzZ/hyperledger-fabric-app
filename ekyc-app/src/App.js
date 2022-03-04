import React, { Component } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { 
  styleReset,
  AppBar,
  Toolbar,
  Button,
  Window,
  WindowHeader,
  WindowContent,
  TextField

} from 'react95';
import axios from 'axios';
// pick a theme of your choice
import millenium from "react95/dist/themes/millenium";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import UserUpload from './components/UserUpload'
import Home from './components/Home'
import QueryKYC from './components/QueryKYC'


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;


export default class App extends Component {


  constructor(props) {
    super(props)

    this.state = {
      currentComp: 'home',
      isLogin: false,
      uname: null,
      uid: null,
      ukyc: null,
      rejected : null


    }


    this.userInput = React.createRef();
    this.passwordInput = React.createRef();
    this.orgInput = React.createRef();
  }


  goUpload = () => {
    if(!this.state.isLogin) return
    this.setState({ currentComp: 'upload' })

  }

  goHome = () => {
    if(!this.state.isLogin) return 
    this.setState({ currentComp: 'home' })

  }

  goQuery = () => {
    if(!this.state.isLogin) return 
    this.setState({ currentComp: 'query' })

  }





  // user login
  login = () => {
    
    // null check
    if (this.userInput.current.value.length <= 0 || this.passwordInput.current.value.length <= 0 || this.orgInput.current.value.length <= 0) {
      alert('please enter both username, organization and password')
      return
    }

    // send the login request
    axios({
      method: 'get', 
      url: `http://34.130.139.150:3001/login/${this.userInput.current.value}/${this.passwordInput.current.value}`,
    })
    .then((response) => {
      console.log(response.data[0]._id)
      if(response.data.length > 0){
        alert("Login Successful!")

        // store the infos
        this.setState({
          isLogin: true,
          uname: response.data[0].name,
          uid: response.data[0]._id,
          kyc: response.data[0].kyc,
          org: response.data[0].org,
          uploaded: response.data[0].uploaded,
          rejected: response.data[0].rejected

        })

      }
    })

  }




  // user register
  register = () => {

    // null check
    if (this.userInput.current.value.length <= 0 || this.passwordInput.current.value.length <= 0) {
      alert('please enter both username and password')
      return
    }

    // send the register request
    axios({
      method: 'post', 
      url: `http://34.130.139.150:3001/register/${this.userInput.current.value}/${this.passwordInput.current.value}/${this.orgInput.current.value}`,
    })
    .then((response) => {
      console.log(response)
      if (response.data === "name exist"){
        alert("User Name Exists!")
      }else if(response.data.ok === true){
        alert("Register Successful, Please Login!")
      }
    })


  }



  renderLogin = () => {
    return (
      <Window style={{ maxWidth: '500px', width: '500px', marginTop: 'calc(50vh - 350px)', marginLeft: 'calc(50vw - 250px)' }}>
        <WindowHeader>
            <span>🔐</span>
            Login.app
        </WindowHeader>
        <WindowContent style={{ padding: '0.25rem' }}>
                    
          <hr />
            <div style={{ display: 'grid', justifyContent: 'center' }}>
            <TextField
              ref={this.userInput}
              id="uname"
              placeholder='User Name'
              onChange={this.handleChange}
              fullWidth
            />
            
            <TextField
              ref={this.passwordInput}
              id="upwd"
              placeholder='Password'
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              ref={this.orgInput}
              id="org"
              placeholder='Organization'
              onChange={this.handleChange}
              fullWidth
            />
            </div>
          <hr />
          <Button fullWidth onClick={this.login}>Login</Button>
          <Button fullWidth onClick={this.register}>Register</Button>
        </WindowContent>
      </Window>
    )
  }

  renderApp = () => {
    switch (this.state.currentComp) {
      case 'upload':
        return <UserUpload />
      case 'home':
        return <Home id={this.state.uid} org={this.state.org} name={this.state.uname} /> 
      case 'query':
        return <QueryKYC rejected={this.state.rejected} kyc={this.state.ukyc} uploaded={this.state.uploaded} />
      default:
        return undefined
    }
  }

  render(){ 
    return (
      <div>
        <GlobalStyles />
        <ThemeProvider theme={millenium} >
        <div style={{ background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,153,79,1) 100%, rgba(0,255,111,1) 100%)', height: '100vh'}}>
          <AppBar>
            <Toolbar>
              <h1 style={{ fontWeight: 'bold', margin: 'auto'}}>⚡Thunder E-KYC APP⚡</h1>
            </Toolbar>
            <Toolbar style={{ display: 'flex', justifyContent: 'center'}}>
              <Button variant="menu" onClick={this.goHome}>Home</Button>
              <Button variant="menu" onClick={this.goUpload}>Upload Documents</Button>
              <Button variant="menu" onClick={this.goQuery}>Query eKYC Record</Button>
            </Toolbar>
          </AppBar>


          {this.state.isLogin ? this.renderApp() : this.renderLogin()}
          
        </div>
        </ThemeProvider>
      </div>
    )
  }
}
