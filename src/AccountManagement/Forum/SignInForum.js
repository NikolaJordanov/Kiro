import React, {Component} from 'react'; 
import { Outlet, Link } from "react-router-dom";
import json from "../../utilsComponents/utils.json"

import "../Forum.css"
class SigninForum extends Component {
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

    sendRequest(){
        const email = document.querySelector("input[jsname='emailInput']")
        const pass = document.querySelector("input[jsname='passInput']")
        
        function dbBundle(){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    getResponse(xhr.responseText);
                }
            }
            xhr.open('GET', json.BASE_URL + "/GetLogin", true);
            xhr.setRequestHeader("device", null)
            xhr.send({
                "email": email,
                "pass": pass
            });
        }

        function getResponse(){
            window.location.href = "kiro"
        }

        dbBundle()
    }

    render() {
        switch (this.state.absolute) {
            case 0:
                return (
                    <div className='forumCenter'>
                        <div>
                            <div>
                                <div className='forumBorder'>
                                    <h3 className='light'>Sign in</h3>
                                    <div className='forumOutsideConnectionGrid'>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>

                                    <div className='inputElementGrid' style={{gridTemplateRows: `repeat(2, auto)`}}>
                                        <div className="inputElement">
                                            <div className="descriptionInput">Email:</div>
                                            <input type="email" jsname="emailInput"></input>
                                        </div>
                                        <div className="inputElement">
                                            <div className="descriptionInput">Password:</div>
                                            <input type="password" jsname="passInput"></input>
                                            <div className="errorText" jsname="errorText"></div>
                                        </div>
                                    </div>
                                    <div className='callToAction'>
                                        <button onClick={this.sendRequest}>Sign in</button>
                                    </div>
                                </div>
                                <div className="outForumDetail">
                                    <p>If you don't have an account <Link className='link' to="/Register">Register</Link></p>
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
 
export default SigninForum;