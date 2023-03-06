import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EVENTS_BACKEND_URL = 'http://localhost:8080/events';

export default function EventDetailPage() {
  const loaderData = useRouteLoaderData('event-detail');
  // console.log('event data:', loaderData);
  return <>
    <EventItem event={loaderData.event} />
  </>
}

export async function eventDetailsLoader({ request, params }) {
  const eventId = params.id;
  const response = await fetch(`${EVENTS_BACKEND_URL}/${eventId}`);
  if (! response.ok) {
    throw json({message: 'Cound not fetch details for the selected event'}, {status: 500});
  } else {
    return response;
  }
}
