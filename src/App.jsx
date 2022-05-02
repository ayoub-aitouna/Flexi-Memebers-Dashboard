import "./App.css";
import { useState, useEffect, lazy, Suspense, useRef } from "react";

import Cookies from "js-cookie";
import {
  Side,
  Nav,
  Main,
  Auth,
  Users,
  Statistics,
  Transactions,
} from "./Components";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

/*Redux*/
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";
/***** */

function App() {
  const state = useSelector((state) => state.User);

  const dispatch = useDispatch();

  const { Login } = bindActionCreators(actionCreators, dispatch);

  const ReadCoockie = async () => {
    const user = Cookies.get("accesToken");
    if (user) {
      Login();
    }
  };

  useEffect(() => {
    ReadCoockie();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Suspense
          fallback={
            <div className='w-20 h-20 rounded-full bg-border_color'></div>
          }>
          <Routes>
            <Route
              exact
              path='/login'
              element={<Auth auth={state.isloged} />}
            />
            <Route exact path='/' element={<MainPage auth={state.isloged} />}>
              <Route path='' element={<Main />} />
              <Route path='users' element={<Users />} />
              <Route path='Statistics' element={<Statistics />} />
              <Route path='Transactions' element={<Transactions />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

function MainPage({ auth }) {
  const sidebar = useRef();
  const sidebarBackdrop = useRef();
  const toggleSidebarMobileHamburger = useRef();
  const toggleSidebarMobileClose = useRef();

  const toggelBar = () => {
    sidebar.current.classList.toggle("hidden");
    sidebarBackdrop.current.classList.toggle("hidden");

    toggleSidebarMobileHamburger.current.classList.toggle("hidden");
    toggleSidebarMobileClose.current.classList.toggle("hidden");
  };
  const close = () => {
    sidebar.current.classList.add("hidden");
    sidebarBackdrop.current.classList.add("hidden");
    toggleSidebarMobileHamburger.current.classList.remove("hidden");
    toggleSidebarMobileClose.current.classList.add("hidden");
  };
  return auth ? (
    <>
      <div className='h-screen overflow-y-scroll overflow-x-hidden flex justify-center bg-[#F9FAFB]'>
        <div className='h-full'>
          <Nav
            Open={() => toggelBar()}
            toggleSidebarMobileHamburger={toggleSidebarMobileHamburger}
            toggleSidebarMobileClose={toggleSidebarMobileClose}
          />
          <div className='flex h-full '>
            <Side sidebar={sidebar} close={() => close()} />
            <div
              className='bg-gray-900 opacity-50 hidden fixed inset-0 z-10'
              id='sidebarBackdrop'
              ref={sidebarBackdrop}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"login"} />
  );
}

function NotFound() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center font-bold  text-gray-500'>
      <svg
        className='h-2/5 aspect-square '
        viewBox='0 0 128 108'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M122.838 55.5969C122.838 69.7969 117.038 82.5969 107.738 91.7969C98.6377 100.897 86.0377 106.397 72.1377 106.397C58.3377 106.397 45.7377 100.797 36.5377 91.7969C27.2377 82.5969 21.4377 69.7969 21.4377 55.5969C21.4377 27.4969 44.1377 4.79688 72.1377 4.79688C100.138 4.79688 122.838 27.5969 122.838 55.5969Z'
          fill='#F1F3F9'
          stroke='#D6DCE8'
          stroke-width='2'
          stroke-miterlimit='10'
        />
        <path
          d='M118.438 22.2967C120.702 22.2967 122.538 20.461 122.538 18.1967C122.538 15.9323 120.702 14.0967 118.438 14.0967C116.174 14.0967 114.338 15.9323 114.338 18.1967C114.338 20.461 116.174 22.2967 118.438 22.2967Z'
          fill='#F1F3F9'
        />
        <path
          d='M124.438 6.29678C125.984 6.29678 127.238 5.04317 127.238 3.49678C127.238 1.95038 125.984 0.696777 124.438 0.696777C122.891 0.696777 121.638 1.95038 121.638 3.49678C121.638 5.04317 122.891 6.29678 124.438 6.29678Z'
          fill='#F1F3F9'
        />
        <path
          d='M23.0378 22.1967C24.5842 22.1967 25.8378 20.9431 25.8378 19.3967C25.8378 17.8503 24.5842 16.5967 23.0378 16.5967C21.4914 16.5967 20.2378 17.8503 20.2378 19.3967C20.2378 20.9431 21.4914 22.1967 23.0378 22.1967Z'
          fill='#F1F3F9'
        />
        <path
          d='M5.93779 76.1969C8.80967 76.1969 11.1378 73.8688 11.1378 70.9969C11.1378 68.125 8.80967 65.7969 5.93779 65.7969C3.06591 65.7969 0.737793 68.125 0.737793 70.9969C0.737793 73.8688 3.06591 76.1969 5.93779 76.1969Z'
          fill='#F1F3F9'
        />
        <path
          d='M117.456 26.4796V81.8844C117.456 84.1904 115.61 86.0172 113.348 86.0172H29.8927C27.6299 86.0172 25.7542 84.1604 25.7542 81.8844V26.4796C25.7542 24.2035 27.6001 22.3467 29.8927 22.3467H113.348C115.61 22.3467 117.456 24.2035 117.456 26.4796Z'
          fill='white'
          stroke='#D6DCE8'
          stroke-width='2'
          stroke-miterlimit='10'
          stroke-linejoin='round'
        />
        <path
          d='M117.456 26.4796V32.6789H25.7542V26.4796C25.7542 24.2035 27.6001 22.3467 29.8927 22.3467H113.348C115.61 22.3467 117.456 24.2035 117.456 26.4796Z'
          fill='#D6DCE8'
        />
        <path
          d='M31.5302 29.0551C32.3852 29.0551 33.0784 28.3578 33.0784 27.4978C33.0784 26.6377 32.3852 25.9404 31.5302 25.9404C30.6751 25.9404 29.9819 26.6377 29.9819 27.4978C29.9819 28.3578 30.6751 29.0551 31.5302 29.0551Z'
          fill='#AAB2C5'
        />
        <path
          d='M36.5917 29.0551C37.4467 29.0551 38.1399 28.3578 38.1399 27.4978C38.1399 26.6377 37.4467 25.9404 36.5917 25.9404C35.7366 25.9404 35.0435 26.6377 35.0435 27.4978C35.0435 28.3578 35.7366 29.0551 36.5917 29.0551Z'
          fill='#AAB2C5'
        />
        <path
          d='M41.6234 29.0551C42.4785 29.0551 43.1716 28.3578 43.1716 27.4978C43.1716 26.6377 42.4785 25.9404 41.6234 25.9404C40.7684 25.9404 40.0752 26.6377 40.0752 27.4978C40.0752 28.3578 40.7684 29.0551 41.6234 29.0551Z'
          fill='#AAB2C5'
        />
        <path
          d='M44.8984 70.4141H98.312'
          stroke='#D5DDEA'
          stroke-width='2'
          stroke-miterlimit='10'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M53.3242 76.1343H89.886'
          stroke='#D5DDEA'
          stroke-width='2'
          stroke-miterlimit='10'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M62.6731 54.3015V57.3862H60.7973V60.3511H57.2841V57.3862H49.543V53.8523L56.7184 43.8195H60.8271V54.3314H62.6731V54.3015ZM57.2841 47.9225L52.818 54.3015H57.2841V47.9225Z'
          fill='#AAB2C5'
        />
        <path
          d='M71.486 60.6805C67.7345 60.6805 64.4297 57.3862 64.4297 52.0553C64.4297 46.7245 67.7048 43.4302 71.486 43.4302C75.2672 43.4302 78.5423 46.7245 78.5423 52.0553C78.5423 57.3862 75.2672 60.6805 71.486 60.6805ZM71.486 57.506C73.2426 57.506 74.9993 55.739 74.9993 52.0853C74.9993 48.4316 73.2426 46.6646 71.486 46.6646C69.7294 46.6646 67.9727 48.4316 67.9727 52.0853C67.9727 55.739 69.7294 57.506 71.486 57.506Z'
          fill='#AAB2C5'
        />
        <path
          d='M93.697 54.3015V57.3862H91.8213V60.3511H88.308V57.3862H80.5669V53.8523L87.7423 43.8195H91.8511V54.3314H93.697V54.3015ZM88.2782 47.9225L83.8122 54.3015H88.2782V47.9225Z'
          fill='#AAB2C5'
        />
        <path
          d='M113.402 98.2516L93.4548 78.3206L98.0276 73.7478L117.959 93.6946L113.402 98.2516Z'
          fill='#D6DCE8'
          stroke='#AAB2C5'
          stroke-width='2'
          stroke-miterlimit='10'
        />
        <path
          d='M120.336 105.264L105.04 89.9693C103.763 88.692 103.763 86.6106 105.04 85.3334C106.318 84.0562 108.399 84.0562 109.676 85.3334L124.971 100.629C126.249 101.906 126.249 103.987 124.971 105.264C123.694 106.542 121.613 106.542 120.336 105.264Z'
          fill='#D6DCE8'
          stroke='#AAB2C5'
          stroke-width='2'
          stroke-miterlimit='10'
        />
        <path
          d='M119.248 106.242L99.5688 86.5632C99.1115 86.106 99.1115 85.3649 99.5688 84.8918L104.599 79.8618C105.056 79.4045 105.797 79.4045 106.27 79.8618L125.949 99.5405C126.406 99.9978 126.406 100.739 125.949 101.212L120.919 106.242C120.446 106.699 119.705 106.699 119.248 106.242Z'
          fill='#D6DCE8'
          stroke='#AAB2C5'
          stroke-width='2'
          stroke-miterlimit='10'
        />
        <path
          d='M70.8747 14.0967C49.9976 14.0967 33.0784 31.016 33.0784 51.8931C33.0784 72.7544 49.9976 89.6894 70.859 89.6894C91.7361 89.6894 108.655 72.7702 108.655 51.8931C108.655 31.016 91.7361 14.0967 70.8747 14.0967ZM70.8747 82.6884C54.1131 82.6884 40.5367 68.8912 40.5367 51.8773C40.5367 34.8634 54.1131 21.082 70.8747 21.082C87.6363 21.082 101.213 34.8792 101.213 51.8931C101.213 68.9069 87.6206 82.6884 70.8747 82.6884Z'
          fill='#D6DCE8'
          stroke='#AAB2C5'
          stroke-width='2'
          stroke-miterlimit='10'
        />
      </svg>

      <p className='my-10 text-5xl'> الصفحة غير متوفرة </p>

      <NavLink
        to={""}
        className='text-base  text-gray-900 py-6 w-60  font-normal rounded-lg flex items-center bg-border_color group'>
        {" "}
        <p className='text-white w-full text-center text-2xl'>الرئيسية</p>
      </NavLink>
    </div>
  );
}

export default App;
