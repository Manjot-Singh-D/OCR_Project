import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [image,setImage]=useState(null);
  const [result,setResult]=useState(null);
  const [submitClicked,setSubmitClicked]=useState(false);
  const [error,setError]=useState(false);
  const onFileChange = (event) => {
    const { name, value } = event.target;
    setSubmitClicked(false);
    setResult(null);
    setError(false);
    setImage((prevImage) => {
      return {
        ...prevImage,
        [name]: value,
      };
    });
  };


  const onFileUpload = () => {
    setSubmitClicked(true);
    setError(false);
    axios.post("http://localhost:5000/api/uploadfile", image)
    .then((res)=>{
      if(res.data[0].prob==="Error"){
        setError(true);
      }
      else{
        setResult(res.data[0]);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  const dispFileData = () => {
    return(
      <div className='ImageDisplay'>
        <img width={"200px"} src={image.image_link}/>
      </div>
    );
  };
  return (
    <div className="App">
      <h1>Handwriting Detection</h1>
      <div className='imageInput'>
        <input type={"text"} name="image_link" onChange={onFileChange}/>
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {image && dispFileData()}
      {!result && !error && submitClicked &&
        <div className='result_Box'>
          Loading.....
        </div>
      }
      {
        error && submitClicked &&
        <div className='result_Box' style={{color:"#ff0000"}}>
          SERVER ERROR!!
        </div>
      }
      {result && !error && submitClicked && 
      <div className='result_Box'>
        Output : {result.rec}
        <br/>
        Probability : {result.prob}
      </div>
    }
    </div>
  );
}

export default App;
