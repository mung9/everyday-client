import React from 'react';
import _ from 'lodash';
import Joi from 'joi-browser';

const DateNav = ({ date, onUpdate }) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfTheMonth = date.getDate();
  const maxDate = getDateOfTheMonth(year, month);

  return (
    <div className="input-group">
      <select value={year} className="custom-select col-sm-1" id="inputGroupSelect04" aria-label="Example select with button addon">
        {
          _.range(year - 40, year + 40)
            .map((anYear) => <option value={anYear}>{anYear}</option>)
        }
      </select>
      <div class="input-group-append">
        <span class="input-group-text" id="inputGroup-sizing-sm">년</span>
      </div>
      <select value={month} className="custom-select col-sm-1" id="inputGroupSelect04" aria-label="Example select with button addon">
        {
          _.range(1, 12)
            .map((aMonth) => <option value={aMonth}>{aMonth}</option>)
        }
      </select>
      <div class="input-group-append">
        <span class="input-group-text" id="inputGroup-sizing-sm">월</span>
      </div>
      <select value={dateOfTheMonth} className="custom-select col-sm-1" id="inputGroupSelect04" aria-label="Example select with button addon">
        {
          _.range(1,maxDate)
            .map((dateOfTheMonth) => <option value={dateOfTheMonth}>{dateOfTheMonth}</option>)
        }
      </select>
      <div class="input-group-append">
        <span class="input-group-text" id="inputGroup-sizing-sm">일</span>
      </div>
    </div>
  );
}


function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
  return false;
}

const dayOfTheMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function getDateOfTheMonth(year, month) {
  console.log(year, month);
  if (month !== 2) return dayOfTheMonth[month - 1];
  return (isLeapYear(year) ? 29 : 28);
}

// const currentYear = new Date().getFullYear();


// export function validateDate(date) {
//   const ymd = {
//     year: date.getFullYear(),
//     month: date.getMonth(),
//     date: date.getDate(),
//   };

//   const schema = {
//     year: Joi.number().min(currentYear - 100).max(currentYear + 100),
//     month: Joi.number().min(1).max(12),
//     date: Joi.number().min(1).max(getDateOfTheMonth(this.year, this.month)),
//   }

//   return Joi.validate(ymd, schema);
// }

export default DateNav;

// function getCurrentDate() {
//   const date = new Date();

//   //year
//   const yy = '' + date.getFullYear();

//   const month = date.getMonth() + 1;
//   const MM = (month < 10) ? '0' + month : '' + month;

//   const day = date.getDate();
//   const dd = (day < 10) ? '0' + day : '' + day;

//   return yy + MM + dd;
// }


