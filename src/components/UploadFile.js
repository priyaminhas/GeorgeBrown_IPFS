import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ipfs from '../ipfs';
// eslint-disable-next-line
class UploadFile extends React.Component{
    state = {
        ipfsHash:   null,
        buffer  :   '' 
    }; 
    uploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
    }
    convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        console.log(buffer);
        this.setState({buffer});
    }
    fileSubmit = async(e) => {
        e.preventDefault();
        await ipfs.add(this.state.buffer,(err,ipfsHash) => {
            this.setState({ipfsHash:ipfsHash[0].hash});
        });
    }
    render() {
        return (
        <div>
            <header className="App-header">
                <h1>Upload & Download File from IPFS</h1>
            </header>
            <hr />
                <form onSubmit={this.fileSubmit}>
                    <input type='file' onChange={this.uploadFile} name='fileField' />
                    <button className='btn btn-warning' type='submit'>Upload</button>
                </form>
                
                <p>{this.state.ipfsHash}</p>
            
        </div>
        ) 
    };
}

export default UploadFile;