import ".//HeroComponent.css"
function ImageBlockComponent(props) {

    const styleList = props.styleList       

    const style = {
        gridTemplateRows:  `repeat(${styleList.length}, auto)`
    }
    var picture_div = []

    for (let index = 0; index < styleList.length; index++) {
        const size = styleList[index];
        let out = []
        for (let n = 0; n < size; n++) {
            const element = n;
            out.push(<div key={n}></div>)
            
        }
        const default_ = <div style={{gridTemplateColumns: `repeat(${size}, auto)`}} key={index}>{out}</div>
        picture_div.push(default_)
    }

    return (
        <div className="pictureComponent" style={style}>
            {picture_div}
        </div>
    );
}

export default ImageBlockComponent;