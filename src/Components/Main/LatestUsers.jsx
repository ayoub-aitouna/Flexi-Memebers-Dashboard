import { useState, useEffect } from "react";
import User from "./User";
import { BaseUrl } from "../../config";
import Cookies from "js-cookie";

function LatestUsers() {
  const [UsersList, setUsersList] = useState([]);
  const user = Cookies.get("accesToken");

  useEffect(() => {
    fetch(`${BaseUrl}/Data/GetLatestSub`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user,
      },
      body: JSON.stringify({
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsersList(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className='bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-xl font-bold leading-none text-gray-900'>
            اخر المشتركين{" "}
          </h3>{" "}
          <a
            href='#'
            className='text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2'>
            عرض الكل{" "}
          </a>{" "}
        </div>{" "}
        <div className='flow-root overflow-x-scroll md:overflow-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  المشترك{" "}
                </th>{" "}
                <th
                  scope='col'
                  className='p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  رقم الهاتف{" "}
                </th>{" "}
                <th
                  scope='col'
                  className='p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  التاريخ{" "}
                </th>{" "}
                <th
                  scope='col'
                  className='p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  القيمة{" "}
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody className='bg-white '>
              {" "}
              {UsersList.map((items, index) => (
                <User key={index} user={items} />
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default LatestUsers;
