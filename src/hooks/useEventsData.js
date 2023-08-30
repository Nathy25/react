import { useRef, useEffect, useState } from 'react';
//import { useState } from 'react';

import eventsJSON from '../data/events.json';
import useEventsResults from '../state/event-results';

const useEventsData = () => {
    //const data = useRef(eventsJSON);
    //const { _embedded: { events }} = data.current;
   /* const[data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    // const [data] = useState(eventsJSON);*/
    //const { _embedded: { events }} = data;

   // useEffect(() => {
      /*  const fetchEvents = async (params) => {
            try {
                const response = await fetch (`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params?.length? params : ''}`);
                const data = await response.json();

                //console.log(data);
                setData(data);
                //setData(eventsJSON);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };*/

      //  fetchEvents();
       /* setTimeout(() => {
            //DataTransfer.current = eventsJSON
            try {
            setData(eventsJSON);
            setIsLoading(false);
            } catch (error) {
                setError(error);
            }
            //setData(eventsJSON);
            //setIsLoading(false);
        }, 4000);*/
        //Load API Call
   // }, []);

    //console.log(data.current);

    const { data, isLoading, error, fetchEvents } = useEventsResults();

    return {
        events: data?._embedded?.events //si no existe mandamos un arrreglo vacio
        || [],
        page: data?.page || {},
        isLoading,
        error,
        fetchEvents,

        //events: const { _embedded: { events }} = data.current._embedded.events,
        //events
    };
};

export default useEventsData;