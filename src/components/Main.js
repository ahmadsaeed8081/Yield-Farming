import React from "react";
import { useState } from "react";
import Time from "../components/Countdown/Time";

import Web3 from "web3";
import { cont_add, cont_abi } from "./config";
import CopyIcon from "./CopyIcon";

const Main = (props) => {
  const CHAIN_ID = "56";
  const CHAIN_ID1 = "0x38";
  const [depositAmount, setDepositAmount] = useState("");

  // const search = useLocation().search;
  // const id = new URLSearchParams(search).get("ref");

  async function hireFarmer(investment) {
    if (props.isWalletConnected) {
      const noReferral = "0x0000000000000000000000000000000000000000";
      if (investment > 0) {
        try {
          let web3;
          // Get network provider and web3 instance.
          if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            const id = await window.ethereum.request({ method: "eth_chainId" });

            if (CHAIN_ID1 != id.toString()) {
              console.log("done");
              alert("please change your network to binance");
              return;
            }
            // else if (investment < Number(props.minStake)) {
            //   alert("you can't stake less than "+props.minStake);
            //   return;
            // } else if (investment > Number(props.maxStake)) {
            //   alert("you can't stake more than "+props.maxStake);
            //   return;
            // }
          } else {
            alert(
              "its look like you dont have metmask extension installed in you browser"
            );
            return;
          }

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          const bal = await web3.eth.getBalance(accounts[0]);

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          investment = web3.utils.toWei(investment, "ether");
          console.log("hiii " + bal + " yoo " + investment);

          if (Number(props.minLim) > Number(investment)) {
            let minlimit = web3.utils.fromWei(props.minLim, "ether");

            alert("minimum limit of staking is " + minlimit);
            return;
          }

          if (Number(bal) < Number(investment)) {
            alert("your account balance is low");
            return;
          }

          console.log("its prop" + props.Referral);

          if (props.Referral == "0") {
            console.log("without referral");

            const contract = new web3.eth.Contract(cont_abi, cont_add);

            await contract.methods
              .hireFarmers(noReferral)
              .send({ from: accounts[0], value: investment });

            window.location.reload();
          } else {
            console.log("with referral");

            const contract = new web3.eth.Contract(cont_abi, cont_add);
            await contract.methods
              .hireFarmers(props.Referral)
              .send({ from: accounts[0], value: investment });

            window.location.reload();
          }
        } catch (error) {
          // Catch any errors for any of the above operations.

          console.error(error);
        }
      } else if (investment <= 0 || investment == "") {
        alert("please write amount ");
      }
    } else {
      alert("kindly connect your wallet");
    }
  }




  async function hireMoreFarmer(investment) {
    if (props.isWalletConnected) {
      
        try {
          let web3;
          // Get network provider and web3 instance.
          if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            const id = await window.ethereum.request({ method: "eth_chainId" });

            if (CHAIN_ID1 != id.toString()) {
              console.log("done");
              alert("please change your network to binance testnet");
              return;
            }
          } else {
            alert(
              "its look like you dont have metmask extension installed in you browser"
            );
            return;
          }

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          const bal = await web3.eth.getBalance(accounts[0]);

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
        
            const contract = new web3.eth.Contract(cont_abi, cont_add);

            await contract.methods.hireMoreFarmers(true).send({ from: accounts[0] });

            window.location.reload();
          
        } catch (error) {
          // Catch any errors for any of the above operations.

          console.error(error);
        }

    } else {
      alert("kindly connect your wallet");
    }
  }



  async function sellCrop() {
    if (props.isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log("id from async func is: " + id);
          if (CHAIN_ID1 != id.toString()) {
            alert("please change your network to binance");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }
        if (props.initialDeposit == 0) {
          alert("you dont have any investment");
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(cont_abi, cont_add);

        await contract.methods.sellCrops().send({ from: accounts[0] });

        window.location.reload();
      } catch (error) {
        // Catch any errors for any of the above operations.

        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }

  function copyToClipboard(elementId) {
    // Create a "hidden" input
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);
  }
  return (
    <div className="main-page flex flex-col aic">
      <div className="wrap flex flex-col aic  ">
        <img src="/images/logo.png" className="logo-img" />
        <div className="box-t flex flex-col aic">
          <div className="boxs">
            <div className="item flex flex-col aic jc">
              <div className="lbl">Initial Deposit</div>
              <div className="numb">{props.firstDeposit}</div>
            </div>
            <div className="item flex flex-col aic jc">
              <div className="lbl">Total Deposit</div>
              <div className="numb">{props.initialDeposit}</div>
            </div>
            <div className="item flex flex-col aic jc">
              <div className="lbl">Withdrawn</div>
              <div className="numb">{props.totalWithdrawn}</div>
            </div>
            <div className="item flex flex-col aic jc">
              <div className="lbl">Referrals</div>
              <div className="numb">{props.totalReferral}</div>
            </div>
          </div>
          <div className="meta">
            <div className="left flex flex-col">
              <div className="data flex">
                <div className="le flex flex-col">
                  <div className="lbl">Daily: 8%</div>
                  <div className="lbl">APR: 2920%</div>
                  <div className="lbl">Dev fee: 3%</div>
                </div>
                <div className="ri flex flex-col">
                  <img src="./images/rocket1.png" className="img" />
                </div>
              </div>
              <div className="time-next-boost flex flex-col">
                <div className="lbl-time">Time until next boost</div>
                <div className="timer flex flex-col aic">
                  <p className="time_"></p>
                  <p className="time_">                  {props.compoundTime > 0 ? (
                    <Time bidTime={props.curoffTime} />
                  ) : (
                    <p>--:--:--</p>
                  )}{" "}</p>
                </div>
              </div>
              <div className="action flex flex-col">
                <div className="txt-box flex aic">
                  <input
                    type="number"
                    className="txt cleanbtn"
                    id="depositAmount"
                    min={0}
                    max={25}
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}
                  />
                  <div className="lbl">BNB</div>
                </div>
                <button
                  className="btn button cleanbtn"
                  onClick={() => {
                    hireFarmer(depositAmount);
                  }}
                >
                  TAKE-OFF
                </button>
              </div>
            </div>
            <div className="right flex flex-col">
              <div className="r-row flex aic justify-between">
                <div className="tag">Your Reward</div>
                <div className="val flex aic justify-end">
                  {props.totalEarning} BNB
                </div>
              </div>
              <div className="tag flex aic">
                <img src="./images/clock.png" className="img" /> SHUTTLE will be
                full in
              </div>
              <div className="timer">
                {props.compoundTime > 0 ? (
                  <div className="time_">
                    <Time bidTime={props.compoundTime} />
                  </div>
                ) : (
                  <p className="time_dash text-center">--:--:--</p>
                )}
              </div>
              <div className="tag">Compound count: {props.compoundCount}</div>
              <div
                className="tab-bg button btn-des flex aic jc"
                onClick={sellCrop}
              >{props.compoundCount<10?(<p className="lbl">
                  DESCEND{" "}

                  35% tax
                </p>):(<p className="lbl">
                  DESCEND{" "}

                </p>)}

              </div>
              {Number(props.curr_time) > Number(props.curoffTime) && Number(props.curoffTime) > 43200 ?(             
                <div className="tab-bg btn-boost button flex aic jc" onClick={hireMoreFarmer} >
                <p className="lbl">BOOST (+{props.total_bonus}%)</p>
              </div>
              ):(      
                <button className="tab-bg btn-boost button flex aic jc" disabled="disabled" >
                <p className="lbl">BOOST (+{props.total_bonus}%)</p>
              </button>
              )}

            </div>
          </div>
          <div className="ftr flex aic">
            <div className="link-lbl">
              Referral link :
              <span id="span" className="ref-text">
                {" "}
                https://shuttlemine.io/ ?ref={props.user}
              </span>
            </div>
            <div
              className="btn-copy flex aic jc"
              onClick={(e) => {
                copyToClipboard("span");
              }}
            >
              <CopyIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
