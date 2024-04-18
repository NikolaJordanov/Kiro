import ".//ContactListComponent.css"
const json = require('../../aboutUs.json');


function ContactListComponent() {
    const n = json["contactRender"]["n"]
    const media_list = json["contactRender"]["media_list"]
    const icon_list = json["contactRender"]["icon_list"]
    const data_list = json["contactRender"]["data_list"]

    let contactRender = []
    for (let idx = 0; idx < n; idx++) {
        const self_icon = icon_list[idx]
        const self_media = media_list[idx] + ":"
        const self_data = data_list[idx]
        contactRender.push(
            <div className="contactElement" key={idx}>
                <a href={self_data} style={{backgroundImage: self_icon}} className="icon"></a>
                <p className="bold">{self_media}</p>
                <a className="data" href={self_data}>{self_data}</a>
            </div>
        )
    }
    return (
      <div className="contactListCenter" style={{gridTemplateRows: `repeat(${n}, auto)`}}>
            {contactRender}
      </div>
    );
}

export default ContactListComponent;