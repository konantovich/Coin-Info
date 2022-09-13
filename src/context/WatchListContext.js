import React, { createContext, useState, useEffect, Component } from "react";


export const WatchListContext = createContext();


export const WatchListContextProvider = props => {
    //first connect on site, default coins in list
  
      const getStorageCoin = localStorage.getItem('watchlist') || "bitcoin,ethereum,dogecoin"
    
    
    const [watchList, setWatchlist] = useState(getStorageCoin.split(',')); //split return array

    const [isServerError, setIsServerError] = useState(false)

    
    useEffect(() => {

        
    localStorage.setItem('watchlist', watchList);
    }, [watchList]);


    const addCoin = (coin) => {
        if (watchList.indexOf(coin) === -1) {
            setWatchlist([...watchList, coin])
        } else {
            return (
                <span className="position-absolute mt-1 px-1">coin already exist</span>
            )
           
        }
        
    }

    const onDeleteCoin = (coin) => {

     
        
        setWatchlist(watchList.filter(coins => {
            return coins !== coin
        }))
      console.log(coin, watchList);
    }

    return (
       
             <WatchListContext.Provider value={{watchList,setWatchlist, onDeleteCoin, addCoin, isServerError, setIsServerError}}>
                {props.children}
             </WatchListContext.Provider>
    )

}