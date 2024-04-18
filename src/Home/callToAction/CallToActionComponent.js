import { Outlet, Link } from "react-router-dom";
import ".//CallToAction.css"

// functionality to be added
function CallToActionComponent(props) {
    const fill = props.fill
    const align = props.align
    const hoverAnim = props.hoveranimAnim
    const clickAnim = props.clickAnim

    var width_;
    var height_;
    switch (props.size) {
        case "small":
            width_ = 11.25 / 1.125 + "vw"
            height_ = 3.75 / 1.125 + "vw"
            break;
        case "medium":
            width_ = 11.25 + "vw"
            height_ = 3.75 + "vw"
            break
        case "big":
            width_ = 11.25 * 1.125 + "vw"
            height_ = 3.75 * 1.125 + "vw"
            break
        default:
            break;
    }

    var marginTop_ = 0;
    switch (props.margin) {
        case "big":
            marginTop_ = 3.33 + "vw"
            break;
        case "small":
            marginTop_ = 1.667 + "vw"
            break
        default:
            break;
    }

    const class_ = "callToActionButtons " + fill + " " + align
    const style = {
        gridTemplateColumns: `repeat(2, ${width_})`,
        height: height_,
        marginTop: marginTop_
    }
    ////console.log(style)

    if (/* check state in header*/ true){
        return (
            <div className={class_} style={style}>
                <Link className="primary">Discover</Link>
                <Link className="secondary" to="/Sign in">Sign in</Link>
            </div>
        );
    } else {
        return (
            <div className={class_} style={style}>
                <Link className="primary">Discover</Link>
                <Link className="secondary">See account</Link>
            </div>
        );
    }
}
  
export default CallToActionComponent;