function get_date() {
    const today = new Date()
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    return today.toLocaleDateString('en-US', options)
}

function get_day() {
    const today = new Date()
    const options = {
        weekday: 'long'
    }
    return today.toLocaleDateString('en-US', options)
}

module.exports.get_date = get_date
module.exports.get_day = get_day
