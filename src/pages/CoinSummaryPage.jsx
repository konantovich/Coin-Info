import React from 'react';

import CoinList from '../components/CoinList';
import FindCoin from '../components/FindCoin';



const CoinSummaryPage = () => {
   //container for coin list

   return (
      <div>
         <div className='main col-md-12 d-flex flex-row mt-5 '>
            <div className='shadow align-self-start  border p-5 rounded  bg-light '>
               {/* <AddCoin></AddCoin> */}
               <CoinList></CoinList>
            </div>
            <div className='find-coins col-md-4'>
               <FindCoin></FindCoin>
            </div>
         </div>
      </div>
   );
};

export default CoinSummaryPage;
