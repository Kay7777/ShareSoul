import React from "react";
import CustomButton from "../button/button";
import { storage, createStoryDocument } from "../../firebase/firebase";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

class CreateStory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            image: null,
            url: '',
            story: '',
            progress: 0
        }
    }

    handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({image}));
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progress});
        }, 
        (error) => {
             // error function ....
          console.log(error);
        }, 
        () => {
          // complete function ....
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState(
                    {url}, () => {
                        createStoryDocument(this.props.currentUser, {imageURL:this.state.url, story: this.state.story})
                    }
                );
            });
        })
    }

    render(){
        return (
            <div>
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
                <input type="file" onChange={this.handleChange} />
                <br />
                <CustomButton onClick={this.handleUpload}>Upload My Photo</CustomButton>
                <br />
                <progress value={this.state.progress} max="100"/>
                <br />
                <input type="text" onChange={(e) => this.setState({story: e.target.value})}/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(CreateStory);