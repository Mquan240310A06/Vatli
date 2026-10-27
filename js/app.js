const slides = [...document.querySelectorAll('.slide')];
const totalSlides = slides.length;
let currentSlide = 0;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slide-indicator');
const fullscreenBtn = document.getElementById('fullscreenBtn');

function updateSlideUI() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  slideIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
  prevBtn.disabled = currentSlide === 0;
  prevBtn.style.opacity = currentSlide === 0 ? '0.45' : '1';
  nextBtn.textContent = currentSlide === totalSlides - 1 ? 'Kết thúc' : 'Tiếp';

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise();
  }
}

function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;
  currentSlide = index;
  updateSlideUI();
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  } else {
    goToSlide(0);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') {
    goToSlide(currentSlide + 1);
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    goToSlide(currentSlide - 1);
  }
});

fullscreenBtn.addEventListener('click', async () => {
  const root = document.documentElement;

  if (!document.fullscreenElement) {
    await root.requestFullscreen().catch(() => {});
    fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    await document.exitFullscreen().catch(() => {});
    fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

document.addEventListener('fullscreenchange', () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenBtn.innerHTML = isFullscreen
    ? '<i class="fa-solid fa-compress"></i>'
    : '<i class="fa-solid fa-expand"></i>';
});

const calcMode = document.getElementById('calcMode');
const t1Input = document.getElementById('t1Input');
const t2Input = document.getElementById('t2Input');
const eaInput = document.getElementById('eaInput');
const ratioInput = document.getElementById('ratioInput');
const calcResult = document.getElementById('calcResult');
const eaFieldWrap = document.getElementById('eaFieldWrap');
const ratioFieldWrap = document.getElementById('ratioFieldWrap');

function renderCalcFields() {
  const mode = calcMode.value;

  if (mode === 'rateRatio') {
    eaFieldWrap.classList.remove('hidden');
    ratioFieldWrap.classList.add('hidden');
  } else {
    eaFieldWrap.classList.add('hidden');
    ratioFieldWrap.classList.remove('hidden');
  }
}

calcMode.addEventListener('change', renderCalcFields);

function calculateRateRatio(T1, T2, EaKJ) {
  const R = 8.314;
  const EaJ = EaKJ * 1000;
  const numerator = EaJ / R;
  const diff = (1 / T1) - (1 / T2);
  return Math.exp(numerator * diff);
}

function calculateEaFromRatio(T1, T2, ratio) {
  const R = 8.314;
  const diff = (1 / T1) - (1 / T2);
  const EaJ = R * Math.log(ratio) / diff;
  return EaJ / 1000;
}

document.getElementById('calculateBtn').addEventListener('click', () => {
  const T1 = parseFloat(t1Input.value);
  const T2 = parseFloat(t2Input.value);

  if (!Number.isFinite(T1) || !Number.isFinite(T2) || T1 <= 0 || T2 <= 0) {
    calcResult.innerHTML = '<span style="color:#f87171">Vui lòng nhập nhiệt độ dương hợp lệ (K).</span>';
    return;
  }

  if (calcMode.value === 'rateRatio') {
    const Ea = parseFloat(eaInput.value);

    if (!Number.isFinite(Ea) || Ea <= 0) {
      calcResult.innerHTML = '<span style="color:#f87171">Vui lòng nhập năng lượng hoạt hóa dương (kJ/mol).</span>';
      return;
    }

    const ratio = calculateRateRatio(T1, T2, Ea);
    calcResult.innerHTML = `
      <strong>Kết quả:</strong><br>
      \(\frac{k_2}{k_1} = e^{\frac{E_a}{R}(\frac{1}{T_1}-\frac{1}{T_2})}\)<br>
      Với <span class="formula">T₁ = ${T1} K</span>, <span class="formula">T₂ = ${T2} K</span>,
      <span class="formula">Eₐ = ${Ea} kJ/mol</span><br>
      <span class="formula">\(\frac{k_2}{k_1} \approx ${ratio.toFixed(3)}\)</span>
    `;
  } else {
    const ratio = parseFloat(ratioInput.value);

    if (!Number.isFinite(ratio) || ratio <= 0) {
      calcResult.innerHTML = '<span style="color:#f87171">Vui lòng nhập tỉ số tốc độ dương.</span>';
      return;
    }

    const Ea = calculateEaFromRatio(T1, T2, ratio);
    calcResult.innerHTML = `
      <strong>Kết quả:</strong><br>
      \(E_a = R\frac{\ln(k_2/k_1)}{1/T_1 - 1/T_2}\)<br>
      Với <span class="formula">T₁ = ${T1} K</span>, <span class="formula">T₂ = ${T2} K</span>,
      <span class="formula">k₂/k₁ = ${ratio}</span><br>
      <span class="formula">\(E_a \approx ${Ea.toFixed(2)}\,kJ/mol\)</span>
    `;
  }

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise();
  }
});

function setupAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      const isOpen = target.classList.contains('open');

      target.classList.toggle('open', !isOpen);
      button.querySelector('i').style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
}

