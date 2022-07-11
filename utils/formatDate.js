import dateFormat from "dateformat";

export default function formatDate(timestamp, onlyDate) {
    // const d = timestamp.toDate()
    const now = new Date(timestamp)

    if(onlyDate) {
        return dateFormat(now, "dd-mm-yyyy")
    }
    return dateFormat(now, "dd-mmm-yyyy, h:MM TT")
    // return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

