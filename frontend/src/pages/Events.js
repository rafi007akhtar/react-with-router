import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const loaderData = useLoaderData();

  const events = loaderData?.events;

  return <>{events && <EventsList events={events} />}</>;
}

const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    return response;
  }
};

export default EventsPage;

export { loader };
