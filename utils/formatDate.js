import dateFormat from "dateformat";

export default function formatDate(timestamp, onlyDate) {
    // const d = timestamp.toDate()
    const now = new Date(timestamp)

    if(onlyDate) {
        return dateFormat(now, "dd-mm-yyyy")
    }
    return dateFormat(now, "ddd, mmm, h:MM tt")
    // return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

