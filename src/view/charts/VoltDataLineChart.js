// LineChart.js
import React, { useEffect, useRef } from 'react';
//import * as d3 from 'd3';
import * as echarts from 'echarts';
//import '@siemens/ix-echarts';





function LineChart({ data }) {
    console.log("Line Chart Data :", data);

    const chartRef = useRef(null);
    console.log("running Line Chart function");

    useEffect(() => {
        if (data.length === 0) {

        } else {
            //const stations = data[0];
            const maxData = data;
            const stations = maxData.map((item) => item.station);
            const maxValues = maxData.map((item) => item.max);
            const minValues = maxData.map((item) => item.min);
            //const minData = data[2];
            var chartDom = chartRef.current;
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Upper Limit Reference Set', 'Lower Limit Reference Set']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                
                xAxis: {
                    type: 'category',
                    //boundaryGap: false,
                    data: stations,
                    axisLabel: {
                        interval: 0,
                        rotate:-45 // Show all labels
                    }
                },
                yAxis: {
                    type: 'value',
                    name:"Voltage"
                },
                series:[
                    {
                      name: 'Upper Limit Reference Set',
                      type: 'line',
                      data: maxValues,
                    },
                    {
                      name: 'Lower Limit Reference Set',
                      type: 'line',
                      data: minValues,
                    },
                  ],
            };
            myChart.setOption(option);

            // Clean up the chart when the component unmounts
            return () => {
                myChart.dispose();
            };
        }

      
    }, [data]);
    return (
        <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>
    );

}

export default LineChart;

