import { useEffect, useState, useContext } from 'react';

import { WatchListContext } from '../context/WatchListContext';

const UseCountdown = () => {
    const [counter, setCounter] = useState(120);

    const {setIsServerError} = useContext(WatchListContext);

    useEffect(() => {
        if (counter === 0){
            setIsServerError(false)
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);
    
      return (
        <div >
          <div>{counter}</div>
        </div>
      );
}

export { UseCountdown };