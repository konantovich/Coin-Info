import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

import { UseCountdown } from './CountDown';
import CoinGecko from '../apis/CoinGecko';
import { WatchListContext } from '../context/WatchListContext';
import Coin from './Coin';

const CoinList = () => {
   const [coins, setCoins] = useState([]);
   const {
      watchList,
      setWatchlist,
      onDeleteCoin,
      isServerError,
      setIsServerError
   } = useContext(WatchListContext);
   const [isLoading, setIsLoading] = useState(false);

   const [autoUpdateDataStart, setAutoUpdateDataStart] = useState(true);

   useEffect(() => {

    console.log(isServerError)
      const fetchData = async () => {
         //   setIsLoading(true);

         await CoinGecko.get('/coins/markets', {
            params: {
               vs_currency: 'usd',
               ids: watchList.join(',')
            }
         })
            .then(function (response) {
               setIsServerError(false);
               console.log(response.data);

               setCoins(response.data);
               //  setWatchlist(response.data.name)
               setIsLoading(false);
            })
            .catch(function (error) {
               setIsLoading(false);
               console.log('error', error);
               setIsServerError(true);
            });
      };
      console.log('This!', watchList);

      const intervalId = setInterval(() => {
         setIsLoading(true);
         setTimeout(() => {
            setIsLoading(false);
            fetchData();
            console.log('This will run every second!', watchList);
         }, 1000);
      }, 20000);
      if (isServerError) {
         clearInterval(intervalId);
      } else {
         setAutoUpdateDataStart(false);

         setIsLoading(false);

         if (watchList.length > 0) {
            fetchData();
         } else {
            setCoins([]);
         }

         console.log('watchList', watchList.length);
         return () => {
            clearInterval(intervalId);
         };
      }

      //    return () => clearInterval(interval);
   }, [watchList, isServerError]);

   const renderCoins = () => {
      if (!coins) {
         <div>Server error. Please try again later.</div>;
      }

      if (isServerError) {
         return (
            <div>
               Request limit exceeded. Need to wait{' '}
               {
                  <UseCountdown
                     setIsServerError={setIsServerError}
                  ></UseCountdown>
               }
            </div>
         );
      }

      return (
         <div className='coinlist-page'>
            {isLoading ? (
               <div className='spinner'>
               <div
                  className='spinner-border position-absolute m-auto'
                  role='status'
               >
                  <span className='sr-only'>Loading...</span>
               </div>
               </div>
            ) : (
               <div></div>
            )}
            <ul className='coinlist list-group mt-2 '>
               {coins.map((coin) => {
                  return (
                     <Coin
                        key={coin.id}
                        coin={coin}
                        onDeleteCoin={onDeleteCoin}
                     />
                  );
               })}
            </ul>
         </div>
      );
   };

   return <div>{renderCoins()}</div>;
};

export default CoinList;
