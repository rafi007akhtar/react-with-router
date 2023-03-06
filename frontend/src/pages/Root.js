import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  const navigationState = useNavigation();

  return (
    <>
      <MainNavigation />
      { navigationState.state === 'loading' && <p>Loading ...</p> }
      <main>
        <Outlet />
      </main>
    </>
  );
}
