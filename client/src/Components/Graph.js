import React from 'react';
import { Chart } from 'chart.js';
let myChart
//--Chart Style Options--//
//Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
//Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

class Graph extends React.Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const values = this.props.data;
        const selection = this.props.selection

        console.log('GRAPH')
        console.log(selection)

        const labels = this.buildLabels(values)
        
        const dataset = this.buildDataset(values, selection)

        if (typeof myChart !== "undefined") myChart.destroy();

        myChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: dataset
            },
            options: {
                //Customize chart options
            }
        });

    }

    buildLabels = (values) => {
        var labels = [] 
        if (this.props.selection == '/poi') {
            return ['EQ Works', 'CN Tower', 'Niagara Falls', 'Vancouver Harbor']
        }
        for (var i = 0; i < values.length; i++) {
            var obj = values[i]
            labels.push(obj.date)
        }
        return labels 
    }

    buildDataset = (values, selection) => {
        var dataset

        if (selection == '/stats/daily') {
            let clicks = this.getArray(values, 'clicks')
            let impressions = this.getArray(values, 'impressions')
            let revenue = this.getArray(values, 'revenue')

            dataset = [
                {
                    label: "Clicks",
                    data: clicks,
                    fill: false,
                    borderColor: "#6610f2"
                },
                {
                    label: "Impressions",
                    data: impressions,
                    fill: false,
                    borderColor: "#00FFFF"
                },
                {
                    label: "Revenue($)",
                    data: revenue,
                    fill: false,
                    borderColor: "#FF0000"
                }
            ]
        }
        else if (selection == '/stats/hourly') {
            let impressions = this.getArray(values, 'impressions')
            let revenue = this.getArray(values, 'revenue')

            dataset = [
                {
                    label: "Impressions",
                    data: impressions,
                    fill: false,
                    borderColor: "#00FFFF"
                },
                {
                    label: "Revenue($)",
                    data: revenue,
                    fill: false,
                    borderColor: "#FF0000"
                }
            ]
        }
        else if (selection == '/events/daily') {
            let events = this.getArray(values, 'events')

            dataset = [
                {
                    label: "Events",
                    data: events,
                    fill: false,
                    borderColor: "#6610f2"
                }
            ]
        }
        else if (selection == '/events/hourly') {
            let events = this.getArray(values, 'events')

            dataset = [
                {
                    label: "Events",
                    data: events,
                    fill: false,
                    borderColor: "#6610f2"
                }
            ]
        }
        else if (selection == '/poi') {
            let lat = this.getArray(values, 'lat')
            let lon = this.getArray(values, 'lon')

            dataset = [
                {
                    label: "Latitude",
                    data: lat,
                    fill: false,
                    borderColor: "#6610f2"
                },
                {
                    label: "Longitude",
                    data: lon,
                    fill: false,
                    borderColor: "#00FFFF"
                }
            ] 
        }

        return dataset 
    }

    getArray = (values, sel) => {
        var array = []
        for (var i = 0; i < values.length; i++) {
            var obj = values[i]
            array.push(obj[sel])
        }
        return array
    }

    //className={classes.graphContainer}
    render() {

        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default Graph