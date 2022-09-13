import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import CoinData from "../components/CoinData";
import HistoryChart from "../components/HistoryChart";
import CoinGecko from "../apis/CoinGecko";
import axios from 'axios';

const CoinDetailPage = () => {

    const coin = useParams();
    const [coinData, setCoinData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formatData = data => {
        return data.map(el => {
            return {
                x: el[0],
                y: el[1].toFixed(2) //toFixed(2) округляет число, оставляет 2 десятичных числа
            }
        })
    }

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading (true);
            const [day, week, year, detail] = await Promise.all([ // Promise.all вернем ответ сервера в один момент. Если хоть один не вернется ответ то и остальные тоже
                CoinGecko.get(`/coins/${coin.id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '1'
                    }
                }),

                CoinGecko.get(`/coins/${coin.id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '30'
                    }
                }),
    
                CoinGecko.get(`/coins/${coin.id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '730'
                    }
                }),
                CoinGecko.get('/coins/markets', {
                    params: {
                        vs_currency: "usd",
                        ids: coin.id
                    }
                })
            
    
            ])
            setCoinData({
                day: formatData(day.data.prices), 
                week: formatData(week.data.prices), 
                year: formatData(year.data.prices),
                detail: detail.data[0]
            });
            setIsLoading(false);
        }

        fetchData();

      
    }, []) 



    console.log('CoinDetailPage', coin);

    const renderData = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }

       return (
        <div className="coinlist">
            <HistoryChart data={coinData}></HistoryChart>
            <CoinData data={coinData.detail}></CoinData>
        </div>
       )
    }

    return  renderData();
       
}

export default CoinDetailPage;