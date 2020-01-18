import React from "react";
import {
    ChatkitProvider,
    TokenProvider,
} from "@pusher/chatkit-client-react";

import Chat from './message';
import UserList from './userlist';
import "./chatpart.css";

const instanceLocator = "v1:us1:7672f2a8-5c99-4106-ab3c-b5b3c107d3b2"
const userId = "123";
const otherUserId = "124";
const tokenProvider = new TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/7672f2a8-5c99-4106-ab3c-b5b3c107d3b2/token",
})

class ChatPart extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount = () => {
        // TODO : create chat user API
        // https://us1.pusherplatform.io/services/chatkit/v6/:instance_id/users
        // data:
        // {"name": "John Doe", 
        // "id": "john", 
        // "avatar_url": "https://gravatar.com/img/2124", 
        // "custom_data": {"email": "john@example.com"}}
      
    }

    render(){
        return(
            <div className="Chat">
                <div className="App__chatwindow">
                    <ChatkitProvider
                        instanceLocator={instanceLocator}
                        tokenProvider={tokenProvider}
                        userId={userId}
                    >
                        <UserList userId={userId}/>
                        <Chat otherUserId={otherUserId}/>
                    
                    </ChatkitProvider>
                </div>
                
                
            </div>
        )
    }
}

export default ChatPart;