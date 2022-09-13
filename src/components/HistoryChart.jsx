
import React, { useRef, useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { getRelativePosition } from 'chart.js/helpers';
import { historyOptions } from "../chartConfigs/ChartConfigs";
import { Link } from "react-router-dom";


const HistoryChart = ({data}) => {
    const chartRef = useRef();
    
    const {day, week, year, detail} = data;

    const [timeFormat, setTimeFormat] = useState("24H");

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h": 
                return day;
            case "1m":
                return week;
            case "2y":
                return year;
            default:
                return day;
        }
    }

    useEffect(() => {
        if (chartRef && chartRef.current && detail) {

            let chartStatus = Chart.getChart("myChart"); // <canvas> id
                if (chartStatus != undefined) {
                chartStatus.destroy();
                }
            
            const charInstance = new Chart(chartRef.current, {
                
                    type: 'line',
                    data: {
                        
                        datasets: [
                            {
                            label: `${detail.name} price`,
                            data: determineTimeFormat(),
                        //   backgroundColor: "rgba(100, 305, 194, 0.5)",
                        //   borderColor: "rgba(170, 200, 194, 1.4)",
                          pointRadius: 0,
                        //   fill: true
                        
                            
                        //   borderWidth: 1
                        }
                    ]
                    },
                    options: {
                        ...historyOptions
                    }
            });
           
            // charInstance.destroy();
        }
    })

    const goBackBtn = () => {
        console.log("goBackBtn");
    }

    const renderPrice = () => {
        if (detail) {
            return (
                <div>
                    <div className="d-flex justify-content-between">
                    <p className="text-price my-0">{detail.current_price.toFixed(2)}</p>
                    <Link className="go-back btn btn-danger btn-sm"  onClick={() => goBackBtn()} to="/">Go back</Link>
                         </div>
                 
                <p className={detail.price_change_percentage_24h < 0 ? "text-danger my-0 p-1" : "text-success my-0 p-1"}>{detail.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              

            )
        }
    }

    return  (
        <div className="bg-white border mt-1 rounded p-3 ">
            <div>{renderPrice()}</div>
              <div>
            <canvas ref={chartRef} id="myChart" width={600} height={350}></canvas>
        </div>
        <div className="chart-button mt-1  ">
            <button onClick={() => setTimeFormat("24h")} className="btn  btn-dark btn-sm">24h</button>
            <button onClick={() => setTimeFormat("1m")} className="btn btn-info btn-sm mx-4">1m</button>
            <button onClick={() => setTimeFormat("2y")} className="btn btn-secondary btn-sm">2y</button>
        </div>
        </div>
      
    

    )
       
}

export default HistoryChart;