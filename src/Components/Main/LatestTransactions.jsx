import React, { useState, useEffect } from "react";
import logo from "../../Assets/img/logo.png";
import { BaseUrl } from "../../config";
import { Link } from "react-router-dom";
import { MonthsNames } from "../../config";

import Cookies from "js-cookie";
function LatestTransactions() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const user = Cookies.get("accesToken");

    fetch(`${BaseUrl}/profile/getLastTransactions`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div
        className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  overflow-hidden '
        style={{ "min-height": "50vh" }}>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex  flex-col items-start'>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              اخر التحويلات
            </h3>
            <span className='text-base font-normal text-gray-500'>
              قائمة لأخر المشتركين في فلكسي
            </span>
          </div>
          <div className='flex-shrink-0'>
            <Link
              to={"Transactions"}
              className='text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg p-2'>
              عرض الكل
            </Link>
          </div>
        </div>
        <div className='flex flex-col mt-8 h-full '>
          <div className='overflow-x-auto rounded-lg h-full'>
            <div className='align-middle inline-block min-w-full h-full'>
              <div className='shadow overflow-hidden h-full sm:rounded-lg'>
                <table className='min-w-full    divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        التحويلات
                      </th>
                      <th
                        scope='col'
                        className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        التاريخ
                      </th>
                      <th
                        scope='col'
                        className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        القيمة
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' '>
                    {data.map((i, index) => (
                      <>
                        <Item data={i} key={index} />
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Item({ data }) {
  const date = new Date(data.Transaction_date);
  const currentDate = `${date.getDate()} ${
    MonthsNames[date.getMonth()]
  } ${date.getFullYear()}`;
  return (
    <>
      <tr>
        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900 grid grid-rows-2'>
          {data.TypeOfTransacrion == "Incoming"
            ? "تم الدفع من "
            : "تم الدفع إلى "}
          <span className='font-semibold '> {data.full_name}</span>
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-500'>
          {currentDate}
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
          {data.Transaction_Value}
        </td>
      </tr>
    </>
  );
}

export default LatestTransactions;
