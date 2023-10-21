export default function checkInteger(number){
    const integerPattern = /^-?\d+$/;
    return integerPattern.test(number);
}