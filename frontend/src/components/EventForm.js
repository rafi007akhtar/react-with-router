import {
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import { Form } from "react-router-dom";

import classes from "./EventForm.module.css";

const EVENTS_BACKEND_URL = "http://localhost:8080/events";
const BACKEND_VALIDATION_ERROR_CODE = 422;

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  let errorItems = undefined;
  if (actionData) {
    errorItems = (
      <ul>
        {Object.values(actionData.errors).map((item, ind) => (
          <li key={ind}>{item}</li>
        ))}
      </ul>
    );
  }

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && errorItems}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event?.title && event.title}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event?.image && event.image}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event?.date && event.date}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event?.description && event.description}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export async function formAction({ params, request }) {
  const method = request.method.toUpperCase();

  const formFields = await request.formData();
  const eventData = {
    title: formFields.get("title"),
    image: formFields.get("image"),
    date: formFields.get("date"),
    description: formFields.get("description"),
  };

  let url = EVENTS_BACKEND_URL;
  if (method === "PATCH") {
    const eventId = params.id;
    url = `${url}/${eventId}`;
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === BACKEND_VALIDATION_ERROR_CODE) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}

export default EventForm;
