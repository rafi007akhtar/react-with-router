import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditEventPage() {
  const loaderData = useRouteLoaderData("event-detail");
  return <EventForm method="patch" event={loaderData.event} />;
}
