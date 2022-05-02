import React from "react";
import screens from "../../Assets/img/screens.png";
import logo from "../../Assets/img/logo1.png";
import { Navigate } from "react-router-dom";

import { useState } from "react";
import Cookies from "js-cookie";

import { BaseUrl } from "../../config";
/*Redux*/
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
/***** */

function auth({ auth }) {
  return auth ? <Navigate to={"/"} /> : <Content />;
}

function Content() {
  const [loginInfo, setlogininfo] = useState({
    Email: "",
    Password: "",
  });
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  const state = useSelector((state) => state.User);

  const dispatch = useDispatch();

  const { Login } = bindActionCreators(actionCreators, dispatch);

  const loginSubmite = async (e) => {
    e.preventDefault();
    setloading(true);
    fetch(`${BaseUrl}/Auth/admin_auth`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.available !== false) {
          Login();
          Cookies.set("accesToken", data.accesToken, { expires: 2 });
          setmessage("");
        } else {
          setmessage("تأكد من بريد الالكتروني أو كلمات لمرور");
          setloading(false);
        }
      })
      .catch((error) => {
        setmessage("هناك خطأ ");
        setloading(false);
      });
  };

  return (
    <>
      <div className='grid grid-cols-1 xl:grid-cols-2 xl:gap-4  gap-3 h-screen'>
        <div className='bg-light_gray   overflow-hidden h-full grid grid-rows-[1fr_2fr]  gap-3   md:px-20'>
          <a
            href='/'
            className='text-xl font-bold flex items-center lg:ml-2.5 h-full justify-center'>
            <img src={logo} className='h-12 mr-2' alt='Windster Logo' />
          </a>
          <div className=' flex flex-row items-top justify-center w-full '>
            <form
              className=' flex flex-col  justify-start items-center md:items-start gap-5  '
              action=''
              onSubmit={(e) => loginSubmite(e)}>
              <h1 className='font-bold ' style={{ "font-size": "32.39px" }}>
                فلكسي للعملاء
              </h1>
              <p style={{ color: "#8A8A8A" }}>
                فلكسي خدمة تسهيل الإشتراك اللياقة البندية
              </p>
              <input
                type='text'
                name=''
                id=''
                disabled={loading}
                value={loginInfo.Email}
                onChange={(e) => {
                  setlogininfo({ ...loginInfo, Email: e.target.value });
                }}
                className={`h-14 w-full px-5 rounded-lg border-2 border-gray-400 focus:border-border_color outline-none`}
                placeholder='بريد المستخدم'
              />
              <input
                type='password'
                name=''
                disabled={loading}
                id=''
                value={loginInfo.Password}
                onChange={(e) => {
                  setlogininfo({ ...loginInfo, Password: e.target.value });
                }}
                className='h-14 w-96 px-5 rounded-lg border-2 border-gray-400 focus:border-border_color outline-none'
                placeholder='كلمة المرور'
              />
              {message.length != 0 ? (
                <p className='text-red-600'>{message}</p>
              ) : (
                <></>
              )}

              <p style={{ color: "#3966FA" }} className='cursor-pointer'>
                هل نسيت كلمة المرور؟
              </p>

              <label
                className={`rounded-full ${
                  ValidateEmail(loginInfo.Email) &&
                  loginInfo.Password.length != 0
                    ? "bg-border_color"
                    : "bg-gray-400"
                } w-20 h-20 mx-auto my-8 grid place-content-center cursor-pointer `}>
                <input
                  type='submit'
                  value=''
                  disabled={
                    !ValidateEmail(loginInfo.Email) ||
                    loginInfo.Password.length == 0
                  }
                  className='h-full w-full fixed  cursor-pointer'
                />
                {loading ? (
                  <svg
                    className='h-7 w-7 animate-spin text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      class='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      stroke-width='4'></circle>
                    <path
                      class='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                ) : (
                  <svg
                    width='13'
                    height='24'
                    viewBox='0 0 13 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M0.671692 22.8699C0.288391 22.4866 0.253545 21.8868 0.567156 21.4642L0.671692 21.3431L9.98455 12.0297L0.671692 2.71638C0.288391 2.33308 0.253545 1.73328 0.567156 1.31061L0.671692 1.18952C1.05499 0.806219 1.6548 0.771373 2.07746 1.08498L2.19855 1.18952L12.2753 11.2663C12.6586 11.6496 12.6935 12.2494 12.3799 12.6721L12.2753 12.7932L2.19855 22.8699C1.77692 23.2916 1.09332 23.2916 0.671692 22.8699Z'
                      fill='white'
                    />
                  </svg>
                )}
              </label>
            </form>
          </div>
        </div>
        <div className='hidden xl:grid   place-items-center'>
          <div className='grid  place-items-center'>
            <img src={screens} alt='' srcset='' className='' />
            <h1 className='text-[48px] font-bold'>مرحبا بك على فلكسي</h1>
            <h1 className='text-[48px] font-bold'>لمزودي الخدمة</h1>
          </div>
        </div>
      </div>
    </>
  );
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
export default auth;
