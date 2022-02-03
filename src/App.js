import './App.css';
import {useMemo} from 'react'

import { generateRandomSeries } from './utils/data_generator';
import PairPlot from './components/PairPlot';

const seriesConfigs = {
  "seriesA": {},
  "seriesB": {min: 10, max: 15},
  "seriesC": {min: 95, max: 105},
  "seriesD": {min: 1000, max: 1001},
}
function App() {
  let series = useMemo(() => {
    let temp = {}
    for (let [key, value] of Object.entries(seriesConfigs)) {
      temp[key] = generateRandomSeries(value)
    }
    return temp
  }, [])

  return (
    <div className="App">
      <PairPlot style={{width: '100%', tableLayout: 'fixed'}} series={series}/>
    </div>
  );
}

export default App;
