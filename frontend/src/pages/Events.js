import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import { loadEvents } from "./eventUtility";

import EventsList from "../components/EventsList";

function EventsPage() {
  const loaderData = useLoaderData();

  const events = loaderData?.events;

  function LoadedEventsList(loadedEvents) {
    return <EventsList events={loadedEvents} />
  }

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading the events ...</p>}
    >
      <Await resolve={events}>{ LoadedEventsList }</Await>
    </Suspense>
  );
}

const loader = () => {
  return defer({
    events: loadEvents(),
  });
};

export default EventsPage;

export { loader };
