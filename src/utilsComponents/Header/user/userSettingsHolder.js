import React, {Component} from 'react'; 
import { Link } from "react-router-dom";

class UserSettingsHolder extends Component {
    constructor(props) {
        super(props);
        
        this.name = props.name
        this.user_picture = props.userPicture
        this.email = props.email 

        this.state = {"absolute": false}

        this.updateState = this.updateState.bind(this);

    };    
 
    updateState() {
        this.setState((prevState)=>{
            if (prevState.absolute === false){
                return {"absolute": true}
            } else {
                return {"absolute": false}
            }
        })
    }

    render() {
        if (this.state.absolute === false){
            return (
                <div className='headerProfilePosition'>
                    <div className="headerProfile" onClick={this.updateState}>
                        <div className="image" style={{backgroundImage: this.user_picture}}></div>
                        <div className="name">{this.name}</div>
                    </div>
                </div>
            )

        } else {
            return(
                <div className='headerProfilePosition'>
                    <div className="headerProfile" onClick={this.updateState}>
                        <div className="image" style={{backgroundImage: this.user_picture}}></div>
                        <div className="name">{this.name}</div>
                    </div>
                    <div className="profileSettings">
                        <Link to="/Account"><div>User</div></Link>
                        <Link to="/Settings"><div>Account</div></Link>
                        <Link to="/Settings"><div>Security</div></Link>
                        <button className="red"><div>Log out</div></button>
                    </div>
                </div>
            )
        }
    }
}
export default UserSettingsHolder;