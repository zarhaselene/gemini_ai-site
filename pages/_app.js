import "@/styles/globals.css";
import { FooterCustom } from "./components/Footer";
import { Header } from "./components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <FooterCustom />
    </>
  );
}
