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


            /* Settings handler, responsible for settings-update */
            async function updateSettings() {
                elements.forEach( (e) => {
                    const rawId = e.id.split('_')
                    const activationType = rawId[2]
                    let lastKeyPress
    
    
                    function awaitKeyPress() {
                        return new Promise( (res) => {
                            document.addEventListener('keydown', keyHandler)
    
                            const html_popup_href = "./panels/popup/popup.html" 
    
                            //Creates popup panel
                            fetch(html_popup_href)
                            .then( (res) => { return res.text() })
                            .then( (send) => {
                                //Import html file with popup panel
                                const new_html_file = domParser.parseFromString(send, "text/html")
                                const window = new_html_file.querySelector('.window')
    
                                //Insert popup window into place
                                insertFrame.append(window)
                            })
                            
    
                            function keyHandler(e) {
                                if (e.key) {
                                    lastKeyPress = e.key
    
                                    //Remove popup window
                                    insertFrame.children[2].remove()
    
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
                        //Settings update handler
                        setData()
                    })
                })
            } 
            /* ^end of Settings handler ^  */


            // Settings Loader -> so that UI is in sync with data
            //Get settings
            function loadSettings() {
                window.electronAPI.loadSettings()
                
                window.electronAPI.sendSettings( (event, game_data) => {
                    console.log(game_data)

                    //execute
                    elements.forEach( (e) => {
                        const rawId = e.id.split('_')
                        const identifier = rawId[1]
        
                        const value = game_data.settings[component_type][identifier]

                        if (e.getAttribute('type') == 'checkbox') {
                            e.checked = value
                        }

                        e.value = value
                    })
                })
            }

            updateSettings()
            loadSettings()

            if (insertFrame.children.length > 1) { insertFrame.children[1].remove() }

            insertFrame.append(content)
        } )


        console.log('loaded component from:' + video_link)
    }
}

export { panelHandler }