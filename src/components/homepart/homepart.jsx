import React from "react";
import CustomButton from "../button/button";
import { ButtonsBarContainer } from "./homepart.styles";
import { withRouter, Link } from "react-router-dom";

class HomePart extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    render() {
        return(
            <div>
                this is the home page!
                <ButtonsBarContainer >
                    <CustomButton onClick={() => this.props.history.push("/createstory")}>Upload My Story </CustomButton>
                </ButtonsBarContainer>
                <Link to="/user">UserPage</Link>
                
            </div>
        )
    }
}

export default withRouter(HomePart);