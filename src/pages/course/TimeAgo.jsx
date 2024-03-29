const periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
};

export default function TimeAgo(timeCreated) {
    function formatTime() {
        var diff = Date.now() - timeCreated;

        if (diff > periods.month) {
            // it was at least a month ago
            return Math.floor(diff / periods.month) + "m";
        } else if (diff > periods.week) {
            return Math.floor(diff / periods.week) + "w";
        } else if (diff > periods.day) {
            return Math.floor(diff / periods.day) + "d";
        } else if (diff > periods.hour) {
            return Math.floor(diff / periods.hour) + "h";
        } else if (diff > periods.minute) {
            return Math.floor(diff / periods.minute) + "m";
        }
        return "Just now";
    }

    return formatTime();
}
