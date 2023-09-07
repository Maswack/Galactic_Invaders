import { settingsControler } from "./settingsControler.js"


class panelHandler {
    static loadHtmlFile(insertFrame, href) {
        const video_link = document.getElementById(href).getAttribute("href")
        const component_type = href.split("_")[0]


        fetch(video_link)
        .then( (res) => { return res.text() } )
        .then( (send) => {
            const domParser = new DOMParser();
            const html_file = domParser.parseFromString(send, 'text/html')
            const content = html_file.querySelector(".body")

            const elements = content.querySelectorAll(`.${component_type}_setup`)


            settingsControler.updateSettings(elements, component_type, insertFrame);
            settingsControler.loadSettings(elements, component_type, insertFrame);
            

            if (insertFrame.children.length > 1) { insertFrame.children[1].remove() }

            insertFrame.append(content)
        } )


        console.log('loaded component from:' + video_link)
    }
}

export { panelHandler }