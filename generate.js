const instruments = require('./instruments.js')
const settings = require('./settings.json')

function generate(tracks, tempo, duration) {
    const width = getWidth(tracks)
    
    let command = 'tellraw @a {"text": "Generating...", "color": "blue"}'
    command += genFloorAndAir(width-1, duration)
    command += genLight(width, duration)
    command += genRedstone(width-1)
    
    let offset = 0
    let x = 0
    let y = 0
    let z = 0

    tracks.forEach(track => {
        const block = instruments.hasOwnProperty(track.instrument) ? instruments[track.instrument] : 'coarse_dirt'

        track.notes.forEach(chord => {
            x++
            command += `\nfill ~${x} ~${y} ~${offset} ~${x} ~${y} ~${offset+track.maxChord-1} repeater[facing=west]`
            
            x++
            if (block == 'glowstone' || block == 'glass') {
                y = -1
                command += `\nfill ~${x} ~${y+1} ~${offset} ~${x} ~${y+1} ~${offset+track.maxChord-1} ${settings.floor_block_1}`
            }
            command += `\nfill ~${x} ~${y} ~${offset} ~${x} ~${y} ~${offset+track.maxChord-1} ${block}`
            
            chord.forEach(note => {
                command += `\nsetblock ~${x} ~${y+1} ~${offset+z} note_block[note=${note}]`
                z++ 
            })

            y = 0
            z = 0
        })

        x = 0
        y = 0
        offset += track.maxChord + settings.gap
    })

    const tickRate = Math.round((tempo / 7.5) * 10) / 10

    command += '\ntellraw @a {"text": "Song generated.", "color": "green"}'
    command += `\ntellraw @a [{"text":"Type "},{"text":"/tick rate ${tickRate} ","color":"yellow"},{"text":"to match with the tempo. "},{"text":"(Default tick rate is 20)","color":"gray"}]`
    return command
}

function genRedstone(width, x=0, z=0, command="") {
    command += `\nfill ~${x} ~ ~${z} ~${x} ~ ~${width} redstone_wire`
    
    if (width > 31) {
        for (let i = z; i < width; i += 14) {
            command += `\nsetblock ~${x+1} ~ ~${i} repeater[facing=west]`
        }
        command += `\nsetblock ~${x+1} ~ ~${width} repeater[facing=west]`

        return genRedstone(width - 28, x - 2, z + 14, command)
    }

    command += `\nsetblock ~${x} ~ ~${Math.round(z+(width/2))} lever[face=floor, facing=west]`
    return command
}

function getWidth(tracks) {
    let width = 0
    for (let track of tracks) {
        width += track.maxChord
    }
    if (settings.gap > 0) {
        width += settings.gap * tracks.length - 1
    }
    return width
}

function genFloorAndAir(width, duration) {
    let command = ""
    const length = duration * 2
    const increase = 1
    
    for (let i = -10; i < length; i += increase) {
        const x = i > length - increase ? length : i
        command += `\nfill ~${x} ~-1 ~-1 ~${x+increase} ~-2 ~${width+1} ${settings.floor_block_1}`
        command += `\nfill ~${x} ~ ~-1 ~${x+increase} ~${settings.air_height} ~${width+1} air`
        command += `\nfill ~${x} ~-2 ~-1 ~${x+increase} ~-2 ~-1 ${settings.floor_block_2}`
        command += `\nfill ~${x} ~-2 ~${width+1} ~${x+increase} ~-2 ~${width+1} ${settings.floor_block_2}`
    }
    return command
}

function genLight(width, duration) {
    let command = ""
    
    if (width > settings.light_spacing && settings.light_enabled) {
        const length = duration * 2
        const midpoint = width / 2
        const increase = settings.light_spacing
        const lightLevel = settings.light_level
        
        let midpoint1 
        let midpoint2
        if (Number.isInteger(midpoint)) {
            midpoint1 = midpoint
            midpoint2 = midpoint + 1
        } else {
            midpoint1 = Math.ceil(midpoint)
            midpoint2 = midpoint1
        }

        for (let i = increase; i < length; i += increase) {
            for (let j = midpoint1; j > 0; j -= increase) {
                command += `\nsetblock ~${i} ~3 ~${j-1} light[level=${lightLevel}]`
            }
            for (let j = midpoint2; j < width; j += increase) {
                command += `\nsetblock ~${i} ~3 ~${j-1} light[level=${lightLevel}]`
            }
        }
    }

    return command
}
    

module.exports = generate