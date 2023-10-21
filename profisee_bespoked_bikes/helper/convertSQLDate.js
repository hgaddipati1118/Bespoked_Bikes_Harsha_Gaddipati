export default function convertDate(dateString){
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString.split("T")[0]);
  return date.toLocaleDateString('en-US', options);
}