import React, { useState } from "react";
import styles from "./Future.module.css";
import Image from "next/image";
import { Line } from "react-chartjs-2";

import TradingViewWidget from "../SubMenu/TradingViewWidget";

import { ChartOptions } from "chart.js";

export const FuturesTrading: React.FC<{
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  activePerformance: string;
  setActivePerformance: (analysis: string) => void;
}> = ({ activeMenu, setActiveMenu }) => {
  const [activePerformance, setActivePerformance] = useState("Performance");
  const [activeChart, setActiveChart] = useState<string | null>(null);
  const [activeOrderBook, setActiveOrderBook] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<string | null>(null);

  const [showChart, setShowChart] = useState(true);
  const [showDepth, setShowDepth] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string | null>("true");
  const [selectionOptionSell, setSelctionOptionSell] = useState<string | null>(
    null
  );

  const DepthChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  const DepthChartData = {
    labels: Array.from({ length: 40 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Sell",
        data: Array.from({ length: 40 }, () => [
          parseFloat((1168.49 - Math.random() * 20).toFixed(2)),
          parseFloat((Math.random() * 200).toFixed(4)),
        ]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Buy",
        data: Array.from({ length: 40 }, () => [
          parseFloat((1168.49 + Math.random() * 20).toFixed(2)),
          parseFloat((Math.random() * 200).toFixed(4)),
        ]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log("props:", activeMenu);

  const analysis = [
    { link: "Performance" },
    { link: "Chart" },
    { link: "Order Book" },
  ];

  const list = [
    { link: "Most popular" },
    { link: "Token" },
    { link: "Wishlist" },
  ];

  const handleListClick = (listName: string) => {
    setActiveList(listName);
  };

  const [fund, updateFund] = useState("0.24%");
  const [time, updateTime] = useState("00.24.20%");
  const [data, updatedata] = useState("BTC/USDC");
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [number, updatenumber] = useState("2600.83+5.86%");

  const handleTokenClick = (
    symbol: string,
    newSelectedSymbol: string,
    newNumber: string
  ) => {
    updatedata(symbol);
    setSelectedSymbol(newSelectedSymbol);
    updatenumber(newNumber);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className="container border-bottom">
          <div className="row d-flex d-md-block "></div>
        </div>

        {activeMenu === "Futures Trading" && (
          <div className="d-flex flex-row bd-highlight mb-3">
            <div className={styles.searchContainer}>
              <form action="/action_page.php">
              <input
    type="text"
    name="Search"
    className={styles.largeInput}
    style={{ background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>') no-repeat 10px center`, backgroundSize: '20px', paddingLeft: '40px' }}
    placeholder="Search the Token"
    
/> 
              </form>
              <div className={`row d-flex d-md-block ${styles.listMargin}`}>
                {list.map((item, index) => (
                  <span
                    key={index}
                    className={`myText cursorPointer ${styles.listItem} ${
                      activeList === item.link ? styles.activeList : ""
                    }`}
                    onClick={() => handleListClick(item.link)}
                  >
                    {item.link}
                  </span>
                ))}
              </div>

              <div className="">
                <div className={`${styles.Tokens}`}>
                  Tokens
                  <ul className="list-group">
                    <div className={`d-flex flex-row bd-highlight  `}>
                      <h6 className={`form-check pt-3 text`}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          PerPetual
                        </label>
                      </h6>
                      <h6 className={`form-check pt-3 ms-2`}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Futures Contracts
                        </label>
                      </h6>
                    </div>

                    <div
                      className={`list-group-item-action ${styles.btc}
                  ${
                    selectedSymbol === "BTC/USDC" ? "border border-primary" : ""
                  }
                   `}
                      onClick={() =>
                        handleTokenClick(
                          "BTC/USDC",
                          "BTC/USDC",
                          "2600.83+5.86%"
                        )
                      }
                    >
                      <Image
                        src="/assets/BTC.png"
                        alt="btc/usdc"
                        sizes="100vw"
                        style={{
                          width: "100",
                          height: "auto",
                        }}
                        width={30}
                        height={20}
                      />{" "}
                      BTC/USDC
                      <div className={styles.btcusdc}>
                        <span> 51,855.50 </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7.5"
                            stroke="#E8E8E8"
                            fill="#00B386"
                          />
                          <path
                            d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"
                            fill="#E8E8E8"
                          />
                        </svg>{" "}
                        <span className="text-success">2600.83+5.86%</span>
                      </div>
                    </div>

                    <div
                      className={` list-group-item-action ${styles.btc} ${
                        selectedSymbol === "ETH/USDC"
                          ? "border border-primary"
                          : ""
                      }`}
                      onClick={() =>
                        handleTokenClick(
                          "ETH/USDC",
                          "ETH/USDC",
                          "2600.83+5.86%"
                        )
                      }
                    >
                      <Image
                        src="/assets/ETH.png"
                        alt="btc/usdc"
                        sizes="100vw"
                        style={{
                          width: "100",
                          height: "auto",
                        }}
                        width={30}
                        height={20}
                      />{" "}
                      ETH/USDC
                      <div className={styles.btcusdc}>
                        <span> 51,855.50 </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7.5"
                            stroke="#E8E8E8"
                            fill="#00B386"
                          />
                          <path
                            d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"
                            fill="#E8E8E8"
                          />
                        </svg>{" "}
                        <span className="text-success"> 2600.83+5.86%</span>
                      </div>
                    </div>

                    <div
                      className={`list-group-item-action ${styles.btc} ${
                        selectedSymbol === "SOL/USDC"
                          ? "border border-primary"
                          : ""
                      }`}
                      onClick={() =>
                        handleTokenClick(
                          "SOL/USDC",
                          "SOL/USDC",
                          "2600.83+5.86%"
                        )
                      }
                    >
                      <Image
                        src="/assets/SOL.png"
                        alt="sol/usdc"
                        sizes="100vw"
                        style={{
                          width: "100",
                          height: "auto",
                        }}
                        width={30}
                        height={20}
                      />{" "}
                      SOL/USDC
                      <div className={styles.btcusdc}>
                        <span> 51,855.50 </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7.5"
                            stroke="#E8E8E8"
                            fill="#F45757"
                          />
                          <path
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z"
                            fill="#E8E8E8"
                          />
                        </svg>
                        <span className="text-danger"> 2600.83+5.86%</span>
                      </div>
                    </div>

                    <div
                      className={` list-group-item-action  ${styles.btc} ${
                        selectedSymbol === "AAL/USDC"
                          ? "border border-primary"
                          : ""
                      }`}
                      onClick={() =>
                        handleTokenClick(
                          "AAL/USDC",
                          "AAl/USDC",
                          "2600.83+5.86%"
                        )
                      }
                    >
                      <Image
                        src="/assets/SOL.png"
                        alt="sol/usdc"
                        sizes="100vw"
                        style={{
                          width: "100",
                          height: "auto",
                        }}
                        width={30}
                        height={20}
                      />{" "}
                      AAL/USDC
                      <div className={styles.btcusdc}>
                        <span> 51,855.50 </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7.5"
                            stroke="#E8E8E8"
                            fill="#F45757"
                          />
                          <path
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z"
                            fill="#E8E8E8"
                          />
                        </svg>
                        <span className="text-danger"> 2600.83+5.86%</span>
                      </div>
                    </div>

                    <div
                      className={`list-group-item-action  ${styles.btc}  ${
                        selectedSymbol === "AALD/USDC"
                          ? "border border-primary"
                          : ""
                      }`}
                      onClick={() =>
                        handleTokenClick(
                          "AALD/USDC",
                          "AAl/USDC",
                          "2600.83+5.86%"
                        )
                      }
                    >
                      <Image
                        src="/assets/SOL.png"
                        alt="sol/usdc"
                        sizes="100vw"
                        style={{
                          width: "100",
                          height: "auto",
                        }}
                        width={30}
                        height={20}
                      />{" "}
                      SOL/USDC
                      <div className={styles.btcusdc}>
                        <span> 51,855.50 </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7.5"
                            stroke="#E8E8E8"
                            fill="#F45757"
                          />
                          <path
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z"
                            fill="#E8E8E8"
                          />
                        </svg>
                        <span className="text-danger"> 2600.83+5.86%</span>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`col-6 ${styles.analysisCol}`}>
              <div className=" d-flex flex-row bd-highlight mt-3 ms-5">
                <h4
                  className={`ms-2 ps-2 pt-4 bd-highlight text-dark ${styles.analysis}`}
                >
                  {" "}
                  ANALYSIS
                </h4>
                <span className="ms-2 ps-2 pt-4 bd-highlight text-primary">
                  {data}
                </span>
                <span className="text-success ms-2 ps-2 pt-4 bd-highlight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7.5"
                      stroke="#E8E8E8"
                      fill="#00B386"
                    />
                    <path
                      d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"
                      fill="#E8E8E8"
                    />
                  </svg>{" "}
                  {number}
                  <div className={styles.pco}>
                    <div className="row d-flex d-md-block pt-3.5rem ms-2">
                      <div className="row d-flex d-md-block pt-3.5rem ms-2">
                        {analysis.map((analysis, index) => (
                          <span
                            key={index}
                            className={`myText cursorPointer ${
                              analysis.link === activePerformance
                                ? "border-bottom border-primary"
                                : ""
                            }`}
                            onClick={() => {
                              setActivePerformance(analysis.link);
                              setActiveChart(analysis.link);
                              setActiveOrderBook(analysis.link);

                              setActiveList(null);
                            }}
                          >
                            {analysis.link}
                          </span>
                        ))}
                      </div>
                    </div>

                    {activePerformance === "Performance" && (
                      <div>
                        <div className=" text-dark pt-4 ms-5">
                          <h6 className={`text-dark ${styles.Statisctis}`}>
                            STATISCTIS
                          </h6>
                          <div
                            className={"d-flex flex-row bd-highlight mb-3 pt-4"}
                          >
                            <div className={styles.tolow}>Today's low</div>
                            <div className="pt-4">
                              <label
                                htmlFor="customRange2"
                                className="form-label"
                              ></label>
                              <input
                                type="range"
                                className={`form-range ${styles.formRange}`}
                                min="0"
                                max="5"
                                id="customRange2"
                              ></input>
                            </div>

                            <div className={styles.tohigh}>Today's's high</div>
                          </div>
                          <div
                            className={"d-flex flex-row bd-highlight mb-3 pb-2"}
                          >
                            <span className="ps-1">51,855.50</span>

                            <h6 className={`ps-5 ${styles.tohignum}`}>
                              51,855.50
                            </h6>
                          </div>
                          <div
                            className={"d-flex flex-row bd-highlight mb-3 pt-4"}
                          >
                            <div>52W low</div>
                            <div className="pt-4">
                              <label
                                htmlFor="customRange2"
                                className="form-label"
                              ></label>
                              <input
                                type="range"
                                className={`form-range ${styles.formRange}`}
                                min="0"
                                max="5"
                                id="customRange2"
                              ></input>
                            </div>
                            <div className={styles.whigh}>52W high</div>
                          </div>
                          <div
                            className={"d-flex flex-row bd-highlight mb-3 pb-2"}
                          >
                            <span className="ps-1">51,855.50</span>

                            <span className={`ps-5 ${styles.tohignum}`}>
                              51,855.50
                            </span>
                          </div>
                          <h6 className="text-dark pt-4">ANALYST ESTIMATES</h6>
                          <div className="d-flex flex-row bd-highlight mb-3 pt-4">
                            <span className="ms-4">Buy</span>
                            <div
                              className={`progress  ms-4 mt-1 ${styles.progress}`}
                            >
                              <div
                                className="progress-bar bg-success  w-60"
                                style={{ width: "72%" }}
                              >
                                72%
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-row bd-highlight mb-3 pt-0">
                            <span className="ms-4">Hold</span>
                            <div
                              className={`progress ms-3 mt-1 ${styles.progress}`}
                            >
                              <div
                                className="progress-bar bg-success "
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                25%
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-row bd-highlight mb-3 pt-0">
                            <span className="ms-4">sell</span>
                            <div
                              className={`progress ms-4  mt-1 ${styles.progress}`}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{ width: "50%" }}
                              >
                                50%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeChart === "Chart" && (
                      <>
                        <div
                          className={`d-flex flex-row bd-highlight mb-3 ${styles.chart}`}
                        >
                          <span
                            className={`text-dark ms-5  mt-2 ${styles.chart}`}
                          >
                            CHART
                          </span>
                          <span className="text-dark ms-2 pt-2">
                            Indicators
                          </span>

                          <div
                            className={`list-group d-flex flex-row mt-1 text-dark ${styles.otd}`}
                          >
                            <span
                              className={`cursor-pointer ${
                                showChart ? "border border-primary" : ""
                              }`}
                              onClick={() => {
                                setShowChart(true);
                                setShowDepth(false);
                              }}
                            >
                              Original
                            </span>

                            <span
                              className={`ms-4 ${
                                showChart ? "" : "border border-primary"
                              }`}
                              onClick={() => {
                                setShowChart(false);
                                setShowDepth(false);
                              }}
                            >
                              Trading view
                            </span>

                            <span
                              className={` ms-4 ${
                                showDepth ? "border border-primary" : " "
                              }`}
                              onClick={() => {
                                setShowDepth(false);
                                setShowChart(false);
                              }}
                            >
                              Depth chart
                            </span>
                          </div>
                        </div>
                        {showChart && (
                          <TradingViewWidget symbol={selectedSymbol} />
                        )}

                        {showDepth && (
                          <Line
                            options={DepthChartOptions}
                            data={DepthChartData}
                          />
                        )}
                      </>
                    )}
                    {activeOrderBook === "Order Book" && (
                      <>
                        <h6
                          className={`text-dark ps-5 pt-3 ${styles.orderBook}`}
                        >
                          {" "}
                          Order Book
                        </h6>

                        <div className="d-flex flex-row bd-highlight mb-3 ms-4 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className=" ms-3 bi bi-text-indent-left"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708M7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className=" ms-3 bi bi-text-indent-left"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708M7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className=" ms-3 bi bi-text-indent-left"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708M7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                          </svg>
                        </div>
                        <div className="d-flex flex-row bd-highlight mb-3 ms-4 ">
                          <div className="d-flex flex-row bd-highlight mb-3 ">
                            <span className="text-black ms-3">BID</span>
                            <span className="text-black ms-5">ORDERS</span>

                            <span className="text-black ms-5">QTY.</span>
                          </div>
                          <div className="d-flex flex-row bd-highlight mb-3 ms-1 ">
                            <span className="text-black ms-5">OFFERS</span>
                            <span className="text-black ms-5">ORDERS</span>

                            <span className="text-black ms-5">QTY.</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </span>
                <div
                  className={`col-8 d-flex flex-row bd-highlight ${styles.fundTime} position-relative`}
                >
                  <div className="mt-4">
                    Funding fees
                    <div>{fund}</div>
                  </div>

                  <div className="mt-4 ms-4">
                    Time Left
                    <div>{time}</div>
                  </div>
                  {/* <div className="mt-4 ms-4">
                    Time Left
                    <div>{time}</div>
                  </div> */}
                  
                </div>
              </div>
            </div>

            <div className={`col-4 ${styles.colMain}`}>
              <div className={`${styles.mainTransaction}`}>
                <h4
                  className={`d-flex flex-row bd-highlight pt-4 mt-5 text-dark ${styles.transcation}`}
                >
                  Transcation
                </h4>
                <div className={styles.buySell}>
                  <div className="d-flex flex-row bd-highlight  ms-5 mt-5 pt-4 ps-4">
                    <div
                      className={`ms-5 mt-5 ps-4 text-success ${
                        selectedOption === "buy" ? "text-primary" : ""
                      }`}
                      onClick={() => setSelectedOption("buy")}
                    >
                      Long
                    </div>
                    <div
                      className={`ms-2 mt-5 ps-4 text-danger ${
                        selectionOptionSell === "sell" ? "text-danger" : ""
                      }`}
                      onClick={() => setSelctionOptionSell("sell")}
                    >
                      Short
                    </div>
                  </div>
                </div>

                <div className={styles.limit}>
                  <div
                    className={`d-flex flex-row bd-highlight  ms-5 mt-5 pt-4 ps-4`}
                  >
                    <div className={`form-check ms-5 mt-5 ps-4 `}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        limit
                      </label>
                    </div>
                    <div className={`form-check ms-3 mt-5 ps-4 `}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Market
                      </label>
                    </div>
                    <div className={`form-check ms-3 mt-5 ps-4 `}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Spot Loss Limit
                      </label>
                    </div>
                  </div>
                </div>

                <select
                  className={`form-select ${styles.CrossMargin}`}
                  aria-label="Default select example"
                >
                  <option selected>Cross Margin</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select
                  className={`form-select ${styles.CrossMargin}`}
                  aria-label="Default select example"
                >
                  <option selected>Day Only</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>

                <div className={styles.selectLevearge}>Select Levearge</div>

                <div className={styles.mainOrder}>
                  <div className={styles.orderPrice}>
                    <div className="ms-5 mt-5">Order Price</div>

                    <div className="row w-100">
                      <div
                        className={`ms-5 bg-light text-dark border d-flex justify-content-between align-items-center ${styles.orderprice}`}
                      >
                        <h6 className="col-sm-8 ">13450.00</h6>
                        <h6 className="col-sm-8 ms-5">USDT</h6>
                      </div>
                    </div>
                  </div>
                  <div className={styles.orderPrice}>
                    <div className="ms-5 pt-3">Oty</div>

                    <div className="row w-100">
                      <div
                        className={`ms-5 bg-light text-dark border d-flex justify-content-between align-items-center ${styles.orderprice}`}
                      >
                        <h6 className="col-sm-8">0.098</h6>
                        <h6 className="col-sm-8 ms-5">BTC</h6>
                      </div>
                    </div>
                  </div>
                  <div className={styles.orderPrice}>
                    <div className="ms-5 mt-3">Order Value</div>

                    <div className="row w-100">
                      <div
                        className={`ms-5 bg-light text-dark border d-flex justify-content-between align-items-center ${styles.orderprice}`}
                      >
                        <h6 className="col-sm-8">0.098</h6>
                        <h6 className="col-sm-8 ms-5">USDT</h6>
                      </div>
                    </div>
                  </div>

                  <div className={styles.total}>
                    <div className="d-flex flex-row bd-highlight ms-5">
                      <h6 className="text-dark mt-3 ">Total:</h6>
                      <span className=" text -white mt-3">
                        {" "}
                        Includes 0.2% Fees & 1% TDS
                      </span>
                    </div>
                    <h5 className="text-body mt-2 ms-5">0.00USDT</h5>
                    <div className={`mt-5 ${styles.buyselB}`}>
                      <button type="button" className="btn btn-success">
                        Buy
                      </button>

                      <button
                        type="button"
                        className="btn btn-light border ms-3 "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* {selectionOptionSell === "sell" && (
              <div className={styles.limit}>
                <div
                  className={`d-flex flex-row bd-highlight  ms-5 mt-5 pt-4 ps-4`}
                >
                  <div className={`form-check ms-5 mt-5 ps-4 `}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      limit
                    </label>
                  </div>
                  <div className={`form-check ms-3 mt-5 ps-4 `}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Market
                    </label>
                    <div className={styles.orderPrice}>
                      <div className="ms-5 mt-5">Order Price</div>

                      <div className="row w-100">
                        <div
                          className={`ms-5 bg-light text-dark border d-flex justify-content-between align-items-center ${styles.orderprice}`}
                        >
                          <h6 className="col-sm-8 ">13450.00</h6>
                          <h6 className="col-sm-8 ms-5">USDT</h6>
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderPrice}>
                      <div className="ms-5 pt-3">Oty</div>

                      <div className="row w-100">
                        <div
                          className={`ms-5 bg-light text-dark border d-flex justify-content-between align-items-center ${styles.orderprice}`}
                        >
                          <h6 className="col-sm-8">0.098</h6>
                          <h6 className="col-sm-8 ms-5">BTC</h6>
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderPrice}>
                      <div className="ms-5 mt-3">Order Value</div>

                      <div className="row w-100">
                        <div
                          className={`ms-5 bg-light text-dark border d-flex justify-content-between align-items-center ${styles.orderprice}`}
                        >
                          <h6 className="col-sm-8">0.098</h6>
                          <h6 className="col-sm-8 ms-5">USDT</h6>
                        </div>
                      </div>
                    </div>
                    <div className={styles.total}>
                      <div className="d-flex flex-row bd-highlight ms-5">
                        <h6 className="text-dark mt-3 ">Total:</h6>
                        <span className=" text -white mt-3">
                          {" "}
                          Includes 0.2% Fees & 1% TDS
                        </span>
                      </div>
                      <h5 className="text-body mt-2 ms-5">0.00USDT</h5>
                      <div className={`mt-5 ${styles.buyselB}`}>
                        <button type="button" className="btn btn-danger">
                          sell
                        </button>

                        <button
                          type="button"
                          className="btn btn-light border ms-3 "
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    </>
  );
};
