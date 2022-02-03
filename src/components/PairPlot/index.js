import ScatterChart from "../ScatterChart"
export default function PairPlot({series, style}) {
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
            (anotherKey, anotherIndex) => anotherIndex >= index?<td><ScatterChart x={series[key]} y={series[anotherKey]}/></td>:<td />
          )}
        </tr>
      )}
    </tbody>
  </table>
}