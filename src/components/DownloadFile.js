import React,{ useState } from 'react';
import {Table, Grid, Button, Form,TextField } from 'react-bootstrap';
import ipfs from '../ipfs';
import axios from 'axios';

class DownloadFile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hash : '',
            downloadLink: ''
        };
    }
    handleChange = (e) => {
        
        this.setState ({hash:e.target.value});
        console.log(this.state);
        console.log(e.target.value);
        axios.request(`https://ipfs.io/ipfs/${this.state.hash}`,{requestType:'blob'}).then(({data}) => {
            
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            console.log(downloadUrl);
            //setOpenLink('http://127.0.0.1:5001/ipfs/${this.state.hash}');
            this.state = {downloadLink:downloadUrl};
            console.log(this.state.downloadLink);
        }).catch(err => {
                console.log(err);
        })
    }
    clickDownload = (e) => {
        const blobUrl = this.state.downloadLink;
        // Create an a element with blobl URL
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.target = "_blank";
        anchor.download = "img.png";

        // Auto click on a element, trigger the file download
        anchor.click();

        // Don't forget ;)
        URL.revokeObjectURL(blobUrl);
    }
    render(){
        return(
            <div>
                <input type="text" value={this.state.hash} onChange={this.handleChange} />
                <button className="btn btn-danger" onClick={this.clickDownload}>Download</button>
            </div>
        )
    };
}

export default DownloadFile;