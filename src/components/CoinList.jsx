import React, { useContext } from "react";
import { useEffect, useState } from "react";
import CoinGecko from "../apis/CoinGecko";

import { WatchListContext } from "../context/WatchListContext";
import Coin from "./Coin";

const CoinList = () => {
    const [coins, setCoins] = useState([]);
    const {watchList, onDeleteCoin} = useContext(WatchListContext);
    const [isLoading, setIsLoading] = useState(false);
    //  console.log(watchList); 

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
          
            const response = await CoinGecko.get('/coins/markets', {
                params: {
                    vs_currency: "usd",
                    ids: watchList.join(",")
                }
            });
            console.log(response.data);
            setCoins(response.data);
            setIsLoading(false); 
         }
      
       
        if (watchList.length > 0) {
            fetchData();
        } else {
            setCoins([]);
        }
       
       console.log('watchList', watchList.length)
        
    }, [watchList]);

    const renderCoins = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }

        return (
            <ul className="coinlist list-group mt-2">
                {coins.map(coin => {
                    return <Coin key={coin.id} coin={coin} onDeleteCoin={onDeleteCoin}/>
                })}
            </ul>
        )
    }

    return <div>{renderCoins()}</div>
       
}

export default CoinList;