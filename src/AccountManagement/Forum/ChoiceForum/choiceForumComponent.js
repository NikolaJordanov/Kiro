import React, {Component} from 'react'; 
import "../Forum.css"

class ChoiceForumComponent extends Component {
    constructor(props) {
        super(props);

        this.items = props.items
        this.showMoreBeggining = this.props.showMore
        this.state = {
            "list": [],
            "showMore": false 
        }

        this.toggleElement = this.toggleElement.bind(this);
    };    

    toggleElement(element){
        if (element in this.state.list){
            var new_list = this.state
            new_list.remove(element)
            this.setState(()=>{
                return {"list": l}
            })
        } else {
            var new_list = this.state
            new_list.push(element)
            this.setState(()=>{
                return {"list": l}
            })
        }   
    }

    toggleShowMore(){
        if (this.state.showMore === false){
            this.setState(()=>{
                return {"showMore": true}
            })
        } else {
            this.setState(()=>{
                return {"showMore": false}
            })
        }
    }

    render() {
        let buttonRender = []
        if (this.showMoreBeggining === null){
            for (let index = 0; index < this.items.length; index++) {
                if (this.items[index] in this.state.list){
                    buttonRender.push(<button className='active' key={index}>{this.items.value}</button>)
                } else {
                    buttonRender.push(<button key={index}>{this.items.value}</button>)
                }
            }
            return (
                {buttonRender}
            )
        } 
        else if (this.state.showMore === false){
            for (let index = 0; index <  this.showMoreBeggining; index++) {
                if (this.items[index] in this.state.list){
                    buttonRender.push(<button className='active' key={index}>{this.items.value}</button>)
                } else {
                    buttonRender.push(<button key={index}>{this.items.value}</button>)
                }
            }
            return (
                <>
                    {buttonRender}
                    <button onClick={this.toggleElement}>...</button>
                </>
            )
        }
        else {
            for (let index = 0; index < this.items.length; index++) {
                if (this.items[index] in this.state.list){
                    buttonRender.push(<button className='active' key={index}>{this.items.value}</button>)
                } else {
                    buttonRender.push(<button key={index}>{this.items.value}</button>)
                }
            }
            return (
                <>
                    {buttonRender}
                    <button onClick={this.toggleElement}>...</button>
                </>
                
            )
        }
        
    }
}
 
export default ChoiceForumComponent;