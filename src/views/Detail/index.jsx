import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import style from './Detail.module.css';

console.log(import.meta.env)

const Detail = () => {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState ({});
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
 
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
                const data = await response.json();

                setEventData(data);
                setIsLoading(false);
                //console.log(data);
            } catch (error) {
                setEventData({});
                setError(error);
                setIsLoading(false);
            }
        };

        fetchEventData();
    }, []);

    if (isLoading && Object.keys(eventData) === 0) {
        return <div>Cargando evento...</div>;
    }

    if (Object.keys(error) > 0) {
        return <div>Ha ocurrido un error</div>;
    }

    //console.log(eventId);
    //console.log(eventData);
    return (
        <div className={style.container}>
            <div className={style.mainInfoContainer} >
                <img src={eventData.images?.[0].url} className={style.eventImage} alt={eventData.name}/>
                <h4 className={style.eventName}>{eventData.name}</h4>
                <p className={style.infoParagraph}>{eventData.info}</p>
                {eventData.dates?.start.dateTime ?  <p className={style.dateParagraph}>{format(new Date(eventData.dates?.start.dateTime), 'd LLLL yyyy H:mm', { locale: es })}Hrs</p> : null }
               
            </div>

            <div className={style.seatInfoContainer}>
                <h6 className={style.seatMapTitle}>Mapa del evento</h6>
                <img src={eventData.seatmap?.staticUrl} alt="Seatmap event" />
                <p className={style.pleaseNoteLegend}>{eventData.pleaseNote}</p>
                <p className={style.priceRanfeLegend}>Precios: {eventData.princeRanges?.[0].min}-{eventData.princeRanges?.[0].max} {eventData.princeRanges?.[0].currency}</p>
            </div>
            <a href={eventData.url}>
                Ir por tus boletos
            </a>
        </div>
    ); 
}

export default Detail;