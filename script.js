// script.js
document.addEventListener('DOMContentLoaded', function() {
    const consulatePanel = document.getElementById('consulates-panel');
    const casPanel = document.getElementById('cas-offices-panel');
    const monthSelect = document.getElementById('month-selection');
    const peopleCountSelect = document.getElementById('people-count');
    const managerCodeInput = document.getElementById('manager-code');
    const costDisplay = document.getElementById('calculated-cost');

    function updateCostCalculation() {
        const selectedConsulates = consulatePanel.querySelectorAll('.selected').length;
        const selectedCAS = casPanel.querySelectorAll('.selected').length;
        const monthDifference = getMonthDifference(monthSelect.value);
        const peopleCount = peopleCountSelect.value;
        const managerCode = managerCodeInput.value.trim();
        
        let cost = calculateCost(selectedConsulates, selectedCAS, monthDifference, peopleCount, managerCode);
        costDisplay.textContent = 'Costo calculado por persona: $' + cost;
    }

    function calculateCost(B1, B2, B3, peopleCount, managerCode) {
        if (B1 === 0 || B2 === 0) return 0;
        let baseCost = (250 / B1) + (200 / B2) - (40 * B3) + 1800;
        let discount = 0;

        // Discounts based on people count
        switch(peopleCount) {
            case '1': discount += 0; break; // No discount
            case '2': discount += 20; break;  // 5% discount
            case '3': discount += 25; break; // 10% discount
            case '4': discount += 30; break; // 15% discount
        }
        
          // Apply discounts
        baseCost *= (1 - discount / 100);

        // Additional discount for specific manager code
        if (managerCode === 'VISAHUNTERGESTOR') {
           

            // Dynamic discount based on cost before manager code
            discount = baseCost < 1450 ? 35 : 45;
            baseCost *= (1 - discount / 100);
        }
        if (managerCode === 'GESTOR') {
           

            // Dynamic discount based on cost before manager code
            discount = baseCost < 1450 ? 25 : 30;
            baseCost *= (1 - discount / 100);
        }
        if (managerCode === 'PROMOABRIL2025') {
           

            // Dynamic discount based on cost before manager code
            discount = baseCost < 1450 ? 40 : 40;
            baseCost *= (1 - discount / 100);
        }        
        if (managerCode === 'VISAHUNTERCONSULAR') {
           

            // Dynamic discount based on cost before manager code
            discount = baseCost < 1450 ? 50 : 50;
            baseCost *= (1 - discount / 100);
        }  
        
      

        return 50 * Math.round(baseCost / 50);
    }

    function getMonthDifference(targetMonth) {
    const monthMapping = { 
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6, 
        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12 
    };
    const currentMonth = new Date().getMonth() + 1;
    const targetMonthNumber = monthMapping[targetMonth];

    // If the target month is smaller than the current month, it means it's in the next year
    if (targetMonthNumber < currentMonth) {
        return (12 - currentMonth + targetMonthNumber); // Remaining months in this year + target month in next year
    } else {
        return targetMonthNumber - currentMonth; // Target month is still in this year
    }
}


    document.querySelectorAll('.selectable').forEach(selectable => {
        selectable.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateCostCalculation();
        });
    });

    monthSelect.addEventListener('change', updateCostCalculation);
    peopleCountSelect.addEventListener('change', updateCostCalculation);
    managerCodeInput.addEventListener('input', updateCostCalculation);
});
