// script.js
document.addEventListener('DOMContentLoaded', function() {
    const consulatePanel = document.getElementById('consulates-panel');
    const casPanel = document.getElementById('cas-offices-panel');
    const monthSelect = document.getElementById('month-selection');
    const combinationSelect = document.getElementById('combination-selection');
    const costDisplay = document.getElementById('calculated-cost');

    function updateCostCalculation() {
        const selectedConsulates = consulatePanel.querySelectorAll('.selected').length;
        const selectedCAS = casPanel.querySelectorAll('.selected').length;
        const monthDifference = getMonthDifference(monthSelect.value);
        const combinations = combinationSelect.value === 'yes' ? selectedConsulates * selectedCAS : 0;
        
        let cost = calculateCost(selectedConsulates, selectedCAS, monthDifference, combinations);
        costDisplay.textContent = 'Calculated Cost: $' + cost;
    }

    function calculateCost(B1, B2, B3, combinations) {
        if (B1 === 0 || B2 === 0) return 0;
        let cost = (250 / B1) + (200 / B2) - (40 * B3) - (5 * combinations) + 1800;
        return 50 * Math.round(cost / 50);
    }

    function getMonthDifference(targetMonth) {
        const monthMapping = { 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12 };
        const currentMonth = new Date().getMonth() + 1;
        return Math.max(0, monthMapping[targetMonth] - currentMonth);
    }

    document.querySelectorAll('.selectable').forEach(selectable => {
        selectable.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateCostCalculation();
        });
    });

    monthSelect.addEventListener('change', updateCostCalculation);
    combinationSelect.addEventListener('change', updateCostCalculation);
});
