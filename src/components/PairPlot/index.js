import { useCallback, useState } from "react"
import ScatterChart from "../ScatterChart"
export default function PairPlot({series, style}) {
  const [hoverIndex, setHoverIndex] = useState()
  const [hoverKeys, setHoverKeys] = useState([])
  const hoverHandler = useCallback((keys, index) => {
    setHoverKeys(keys)
    setHoverIndex(index)
  }, [setHoverIndex, setHoverKeys])
  const leaveHandler = useCallback(index => {
    setHoverKeys(undefined)
    setHoverIndex(index)
  }, [setHoverIndex, setHoverKeys])
  // let width = 100
  return <table style={style} cellSpacing={0}>
    <thead>
      <tr>
        <td></td>
        {Object.keys(series).map(
          key => <td key={`col-header-${key}`}>{key}</td>
        )}
      </tr>
    </thead>
    <tbody>
      {Object.keys(series).map(
        (key, index) => <tr key={`row-header-${key}`}>
          <td>{key}</td>
          {Object.keys(series).map(
            (anotherKey, anotherIndex) => {
              return anotherIndex >= index?<td key={`${key}/${anotherKey}`}><ScatterChart highlightIndex={hoverKeys.includes(key) || hoverKeys.includes(anotherKey)?hoverIndex:undefined} x={series[key]} y={series[anotherKey]} onHover={index => hoverHandler([key, anotherKey], index)} onLeft={index => leaveHandler(index)}/></td>:<td key={`${key}/${anotherKey}`} />
            }
          )}
        </tr>
      )}
    </tbody>
  </table>
}