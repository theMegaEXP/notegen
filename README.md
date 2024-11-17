# Notegen

## Demonstrations

[NoteBlockLand](https://www.youtube.com/@NoteBlockLand)

## About

This is a solo side project that I have created to convert MIDI data via a .mid file into a minecraft function to create a song in Minecraft using noteblocks.
This app is not recommended to be used, and it may have bugs. However, if you want to use this app, there are several steps that you will need to follow. You will need to either have a MIDI file ready or create one using a DAW (Digital Audio Workstation) which is a type of software to create music and audio effects.
If you do not have any programming or software knowledge, this app may be difficult to use and set up since it is not intended for use by the average user. Even if you do have programming or software knowlege, please be aware that it may be difficult getting everything set up as there are a several steps that must be taken.

- This app requires Tone.js to convert MIDI data into an object to easily get MIDI data.
- There is no GUI (Graphical User Interface) for this app.


## What to Include in the MIDI File

Every instrument will by default be a harp sound using the Minecraft dirt block. 
If you want to change the instrument, you will need to change each instrument name in a DAW to a valid instrument name. 
You can look at the `instruments.js` file to see valid instrument names and their corresponding block.


## Before You Start

You must have [Node.js](https://nodejs.org/) installed on your computer and installed to this repo once cloned.
You will need to configure the `settings.json` file from this repo. Here is what you need to know about the settings configuration: [Settings Configuration](#settings-configuration).
You then need to install the midi section of `tone.js` to this repo by running `npm install @tonejs/midi` in a terminal.
You can add your midi files to the midi folder from this github repo. It should contain a `sample.mid` file. You can also specify a different directory for your midi files in the `settings.json` file.
To run the app, you must run main.js using `Node.js` by typing in a terminal `node main.js` in the directory this app is located in.


## Once Set Up

Once you have set up and successfully run this app with a midi file and the correct configuration in the `settings.json` file, go to your Minecraft world. 
Once in the Minecraft world, type in the command `/function notegen:your-function-name`
The musical sequence of noteblocks should now be generated.
*Note: If the /function command in Minecraft fails, there is no warning. Instead nothing will happen. If nothing happens when you run the /function command, look again at the settings.json file for any mistakes.* 


## Settings Configuration

Below is a description of each JSON key used in the settings of the application:

| Category             | Key           | Type       | Description                                                                                           | Example Value            |
|----------------------|---------------|------------|-------------------------------------------------------------------------------------------------------|--------------------------|
| **Name**   | `song_name`  | `string`    | Used to determine the function name when using `/function notegen:SONG_NAME_HERE`. If the string is empty, the function name will be the song name in LOWERCASE. DO NOT INCLUDE SPACES OR SPECIAL CHARACTERS.           | `"MySongName"` |
| **File**    | `midi_file_name` | `string` | The name of the file. Make sure the file contains spaces or special characters, please set the song_name with its proper settings. DO NOT INCLUDE THE FILE EXTENTION IN THE FILE NAME.   | `"my-file-name"`                 |
|                      | `midi_file_directory`   | `string` | The directory for the midi file. You can use the default './midi' directory, or specify your own desired directory. Be sure to to include 2 backslashes for each sub-directory as shown in the example. | `C:\\your-folder` |
|                      | `midi_file_type` | `string` | The file extension. Please leave as .mid since this setting is reserved for possible future use. Make sure that the file you are using is a .mid file. | `.mid` |
<<<<<<< HEAD
| **Function Namespace** | `namespace`   | `string` | This is used for your function namespace when using the /function command. It is recommended to leave the namespace as notegen | `"notegen"` |
| **Minecraft** | `minecraft_world_saves_directory`   | `string` | The directory of your Minecraft world saves | `"C:\\Users\\theMegaEXP\\AppData\\Roaming\\.minecraft\\saves"` |
=======
| **Function Namespace** | `namespace`   | `string` | This is used for you function namespace when using the /function command. It is recommended to leave the namespace as notegen | `"notegen"` |
| **Minecraft** | `minecraft_world_saves_directory`   | `string` | The directory of your minecaft world saves | `"C:\\Users\\YOUR_USER_HERE\\AppData\\Roaming\\.minecraft\\saves"` |
>>>>>>> 0a3d8c2ac952af75128293d59f170b058bbfd2a4
| | `minecraft_version` | `string` | The Minecraft version. Must be between `1.13` - `1.21.3`. Please include sub versions such as `1.20.1`. Non sub versions should not include the extra `'.'` | `"1.21.3"` |
| | `minecraft_world_name` | `string` | The name of the Minecraft world. | `"WorldName"` |
| **Generation** | `gap`   | `integer` | The amount of blocks between each note. A value of 0 will have no gap | `0` |
| | `padding` | `integer` | The amount of blocks between a musical chord. A value of 0 will have no gap | `0` |
| | `air_height` | `integer` | The amount of air that will generate above the sequence. Used to carve into terrain. | `20` |
| | `floor_block_1` | `string` | The primary block of the floor. Be sure the block matches the minecraft block id name of the Minecraft version you are using. | `"light_blue_concrete"` |
| | `floor_block_2` | `string` | The secondary block of the floor. | `"sea_lantern"` |
| | `light_enabled` | `boolean` | Generate light above noteblock sequence. The light source will be invisible, but light will cast onto the noteblocks and other terrain. | `true` |
| | `light_level` | `integer` | The level of the light. Value must be between 0 and 15 | `12` |
| | `light_spacing` | `integer` | The gap between each light above the sequence. | `5` |

Each key should be included in your `settings.json` file with the appropriate value type as shown above.


## Additional Notes

When loading a new noteblock song, type the command `'/reload'` in Minecraft to load any new functions generated.
