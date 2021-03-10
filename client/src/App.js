import React from 'react';
//import Table from './Components/Table'
//import { Graph } from './Components/Graph';
//import { Map } from './Components/Map';
import { updateData } from './endpoints'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: '/stats/daily',
            data: ''
        }
    }

    handleSelection = async (e) => {
        var sel = e.target.value
        var results = await updateData(sel)

        console.log('new')
        console.log(sel)
        console.log(results)

        this.setState({ selection: sel, data: results })

    }

    render() {
        return (
            <div>
                <select
                    value={this.state.selection}
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
                    
                </div>
            </div>

        );
    }
}

export default App;
