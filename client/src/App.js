import React from 'react';
import Table from './Components/Table'
//import { Graph } from './Components/Graph';
//import { Map } from './Components/Map';
import { updateData, updateCols } from './endpoints'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: '/stats/daily',
            data: '',
            column: updateCols('/stats/daily')
        }
    }

    handleSelection = async (e) => {
        
        var sel = e.target.value

        var results = await updateData(sel)

        console.log('new')
        console.log(sel)
        console.log(results)

        const cols = updateCols(sel)
        console.log('WORKING!!!!!!')
        this.setState({ selection: sel, data: results, column: cols })
        console.log('WORKING2!!!!!!')

    }

    render() {
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
                {this.state.selection}

                <div>
                    <h1 id='title'>React Dynamic Table</h1>
                    <Table
                        selection={this.state.selection}
                        data={this.state.data}
                        column={this.state.column}
                    />
                </div>
            </div>

        );
    }
}

export default App;
