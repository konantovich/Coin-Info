import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import './App.css'

import $ from 'jquery'; 
import CoinDetailPage from './pages/CoinDetailPage';
import CoinSummaryPage from './pages/CoinSummaryPage';
import Header from './components/Header';
import { WatchListContextProvider } from './context/WatchListContext';

const App  = () => {
    return (
     
       <>
        
          <div className='container'>
          <WatchListContextProvider>
            <BrowserRouter>      
            <Header></Header>
                 
                        <Route exact path="/Coin-Info/" component={CoinSummaryPage} />
                        <Route path="/coins/:id/" component={CoinDetailPage}></Route>
                
                    </BrowserRouter>
                </WatchListContextProvider>
               
        </div>
          
          </>
         

         
       
    )
}

export default App;