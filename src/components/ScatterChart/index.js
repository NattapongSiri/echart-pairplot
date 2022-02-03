import React, {useMemo} from 'react'
import ReactECharts from 'echarts-for-react'
export default function ScatterChart({x, y, highlightIndex, onHover, onLeft}) {
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
        emphasis: {
          itemStyle: {
            color: 'red'
          }
        }
      }]
    }
  }, [x, y])

  return <ReactECharts 
    option={option} 
    onChartReady={echarts => {
      if (highlightIndex !== undefined) {
        echarts.dispatchAction({
          type: 'highlight',
          dataIndex: highlightIndex
        })
      }
    }}
    onEvents={{
      'mouseover': params => {
        if (typeof onHover === "function") {
          onHover(params.dataIndex)
        }
      },
      'mouseout': params => {
        if (typeof onLeft === "function") {
          onLeft(params.dataIndex)
        }
      }
    }}
  />
}