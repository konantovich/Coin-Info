
import React from "react";
import AddCoin from "../components/AddCoin";
import CoinList from "../components/CoinList";


const CoinSummaryPage = () => { //container for coin list

    return  (
        <div className="coinsummary shadow border p-5 rounded mt-2 bg-light">
       <AddCoin></AddCoin>
       <CoinList></CoinList>
        </div>
    

    )
       
}

export default CoinSummaryPage;