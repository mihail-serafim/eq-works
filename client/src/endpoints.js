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

export { updateData }