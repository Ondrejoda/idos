import { useEffect, useState } from 'react';
import './App.css'
import Connections from './components/Connections/Connections.tsx'

function App() {
  
  const [urls, setUrls] = useState(["f=U Lomu&fc=337003&t=Fügnerova&tc=337003", "f=Fügnerova&fc=337003&t=U Lomu&tc=337003", "f=Fügnerova&fc=337003&t=Průmyslová škola&tc=337003", "f=Průmyslová škola&fc=337003&t=Fügnerova&tc=337003"]);
  // useEffect(() => {
  //     (async () => {
  //     try {
  //         const response = await fetch("url");
  //         const jsonData = await response.json();
  //         setUrls(jsonData);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  //     })();
  // }, []);

  const addUrl = (url:string) => {
    setUrls([...urls, url]);
  }
  
  return (
    <div className='main'>
      <h1>IDOSelect</h1>
      <div className='connections--container'>
        {urls.map((url:string) => (
          <Connections url={url} />
        ))}
      </div>
      <button onClick={() => {addUrl("f=U Lomu&fc=337003&t=Fügnerova&tc=337003")}}>test</button>
    </div>
  );
};

export default App