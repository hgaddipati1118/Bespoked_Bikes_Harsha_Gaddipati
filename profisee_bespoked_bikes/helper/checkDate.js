export default function checkDate(dateString){
        // Regular expression pattern to match the SQL date format
        const sqlDateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
        console.log("GHHH")
        if (!sqlDateFormatPattern.test(dateString)) {
          // If the string does not match the pattern, it's not a valid SQL date format
          return false;
        }
        console.log("GHHH")
        // Parse the date and check if it's a valid date
        const parsedDate = new Date(dateString);
        console.log(parsedDate.getTime());
        return !isNaN(parsedDate.getTime());
}