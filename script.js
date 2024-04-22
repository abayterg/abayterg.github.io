// script.js
document.addEventListener('DOMContentLoaded', function() {
    const consulatePanel = document.getElementById('consulates-panel');
    const casPanel = document.getElementById('cas-offices-panel');
    const monthSelect = document.getElementById('month-selection');
    const combinationSelect = document.getElementById('combination-selection');
    const peopleCountSelect = document.getElementById('people-count');
    const managerCodeInput = document.getElementById('manager-code');
    const costDisplay = document.getElementById('calculated-cost');

    function updateCostCalculation() {
        const selectedConsulates = consulatePanel.querySelectorAll('.selected').length;
        const selectedCAS = casPanel.querySelectorAll('.selected').length;
        const monthDifference = getMonthDifference(monthSelect.value);
        const combinations = combinationSelect.value === 'yes' ? selectedConsulates * selectedCAS : 0;
        const peopleCount = peopleCountSelect.value;
        const managerCode = managerCodeInput.value.trim();
        
        let cost = calculateCost(selectedConsulates, selectedCAS, monthDifference, combinations, peopleCount, managerCode);
        costDisplay.textContent = 'Calculated Cost: $' + cost;
    }

    function calculateCost(B1, B2, B3, combinations, peopleCount, managerCode) {
        if (B1 === 0 || B2 === 0) return 0;
        let baseCost = (250 / B1) + (200 / B2) - (40 * B3) - (5 * combinations) + 1800;
        let discount = 0;

        // Discounts based on people count
        switch(peopleCount) {
            case '1': discount += 0; break; // No discount
            case '2': discount += 5; break;  // 5% discount
            case '3': discount += 10; break; // 10% discount
            case '4': discount += 15; break; // 15% discount
            case '5+': discount += 20; break; // 20% discount
        }

        // Additional discount for specific manager code
        if (managerCode === 'SOYGESTORVISAHUNTER') {
            discount += 10; // Additional 10% discount
        }

        // Apply discounts
        baseCost *= (1 - discount / 100);

        return 50 * Math.round(baseCost / 50);
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
    peopleCountSelect.addEventListener('change', updateCostCalculation);
    managerCodeInput.addEventListener('input', updateCostCalculation);
});
