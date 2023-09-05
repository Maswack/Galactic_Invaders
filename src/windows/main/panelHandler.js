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

            //Execute special action when settings are about to change
            //Settings Controller
            elements.forEach( (e) => {
                const rawId = e.id.split('_')
                const activationType = rawId[2]
                let lastKeyPress


                function awaitKeyPress() {
                    return new Promise( (res) => {
                        document.addEventListener('keydown', keyHandler)

                        //Create some block that tells user to press
                        //button they wish for this control

                        //for now
                       
                        alert('press any button')

                        function keyHandler(e) {
                            if (e.key) {
                                lastKeyPress = e.key

                                document.removeEventListener('keydown', keyHandler)
                                res();
                            }
                        }
                    })
                }
                
                async function setData() {
                    let value = e.value
                    const id = e.id.split('_')[1]
                    const type = component_type

                    if ( e.getAttribute("type") == "checkbox" ) {
                        value = e.checked
                    }

                    if ( type == 'controls' ) {
                        await awaitKeyPress()

                        if (lastKeyPress.toString() != "error") {
                            value = lastKeyPress.toString()
                        }

                        e.value = value
                    }

                    window.electronAPI.updateSettings(value, id, type)
                }


                e.addEventListener(activationType, () => {
                    setData()
                })
            })


            if (insertFrame.children.length > 1) { insertFrame.children[1].remove() }

            insertFrame.append(content)
        } )


        console.log('loaded component from:' + video_link)
    }
}

export { panelHandler }