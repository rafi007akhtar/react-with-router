import { json, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EVENTS_BACKEND_URL = 'http://localhost:8080/events';

export default function EventDetailPage() {
  const loaderData = useLoaderData();
  console.log('event data:', loaderData.event);
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
