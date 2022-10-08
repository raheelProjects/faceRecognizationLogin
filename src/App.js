import * as faceapi from "face-api.js"
import {useEffect,useState} from "react"



 function App() {
  const [first, setfirst] = useState(null)
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
 /*  const labels = ["bisham","hassan","kawish","raheel"]
  const labeledFaceDescriptors = await Promise.all(
  labels.map(async label => {
    const imgUrl = `images/${label}.jpg`
    const img = await faceapi.fetchImage(imgUrl)
    console.log("type of image is : "+typeof(img))
    const faceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    if (!faceDescription) {
      throw new Error(`no faces detected for ${label}`)
    }
    
    const faceDescriptors = [faceDescription.descriptor]
    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
  })
) */


const bimg = await faceapi.fetchImage("https://github.com/raheelProjects/check/blob/4373161b6edd9c1fd753b4780543b4e07cfc213e/bisham.jpeg");
  const himg = await faceapi.fetchImage('https://github.com/raheelProjects/check/blob/4373161b6edd9c1fd753b4780543b4e07cfc213e/hassan.jpg');
  const kimg = await faceapi.fetchImage('https://github.com/raheelProjects/check/blob/4373161b6edd9c1fd753b4780543b4e07cfc213e/kawish.jpg');
  const rimg = await faceapi.fetchImage('https://github.com/raheelProjects/check/blob/4373161b6edd9c1fd753b4780543b4e07cfc213e/raheel.jpeg');

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
  let faceDescription =faceapi
  .detectSingleFace(image)
  .withFaceLandmarks()
  .withFaceDescriptor()

  if (faceDescription) {
    const bestMatch = faceMatcher.findBestMatch(faceDescription.descriptor)
    console.log("The predection is "+bestMatch.toString())
  }

}

  useEffect(()=>{
    const loadmodel = ()=>{
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      ]).then(console.log("done loading"))
      .catch((e)=>console.log(e))
    }

    loadmodel()
  },[]);

  const net = new faceapi.FaceRecognitionNet()
 console.log(net)
  return (
   <>
   <input type="file" onChange={perform}/>
   {first!=null? (<img src ={first} accept="image/*"/>):(<> </>) }
   </>
  );
}

export default App;
