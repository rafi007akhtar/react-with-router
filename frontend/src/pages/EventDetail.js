import {
  defer,
  json,
  redirect,
  useRouteLoaderData,
  Await,
} from "react-router-dom";
import { loadEvents } from "./eventUtility";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

const EVENTS_BACKEND_URL = "http://localhost:8080/events";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  const fallbackJSX = <p style={{ textAlign: "center" }}>Loading ....</p>;
  return (
    <>
      <Suspense fallback={fallbackJSX}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={fallbackJSX}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export async function eventDetailsLoader({ request, params }) {
  const eventId = params.id;

  return defer({
    event: await loadEvent(eventId),  // waits for this page to be loaded before deferring at all
    events: loadEvents(),
  });
}

async function loadEvent(eventId) {
  const response = await fetch(`${EVENTS_BACKEND_URL}/${eventId}`);
  if (!response.ok) {
    throw json(
      { message: "Cound not fetch details for the selected event" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function action({ params }) {
  const response = await fetch(`${EVENTS_BACKEND_URL}/${params.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
}
