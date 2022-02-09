import './App.css';
import {useCallback, useMemo, useState} from 'react'

import { generateRandomSeries } from './utils/data_generator';
import PairPlot from './components/PairPlot';
import ClustersTable from './components/ClustersTable';

const seriesConfigs = {
  "seriesA": {},
  "seriesB": {min: 10, max: 15},
  "seriesC": {min: 95, max: 105},
  "seriesD": {min: 1000, max: 1001},
}
const defaultCluster = {
  id: "default",
  color: "#00ff00"
}
function App() {
  let series = useMemo(() => {
    let temp = {}
    for (let [key, value] of Object.entries(seriesConfigs)) {
      temp[key] = generateRandomSeries(value)
    }
    return temp
  }, [])
  const [clusters, setClusters] = useState([defaultCluster])
  const clustersChangeHandler = useCallback(clusters => {
    setClusters(clusters)
  }, [setClusters])
  const [activeClusterIndex, setActiveClusterIndex] = useState(0)
  const activeClusterChangeHandler = useCallback(index => {
    setActiveClusterIndex(index)
  }, [setActiveClusterIndex])
  return (
    <div className="App">
      <PairPlot style={{width: '100%', tableLayout: 'fixed'}} series={series} activeClusterIndex={activeClusterIndex} clusters={clusters} />
      <ClustersTable clusters={clusters} onChange={clustersChangeHandler} activeClusterIndex={activeClusterIndex} onActiveChange={activeClusterChangeHandler} />
    </div>
  );
}

export default App;
