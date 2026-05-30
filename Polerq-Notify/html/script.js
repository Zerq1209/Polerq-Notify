const container = document.getElementById("notification-container");

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function normalizeType(type) {
  const t = String(type || "info").toLowerCase();

  if (t === "success" || t === "onay" || t === "ok" || t === "yes") return "success";
  if (t === "warning" || t === "uyarı" || t === "uyari" || t === "warn") return "warning";
  if (t === "error" || t === "red" || t === "hata" || t === "fail") return "error";

  return "info";
}

function getTypeLabel(type) {
  if (type === "success") return "ONAY";
  if (type === "warning") return "UYARI";
  if (type === "error") return "RED";
  return "BİLGİ";
}

function getIconSvg(type) {
  if (type === "success") {
    return `
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm4.3 8.3-4.8 5a1 1 0 0 1-1.44.02l-2.4-2.4a1 1 0 1 1 1.41-1.41l1.68 1.68 4.08-4.24a1 1 0 0 1 1.47 1.35Z"/>
      </svg>
    `;
  }

  if (type === "warning") {
    return `
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1.98 21h20.04a1 1 0 0 0 .86-1.5L12.86 2.48a1 1 0 0 0-1.72 0L1.12 19.5A1 1 0 0 0 1.98 21ZM12 8a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm0 8.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"/>
      </svg>
    `;
  }

  if (type === "error") {
    return `
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm3.3 12.3a1 1 0 0 1-1.4 1.4L12 13.4l-1.9 1.9a1 1 0 0 1-1.4-1.4l1.9-1.9-1.9-1.9a1 1 0 0 1 1.4-1.4l1.9 1.9 1.9-1.9a1 1 0 0 1 1.4 1.4L13.4 12.3l1.9 1.9Z"/>
      </svg>
    `;
  }

  return `
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm1.1-7.75-.9.92V11h-2V9.5a1 1 0 0 1 .29-.71l1.2-1.2a1.4 1.4 0 1 0-2.39-1 1 1 0 0 1-2 0 3.4 3.4 0 1 1 5.8 2.46Z"/>
    </svg>
  `;
}

async function playNotificationSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      await ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    const notes = {
      success: [523.25, 659.25, 783.99],
      warning: [392.0, 523.25],
      error: [220.0, 180.0]
    };

    const sequence = notes[type] || [440.0, 554.37];

    sequence.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = type === "error" ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now + index * 0.09);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now + index * 0.09);

      const start = now + index * 0.09;
      const end = start + 0.14;

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(end + 0.01);
    });
  } catch (e) {
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = String(text);
  return div.innerHTML;
}

function createNotification(data) {
  const type = normalizeType(data.type);
  const title = data.title || getTypeLabel(type);
  const message = data.message || "";
  const duration = Number(data.duration) || 3500;

  playNotificationSound(type);

  const element = document.createElement("div");
  element.className = `notification ${type}`;

  element.innerHTML = `
    <div class="notification-card">
      <div class="header">
        <div class="header-left">
          <div class="icon-wrap">
            ${getIconSvg(type)}
          </div>
          <div class="title">${escapeHtml(title)}</div>
        </div>
        <div class="type">${getTypeLabel(type)}</div>
      </div>
      <div class="message">${escapeHtml(message)}</div>
      <div class="progress">
        <div class="progress-bar" style="animation-duration: ${duration}ms"></div>
      </div>
    </div>
  `;

  container.appendChild(element);

  setTimeout(() => {
    element.classList.add("hide");
    setTimeout(() => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 250);
  }, duration);
}

window.addEventListener("message", (event) => {
  const data = event.data;
  if (data && data.action === "showNotification") {
    createNotification(data.notification || {});
  }
});