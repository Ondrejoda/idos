import { useState, useEffect } from 'react'
import styles from './Connections.module.css';
import Connection from '../Connection/Connection';

interface ConnectionDataProps {
  name: string;
  departure: string;
  from: string;
  arrival: string;
  to: string;
}

interface ConnectionsProps {
  url: string;
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
    <div className={styles.body}>
      {data.length > 0 ? (
        <h2 className={styles.title}>{destination.from} to {destination.to}</h2>
      ) : (
        <h2 className={styles.title}>Loading...</h2>
      )}
      <p className={styles.subtitle}>{props.url}</p>
      {data.map((item:ConnectionDataProps, index) => (
        <Connection index={index} data={item}>
        </Connection>
      ))}
    </div>
  );
};

export default Connections;