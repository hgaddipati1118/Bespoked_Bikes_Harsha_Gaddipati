export default function check2DigitDecimal(number) {
    number = parseFloat(number);
    console.log(number.toString().split("."));

    return (number.toString().split(".").length <= 1 || number.toString().split(".")[1].length <= 2);
  }