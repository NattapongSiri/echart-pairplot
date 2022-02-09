import './App.css';
import {useCallback, useMemo, useState} from 'react'
import Grid from '@material-ui/core/Grid'

import { generateRandomSeries } from './utils/data_generator';
import PairPlot from './components/PairPlot';
import ClustersTable from './components/ClustersTable';
import SensorsTable from './components/SensorsTable';

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
  // let series = useMemo(() => {
  //   let temp = {}
  //   for (let [key, value] of Object.entries(seriesConfigs)) {
  //     temp[key] = generateRandomSeries(value)
  //   }
  //   return temp
  // }, [])
  const [clusters, setClusters] = useState([defaultCluster])
  const clustersChangeHandler = useCallback(clusters => {
    setClusters(clusters)
  }, [setClusters])
  const [activeClusterIndex, setActiveClusterIndex] = useState(0)
  const activeClusterChangeHandler = useCallback(index => {
    setActiveClusterIndex(index)
  }, [setActiveClusterIndex])

  // series from csv file
  let [series, setSeries] = useState()
  const onGetSeries = useCallback((data) => {
    setSeries(data)
  },[setSeries])

  return (
    <div className="App">
      <Grid item container lg={12} spacing={1}>
        <Grid item lg={2}>
          <SensorsTable onGetSeries={onGetSeries}></SensorsTable>
          <ClustersTable clusters={clusters} onChange={clustersChangeHandler} activeClusterIndex={activeClusterIndex} onActiveChange={activeClusterChangeHandler} />
        </Grid>
        <Grid item lg={10}>
          {series &&
          <PairPlot style={{width: '100%', tableLayout: 'fixed'}} series={series} activeClusterIndex={activeClusterIndex} clusters={clusters} />
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
