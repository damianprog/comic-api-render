import React, { useState, useEffect } from 'react';
import './date-selector.scss';

const DateSelector = ({ onChange, error, defaultDate }) => {
  const [dateValues, setDateValues] = useState({
    day: defaultDate ? defaultDate.getDate() : '',
    month: defaultDate ? defaultDate.getMonth() : '',
    year: defaultDate ? defaultDate.getFullYear() : '',
  });

  useEffect(() => {
    const { day, month, year } = dateValues;

    if (day && month && year) {
      const selectedDate = new Date(year, month, day);
      onChange(selectedDate);
    }
  }, [dateValues]);

  const getDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    return days;
  };

  const getYears = () => {
    const years = [];
    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 120;

    for (let i = maxYear; i >= minYear; i--) {
      years.push(i);
    }

    return years;
  };

  const onDateInputChange = (event) => {
    setDateValues({
      ...dateValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="date-selector">
      <select
        className={`${error ? 'error' : ''} select-day`}
        name="day"
        onChange={onDateInputChange}
        defaultValue={dateValues.day}
        required
      >
        <option value="" disabled hidden>
          Day
        </option>
        {getDays().map((dayNum) => (
          <option key={`dayNum${dayNum}`} value={dayNum}>
            {dayNum}
          </option>
        ))}
      </select>
      <select
        className={`${error ? 'error' : ''} select-month`}
        name="month"
        onChange={onDateInputChange}
        defaultValue={dateValues.month}
        required
      >
        <option value="" disabled hidden>
          Month
        </option>
        <option value="0">Jan</option>
        <option value="1">Feb</option>
        <option value="2">Mar</option>
        <option value="3">Apr</option>
        <option value="4">May</option>
        <option value="5">Jun</option>
        <option value="6">Jul</option>
        <option value="7">Aug</option>
        <option value="8">Sep</option>
        <option value="9">Oct</option>
        <option value="10">Nov</option>
        <option value="11">Dec</option>
      </select>
      <select
        className={`${error ? 'error' : ''} select-year`}
        name="year"
        onChange={onDateInputChange}
        defaultValue={dateValues.year}
        required
      >
        <option value="" disabled hidden>
          Year
        </option>
        {getYears().map((year) => (
          <option key={`year${year}`}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
