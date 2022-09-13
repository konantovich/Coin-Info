import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import './App.css'

import CoinDetailPage from './pages/CoinDetailPage';
import CoinSummaryPage from './pages/CoinSummaryPage';
import Header from './components/Header';
import { WatchListContextProvider } from './context/WatchListContext';

const App  = () => {
    return (
     
       <>
        
          <div className='container '>
          <WatchListContextProvider>
            <HashRouter basename='/'>      
            <Header></Header>
                 
                        <Route exact path="/" component={CoinSummaryPage} />
                        <Route path="/coins/:id/" component={CoinDetailPage}></Route>
                
                    </HashRouter>
                </WatchListContextProvider>
               
        </div>
          
          </>
         

         
       
    )
}

export default App;