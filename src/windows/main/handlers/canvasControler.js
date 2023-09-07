class canvasController {
    constructor (c) {
        this.canvas = c
        this.isCanvasSetup = false
    }

    init = () => {
        if (this.canvas.getContext) {
            this.isCanvasSetup = true

            const h = document.body.clientHeight * 0.9
            const w = document.body.clientWidth

            this.canvas.height = h
            this.canvas.width = w
            

            this.runtime()
        }
    }

    runtime() {
        //settings of how particles behave
        var settings = {
            particleFadeRate: 0.005,
            particleAlpha: 1,
            particleEmissionRate: 3,
            particleEmissionSpeed: 2,
            particleRadii: 5,
            generationRadii: 3,
            maxParticles: 10000,
            particleColor: "180 10 10",
            randomRadii: true,
            radomColor: true,
            clearCanvas: true
        } 

        //particle creator
        function particle(x, y, xVector, yVector, radii, alpha=1) {
            this.posX = x
            this.posY = y

            this.xVector = xVector
            this.yVector = yVector


            this.radii = radii
            this.alpha = alpha
        }
        //rgb color creator
        function rgb(r, g, b) {
            this.r = r
            this.g = g
            this.b = b
        }
        

        const canvas = this.canvas
        const particleList = []

        
        const xSize = canvas.width
        const ySize = canvas.height

        const xCenter = xSize / 2
        const yCenter = ySize / 2

        //Create color
        let color = settings.particleColor.split(" ")
        const rgbColor = new rgb(color[0], color[1], color[2])



        function animate() {
            //Initialize content of canvas
            const ctx = canvas.getContext('2d')
            ctx.globalCompositeOperation = "destination-over";

            //emit particles - create them their position
            //and direction
            function emitParticles() {
                
                //if set in settings this will
                //create random Radius for particles when created
                function getRandomRadii() {
                    let radii = settings.particleRadii
                    
                    const sign = (Math.round(Math.random()) * 2) - 1
                    const value = Math.random() * (radii/2)

                    return (radii + value)
                }

                //create position and velocity for particles
                function getPosition_Velocity() {
                    const R = settings.generationRadii
                    
                    const angle = Math.PI * 2 * Math.random()
                    const radius = R * Math.sqrt(Math.random());

                    const xVel = radius * Math.cos(angle)
                    const yVel = radius * Math.sin(angle)

                    const posX = Math.round(xVel + xCenter)
                    const posY = Math.round(yVel + yCenter)

                    return ([posX, posY, xVel, yVel])
                }

                //executes equal times to the emission rate
                //of the particles set in settings
                for ( let i = 0; i < settings.particleEmissionRate; i++ ) {
                    if (particleList.length < settings.maxParticles) {
                        const radii = (settings.randomRadii) ? getRandomRadii() : settings.particleRadii 
                        const movData = getPosition_Velocity()
                        const alpha = settings.particleAlpha

                        const newParticle = new particle(movData[0], movData[1], movData[2], movData[3], radii, alpha)
                        particleList.push(newParticle)
                    }
                }
            }

            //Update pos and alpha of particles, also
            //kill any if their alpha is equal or below zero
            function updateParticles() {
                let removedParticles = 0
                let length = particleList.length

                for (let i = 0; i + removedParticles < length; i++) {
                    const index = i - removedParticles
                    const element = particleList[index]

                    if (element.alpha <= 0) {
                        particleList.splice(index, 1)

                        removedParticles += 1
                        continue
                    }
                    
                    
                    const speed = settings.particleEmissionSpeed
                    const dx = element.xVector * speed
                    const dy = element.yVector * speed

                    element.posX += dx
                    element.posY += dy
                    element.alpha -= settings.particleFadeRate
                }
                
            }

            //Generate random color for particles
            //only when was set in settings
            function generateColor() {

            }

            //render particle on the canvas
            function renderParticle( partic ) {        
                ctx.beginPath()
                ctx.arc(partic.posX, partic.posY, partic.radii, 0, 2 * Math.PI, false);
                ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${partic.alpha})`

            
                ctx.fill()
            }

            
            //activate only when turned on in settings
            if (settings.clearCanvas == true) {
                ctx.clearRect(0, 0, xSize, ySize)
            }

            //First update because otherwise there will be posibility
            //of particles in the same location with the same alpha
            updateParticles()
            
            //create particles
            emitParticles()

            //in case of radomColor being true
            if ( settings.radomColor == true ) {
                generateColor()
            }

            //finally render particles on canvas
            particleList.forEach( partic => {
                renderParticle( partic )
            })
        
            
            window.requestAnimationFrame(animate)
        }
        


        window.requestAnimationFrame(animate)
    }
}

export { canvasController }