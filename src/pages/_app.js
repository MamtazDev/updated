import Footer from "@/components/Footer";
import Header from "@/components/Header";
import sms from "../../public/assets/sms.png";
import "@/styles/globals.css";
import { useState } from "react";
import { AuthProvider } from "@/components/context/AuthContext";
import Chatting from "@/components/chatting/Chatting";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          {pathname !== "/signin" && pathname !== "/register" && <Header />}
          <Component {...pageProps} />
          {pathname !== "/signin" && pathname !== "/register" && <Footer />}
          {show && <Chatting setShow={setShow} />}

          <div className="sms_btn text-end mt-4 mt-lg-0">
            <button onClick={() => setShow(!show)}>
              <img src={sms.src} alt="" /> Messages (02)
            </button>
          </div>
          <ToastContainer />
        </Provider>
      </AuthProvider>
    </>
  );
}
