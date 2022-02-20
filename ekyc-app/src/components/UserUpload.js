import React, { Component } from 'react'
import {
    Button,
    Window,
    WindowHeader,
    WindowContent,
    Checkbox,
    Panel,
    LoadingIndicator
} from 'react95'

export default class UserUpload extends Component {


    constructor(props) {
        super(props)

        this.state = {
            documentFrontside: '',
            documentBackside: '',
            documentSelfie: '',
            agreeToTerm: false,
            submitted: false

        }


        // did this because of ui library button problem
        this.id1ref = React.createRef();
        this.id2ref = React.createRef();
        this.id3ref = React.createRef();


    }


    // called when selected a file 
    onFileChange = async (e) => {
        if (e.target.name === 'file1'){
            console.log(this.id1ref)
            // clicks the upload input for id1
            this.id1ref.current.click()
        }else if(e.target.name === 'file2'){
            console.log(this.id2ref)
            // clicks the upload input for id2
            this.id2ref.current.click()
        }else if(e.target.name === 'file3'){
            console.log(this.id3ref)
            // clicks the upload input for id3
            this.id3ref.current.click()
        }
    }
   


    // listen for file changes
    fileChange = (e) => {
        if (e.target.value === '') return

        if(e.target.id === 'id1'){
            this.setState({documentFrontside: e.target.files[0]})
        }else if(e.target.id === 'id2'){
            this.setState({documentBackside: e.target.files[0]})
        }else if(e.target.id === 'id3'){
            this.setState({documentSelfie: e.target.files[0]})
        }
        console.log(e.target.files[0])
    }



    // called when pressing submit button
    onSubmitPressed = () => {
        
        // null check
        if(this.state.documentBackside === '' || this.state.documentFrontside === '' || this.state.documentSelfie === ''){
            alert("Please upload all the documents")
            return
        }

        // agreement check
        if (this.state.agreeToTerm){
            // upload the files
            console.log("uploading files")
            this.setState({
                submitted: true
            })


            // send the files to the server







        }else{
            // alert the user to agree to the term
            alert("You have to agree to the terms before proceeding")
        }
    }


    // called when checking the boxes
    toggleAgree = () => {
        this.setState({
            agreeToTerm: !this.state.agreeToTerm
        })
    }
    // background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,121,67,1) 54%, rgba(0,212,255,1) 100%);

    render() {
        return (
        <div style={{ background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,153,79,1) 100%, rgba(0,255,111,1) 100%)', height: '100vh'}}>
            <Window style={{ maxWidth: '500px', width: '500px', marginTop: 'calc(50vh - 350px)', marginLeft: 'calc(50vw - 250px)' }}>
                <WindowHeader>
                    <span>💾</span>
                    Uploader.app
                </WindowHeader>
                <WindowContent style={{ padding: '0.25rem' }}>
                    
                    {/* the user file image */}
                    <hr />
                        <img style={{ marginLeft: '120px'}}alt="userfiles" src="https://icons.iconarchive.com/icons/dario-arnaez/genesis-3G/256/User-Files-icon.png"></img>
                        {this.state.submitted ? <LoadingIndicator isLoading /> : null}
                    <hr />

                    {/* id1 */}
                    <input type='file' id="id1" ref={this.id1ref} style={{visibility: 'hidden', width: '0'}} onChange={this.fileChange}></input>
                    <Button name='file1' onClick={this.onFileChange}>Select File</Button> 
                    <span style={{marginLeft: '100px'}}>Front Side of ID</span>
                    {this.state.documentFrontside.name === undefined ? undefined : <Panel variant='well' style={{marginLeft: '20px'}}>{this.state.documentFrontside.name}</Panel>}
                    <hr />

                    {/* id2 */}
                    <input type='file' id="id2" ref={this.id2ref} style={{visibility: 'hidden', width: '0'}} onChange={this.fileChange}></input>
                    <Button name='file2' onClick={this.onFileChange}>Select File</Button>
                    <span style={{marginLeft: '100px'}}>Back Side of ID</span>
                    {this.state.documentBackside.name === undefined ? undefined : <Panel variant='well' style={{marginLeft: '20px'}}>{this.state.documentBackside.name}</Panel>}
                    <hr />

                    {/* id3 */}
                    <input type='file' id="id3" ref={this.id3ref} style={{visibility: 'hidden', width: '0'}} onChange={this.fileChange}></input>
                    <Button name='file3' onClick={this.onFileChange}>Select File</Button>
                    <span style={{marginLeft: '100px'}}>Selfie Holding the ID</span>
                    {this.state.documentSelfie.name === undefined ? undefined : <Panel variant='well' style={{marginLeft: '20px'}}>{this.state.documentSelfie.name}</Panel>}
                    <hr />

                    {/* agree to term of service */}
                    <Checkbox
                        checked={this.state.agreeToTerm}
                        onChange={this.toggleAgree}
                        label=' 🚩 I agree to the Software and Service Agreement'
                    />

                    {/* submit button */}
                    <Button fullWidth onClick={this.onSubmitPressed}>Submit</Button>
                
                </WindowContent>
            </Window>
        </div>
        )
    }
}
