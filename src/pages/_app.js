import "@/styles/globals.css";
import Layout from "./layout";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { setGlobalData } from "@/redux/slices/globalSlice";

const LoadToken = () => {
  const dispatch = useDispatch();
  const sdnf = useSelector((state) => state);
  console.log(sdnf, "sdnfsdokpfl;sdf");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) dispatch(setGlobalData(token));
    }
  }, [dispatch]);

  return null;
};

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LoadToken />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Provider>
  );
}
