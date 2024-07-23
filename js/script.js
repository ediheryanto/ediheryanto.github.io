function toggleOptions() {
    var alergiYa = document.getElementById('alergi_ya').checked;
    var additionalOptions = document.getElementById('additional_options');
    var textFieldContainer = document.getElementById('text_field_container');
    var alergiText = document.getElementById('alergi_text');

    if (alergiYa) {
        additionalOptions.classList.remove('hidden');
        alergiText.placeholder = "Tuliskan alergi..."; // Tampilkan placeholder untuk alergi
    } else {
        additionalOptions.classList.add('hidden');
        textFieldContainer.classList.add('hidden');
        document.getElementById('alergi_obat').checked = false;
        document.getElementById('alergi_makanan').checked = false;
    }
}

function showTextField() {
    var alergiObat = document.getElementById('alergi_obat').checked;
    var alergiMakanan = document.getElementById('alergi_makanan').checked;
    var textFieldContainer = document.getElementById('text_field_container');

    if (alergiObat || alergiMakanan) {
        textFieldContainer.classList.remove('hidden');
    } else {
        textFieldContainer.classList.add('hidden');
    }
}
// Calculate GCS
function calculateGCS() {
var eye = parseInt(document.getElementById('eye').value);
var verbal = parseInt(document.getElementById('verbal').value);
var motor = parseInt(document.getElementById('motor').value);
var errorMessage = document.getElementById('error-message');

errorMessage.textContent = '';

var eyeInput = document.getElementById('eye');
var verbalInput = document.getElementById('verbal');
var motorInput = document.getElementById('motor');

eyeInput.classList.remove('invalid-input');
verbalInput.classList.remove('invalid-input');
motorInput.classList.remove('invalid-input');

if ((eye >= 1 && eye <= 4) && (verbal >= 1 && verbal <= 5) && (motor >= 1 && motor <= 6)) {
    document.getElementById('totalGCS').value = eye + verbal + motor;
} else {
    document.getElementById('totalGCS').value = '';
    if (eye < 1 || eye > 4) {
        errorMessage.textContent += 'Eye harus antara 1 - 4 ';
        eyeInput.classList.add('invalid-input');
    }
    if (verbal < 1 || verbal > 5) {
        errorMessage.textContent += 'Verbal harus antara 1- 5 ';
        verbalInput.classList.add('invalid-input');
    }
    if (motor < 1 || motor > 6) {
        errorMessage.textContent += 'Motorik harus antara 1-6 ';
        motorInput.classList.add('invalid-input');
    }
}
updateEmergencyStatus();
}

document.getElementById('eye').addEventListener('input', calculateGCS);
document.getElementById('verbal').addEventListener('input', calculateGCS);
document.getElementById('motor').addEventListener('input', calculateGCS);

// Calculate MAP
function calculateMAP() {
var systolic = parseFloat(document.getElementById('systolic').value);
var diastolic = parseFloat(document.getElementById('diastolic').value);
var errorMessage = document.getElementById('error-message');

errorMessage.textContent = '';

if (!isNaN(systolic) && !isNaN(diastolic)) {
var map = ((2 * diastolic) + systolic) / 3;
document.getElementById('map').value = Math.round(map); // Membulatkan ke bilangan bulat
} else {
document.getElementById('map').value = '';
errorMessage.textContent = 'Inputan pada MAP tidak valid.';
}
}
// Calculate BMI
function calculateBMI() {
var weight = parseFloat(document.getElementById('weight').value);
var height = parseFloat(document.getElementById('height').value);
var errorMessage = document.getElementById('error-message');

errorMessage.textContent = '';

if (!isNaN(weight) && !isNaN(height) && height > 0) {
    var bmi = weight / ((height / 100) * (height / 100));
    document.getElementById('bmi').value = bmi.toFixed(2);
} else {
    document.getElementById('bmi').value = '';
    errorMessage.textContent = 'Inputan pada BMI tidak valid.';
}
}

document.addEventListener('DOMContentLoaded', function() {
clearCalculations();
var inputs = document.querySelectorAll('.input-text');
inputs.forEach(input => {
    input.addEventListener('input', calculateGCS);
});
});

// Clear calculations on input clear
function clearCalculations() {
var inputs = document.querySelectorAll('.input-text');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value === '') {
            calculateMAP();
            calculateBMI();
            calculateGCS();
        }
    });
});
}

// Update Emergency Status
function updateEmergencyStatus() {
var emergencyStatusCell = document.querySelector('.status-emergency');
emergencyStatusCell.className = 'status-emergency';
emergencyStatusCell.textContent.colo = 'TIPE EMERGENCY'; // Set default text
emergencyStatusCell.style.backgroundColor = ''; // Set default background color

const priorityLevels = {
    'RESUSITASI': 1,
    'EMERGENCY': 2,
    'URGENT': 3,
    'NON URGENT': 4,
    'FALSE EMERGENCY': 5
};

const priorityColors = {
    1: 'red',
    2: 'red',
    3: 'yellow',
    4: 'green',
    5: 'white'
};

const priorityTexts = {
    1: 'RESUSITASI',
    2: 'EMERGENCY',
    3: 'URGENT',
    4: 'NON URGENT',
    5: 'FALSE EMERGENCY'
};

var checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
var highestPriority = 5; // Default to lowest priority

checkedCheckboxes.forEach(function(checkbox) {
    var statusId = checkbox.closest('td').getAttribute('data-id');
    if (priorityLevels[statusId] < highestPriority) {
        highestPriority = priorityLevels[statusId];
    }
});

if (checkedCheckboxes.length > 0) {
    emergencyStatusCell.classList.add(priorityTexts[highestPriority].toLowerCase().replace(/ /g, '-'));
    emergencyStatusCell.textContent = priorityTexts[highestPriority];
    emergencyStatusCell.style.backgroundColor = priorityColors[highestPriority];
}
}

document.addEventListener('DOMContentLoaded', function() {
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', updateEmergencyStatus);
});
updateEmergencyStatus();
});
