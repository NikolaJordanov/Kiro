import ".//Footer.css"
import FooterComponent from ".//FooterComponent.js"

// functionality to be added
function FooterComponentExpanded() {
    const n = 4
    const icon_list = new Array(n).fill("kiro")
    const data_list = new Array(n).fill("kiro")
    let iconRender = []
    for (let idx = 0; idx < n; idx++) {
        const self_icon = icon_list
        const self_data = data_list[idx]
        iconRender.push(<a href={self_data} style={{backgroundImage: self_icon}} key={idx}></a>)
    }
    
    return (
        <>
            <div className="footerExpandedGrid">
                <div>
                    <h4 className="light">Company name</h4>

                    <p>Subscribe to our newsletter</p>
                    <div className="footerExpandedinputGrid">
                        <input type="text"></input>
                        <button>Join</button>
                    </div>
                    <small>By subscribing you agree to our terms and services</small>
                </div>
                <div>
                    <p>Follow us</p>
                    <div className="footerExpandedFollowGrid">
                        {iconRender}
                    </div>
                </div>
            </div>
            <FooterComponent></FooterComponent>
        </>
    );
  }
  
  export default FooterComponentExpanded;