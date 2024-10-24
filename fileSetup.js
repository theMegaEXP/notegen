const fs = require('fs')
const fsp = require('fs').promises
const settings = require('./settings.json')
const packFormatMap = require('./packFormatMap.js')

const {
    minecraft_world_saves_directory: savesDir, 
    minecraft_world_name: worldName,
} = require('./settings.json')

const datapackDir = `${savesDir}\\${worldName}\\datapacks\\notegen`
const packFormat = getPackFormat()
const functionDirName = ['1.21', '1.21.1', '1.21.2', '1.21.3'].includes(settings.minecraft_version) ? 'function' : 'functions'
const namespace = settings.namespace

async function setupDatapack() {
    if (!datapackExists()) {
        // Create notegen directory
        await fsp.mkdir(datapackDir, dirErrFallback)
        await fsp.mkdir(`${datapackDir}\\data`, dirErrFallback)
        await fsp.mkdir(`${datapackDir}\\data\\${namespace}`, dirErrFallback)
        await fsp.mkdir(`${datapackDir}\\data\\${namespace}\\${functionDirName}`, dirErrFallback)

        // Create notegen files
        await fsp.writeFile(`${datapackDir}\\pack.mcmeta`, `{\n\t"pack": {\n\t"pack_format": ${packFormat},\n\t"description": "Notegen. Generate noteblock music in Minecraft using MIDI files."\n\t}\n}`)
        await fsp.writeFile(`${datapackDir}\\data\\${namespace}\\${functionDirName}\\test.mcfunction`, 'tellraw @s {"text": "Function activated successfully. If you are seeing this message, the Notegen datapack is installed to this Minecraft world save.", "color": "yellow"}')
    } else {
        console.log(`Notegen datapack has already been created at ${datapackDir}.`)
    }
}

function saveSong(songName, command) {
    fs.writeFileSync(`${datapackDir}\\data\\${namespace}\\${functionDirName}\\${songName}.mcfunction`, command)
    console.log(`Song saved to ${datapackDir}\\data\\${namespace}\\${functionDirName}\\ as ${songName}.mcfunction `)
}

function dirErrFallback(err) {
    if (err) {
        console.error("This directory could not be created: ", err)
    }
}

function fileErrFallback(err) {
    if (err) {
        console.error("File could not be created: ", err)
    }
}

function datapackExists() {
    return fs.existsSync(`${datapackDir}`)
}

function getPackFormat() {
    for (const key in packFormatMap) {
        if (packFormatMap[key].includes(settings.minecraft_version)) {
            return key
        }
    }
    throw error(`${settings.minecraft_version} is not a valid version. Must be released versions 1.13 through 1.21.`)
}

module.exports = { setupDatapack, saveSong }