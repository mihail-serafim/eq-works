// endpoints
async function updatePOI() {
    const res = await fetch("/poi", { method: "GET" })

    let data = await res.json()

    return data
}

async function updateHourlyStats() {
    const res = await fetch("/stats/hourly", { method: "GET" })

    let data = await res.json()

    return data
}

async function updateDailyStats() {
    const res = await fetch("/stats/daily", { method: "GET" })

    let data = res.json()
    return data
}

async function updateHourlyEvents() {
    const res = await fetch("/events/hourly", { method: "GET" })

    let data = await res.json()

    return data
}

async function updateDailyEvents() {
    const res = await fetch("/events/daily", { method: "GET" })

    let data = await res.json()

    return data
}


// handlers
const updateData = async (selection) => {
    if (selection == '/stats/daily') {
        var results = await updateDailyStats();
    }
    else if (selection == '/stats/hourly') {
        var results = await updateHourlyStats();
    }
    else if (selection == '/events/hourly') {
        var results = await updateHourlyEvents();
    }
    else if (selection == '/events/daily') {
        var results = await updateDailyEvents();
    }
    else if (selection == '/poi') {
        var results = await updatePOI();
    }
    else {
        var results = ''
    }

    return results
}

const updateCols = (sel) => {
    var cols = [
        {
            Header: 'Date',
            accessor: 'date', // accessor is the "key" in the data
        },
        {
            Header: 'Clicks',
            accessor: 'clicks',
        },
        {
            Header: 'Impressions',
            accessor: 'impressions',
        },
        {
            Header: 'Revenue',
            accessor: 'revenue',
        }
    ]

    if (sel == '/stats/daily') {
        cols =
            [
                {
                    Header: 'Date',
                    accessor: 'date', // accessor is the "key" in the data
                },
                {
                    Header: 'Clicks',
                    accessor: 'clicks',
                },
                {
                    Header: 'Impressions',
                    accessor: 'impressions',
                },
                {
                    Header: 'Revenue',
                    accessor: 'revenue',
                }
            ]
    }
    else if (sel == '/stats/hourly') {
        cols =
            [
                {
                    Header: 'Date',
                    accessor: 'date', // accessor is the "key" in the data
                },
                {
                    Header: 'Hour',
                    accessor: 'hour',
                },
                {
                    Header: 'Impressions',
                    accessor: 'impressions',
                },
                {
                    Header: 'Revenue',
                    accessor: 'revenue',
                }
            ]

    }
    else if (sel == '/events/hourly') {
        cols =
            [
                {
                    Header: 'Date',
                    accessor: 'date', // accessor is the "key" in the data
                },
                {
                    Header: 'Hour',
                    accessor: 'hour',
                },
                {
                    Header: 'Events',
                    accessor: 'events',
                }
            ]

    }
    else if (sel == '/events/daily') {
        cols =
            [
                {
                    Header: 'Date',
                    accessor: 'date', // accessor is the "key" in the data
                },
                {
                    Header: 'Events',
                    accessor: 'events',
                }
            ]

    }
    else if (sel == '/poi') {
        cols =
            [
                {
                    Header: 'ID',
                    accessor: 'poi_id', // accessor is the "key" in the data
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Latitude',
                    accessor: 'lat',
                },
                {
                    Header: 'Longitude',
                    accessor: 'lon',
                }
            ]

    }
    return cols 
}

export { updateData, updateCols }