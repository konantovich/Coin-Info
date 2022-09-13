import React from 'react';
import { Link } from 'react-router-dom';

const Coin = ({ coin, onDeleteCoin }) => {

   return (
      <Link to={`/coins/${coin.id}`} className='text-decoration-none my-1 '>
         <li className='coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark coin'>
            <div className='d-flex justify-content-left  align-items-center'>
               <img
                  className='coinlist-image p-1'
                  src={coin.image}
                  alt=''
               ></img>
               <span className='text-decoration-none'>
                  {coin.current_price}
               </span>
            </div>

           <div>
               <span
                  className={
                     coin.price_change_percentage_24h < 0
                        ? 'currancy-change text-danger mr-1'
                        : 'currancy-change text-success mr-1'
                  }
               >
                  {'  '}

                  {coin.price_change_percentage_24h < 0 ? (
                     <i className='currancy-change fas fa-sort-down align-middle mr-1'></i>
                  ) : (
                     <i className='currancy-change fas fa-sort-up align-middle mr-1'></i>
                  )}
                  {coin.price_change_percentage_24h}
               </span>

               <i
                  className='delete-icon far fa-times-circle text-danger coin'
                  onClick={(item) => {
                     item.preventDefault();
                     onDeleteCoin(coin.id);
                  }}
               ></i>
            </div>
         </li>
      </Link>
   );
};

export default Coin;
