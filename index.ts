import dotenv from 'dotenv';
import ffmpeg from 'ffmpeg';
import fs from 'fs';
import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToTextV1 from "ibm-watson/speech-to-text/v1";

dotenv.config({path: __dirname + '/.env'})

const API_KEY = process.env.API_KEY || ''
const SERVICE_URL = process.env.SERVICE_URL || ''

const pathOfVideos = __dirname + '/data/filesToConvert'
const files: any[] = []

async function readFilesToConvert() {
  await fs.readdirSync(pathOfVideos).forEach((file) => {
    files.push(file);
  })
  return files;
}

async function convertToMp3(files: any[]) {
  for await (const file of files) {
    new ffmpeg(`./data/filesToConvert/${file}`).then((video) => {
      video.fnExtractSoundToMP3(`./data/converted/${file.split('.')[0]}.mp3`, async (err, data) => {
        if (err) {
          console.log(err, file)
          throw new Error('err1', file)
        } else {
          // ---------------------------------------------
          await transcriptFile(data)
          // ---------------------------------------------
        }
      })
    }).catch((err) => {
      console.log(err)
      throw new Error('err2')
    })
  }
}

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: API_KEY,
  }),
  serviceUrl: SERVICE_URL
})

const parameters = {
  objectMode: true,
  contentType: 'audio/mp3',
  model: 'en-US_BroadbandModel',
};
async function transcriptFile(filePath: any) {
  console.log('CHAMANDO: transcript()', filePath);
  const recognizeStream = speechToText.recognizeUsingWebSocket(parameters);
  await fs.createReadStream(filePath).pipe(recognizeStream);
  const fileName = filePath.split(`\\`)[2].split('.')[0]
  recognizeStream.on('data', (event) => readData('data', event, fileName));
  recognizeStream.on('error', (event) => readData('error', event, fileName));
  recognizeStream.on('close', (event: any) => readData('close', event, fileName));
}

function readData(name: string, event: any, file: string) {
  if (name === 'data') {
    console.log('Arquivo Transcrito: ', file)
    event.results.forEach((result: any) => {
      fs.appendFileSync(`./data/filesTranscriptions/${file}_transcripted.txt`, `${result.alternatives[0].transcript}\n`)
    })
  }
}

async function exec() {
  await readFilesToConvert()
  await convertToMp3(files)
  return true
}

const result = exec()
console.log(result)
