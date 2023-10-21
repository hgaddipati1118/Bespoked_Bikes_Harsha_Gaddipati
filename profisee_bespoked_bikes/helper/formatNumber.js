export default function formatNumber(num) {
    const digits = new String(num);
    const areaCode = digits.substring(0, 3);
    const firstPart = digits.substring(3, 6);
    const secondPart = digits.substring(6, 10);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }