import React from 'react';
import Table from './Components/Table'
import Graph from './Components/Graph';
import Map from './Components/Map';
import { updateData, updateCols } from './endpoints'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: '/stats/daily',
            data: '',
            column: updateCols('/stats/daily'),
            display: 'Table'
        }
    }

    componentDidMount() {
        updateData(this.state.selection).then(res => {
            this.formatDates(res)
            this.setState({ data: res })
        })
        
    }

    handleSelection = async (e) => {
        
        var sel = e.target.value

        var results = await updateData(sel)

        console.log('new')
        console.log(sel)
        console.log(results)

        const cols = updateCols(sel)
        console.log('WORKING!!!!!!')
        var data = this.formatDates(results)
        this.setState({ selection: sel, data: results, column: cols })
        console.log('WORKING2!!!!!!')

    }

    formatDates = (data) => {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i]
            var date = new Date(obj.date)
            date = date.toLocaleDateString("en-US")

            obj.date = date   
        }
        
    } 

    handleDisplay = (e) => {
        let disp = e.target.value
        this.setState({ display: disp })
    }

    render() {
        let component
        if (this.state.display == 'Table') {
            component = <Table
                selection={this.state.selection}
                data={this.state.data}
                column={this.state.column}
            />
        }
        else if (this.state.display == 'Graph') {
            component = <Graph
                selection={this.state.selection}
                data={this.state.data}            
            />
        }
        else if (this.state.display == 'Map') {
            component = <Map />
        }
        return (
            <div>
                <select
                    
                    onChange={this.handleSelection}
                >
                    <option value="/stats/daily">Stats: Daily</option>
                    <option value="/stats/hourly">Stats: Hourly</option>
                    <option value="/events/daily">Events: Daily</option>
                    <option value="/events/hourly">Events: Hourly</option>
                    <option value="/poi">POI</option>
                </select>
                <select

                    onChange={this.handleDisplay}
                >
                    <option value="Table">Table</option>
                    <option value="Graph">Graph</option>
                    <option value="Map">Map</option>
                    
                </select>                

                <div>
                    {component}
                </div>
            </div>

        );
    }
}

export default App;
