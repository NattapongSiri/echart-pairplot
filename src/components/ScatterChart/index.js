import React, {useMemo} from 'react'
import ReactECharts from 'echarts-for-react'
export default function ScatterChart({x, y}) {
  let option = useMemo(() => {
    return {
      xAxis: {
        type: 'value',
        scale: true
      },
      yAxis: {
        type: 'value',
        scale: true
      },
      dataset: {
        source: {
          x,
          y
        }
      },
      series: [{
        type: 'scatter',
        seriesLayoutBy: 'row'
      }]
    }
  }, [x, y])

  return <ReactECharts option={option} />
}