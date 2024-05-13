import { useState } from 'react';
import './App.css';
import logocepa from './assets/logocepa.png'
import Error from './components/Error/Error';

function App() {
const [data, setData] = useState(false)
const [error, setError] = useState()
const[file, setFile] = useState()
const [message, setMessage] = useState()
const [loading, setLoading] = useState(false)

const handleUpload = ({target}) =>{
  const file = target.files[0].name.split('.').pop().toLowerCase();
  if(file ==="xlsx" || file ==="xls"){
    setData(true)
    setFile(target.files[0])
  }
  else{
    setError('Select a valid file (.xls or .xlsx)')
    setData(false)
  }
}
  const handleSubmit =  async () =>{
    try{
      setLoading(true)
     
      const formData = new FormData();
      formData.append('xlsFile', file);
      const result = await fetch("http://localhost:5000/getdata", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();
        console.log(data)
        setMessage(data.data)
        setLoading(false)

    }
    catch(e){
      setError(e.message)
      setLoading(false)
    }
  }


  return (
    <>  
    <img className='logo' src={logocepa} alt="Logo" />
    
      <h1>Workday J-J Data Loader.</h1>
      <p>Insert your file bellow:</p>
      <input type="file" id="fileInput" name="fileInput" onChange={handleUpload}></input>
      {data && <button onClick={handleSubmit}>Send</button>}
      {error && <Error msg={error}/>}
      {message && <p>{message}</p>}
      {loading && <p>Carregando...</p>}
    </>
  )
}

export default App;

