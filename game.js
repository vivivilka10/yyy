let secretNumber = generateRandomNumber(); // Генерация случайного числа
    let remainingAttempts = 6;                 // Ограничиваем кол-во попыток
    let timerId;                               // Для управления таймером
    let timeLeft = 120;                         // Всего 60 секунд на игру

    // Основная функция для запуска таймера
    startTimer();

    // Генерация случайного числа от 1 до 100
    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Начало таймера
    function startTimer() {
        timerId = setInterval(() => {
            timeLeft--;
            document.getElementById("timeRemaining").textContent = timeLeft;
            
            if (timeLeft <= 0 || remainingAttempts <= 0) {
                endGame();
            }
        }, 1000);
    }

    // Обработка нажатия кнопки "Проверить"
    function checkGuess() {
        const inputValue = Number(document.getElementById("inputGuess").value);
        
        if (isNaN(inputValue) || inputValue < 1 || inputValue > 100) {
            alert("Введите правильное число от 1 до 100");
            return;
        }

        remainingAttempts--;
        document.getElementById("remainingAttempts").textContent = remainingAttempts;

        if (inputValue === secretNumber) {
            winGame();
        } else {
            showHint(inputValue);
        }
    }

    // Отображаем подсказку игроку
    function showHint(guess) {
        const resultDiv = document.getElementById("result");
        if (guess < secretNumber) {
            resultDiv.textContent = "Ваше число меньше загаданного!";
        } else {
            resultDiv.textContent = "Ваше число больше загаданного!";
        }
    }

    // Победа!
    function winGame() {
        clearInterval(timerId);
        alert("Победа! Вы угадали число " + secretNumber + ". Поздравляем!");
        restartGame();
    }

    // Проигрыш или конец времени
    function endGame() {
        clearInterval(timerId);
        alert("К сожалению, вы проиграли. Правильное число было " + secretNumber);
        restartGame();
    }

    // Перезапуск игры
    function restartGame() {
        secretNumber = generateRandomNumber();
        remainingAttempts = 6;
        timeLeft = 120;
        document.getElementById("remainingAttempts").textContent = remainingAttempts;
        document.getElementById("timeRemaining").textContent = timeLeft;
        document.getElementById("result").textContent = "";
        startTimer();
    }
