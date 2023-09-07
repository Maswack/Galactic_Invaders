class settingsControler {
    /* Settings handler, responsible for settings-update */
    static async updateSettings(elements, component_type, insertFrame) {
        const domParser = new DOMParser()

        elements.forEach((e) => {
            const rawId = e.id.split('_')
            const activationType = rawId[2]
            let lastKeyPress


            function awaitKeyPress() {
                return new Promise((res) => {
                    document.addEventListener('keydown', keyHandler)

                    const html_popup_href = "./panels/popup/popup.html"

                    //Creates popup panel
                    fetch(html_popup_href)
                        .then((res) => { return res.text() })
                        .then((send) => {
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

                if (e.getAttribute("type") == "checkbox") {
                    value = e.checked
                }

                if (type == 'controls') {
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
    static loadSettings(elements, component_type) {
        const domParser = new DOMParser()

        window.electronAPI.loadSettings()

        window.electronAPI.sendSettings((event, game_data) => {

            //execute
            elements.forEach((e) => {
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
}

export { settingsControler }