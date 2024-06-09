function calculateSquare() {
    var number = $('#numberInput').val();
    if (!number.trim()) {
        alert("Будь ласка, введіть число.");
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/calculate',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ number: number }),
        success: function(response) {
            $('#result').text("Квадрат числа " + number + " дорівнює " + response.square);
        },
        error: function(xhr, status, error) {
            console.error('Помилка при виконанні запиту:', error);
        }
    });
}
