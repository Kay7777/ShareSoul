import React from "react";
import CustomButton from "../button/button";
import { ButtonsBarContainer } from "./homepart.styles";
import { withRouter, Link } from "react-router-dom";
import { getAllStory} from "../../firebase/firebase";

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
                this is the home page!
                <ButtonsBarContainer >
                    <CustomButton onClick={() => this.props.history.push("/createstory")}>Upload My Story </CustomButton>
                </ButtonsBarContainer>
                {
                    this.state.stories ?
                    this.state.stories.map( story => (
                        <div>
                            <img src={story[1]} height="400" width="300"/><br/>
                            <p>{story[2]}</p>
                        </div>
                        
                    ))
                    :
                    <div>Waiting for a min! Stories are coming up!</div>
                }
                <Link to="/user">UserPage</Link>
            </div>
        )
    }
}

export default withRouter(HomePart);