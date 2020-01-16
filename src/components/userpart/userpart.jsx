import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { getAllStory } from "../../firebase/firebase";
import MediaCard from "../card/card";
import { Grid, Paper } from '@material-ui/core';
import { ButtonsBarContainer } from "./userpart.styles";
import CustomButton from "../button/button";

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
            return (
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    {
                        this.state.stories.map( story => (
                            this.props.currentUser.storyID.includes(story[0]) ?
                            <MediaCard imageURL={story[1]} story={story[2]} />
                            :
                            null
                        ))
                    }
                </Grid>
            )
    }

    render(){
        return(
            <div>
                <div style={{paddingBottom: 20}}>
                    <Paper elevation={3} >My Stories </Paper>
                </div>
                <ButtonsBarContainer >
                    <CustomButton onClick={() => this.props.history.push("/createstory")}>Upload My Story </CustomButton>
                </ButtonsBarContainer>
                
                {
                    this.props.currentUser && this.state.stories ?
                        this.handleStory()
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