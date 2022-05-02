import React from "react";
import { MonthsNames } from "../../config";
function User({ user }) {
  const date = new Date(user.sub_date);
  const currentDate = `${date.getDate()} ${
    MonthsNames[date.getMonth()]
  } ${date.getFullYear()}`;
  return (
    <>
      {" "}
      <tr className='tracking-wider'>
        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900 text-center'>
          {user.full_name}
        </td>
        <td
          dir='ltr'
          className='p-4 whitespace-nowrap text-sm font-normal text-gray-500 text-center '>
          {user.phonenumber}
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-200 text-center'>
          {currentDate}
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-center'>
          {user.price + " "} ريال
        </td>
      </tr>
    </>
  );
}

export default User;
