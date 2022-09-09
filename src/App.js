import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { cont_add, cont_abi } from "../src/components/config";
import "./App.css";
import "./css/App.scss";
import Main from "./components/Main";
import Web3 from "web3";
import axios from "axios";
function App() {
  const [_address, setAddress] = useState(null);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [IDs, setNetworkID] = useState(false);
  const [user, setUser] = useState("Connect your wallet");

  const [initialDeposit, set_initialDeposit] = useState("0");
  const [compoundCount, set_compoundCount] = useState("0");
  const [compoundTime, set_compoundTime] = useState("0");
  const [curoffTime, set_curoffTime] = useState("0");
  const [totalWithdrawn, set_totalWithdrawn] = useState("0");
  const [totalDeposits, set_totalDeposits] = useState("0");
  const [totalReferral, set_totalReferral] = useState("0");
  const [totalEarning, set_totalEarning] = useState("0");
  const [firstDeposit, set_firstDeposit] = useState("0");
  const [dailyCompoundBonus, set_dailyCompoundBonus] = useState("0");
  const [withdraw_cooldown, set_withdraw_cooldown] = useState("0");
  const [curr_time, set_curr_time] = useState("0");
  const [total_Bonus, set_total_Bonus] = useState(0);

  const [minLim, set_minLim] = useState("0");

  const [Referral, set_Referral] = useState("0");

  const CHAIN_ID = "56";
  const CHAIN_ID1 = "0x38";

  useEffect(() => {
    connectWallet();
    mount();
  }, []);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("ref");

  async function mount() {
    try {
      // Get network provider and web3 instance.
      const web3 = new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const tokenContract = tokenContractAddress;
      //const investContract = InvestAddress;

      const contract = new web3.eth.Contract(cont_abi, cont_add);
      let userInfo = await contract.methods.getUserInfo(accounts[0]).call();
      let earning;
      try {
        earning = await contract.methods
          .getAvailableEarnings(accounts[0])
          .call();
        earning = web3.utils.fromWei(earning, "ether").slice(0, 6);
      } catch (e) {
        earning = 0;
      }
      var siteInfo = await contract.methods.getSiteInfo().call();
      var Compound_time = await contract.methods.COMPOUND_STEP().call();
      var Cutoff_time = await contract.methods.CUTOFF_STEP().call();
      var curr_time = await contract.methods.getTimeStamp().call();
      var referralEarning = await contract.methods
        .referralEarning(accounts[0])
        .call();
      const total_bonus = await contract.methods
        .total_Bonus(accounts[0].toString())
        .call();

      var withdraw_cooldown = await contract.methods.WITHDRAW_COOLDOWN().call();

      var firstDeposit = await contract.methods
        .firstDeposit(accounts[0])
        .call();
      var MIN_INVEST_LIMIT = await contract.methods.MIN_INVEST_LIMIT().call();

      var hatch_time = Number(userInfo[4]) + Number(Cutoff_time);
      var hatch_time1 = Number(userInfo[4]) + Number(Compound_time);
      firstDeposit = web3.utils.fromWei(firstDeposit, "ether");

      console.log("grow" + accounts[0]);

      var siteInfo = await contract.methods.getSiteInfo().call();

      const temp = web3.utils.fromWei(userInfo[0], "ether");

      userInfo[7] = web3.utils.fromWei(userInfo[7], "ether");

      referralEarning = web3.utils
        .fromWei(referralEarning, "ether")
        .slice(0, 6);

      set_initialDeposit(temp);
      set_totalWithdrawn(userInfo[7]);
      set_totalDeposits(siteInfo[1]);
      set_totalReferral(referralEarning);
      if (id != null) {
        set_Referral(id);
      }
      set_totalEarning(earning);
      set_compoundCount(userInfo[10]);
      setUser(accounts[0]);
      set_minLim(MIN_INVEST_LIMIT);
      set_compoundTime(hatch_time);
      set_curoffTime(hatch_time1);
      set_firstDeposit(firstDeposit);
      set_dailyCompoundBonus(userInfo[9]);
      set_withdraw_cooldown(withdraw_cooldown);
      set_curr_time(curr_time);
      set_total_Bonus(total_bonus);
console.log(hatch_time1);
      console.log("hello" + user);
    } catch (error) {
      console.error(error);
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      // alert(
      //   "it looks like that you dont have metamask installed,please install"
      // );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      setNetworkID(networkId);

      // console.log(IDs)
      if (networkId == CHAIN_ID) {
        setisWalletConnected(true);
        console.log("its in net" + isWalletConnected);

        setAddress(window.ethereum.selectedAddress);
      } else {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID1 }],
        });
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }
  try {
    window.ethereum.on("chainChanged", hello);
    window.ethereum.on("accountsChanged", hello);
  } catch {}

  function hello() {
    window.location.reload();
  }

  async function opnePdf() {
    window.open("./images/psf.pdf", "_blank");
  }

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(/images/bd-img.jpeg)` }}
    >
      <div className="hdr flex aic">
        <div className="wrap flex aic">
          <a href="./images/psf.pdf" target="_blank" className="btn">
            <div className="btn button" onClick={(e) => opnePdf()}>
              White Paper
            </div>
          </a>
          <div className="btn button" onClick={connectWallet}>
            {!_address ? "Connect Wallet" : _address.slice(0, 10)}
          </div>
        </div>
      </div>
      <Main
        isWalletConnected={isWalletConnected}
        minLim={minLim}
        initialDeposit={initialDeposit}
        totalWithdrawn={totalWithdrawn}
        totalDeposits={totalDeposits}
        totalReferral={totalReferral}
        user={user}
        Referral={Referral}
        compoundCount={compoundCount}
        totalEarning={totalEarning}
        compoundTime={compoundTime}
        curoffTime={curoffTime}
        firstDeposit={firstDeposit}
        dailyCompoundBonus={dailyCompoundBonus}
        withdraw_cooldown={withdraw_cooldown}
        curr_time={curr_time}
        total_bonus={total_Bonus}
      />
      <div className="benifit flex aic jc">
        <div className="beni-box flex flex-col">
          <div className="benifit-hdr flex aic">
            <div className="benifit-left flex aic">
              <img src="./images/glob1.png" className="img-boll" />
              <div className="benifit-tag">BENIFITS</div>
            </div>
            <div className="benifit-right flex aic">
              <img src="./images/glob2.png" className="img-boll" />
              <div className="benifit-tag">REFFERAL</div>
            </div>
          </div>
          <div className="points-list flex">
            <div className="left flex-col flex">
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">8% Daily ~ 2920% APR</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">13% Referrals</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">4 Hours Withdraw Cooldown</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">12 Hours Compound Timer</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">48 Hours Rewards Accumulation</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">Cut-Off</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">10 Times Mandatory Compound Feature</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">
                  80% Feedback Tax For Early Withdrawals
                </div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">Anti-Bot Launch</div>
              </div>
            </div>
            <div className="right flex flex-col">
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">1 level 8%</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">2 level 3%</div>
              </div>
              <div className="item flex aic">
                <img src="./images/star.png" className="img-star" />
                <div className="lbl">3 level 2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="desciption flex aic jc">
        <div className="desc-box flex flex-col aic">
          <div className="desc-hdr uppercase">
            What is the bnb shuttle mine?
          </div>
          <div className="detail">
            ShuttleMine is a decentralized application built on the Binance
            Smart Chain. The object of the game is to launch your shuttle sooner
            and more often than other shuttles. This in turn earns you more BNB
            faster.Your shuttle will travel as fast as it can, giving you a
            daily average of 8% of your farmers' value.
            <br />
            The daily percentage return depends on the shuttle actions that are
            taken within the platform that impact the shuttle efficiency rate.
            The shuttle efficiency rate rises and falls as users take-off, boost
            your earnings and descend for BNB.
            <br />
            Once the shuttle is Bought, it cannot be sold, and the investment
            made to boost it (either through take-off or boost) cannot be taken
            back. However, once bought, Shuttle will not stop producing yield.
          </div>
        </div>
      </div>
      <div className="desciption flex aic jc">
        <div className="desc-box flex flex-col aic">
          <div className="desc-hdr uppercase">How does this platform work?</div>
          <div className="detail">
            This platform work similarly to a financial market, where an asset
            has intrinsic value that is relative to the supply or demand of said
            asset.
            <br />
            <br />
            Shuttle is purchased with a pre-determined currency at a price
            relative to the Shuttle current travel efficiency rate. After the
            Shuttle is purchased, it takes-off for you right away to give you
            the best yield on your investment possible, for as long as possible.
            <br />
            <br />
            Just as any other asset bought and sold on an open market, the price
            of a Shuttle will fluctuate over time, as will the travel efficiency
            rate, as you and other users buy Shuttles, compound earnings and
            sell earnings.
            <br />
            <br />
            To put it plainly, the more demand for the Shuttles boosted, the
            more they will increase in value and the more yield they will
            produce. Inversely, when the demand decreases, so will the value of
            the Shuttles and their daily return on investment.
            <br />
            The main difference between a this game and a traditional financial
            market is that a recruited Shuttle cannot be sold, only the value
            they provide can be sold.
            <br />
            <br />
            As the Shuttles of the game as a whole compound their earnings and
            make new deposits, the game efficiency rate will stay relatively
            constant, but the moment Shuttles start to sell more than they are
            compounding, the efficiency rate will begin to drop as to preserve
            the TVL and longevity of the game.
          </div>
        </div>
      </div>
      <div className="desciption flex aic jc">
        <div className="desc-box flex flex-col aic">
          <div className="desc-hdr uppercase">
            What makes it different from other similar platforms?
          </div>
          <div className="detail">
            The cutoff time is the amount of time it will take for your "Shuttle
            Reward" to be full of rewards. Once the bag is full, it will stop
            filling until you've taken some action in the game. This is to
            prevent whales from letting their rewards accumulate for a long
            time, and removes the false impression the contract value is going
            up when most of it is rewards the whale is waiting to withdraw at
            once.
            <br />
            <br />
            The withdraw cooldown time is the amount of time one has to wait
            before they can make another withdrawal. This also prevents the
            contract balance from decreasing in value too fast. If the team
            decides it's necessary to protect the contract balance, this time
            period can be adjusted to slow down the rate of withdrawals, but it
            can only be set to a value less than or equal to 24 hours (per
            contract rules).
            <br />
            <br />
            The compound count is the number of times the user has compounded.
            By default, the required compound count by the platform is 10,
            meaning the user will have to compound 10 times(compound once every
            12 hours) before they can withdraw without the feedback tax of 35%.
            This feature in essence will ensure the longevity and stability of
            the project.
            <br />
            <br />
            To reward users who compound, there is a bonus when you boost your
            daily Shuttle earnings instead of selling them. The bonus increases
            2% every 12 hours that you compound without withdrawing (20% max
            after 5 days). This incentivizes the user to compound more often,
            which will help boost the Shuttle efficiency rate in the long run.
            To be able to utilize the boost bonus feature, the player must not
            compound before the provided timer reaches 00:00:00.
            <br />
            <br />
            For the players who choose to not play the game and only sell, there
            will be a 35% tax on those sells that will stay in the contract. If
            the player makes two or more consecutive sells, this tax will be
            applied. The only way for the user to not pay the 35% tax is to
            compound 10 times before making another withdrawal.
            <br />
            ShuttleMine also has a very unique feature that has never been done
            before which effectively decreases the amount of shuttle inflation
            that occurs over a long period of time. Every sell action will only
            add 50% of the amount sold to the total supply. Older miner add 100%
            of what is sold to the total supply. This means the contract will
            have a lower inflation rate, keeping the farmers supply more scarce
            and more valuable than other miner platforms.
          </div>
        </div>
      </div>
      <div className="desciption flex aic jc">
        <div className="desc-box flex flex-col aic">
          <div className="desc-hdr uppercase">
            What is the recommended strategy?
          </div>
          <div className="detail">
            The best strategy that the team can recommend is to boost/compound
            for 6 days and harvest 1 day a week.
            <br />
            This will increase the users investment at the same time increasing
            the daily yield earnings. This strategy has already been tried and
            tested by several project and is proven effective both for the short
            and long term.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
