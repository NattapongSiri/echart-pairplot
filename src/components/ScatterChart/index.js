import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react'
import ReactECharts from 'echarts-for-react'
export default function ScatterChart({id, x, y, highlightIndex, selectedIndex, clusters, onHover, onSelected}) {
  let echarts = useRef()
  let [currentHighlightIndex, setCurrentHighlightIndex] = useState()
  useEffect(() => {
    if (currentHighlightIndex !== highlightIndex && echarts.current !== null) {
      echarts.current.getEchartsInstance().dispatchAction({
        type: 'downplay',
        dataIndex: currentHighlightIndex
      })
    }
    setCurrentHighlightIndex(highlightIndex)
  }, [currentHighlightIndex, highlightIndex, setCurrentHighlightIndex])
  let groups = useMemo(() => {
    let arr = (new Array(x.length)).fill("-1")
    for (let [clusterIndex, dataIndex] of Object.entries(selectedIndex)) {
      for (let index of dataIndex) {
        arr[index] = clusterIndex
      }
    }
    return arr
  }, [selectedIndex, x?.length])
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
      brush: {
        throttleDelay: 50
      },
      dataset: {
        dimensions: ["x", "y", "cluster"],
        source: {
          x,
          y,
          cluster: groups
        }
      },
      series: [{
        type: 'scatter',
        // dimensions: ["x", "y"],
        emphasis: {
          itemStyle: {
            color: 'red'
          }
        },
        select: {
          disabled: false,
          itemStyle: {
            color: '#0f0'
          }
        },
        selectedMode: 'multiple'
      }],
      toolbox: {
        show: true,
        feature: {
          brush: { 
            type: ['rect', 'polygon', 'keep', 'clear'],
          }
        }
      },
      visualMap: [{
        type: 'piecewise',
        dimension: 'cluster',
        categories: [...Object.keys(selectedIndex)],
        inRange: {
          color: [...Object.keys(selectedIndex).map(index => clusters[index].color)]
        },
        outOfRange: {
          color: '#5566ff'
        }
      }]
    }
  }, [
    x, 
    y, 
    groups, 
    selectedIndex, 
    clusters
  ])
  let mouseOverHandler = useCallback(params => {
    setCurrentHighlightIndex(params.dataIndex)
    if (typeof onHover === "function") {
      onHover(params.dataIndex)
    }
  }, [onHover])
  let selectedHandler = useCallback(params => {
    if (typeof onSelected === "function" && params?.batch?.length > 0 && params.batch[0]?.selected?.length > 0) {
      onSelected(params.batch[0]?.selected[0]?.dataIndex)
    }
  }, [
    onSelected
  ])
  let eventsHandler = useMemo(() => ({
    'mouseover': mouseOverHandler,
    'brushselected': selectedHandler
  }), [mouseOverHandler, selectedHandler])

  useEffect(() => {
    if (highlightIndex !== undefined && echarts.current !== null) {
      echarts.current.getEchartsInstance().dispatchAction({
          type: 'highlight',
          dataIndex: highlightIndex
      })
    }
  }, [highlightIndex])

  return <ReactECharts 
    ref={e => echarts.current = e}
    option={option} 
    onEvents={eventsHandler}
  />
}