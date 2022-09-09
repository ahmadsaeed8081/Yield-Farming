import React, { Component } from "react";
// import moment from 'moment';
import "./Timer.css";

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    console.log("raja bhaiya" +props.bidTime);
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      secounds: 0,
      time_up: "",
      bid_time:props.bidTime,
      
    };
    this.x = null;
    this.deadline = null;
    console.log("raja bhaiya" +props.bidTime)


  }
  count() {
    var now = new Date().getTime();
    var t = this.deadline - now;

    console.log(now)
    console.log(this.deadline)
    var dd = Math.floor(t / (1000 * 60 * 60 * 24));
    var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var ss = Math.floor((t % (1000 * 60)) / 1000);

    var days = dd < 10 ? "0" + dd : dd;
    var hours = hh < 10 ? "0" + hh : hh;
    var minutes = mm < 10 ? "0" + mm : mm;
    var seconds = ss < 10 ? "0" + ss : ss;

    this.setState({ days, minutes, hours, seconds });

    if (t < 0) {
      
      this.setState({
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
        time_up: "TIME IS UP",
      });
      clearInterval(this.x);
      // var today = new Date();
      // today.setDate(today.getDate(Date) + 2);
      // this.deadline = today.getTime(Date);
      // return
    }
  }
  componentDidMount() {
    console.log("raja g  "+this.state.bid_time);

    this.deadline = this.state.bid_time*1000;
    this.x = setInterval(this.count, 1000);
  }
  

  render() {
    const { days, seconds, hours, minutes } = this.state;
    return (
      <div id="countdown" className="col-lg-12 px-0 mt-2">
       <div className="row mx-auto px-0">
          <div className="block">
            <div className="items">
              <p id="day">{days}</p>
              <span className="text">Days</span>
            </div>
          </div>
          <div className="block">
            <div className="items">
              <p id="hour">{hours}</p>
              <span className="text">Hours</span>
            </div>
          </div>
          <div className="block">
            <div className="items">
              <p id="minute">{minutes}</p>
              <span className="text">Minutes</span>
            </div>
          </div>
          <div className="block">
            <div className="items">
              <p id="second">{seconds}</p>
              <span className="text">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
