import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();  // this is used for form submission without triggering route changes
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
        window.confirm(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
