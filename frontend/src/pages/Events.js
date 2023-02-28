import { Link } from "react-router-dom";
const DUMMY_EVENTS = [
  { id: "1", title: "Event 1" },
  { id: "2", title: "Event 2" },
  { id: "3", title: "Event 3" },
];

export default function EventsPage() {
  const allEvents = DUMMY_EVENTS.map((event) => (
    <li key={event.id}>
      <Link to={`/events/${event.id}`}>{event.title}</Link>
    </li>
  ));
  return (
    <>
      <h1>This is the Events page.</h1>
      The events are:
      <ul>{allEvents}</ul>
    </>
  );
}
