const Track = require('./Track')
const { Midi } = require('@tonejs/midi')
const fs = require('fs')

const { setupDatapack, saveSong } = require('./fileSetup')
const generate = require('./generate.js')
const settings = require('./settings.json')
const validate = require('./validate.js')

async function main() {
    validate()
    await setupDatapack()

    const file = fs.readFileSync(settings.midi_file_directory + settings.midi_file_name + settings.midi_file_type)
    const midi = new Midi(file)
    const tempo = midi.header.tempos[0].bpm
    const duration = midi.durationTicks / 24

    const tracks = []
    midi.tracks.forEach(track => {
        if (track.name != '') {
            trackInstance = new Track(track.name, track.notes)
            tracks.push(trackInstance)
        }
    })
        
    saveSong(settings.song_name === "" ? settings.midi_file_name.toLowerCase() : settings.song_name.toLowerCase(), generate(tracks, tempo, duration))
}

main()









