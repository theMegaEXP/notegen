class Track {
    #notesInput

    constructor(instrument, notesInput) {
        this.#notesInput = notesInput
        this.instrument = instrument
        this.maxPitch = this.#getMaxPitch()
        
        this.#getNotes()
    }

    #getNotes() {
        const notesY = []
        let notesX = []
        let prevTick = 0
        
        let maxChord = 1
        let currMaxChord = 0

        let maxTick = 0
        
        this.#notesInput.forEach(note => {
            let tick = note.ticks / 24
            
            if (tick > prevTick) {
                notesY[prevTick] = notesX
                notesX = []
                prevTick = tick
                maxTick = tick
                
                if (currMaxChord > maxChord) {
                    maxChord = currMaxChord
                }

                currMaxChord = 0
            }
            notesY[prevTick] = notesX

            notesX.push(this.#calcPitch(note.midi))
            currMaxChord++
        })

        // Convert empty values to empty array
        for (let i = 0; i < notesY.length; i++) {
            if (notesY[i] == undefined) {
                notesY[i] = []
            }
        }

        // Create and set class variables
        this.notes = notesY
        this.maxChord = maxChord
        this.maxTick = maxTick

        console.log(this.notes)
    }

    #calcPitch(pitchInput) {
        return (pitchInput - 6) % 24
    }

    #getMaxPitch() {
        let maxPitch = 0
        this.#notesInput.forEach(note => {
            if (note.midi > maxPitch) {
                maxPitch = note.midi
            }
        })
        return (maxPitch - 6) % 24
    }

}

module.exports = Track