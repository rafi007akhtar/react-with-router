import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();
  return <h1>This is the Event Detail page for event {params.id}.</h1>;
}
