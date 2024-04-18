import ".//LineComponent.css"

// functionality to be added
function LineComponent(props){
    var color;
    if (props.color == null){
        color = null
    } else {
        color = props.color
    }
    return (
        <div className="lineComponent" style={{backgroundColor: color}}></div>
    );
  }
  
  export default LineComponent;