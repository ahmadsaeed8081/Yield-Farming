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


  }
  count() {
    var now = new Date().getTime();
    var t = this.deadline - now;

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

    this.deadline = this.state.bid_time*1000;
    this.x = setInterval(this.count, 1000);
  }
  

  render() {
    const { days, seconds, hours, minutes } = this.state;
    return (
      <div  >
      
              <span style={{ color :"yellow" , paddingLeft : 10}} id="day">{days}</span>
                <span style={{ color :"white" , paddingLeft : 10}} className="text">Days</span>
         
        
              <span style={{ color :"yellow", paddingLeft : 10 }} id="hour">{hours}</span>
              <span style={{ color :"white" , paddingLeft : 10}} className="text">Hours</span>
       
 
              <span  style={{ color :"yellow" , paddingLeft : 10}} id="minute">{minutes}</span>
              <span style={{ color :"white" , paddingLeft : 10}} className="text">Minutes</span>
    

              <span style={{ color :"yellow", paddingLeft : 10 }} id="second">{seconds}</span>
              <span style={{ color :"white" , paddingLeft : 10}} className="text">Second</span>
    </div>
    
    );
  }
}

export default CountDown;
