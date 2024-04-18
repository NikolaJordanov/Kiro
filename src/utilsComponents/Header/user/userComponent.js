//import {} "../HeaderComponent.js"
import { Outlet, Link } from "react-router-dom";
import React, {Component} from 'react'; 
import UserSettingsHolder from ".//userSettingsHolder.js";

class UserComponent extends Component {
    constructor(props) {
        super(props);
        
        //function resCookie(){   // temporary for testing purposes
        //    return {
        //        "name": "kiro",
        //        "user_picture": "kiro",
        //    }
        //}
        

        this.data = {
            "name": "kiro",
            "userPicture": "kiro"
        }
        this.data = null

        if (this.data === null){
            this.state = {
                "absolute": false
            }
        } else {
            this.state = {
                "absolute": true,
            }
        }
    };    
 
    render() {
        if (this.state.absolute === false){
            return (
                    <Link to="SignUp" className="signUpButton">
                        Sign up
                    </Link>
            )
        } else {
            return(
                <UserSettingsHolder name={this.data["name"]} userPicture={this.data["user_picture"]}></UserSettingsHolder>
            )
        }
    }
}
export default UserComponent;