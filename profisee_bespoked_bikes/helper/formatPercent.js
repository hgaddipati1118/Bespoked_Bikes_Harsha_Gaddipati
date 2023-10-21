export default function formatPercent(decimal) {
    const percent = (decimal).toFixed(2); // Convert to a percentage with two decimal places
    return `${percent}%`;
}