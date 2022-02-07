import { useCallback, useState } from "react"
import { generateSequence } from "../../utils/data_generator"
import ScatterChart from "../ScatterChart"

function SeriesPlot({series, highlightIndex, selectedIndex, xName, yName, onHover, onSelected}) {
  const hoverHandler = useCallback(index => {
    if (typeof onHover === "function") {
      onHover([xName, yName], index)
    }
  }, [onHover, xName, yName])
  const selectedHandler = useCallback(index => {
    if (typeof onSelected === 'function') {
      onSelected([xName, yName], index)
    }
  }, [onSelected, xName, yName])
  return <ScatterChart 
    id={`${xName}-${yName}`}
    highlightIndex={highlightIndex} 
    selectedIndex={selectedIndex}
    x={series[xName]} 
    y={series[yName]} 
    onHover={hoverHandler} 
    onSelected={selectedHandler}
  />
}

export default function PairPlot({series, style}) {
  const [hoverIndex, setHoverIndex] = useState()
  // const [hoverKeys, setHoverKeys] = useState([])
  const [selectedIndex, setSelectedIndex] = useState()
  // const [selectedKeys, setSelectedKeys] = useState([])
  const hoverHandler = useCallback((keys, index) => {
    // setHoverKeys(keys)
    setHoverIndex(index)
  }, [setHoverIndex])
  const selectedHandler = useCallback((keys, index) => {
    // setSelectedKeys(keys)
    setSelectedIndex(index)
  }, [setSelectedIndex])
  const [brushId, setBrushId] = useState()
  // let width = 100
  return <table style={style} cellSpacing={0}>
    <thead>
      <tr>
        <td></td>
        {Object.keys(series).map(
          key => <td key={`col-header-${key}`}>{key}</td>
        )}
        <td>Time Series</td>
      </tr>
    </thead>
    <tbody>
      {Object.keys(series).map(
        (key, index) => <tr key={`row-header-${key}`}>
          <td>{key}</td>
          {Object.keys(series).map(
            (anotherKey, anotherIndex) => {
              return anotherIndex >= index?<td key={`${key}/${anotherKey}`}><SeriesPlot series={series} highlightIndex={hoverIndex} selectedIndex={selectedIndex} xName={key} yName={anotherKey} onHover={hoverHandler} onSelected={selectedHandler}/></td>:<td key={`${key}/${anotherKey}`} />
            }
          )}
          <td><SeriesPlot 
            series={{
                [key]: series[key],
                x: generateSequence({n: series[key].length})
            }}
            highlightIndex={hoverIndex}
            selectedIndex={selectedIndex}
            xName="x"
            yName={key}
            onHover={hoverHandler}
            onSelected={selectedHandler}
          /></td>
        </tr>
      )}
    </tbody>
  </table>
}