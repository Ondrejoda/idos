import { useState, useEffect } from 'react'
import './Connections.css'

interface ConnectionProps {
  name: string;
  departure: string;
  from: string;
  arrival: string;
  to: string;
}

interface ConnectionsProps {
  url: string;
}

function calculateDepartureTime(departure: string): string {
  const now = new Date();
  const [hours, minutes] = departure.split(':').map(Number);
  const departureTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (departureTime < now) {
    departureTime.setDate(departureTime.getDate() + 1);
  }

  const timeDifference = departureTime.getTime() - now.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference <= 0) return 'now';
  if (minutesDifference === 1) return 'in 1 minute';
  if (minutesDifference <= 60) return `in ${minutesDifference} minutes`;

  const hoursDifference = Math.floor(minutesDifference / 60);
  const remainingMinutes = minutesDifference % 60;

  if (remainingMinutes === 0) return `in ${hoursDifference} hours`;
  if (remainingMinutes === 1) return `in ${hoursDifference} hours 1 minute`;

  return `in ${hoursDifference} hours ${remainingMinutes} minutes`;
}

function Connections(props: ConnectionsProps) {
  const [data, setData] = useState([]);
  let args = props.url.split('&');
  let destination = {"from": args[0].split('=')[1], "to": args[2].split('=')[1]};
  let time = 0;

  useEffect(() => {
    let date = new Date();
    time = date.getMinutes();
  } , [new Date()]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://ondrejoda.com/api/routes/" + props.url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [props.url, time]);

  return (
    <div className='connections'>
      {data.length > 0 ? (
        <h2 className='connections--title'>{destination.from} to {destination.to}</h2>
      ) : (
        <h2 className='connections--title'>Loading...</h2>
      )}
      <p className='connections--subtitle'>{props.url}</p>
      {data.map((item:ConnectionProps, index) => (
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
