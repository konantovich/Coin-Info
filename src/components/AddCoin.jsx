import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { WatchListContext } from "../context/WatchListContext";
import Button from 'react-bootstrap/Button';
import 'jquery'; 

const AddCoin = () => {

    const {addCoin} = useContext(WatchListContext);

    const coinsList = [
        "bitcoin",
        "ethereum",
        "ripple",
        "cardano",
        "litecoin",
        "dogecoin",
        "monero",
        "tron"
    ];
    let [showClass, setShowClass] = useState(false);
    const showCoinList = () => {
        setShowClass (showClass = !showClass);
    }

    const handleClick = (coin) => {
        addCoin(coin);
        setShowClass(false);
    }


    return  (
        <div>
            <div className="dropdown  d-flex justify-content-center">
            {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => showCoinList()}>
                Add Coin
            </button> */}
            <div className={!showClass ? "dropdown-menu " : "dropdown-menu show"} aria-labelledby="dropdownMenuButton1" >
                {coinsList.map(coin => {
                    return (
                        <a className="dropdown-item" key={coin} href="#" onClick={() => handleClick(coin)}>{coin}</a>
                    )
                })}
               
            </div>
            </div>
        </div>
    

    )
       
}

export default AddCoin;