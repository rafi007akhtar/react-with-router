import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "An error has occured.",
    message;

  switch (error.status) {
    case 500:
      //   message = JSON.parse(error.data).message;
      message = error.data.message;
      break;
    case 404:
      title = "Not found";
      message = "Could not find the resource or page";
      break;
    default:
      title = "An error has occured.";
      message = "Something went wrong.";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
