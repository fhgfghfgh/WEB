$(document).ready(function() {
    let timer;
    let timeLeft = 60;
    let currentNumber = 1;
    let attempt = 0;
    let results = [];

    function startTimer() {
        timeLeft = 60;
        $('#timer').text(`Час: ${timeLeft}`);
        timer = setInterval(function() {
            timeLeft--;
            $('#timer').text(`Час: ${timeLeft}`);
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Час вийшов! Гра закінчена.");
                saveResult(false);
                resetGame();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function generateGameField() {
        let numbers = Array.from({ length: 20 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        $('#game-field').empty();
        numbers.forEach(number => {
            let size = Math.floor(Math.random() * 5) + 16; // Random font size between 16px and 20px
            let color = generateRandomColor();
            let div = $('<div></div>').text(number).css({
                'font-size': `${size}px`,
                'color': color
            }).data('number', number);
            $('#game-field').append(div);
        });
    }

    function resetGame() {
        currentNumber = 1;
        generateGameField();
        startTimer();
    }

    function saveResult(success) {
        attempt++;
        results.push({ attempt, time: 60 - timeLeft });
        updateResultTable();
    }

    function updateResultTable() {
        let tbody = $('#result-table tbody');
        tbody.empty();
        results.forEach(result => {
            let row = $('<tr></tr>');
            row.append(`<td>${result.attempt}</td>`);
            row.append(`<td>${result.time}</td>`);
            tbody.append(row);
        });
    }

    $('#start-game').click(function() {
        $('#main-page').hide();
        $('#game-page').show();
        resetGame();
    });

    $('#restart-game').click(function() {
        resetGame();
    });

    $('#game-field').on('click', 'div', function() {
        let number = $(this).data('number');
        if (number === currentNumber) {
            $(this).addClass('selected');
            currentNumber++;
            if (currentNumber > 20) {
                stopTimer();
                alert("Вітаємо! Ви успішно завершили гру.");
                saveResult(true);
                resetGame();
            }
        } else {
            $(this).addClass('wrong');
            alert("Не вірна цифра. Спробуйте ще раз.");
            $(this).removeClass('wrong');
        }
    });
});