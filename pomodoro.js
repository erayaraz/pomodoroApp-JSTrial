// Pomodoro Saati değişkenleri
let workDuration = 25 * 60; // Çalışma süresi (saniye cinsinden)
let breakDuration = 5 * 60; // Mola süresi (saniye cinsinden)
let timerInterval; // setInterval() fonksiyonunu tutacak değişken
let isWorking = true; // Şu anda çalışma süresinde miyiz?

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// Zamanı biçimlendiren yardımcı fonksiyon
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Saati başlatan fonksiyon
function startTimer() {
  if (isWorking) {
    timerDisplay.textContent = formatTime(workDuration);
  } else {
    timerDisplay.textContent = formatTime(breakDuration);
  }

  timerInterval = setInterval(updateTimer, 1000);
  startBtn.disabled = true;
}

// Saati güncelleyen fonksiyon
function updateTimer() {
  if (isWorking) {
    workDuration--;
    timerDisplay.textContent = formatTime(workDuration);

    if (workDuration === 300) {
        showPopup("5 dakika kaldı");
    }


    if (workDuration === 0) {
      clearInterval(timerInterval);
      isWorking = false;
      alert("Çalışma süresi bitti. Mola zamanı!");
      startBtn.disabled = false;
    }
  } else {
    breakDuration--;
    timerDisplay.textContent = formatTime(breakDuration);

    if (breakDuration === 0) {
      clearInterval(timerInterval);
      isWorking = true;
      alert("Mola süresi bitti. Çalışma zamanı!");
      startBtn.disabled = false;
    }
  }
}

// Saati sıfırlayan fonksiyon
function resetTimer() {
  clearInterval(timerInterval);
  workDuration = 25 * 60;
  breakDuration = 5 * 60;
  isWorking = true;
  timerDisplay.textContent = formatTime(workDuration);
  startBtn.disabled = false;
}

function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    popupContent.textContent = message;
    popup.style.display = "block";

    setTimeout(function () {
        popup.style.display = "none";
    }, 5000); // 5 saniye sonra pop-up'ı gizle
}

function hidePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Başlat ve sıfırla düğmelerine olay dinleyiciler ekleme
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

// Başlangıçta saati ayarla
timerDisplay.textContent = formatTime(workDuration);
