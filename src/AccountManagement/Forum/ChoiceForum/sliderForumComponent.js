import React, {Component} from 'react'; 
import "../Forum.css"

class SliderForumComponent extends Component {
    constructor(props) {
        super(props);
        
        this.id = props.id

        this.state = {
            "absolute": 50,
        }

        this.updateState = this.updateState.bind(this)
    };  

    updateState(){
        this.setState((prevState)=>{
            return {"absolute": document.getElementById(`sliderForumInput_${this.id}`).value}
        })
    }

    render() {
        <input type="range" max="100" min="50" id={`sliderForumInput_${this.id}`}></input>
    }
}
 
export default SliderForumComponent;