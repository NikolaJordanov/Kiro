import React, {Component} from 'react'; 
import SliderForumComponent from './sliderForumComponent';
import "../Forum.css"

class ChoiceForum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "absolute": 0,
        }

        this.toggleButton = this.toggleButton(this)

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
                    <>
                        <h3>Your personality</h3>
                        <ChoiceForumComponent items={new Array(7).fill({"value": "kiro"})} showMore={5}></ChoiceForumComponent>
                        <div className='incrementStateButton'>
                            <button onClick={this.incrementForward}></button>
                        </div>
                    </>
                );
            case 1:
                return (
                    <>
                        <h3>Preferences</h3>
                        <ChoiceForumComponent items={new Array(7).fill({"value": "zashef"})} showMore={5}></ChoiceForumComponent>
                        <div className='incrementStateButton'>
                            <button onClick={this.incrementForward}></button>
                        </div>
                        <div className='backwarsdButton'></div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3>Your Fitness level</h3>
                        <SliderForumComponent></SliderForumComponent>
                        <div className='incrementStateButton'>
                            <button></button>
                        </div>
                        <div className='backwarsdButton'></div>
                    </>
                );
        }
    }
}
 
export default ChoiceForum;