
import React from "react";


const CoinData =  ({data}) => {

    const  renderData =  () => {

        if (data) {
            return (
                <div className="bg-white mt-3 p-2 rounded border row">
                    <div className="col-sm">
                        <div className="d-flex flex-column">
                            <span className="text-mute coin-data-category">Market Cap</span>
                            <span>{data.market_cap}</span>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Total Supply</span>
                            <span>{data.total_supply}</span>
                        </div>
                    </div>

                    <div className="col-sm">
                    <div className="d-flex flex-column">
                            <span className="text-mute coin-data-category">Total Volume</span>
                            <span>{data.total_volume}</span>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Hight (24h)</span>
                            <span>{data.high_24h}</span>
                        </div>
                    </div>

                    <div className="col-sm">
                    <div className="d-flex flex-column">
                            <span className="text-mute coin-data-category">Price Change (24h)</span>
                            <span>{data.price_change_24h.toFixed(2)}</span>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Low (24h)</span>
                            <span>{data.low_24h}</span>
                        </div>
                    </div>
                </div>
            )
        }
        
    }

    return  (
        <div>
            {renderData()}
        </div>
    

    )
       
}

export default CoinData;