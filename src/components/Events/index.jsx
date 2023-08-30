import { useNavigate } from "react-router-dom";
import EventItem from "../Events/components/EventItem";
import { useState } from "react";
//import eventsJSON from "../../data/events.json";
//import data from "../../data/events.json";
import useEventsData from "../../hooks/useEventsData";

/*//console.log(data);

const events = data._embedded.events;
//son lo mismo
//const { _embedded: { events }} = data;

const Events = () => {
    const eventsComponent = events.map((eventItem) => (
    <EventItem 
      key={`event-item-${eventItem.id}`} 
      name={eventItem.name}
      info={eventItem.info}
      image={eventItem.images[0].url}
      />
    ));
    return (
        <div>
            Eventos
            {eventsComponent}
        </div>
    );
};*/

const Events = ({ searchTerm,events }) => {
   /* const [data] = useState(eventsJSON);
    const { _embedded: { events }} = data;*/

    //const { events } = useEventsData();

    //const { events,isLoading, error, fetchEvents } = useEventsData();
    const navigate = useNavigate();

    const handleEventItemClick = (id) => {
        //console.log("evento clickeado: ", id);
        navigate(`/detail/${id}`);
    };

   /* return (
        <div>
            Eventos 
            {events.map((eventItem) => (
                <EventItem
                key={`event-item-${eventItem.id}`} 
                name={eventItem.name}
                info={eventItem.info}
                image={eventItem.images[0].url}
                onEventClick={handleEventItemClick}
                id={eventItem.id}
                />
            ))}
        </div>
    );*/

    const renderEvents = () => {
        let eventsFiltered = events;
    
        if (searchTerm.length > 0) {
            eventsFiltered = eventsFiltered.filter((item) => item.name.toLocaleLowerCase().includes(searchTerm));
        }

        return eventsFiltered.map((eventItem) => (
            <EventItem
            key={`event-item-${eventItem.id}`} 
            name={eventItem.name}
            info={eventItem.info}
            image={eventItem.images[0].url}
            onEventClick={handleEventItemClick}
            id={eventItem.id}
            />
        ))
    };

   /* if (error) {
        return <div>Ha ocurrido un error</div>
    }

    if (isLoading) {
        return <div>Cargando resultados...+</div>
    }*/

    return (
        <div>
            Eventos 
            {renderEvents()}
        </div>
    )
};

export default Events;