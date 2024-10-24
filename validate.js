const fs = require('fs')
const settings = require('./settings.json')
const packFormatMap = require('./packFormatMap')

class DirectoryNotFoundError extends Error {
    constructor(directory) {
        super(`Directory does not exist: ${directory}`)
        this.name = 'DirectoryNotFoundError'
    }
}

function validate() {
    const keys = Object.keys(settings)
    
    // Name settings
    isString(keys[0], settings.song_name, true)
    isValidFunctionName(keys[0], settings.song_name)

    // File Settings
    isString(keys[1], settings.midi_file_name)
    isString(keys[2], settings.midi_file_directory)
    directoryExists(settings.midi_file_directory)
    isString(keys[3], settings.midi_file_type)
    isAcceptedFileExtension(keys[3], settings.midi_file_type)

    // Namespace settings
    isString(keys[4], settings.namespace)

    // Minecraft settings
    isString(keys[5], settings.minecraft_world_saves_directory)
    directoryExists(settings.minecraft_world_saves_directory)
    isString(keys[6], settings.minecraft_version)
    isValidVersion(keys[6], settings.minecraft_version)
    isString(keys[7], settings.minecraft_world_name)
    
    // Generation settings
    isPositiveInteger(keys[8], settings.gap)
    isPositiveInteger(keys[9], settings.padding)
    isPositiveInteger(keys[10], settings.air_height)
    isString(keys[11], settings.floor_block_1)
    isString(keys[12], settings.floor_block_2)
    isBoolean(keys[13], settings.light_enabled)
    isValidLightLevel(keys[13], settings.light_level)
    isPositiveInteger(keys[14], settings.light_spacing, false)
}

function isPositiveInteger(key, value, allowZero = true) {
    if (!Number.isInteger(value)) {
        throw new TypeError(`${key} must be an integer. ${value} received`)
    } 
    if (value < 0) {
        throw new RangeError(`${key} must be a positive intger. ${value} recieved.`)
    }
    if (!allowZero && value == 0) {
        throw new RangeError(`${key} must be a posiviting integer greater than 0. ${value} recieved.`)
    }
}

function isString(key, value, allowEmpty = false) {
    if (typeof value !== 'string') {
        throw new TypeError(`${key} must be a string. ${value} received`)
    }
    if (!allowEmpty && value == "") {
        throw new RangeError(`${key} must not be empty. ${value} recieved.`)
    }
}

function isBoolean(key, value) {
    if (typeof value !== 'boolean') {
        throw new TypeError(`${key} must be a boolean. ${value} received`)
    }
}

function directoryExists(path) {
    if (!fs.existsSync(path)) {
        throw new DirectoryNotFoundError(path)
    }
}

function isValidFunctionName(key, value) {
    value = value.toLowerCase()
    const regex = /^[a-z\-]+$/
    if (!regex.test(value)) {
        throw new RangeError(`${value} is not a valid name for the ${key} setting.`)
    }
}

function isAcceptedFileExtension(key, value) {
    if (value != '.mid') {
        throw new RangeError(`File extension of ${key} must be .mid not ${value}`)
    }
}

function isValidVersion(key, value) {
    for (const versions of Object.values(packFormatMap)) {
        for (const version of versions) {
            if (version == value) {
                return
            }
        }
    }
    throw new Error(`${value} is not a valid version for ${key}`)
}

function isValidLightLevel(key, value) {
    if (value < 0 || value > 15) {
        return RangeError(`${key} must be between 0 and 15`)
    }
}

module.exports = validate