import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react'
import ReactECharts from 'echarts-for-react'
export default function ScatterChart({id, x, y, highlightIndex, selectedIndex, onHover, onSelected}) {
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
  let [currentSelectedIndex, setCurrentSelectedIndex] = useState()
  useEffect(() => {
    if (currentSelectedIndex !== selectedIndex && echarts.current !== null) {
      echarts.current.getEchartsInstance().dispatchAction({
        type: 'unselect',
        dataIndex: currentSelectedIndex
      })
    }
    setCurrentSelectedIndex(selectedIndex)
  }, [currentSelectedIndex, selectedIndex, setCurrentSelectedIndex])
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
      }
    }
  }, [x, y])
  let mouseOverHandler = useCallback(params => {
    setCurrentHighlightIndex(params.dataIndex)
    if (typeof onHover === "function") {
      onHover(params.dataIndex)
    }
  }, [onHover])
  let selectedHandler = useCallback(params => {
    if (typeof onSelected === "function" && params?.batch?.length > 0 && params.batch[0]?.selected?.length > 0) {
      onSelected(params.batch[0]?.selected[0]?.dataIndex)
      setCurrentSelectedIndex(params.batch[0]?.selected[0]?.dataIndex)
    }
  }, [onSelected, setCurrentSelectedIndex])
  let eventsHandler = useMemo(() => ({
    'mouseover': mouseOverHandler,
    'brushselected': selectedHandler
  }), [id, mouseOverHandler, selectedHandler])

  useEffect(() => {
    if (highlightIndex !== undefined && echarts.current !== null) {
      echarts.current.getEchartsInstance().dispatchAction({
          type: 'highlight',
          dataIndex: highlightIndex
      })
    }
  }, [highlightIndex])
  useEffect(() => {
    if (selectedIndex?.length > 0 && echarts.current !== null) {
      echarts.current.getEchartsInstance().dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: selectedIndex
      })
    }
  }, [selectedIndex])

  return <ReactECharts 
    ref={e => echarts.current = e}
    option={option} 
    onEvents={eventsHandler}
  />
}