function setupQuiz() {
  document.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      const options = button.parentElement.querySelectorAll('.quiz-option');
      const isCorrect = button.dataset.correct === 'true';

      options.forEach((option) => {
        option.disabled = true;
        option.classList.remove('correct', 'incorrect');
      });

      if (isCorrect) {
        button.classList.add('correct');
      } else {
        button.classList.add('incorrect');
        options.forEach((option) => {
          if (option.dataset.correct === 'true') {
            option.classList.add('correct');
          }
        });
      }
    });
  });
}

function initCharts() {
  const energyCtx = document.getElementById('energyChart');
  if (energyCtx) {
    new Chart(energyCtx, {
      type: 'line',
      data: {
        labels: ['Tích cực', '4', '8', '12', '16', '20', '24', '28', '32', '36', '40'],
        datasets: [
          {
            label: 'Phản ứng không xúc tác',
            data: [7, 8, 11, 18, 28, 42, 62, 81, 88, 94, 100],
            borderColor: '#67e8f9',
            backgroundColor: 'rgba(103, 232, 249, 0.12)',
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.3,
            fill: true
          },
          {
            label: 'Sản phẩm',
            data: [7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
            borderColor: '#7ef9d6',
            borderDash: [8, 6],
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#dfeaf9' }
          },
          tooltip: { enabled: true }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiến trình phản ứng',
              color: '#dfeaf9'
            },
            ticks: { color: '#dfeaf9' },
            grid: { color: 'rgba(148, 163, 184, 0.12)' }
          },
          y: {
            title: {
              display: true,
              text: 'Năng lượng',
              color: '#dfeaf9'
            },
            ticks: { color: '#dfeaf9' },
            grid: { color: 'rgba(148, 163, 184, 0.12)' }
          }
        }
      }
    });
  }

  const catalysisCtx = document.getElementById('catalysisChart');
  if (catalysisCtx) {
    new Chart(catalysisCtx, {
      type: 'line',
      data: {
        labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
        datasets: [
          {
            label: 'Không xúc tác',
            data: [8, 9, 12, 18, 28, 46, 64, 81, 92, 97, 100],
            borderColor: '#fbbf24',
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.3,
            fill: false
          },
          {
            label: 'Có xúc tác',
            data: [8, 9, 10, 13, 18, 25, 32, 40, 51, 62, 74],
            borderColor: '#67e8f9',
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#dfeaf9' }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiến trình phản ứng',
              color: '#dfeaf9'
            },
            ticks: { color: '#dfeaf9' },
            grid: { color: 'rgba(148, 163, 184, 0.12)' }
          },
          y: {
            title: {
              display: true,
              text: 'Năng lượng',
              color: '#dfeaf9'
            },
            ticks: { color: '#dfeaf9' },
            grid: { color: 'rgba(148, 163, 184, 0.12)' }
          }
        }
      }
    });
  }
}

renderCalcFields();
updateSlideUI();
setupAccordions();
setupQuiz();
initCharts();

window.addEventListener('resize', () => {
  if (typeof Chart !== 'undefined' && Chart.instances) {
    Chart.instances.forEach((chart) => chart.resize());
  }
});




































































