import React, { useContext } from 'react';

import CoinGecko from '../apis/CoinGecko';
import { WatchListContext } from '../context/WatchListContext';

const FindCoin = () => {
   const [coinArr, setCoinArr] = React.useState([]);

   const [inputValue, setInputValue] = React.useState('');

   const { watchList, setWatchlist, onDeleteCoin, isServerError } =
      useContext(WatchListContext);

   React.useEffect(() => {
      if (isServerError) {
         setCoinArr([]);
         setInputValue('');
      }
   }, [isServerError]);

   const handleFindCoin = (e) => {
      if (e.target.value === '') {
        setInputValue('')
         return setCoinArr([]);
      }
      setTimeout(() => {
         console.log(e.target.value);
         const fetchData = async () => {
            const response = await CoinGecko.get(
               `/search?query=${e.target.value}`
            );
            console.log(response.data);
            setCoinArr(response.data.coins);
         };
         fetchData();
      }, 10);
      setInputValue(e.target.value);
   };

   const handleCoinClick = (e) => {
      console.log(e.id);
      console.log(watchList);
      setWatchlist([...watchList, e.id]);
   };

   return (
      <div className='find-coins border p-5 rounded mt-0 bg-light '>
         <span>Search coin:</span>
         <div className='list-group mt-2 w-100'>
            <input
               onChange={handleFindCoin}
               disabled={isServerError}
               value={inputValue}
               className='min-vw-20 w-auto'
            />
            <ul className='list-group '>
               {coinArr.map((coin) => {
                  return (
                     <li
                        key={coin.id}
                        label={coin.id}
                        onClick={() => handleCoinClick(coin)}
                        className='search-coins list-group-item mt-1 h-25 p-0  '
                     >
                        {coin.name}
                     </li>
                  );
               })}
            </ul>
         </div>
      </div>
   );
};

export default FindCoin;
