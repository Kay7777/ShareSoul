import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { getAllStory } from "../../firebase/firebase";

class UserPart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            stories: null
        }
    }

    componentDidMount = async () => {
        const stories =  await getAllStory();
        await this.setState({stories:stories});
    }

    handleStory = () => {
        // console.log(this.props.currentUser.storyID)
        
        return this.state.stories.map( story => {
            return (
                <div>
                    {this.props.currentUser.storyID.includes(story[0]) ?
                        <div>
                            <img src={story[1]} height="400" width="300"/><br/>
                            <p>{story[2]}</p>
                        </div>
                    :
                        null
                    } 
                </div>
            )
        })
    }

    render(){
        return(
            <div>
                <div>user dashboard</div>
                {
                    this.props.currentUser && this.state.stories ?
                        <div>
                            {this.handleStory()}
                        </div>
                    :
                        <div>Waiting for a min! Stories are coming up!</div>
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserPart);