function buildEnergyChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [
        {
          label: 'Chất phản ứng',
          data: [10, 12, 16, 22, 30, 42, 58, 76, 90, 96, 100],
          borderColor: '#67e8f9',
          backgroundColor: 'rgba(103, 232, 249, 0.12)',
          borderWidth: 3,
          pointRadius: 0,
          fill: true,
          tension: 0.35
        },
        {
          label: 'Sản phẩm',
          data: [10, 12, 13, 15, 17, 18, 19, 18, 17, 16, 15],
          borderColor: '#7ef9d6',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.25
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#e5eefc' }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tiến trình phản ứng',
            color: '#e5eefc'
          },
          ticks: { color: '#e5eefc' },
          grid: { color: 'rgba(148, 163, 184, 0.12)' }
        },
        y: {
          title: {
            display: true,
            text: 'Năng lượng',
            color: '#e5eefc'
          },
          ticks: { color: '#e5eefc' },
          grid: { color: 'rgba(148, 163, 184, 0.12)' }
        }
      }
    }
  });
}

function buildCatalysisChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  new Chart(ctx, {
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
          fill: false,
          tension: 0.35
        },
        {
          label: 'Có xúc tác',
          data: [8, 9, 10, 13, 18, 25, 32, 40, 51, 62, 74],
          borderColor: '#67e8f9',
          borderWidth: 3,
          pointRadius: 0,
          fill: false,
          tension: 0.35
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#e5eefc' }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tiến trình phản ứng',
            color: '#e5eefc'
          },
          ticks: { color: '#e5eefc' },
          grid: { color: 'rgba(148, 163, 184, 0.12)' }
        },
        y: {
          title: {
            display: true,
            text: 'Năng lượng',
            color: '#e5eefc'
          },
          ticks: { color: '#e5eefc' },
          grid: { color: 'rgba(148, 163, 184, 0.12)' }
        }
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  buildEnergyChart('energyChart');
  buildCatalysisChart('catalysisChart');
});

























































