import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const EVENTS_BACKEND_URL = 'http://localhost:8080/events';

export default function NewEventPage() {
  return <EventForm />
}

export async function action(data) {
  const formFields = await data.request.formData();
  console.log('form fields:', formFields);
  if (! formFields) {
    throw json('Failed to obtain the form fields');
  }

  const eventData = {
    title: formFields.get('title'),
    image: formFields.get('image'),
    date: formFields.get('date'),
    description: formFields.get('description'),
  }

  const response = await fetch(EVENTS_BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  if (! response.ok) {
    throw json('Could not save event.');
  }

  return redirect('/events');
}
