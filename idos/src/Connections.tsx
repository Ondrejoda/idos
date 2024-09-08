import { useState, useEffect } from 'react'
import './Connections.css'

function calculateDepartureTime(departure: string): string {
  const now = new Date();
  const [hours, minutes] = departure.split(':');
  const departureTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));
  const timeDifference = departureTime.getTime() - now.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference <= 0) {
    return 'now';
  } else if (minutesDifference == 1) {
    return 'in 1 minute';
  } else if (minutesDifference <= 60) {
    return `in ${minutesDifference} minutes`;
  } else {
    const hours = Math.floor(minutesDifference / 60);
    const minutes = minutesDifference % 60;
    if (minutes == 1) {
      return `in ${hours} hours 1 minute`;
    } else {
      return `in ${hours} hours ${minutes} minutes`;
    }
  }
}

function Connections({url}) {
  const [data, setData] = useState([]);
  let args = url.split('&');
  let destination = {"from": args[0].split('=')[1], "to": args[2].split('=')[1]};

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://109.199.111.206/get-routes/" + url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <div className='connections'>
      {data.length > 0 ? (
        <h2 className='connections--title'>from {destination.from} to {destination.to}</h2>
      ) : (
        <h2 className='connections--title'>Loading...</h2>
      )}
      {data.map((item, index) => (
        <div className='connection' key={index}>
          <h3 className='connection--title'>{item.name}</h3>
          <div className="connection--body">
            <div className="connection--departure">
              <p>at {item.departure} ({calculateDepartureTime(item.departure)})</p>
              <p className='connection--location'>{item.from}</p>
            </div>
            <div className="connection--arrival">
              <p>to {item.arrival} </p>
              <p className='connection--location'>{item.to}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections