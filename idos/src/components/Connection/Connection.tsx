import {FC} from "react"
import styles from "./Connection.module.css"

interface ConnectionDataProps {
    name: string;
    departure: string;
    from: string;
    arrival: string;
    to: string;
}

type ConnectionProps = {
    index: number,
    data: ConnectionDataProps
}

function calculateDepartureTime(departure: string): string {
    const now = new Date();
    const [hours, minutes] = departure.split(':').map(Number);
    const departureTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (departureTime < now) {
        departureTime.setDate(departureTime.getDate() + 1);
    }

    const timeDifference = departureTime.getTime() - now.getTime();
    const minutesDifference = Math.ceil(timeDifference / (1000 * 60));

    if (minutesDifference <= 0) return 'now';
    if (minutesDifference === 1) return 'in 1 minute';
    if (minutesDifference <= 60) return `in ${minutesDifference} minutes`;

    const hoursDifference = Math.ceil(minutesDifference / 60);
    const remainingMinutes = minutesDifference % 60;

    if (remainingMinutes === 0) return `in ${hoursDifference} hours`;
    if (remainingMinutes === 1) return `in ${hoursDifference} hours 1 minute`;

    return `in ${hoursDifference} hours ${remainingMinutes} minutes`;
}

export const Connection:FC<ConnectionProps> = (props: ConnectionProps) => {
    return (
        <div className={styles.main} key={props.index}>
          <h3 className={styles.title}>{props.data.name}</h3>
          <div className={styles.body}>
            <div className={styles.departure}>
              <p>at {props.data.departure} ({calculateDepartureTime(props.data.departure)})</p>
              <p className={styles.location}>{props.data.from}</p>
            </div>
            <div className={styles.arrival}>
              <p>to {props.data.arrival} </p>
              <p className={styles.location}>{props.data.to}</p>
            </div>
          </div>
        </div>
    )
}

export default Connection;