import * as faceapi from "face-api.js"
import {useEffect,useState} from "react"
import { loadImage } from 'canvas'





  


 function App() {
  const [first, setfirst] = useState(null)

  faceapi.env.monkeyPatch({
 /*    readFile: (filePath) => setpath(filePath)
  , */Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img'),loadImage})

  const perform = (event)=>{
    const reader = new FileReader()
    reader.onload = ()=>{
      if(reader.readyState ===2){
        setfirst(reader.result)
        findface(event.target.files[0]).catch((e)=>console.log(e))
      }
    }
    reader.readAsDataURL(event.target.files[0])
  }

 


const findface = async(imgi)=>{

console.log("require : "+typeof require("./images/bisham.jpeg"))

const bimg = await loadImage(require( "./images/bisham.jpeg"));
  const himg = await loadImage(require("./images/hassan.jpg"));
  const kimg = await loadImage(require("./images/kawish.jpg"));
  const rimg =await loadImage(require("./images/raheel.jpeg"));

  const bResult = await faceapi
  .detectSingleFace(bimg)
  .withFaceLandmarks()
  .withFaceDescriptor()

  const hResult = await faceapi
  .detectSingleFace(himg)
  .withFaceLandmarks()
  .withFaceDescriptor()

  const kResult = await faceapi
  .detectSingleFace(kimg)
  .withFaceLandmarks()
  .withFaceDescriptor()

  const rResult = await faceapi
  .detectSingleFace(rimg)
  .withFaceLandmarks()
  .withFaceDescriptor()

const labeledDescriptors = [
  new faceapi.LabeledFaceDescriptors(
    'bisham',
    [bResult.descriptor]
  ),
  new faceapi.LabeledFaceDescriptors(
    'raheel',
    [rResult.descriptor]
  ),
  new faceapi.LabeledFaceDescriptors(
    'hassan',
    [hResult.descriptor]
  ),
  new faceapi.LabeledFaceDescriptors(
    'kawish',
    [kResult.descriptor]
  )
]

  const threshold = 0.6
const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, threshold)

  const image = await faceapi.bufferToImage(imgi)
  const singleResult = await faceapi
  .detectSingleFace(image)
  .withFaceLandmarks()
  .withFaceDescriptor()

  if (singleResult) {
    console.log(singleResult.descriptor)
    const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
    console.log("The predection is "+bestMatch)
  }

}

  useEffect(()=>{
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL+'/models'
        Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]).then(()=>console.log("started"))
      } catch (error) {
        console.log(JSON.stringify(error))
      }

    }
    loadModels();

  }, [])


  return (
   <>
   <input type="file" onChange={perform}/>
   {first!=null? (<img src ={first} accept="image/*"/>):(<> </>) }
   </>
  );
}

export default App;
