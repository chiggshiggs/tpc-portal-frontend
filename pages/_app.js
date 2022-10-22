import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "../store/store.js";
import { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import { NAV } from "../constants/nav";

export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <Provider store={store}>
      <Nav sideNavOptions={NAV}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Nav>
    </Provider>
  );
}

export default MyApp;
