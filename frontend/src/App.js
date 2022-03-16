import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [image,setImage]=useState(null);
  // const [imageDetails,setImageDetails]=useState("");
  const [showResult,setShowResult]=useState(false);
  const [result,setResult]=useState(null);
  // const config = {
  //   headers: {
  //     "content-type": "multipart/form-data",
  //   },
  // };
  
  let formData = new FormData();
  const onFileChange = (event) => {
    const { name, value } = event.target;
    setImage((prevImage) => {
      return {
        ...prevImage,
        [name]: value,
      };
    });
  };


  const onFileUpload = () => {
    axios.post("http://localhost:5000/api/uploadfile", image)
    .then((res)=>{
      console.log('Res : ',res);
      setShowResult(true);
      setResult(res.data[0]);
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  const dispFileData = () => {
    // console.log("Display Image : ",image);
    return(
      <div>
        <img width={"200px"} src={image.image_link}/>
      </div>
    );
  };
  return (
    <div className="App">
      <h1>HandWriting Detection</h1>
      <div>
        {/* <input type="file" name="Image_upload" onChange={onFileChange} accept="image/*"/> */}
        <input type={"text"} name="image_link" onChange={onFileChange}/>
        <button onClick={onFileUpload}>Upload!</button>
        {/* <img src="https://firebasestorage.googleapis.com/v0/b/handwriting-247b0.appspot.com/o/7.jpg?alt=media&token=a94ca3b1-1eab-47da-9daf-77b30fc2b1d2"/> */}
        {image && dispFileData()}
      </div>
    {showResult && 
      <div>
        Output : {result.rec}<br/>
        Probability : {result.prob}
      </div>
    }
    </div>
  );
}

export default App;
