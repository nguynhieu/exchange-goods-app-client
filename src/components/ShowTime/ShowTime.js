import React from "react";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Ho_Chi_Minh");

const ShowTime = props => {
  const { time } = props;
  const msDate = new Date(time).getTime();
  const msNow = new Date().getTime();
  const dayDiff = Math.floor((msNow - msDate) / 1000 / 60 / 60);
  let showTime = "";

  const getMnAgo = () => {
    const result = moment(new Date(time), "YYYYMMDD").fromNow();
    showTime = result;
  };

  const getTimeOnDay = () => {
    const momentDate = moment(new Date(time));
    const getDateOfPost = new Date(time).getDate();
    const getDateNow = new Date().getDate();
    const getMonthOfPost = new Date(time).getMonth();
    const getMonthNow = new Date().getMonth();

    let result;
    if (getDateOfPost < getDateNow || getMonthOfPost < getMonthNow) {
      result = "Yesterday at " + momentDate.format("h:mm a");
    } else result = "At " + momentDate.format("h:mm a") + " today";
    showTime = result;
  };

  const getDate = () => {
    const momentDate = moment(new Date(time));
    const result = momentDate.format("MMMM Do YYYY, h:mm a");
    showTime = result;
  };

  if (dayDiff < 1) {
    // If the time is less than 1 hour
    getMnAgo(dayDiff);
  } else if (dayDiff < 24) {
    // If the time is less than 1 day
    getTimeOnDay(dayDiff);
  } else {
    // rest
    getDate(dayDiff);
  }

  return <span className="show-time">{showTime}</span>;
};

export default ShowTime;
