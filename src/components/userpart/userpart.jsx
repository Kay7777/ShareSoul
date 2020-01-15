import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { getStoryFromCurrentUser } from "../../firebase/firebase";

class UserPart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            stories: []
        }
    }

    handlePostStory = async () =>{
        await this.setState({id: this.props.currentUser.id}, () => console.log(this.state.id));
        this.setState({stories: getStoryFromCurrentUser(this.state.id)}, () => console.log(this.state.stories));
    }

    render(){
        return(
            <div>
                <div>user dashboard</div>
                <div>{this.props.currentUser ? 
                <button onClick={this.handlePostStory}>Show My</button> : null}</div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserPart);