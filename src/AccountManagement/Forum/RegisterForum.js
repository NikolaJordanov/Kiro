import React, {Component} from 'react'; 
import { Outlet, Link } from "react-router-dom";
import "../Forum.css"

class RegisterForum extends Component {
    constructor(props) {
        super(props);
        this.state = {"absolute": 0}

        this.incrementForward = this.incrementForward.bind(this);
        this.incrementBackward = this.incrementBackward.bind(this);
    };    

    incrementForward(){
        this.setState((prevState)=>{
            return {"absolute": prevState + 1}
        })
    }
    incrementBackward(){
        this.setState((prevState)=>{
            return {"absolute": prevState - 1}
        })
    }

    render() {
        switch (this.state.absolute) {
            case 0:
                return (
                    <div className='forumCenter'>
                        <div>
                            <div>
                                <div className='forumBorder'>
                                    <h3 className='light'>Register </h3>
                                    <div className='forumOutsideConnectionGrid'>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div className='inputElementGrid' style={{gridTemplateRows: `repeat(4, auto)`}}>
                                        <div className="inputElement">
                                            <div className="descriptionInput">Name:</div>
                                            <input type="text"></input>
                                        </div>
                                        <div className="inputElement">
                                            <div className="descriptionInput">Email:</div>
                                            <input type="text"></input>
                                        </div>
                                        <div className="inputElement">
                                            <div className="descriptionInput">Password:</div>
                                            <input type="text"></input>
                                            <div className="errorText"></div>
                                        </div>
                                        <div className="inputElement">
                                            <div className="descriptionInput">Repeat password:</div>
                                            <input type="text"></input>
                                            <div className="errorText"></div>
                                        </div>

                                        <div className='checkboxSectionGrid'>
                                            <div className='checkboxElement'>
                                                <input type='checkbox'></input>
                                                <div>I agree with the <Link>Privacy Policy</Link></div>
                                            </div>
                                            <div className='checkboxElement'>
                                                <input type='checkbox'></input>
                                                <div>I would like to recieve neshto po email</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='callToAction'>
                                        <button>Register</button>
                                    </div>
                                </div>
                                <div className="outForumDetail">
                                    <p>If you have an account <Link className='link' to="/Sign in">Sign in</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                
            default:
                break;
        }
    }
}
 
export default RegisterForum;