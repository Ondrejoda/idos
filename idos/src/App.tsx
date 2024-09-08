import './App.css'
import Connections from './Connections.tsx'

function App() {


  return (
    <div className='connections--container'>
      <Connections url="f=U Lomu&fc=337003&t=Fügnerova&tc=337003" />
      <Connections url="f=Fügnerova&fc=337003&t=Průmyslová škola&tc=337003" />
      <Connections url="f=Průmyslová škola&fc=337003&t=Fügnerova&tc=337003" />
      <Connections url="f=Fügnerova&fc=337003&t=U Lomu&tc=337003" />
    </div>
  );
};

export default App