import React, {Component} from 'react'; 
import ".//OurTeamComponent.css"
class ContactInfoHolder extends Component {
    constructor(props) {
        super(props);
        this.email = props.email
        this.quote = props.quote

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
                <button onClick={this.updateState}>...</button>
            )
        } else {
            return(
                <>
                    <a className="email" href={this.email}>{this.email}</a>
                    <p className="quote"><q>{this.quote}</q></p>
                    {
                    ////<div className="otherGrid">
                    ////    <a href="kiro"></a>
                    ////    <a href="kiro"></a>
                    ////    <a href="kiro"></a>
                    ////</div>
                    }
                    <button onClick={this.updateState}>...</button>
                </>
            )
        }
    }
}
 
export default ContactInfoHolder;