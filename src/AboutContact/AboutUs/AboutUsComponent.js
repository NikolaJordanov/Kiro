import ".//AboutUsComponent.css"
const json = require("../aboutUs.json");

function AboutUsComponent() {
    const n = json["sectionRender"]["n"]
    const text_list = json["sectionRender"]["text_list"]
    const heading_list = json["sectionRender"]["heading_list"]
    const image_list = json["sectionRender"]["image_list"]

    let sectionsRender = []

    for (let idx = 0; idx < n; idx++) {
        const self_text = text_list[idx]
        const self_heading = heading_list[idx]
        const self_image = image_list[idx]
        
        var self_image_render = <></>
        var self_image_render_grid = 1
        if (self_image !== null){
          self_image_render = <div style={{blackgroundImage: self_image}} className="image"></div>
          self_image_render_grid = 2
        }
        sectionsRender.push(
          <div className="aboutUsSectionGrid" key={idx}>
            <h3 className="light">{self_heading}</h3>
            <div className="aboutUsSectionGridImage" style={{gridTemplateColumns: `repeat(${self_image_render_grid}, auto)`}}>
                {self_image_render}                    
                <p>{self_text}</p>
            </div>
          </div>
        )
    }
    return (
      <>
        <h2>About us</h2>
        <div className="aboutUsGrid" style={{gridTemplateRows: `repeat(${n}, auto)`}}>
            {sectionsRender}
        </div>
      </>
    );
  }

export default AboutUsComponent;