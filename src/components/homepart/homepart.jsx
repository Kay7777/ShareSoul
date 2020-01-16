import React from "react";
import MediaCard from "../card/card";
// import CustomButton from "../button/button";
// import { ButtonsBarContainer } from "./homepart.styles";
// import { withRouter } from "react-router-dom";
import { getAllStory} from "../../firebase/firebase";
import { Grid } from '@material-ui/core';

class HomePart extends React.Component {
    constructor(){
        super()
        this.state = {
            stories : null
        }
    }

    componentDidMount = async () => {
        const stories =  await getAllStory();
        await this.setState({stories:stories});
        console.log(this.state.stories)
    }

    render() {
        return(
            <div>
                {
                    this.state.stories ?
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        {this.state.stories.map( story => (
                        <MediaCard imageURL={story[1]} story={story[2]} />
                        ))}
                    </Grid>
                    :
                    <div>Waiting for a min! Stories are coming up!</div>
                }
            </div>
        )
    }
}

export default HomePart;