/**
 * Royal Islamic Wedding Website Interactivity
 * Abdul Razique Chauhan & Alisha Naz Wedding Celebration
 */

(function () {
  'use strict';

  // Flag JS active
  document.documentElement.classList.add('js');

  const config = window.WEDDING_CONFIG || {};
  let updatePetalPalette = null;

  // Eagerly preload and GPU-decode Dastaan-e-Ishq story images immediately for zero delay
  const preloadUrls = [
    'photos/story_1.jpg',
    'photos/story_2.jpg',
    'photos/story_3.jpg',
    'photos/story_4.jpg',
    'photos/story_5.jpg',
    'photos/bharat_lawns_map.jpg'
  ];
  preloadUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    if (img.decode) img.decode().catch(() => {});
  });

  /* =========================================================================
   * 1. ROYAL WEDDING SOUNDTRACK & LIVE ENSEMBLE (Dual Audio Engine)
   * High-fidelity recorded audio track with live celebratory synthesizer fallback
   * ========================================================================= */
  class WeddingAudioPlayer {
    constructor() {
      this.audioEl = document.getElementById('weddingAudio');
      this.ctx = null;
      this.isPlaying = false;
      this.timer = null;
      this.masterGain = null;
      this.useHtmlAudio = !!this.audioEl;
      this.initBtn();
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    initBtn() {
      const btn = document.getElementById('music');
      if (!btn) return;
      btn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      });
    }

    play() {
      this.isPlaying = true;
      const btn = document.getElementById('music');
      if (btn) {
        btn.classList.add('on');
        btn.setAttribute('aria-pressed', 'true');
      }

      // 1. Try playing high-fidelity recorded soundtrack first
      if (this.audioEl) {
        if (window.WEDDING_CONFIG && window.WEDDING_CONFIG.music && window.WEDDING_CONFIG.music.fileUrl) {
          if (!this.audioEl.src.endsWith(window.WEDDING_CONFIG.music.fileUrl)) {
            this.audioEl.src = window.WEDDING_CONFIG.music.fileUrl;
          }
        }
        const confVolume = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.music && window.WEDDING_CONFIG.music.volume) || 0.70;
        this.audioEl.volume = Math.max(0, Math.min(1, confVolume));
        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.useHtmlAudio = true;
          }).catch((err) => {
            console.log("Audio playback waiting for user tap:", err);
            this.isPlaying = false;
            const btn = document.getElementById('music');
            if (btn) {
              btn.classList.remove('on');
              btn.setAttribute('aria-pressed', 'false');
            }
          });
          return;
        }
      }

      this.stopLiveEnsemble();
    }

    pause() {
      this.isPlaying = false;
      const btn = document.getElementById('music');
      if (btn) {
        btn.classList.remove('on');
        btn.setAttribute('aria-pressed', 'false');
      }
      if (this.audioEl && !this.audioEl.paused) {
        this.audioEl.pause();
      }
      this.stopLiveEnsemble();
    }

    playLiveEnsemble() {
      if (!this.ctx) this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Festive tempo: 104 BPM (577ms per beat, 288ms per 8th note)
      const bpm = 104;
      const beatMs = (60 / bpm) * 1000;
      const eighthMs = beatMs / 2;

      // Raag Yaman / Bilawal Joyful Wedding Scale (D Major)
      // D4, E4, F#4, G4, A4, B4, C#5, D5, E5, F#5
      const scale = [293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 554.37, 587.33, 659.25, 739.99];

      // Uplifting Wedding Lead Melody
      const melody = [
        { note: 0, beats: 1 }, { note: 2, beats: 0.5 }, { note: 4, beats: 0.5 }, { note: 5, beats: 1.5 }, { note: 4, beats: 0.5 },
        { note: 2, beats: 1 }, { note: 3, beats: 0.5 }, { note: 4, beats: 0.5 }, { note: 7, beats: 1.5 }, { note: 6, beats: 0.5 },
        { note: 5, beats: 1 }, { note: 7, beats: 1 }, { note: 8, beats: 1.5 }, { note: 7, beats: 0.5 },
        { note: 5, beats: 1.5 }, { note: 4, beats: 0.5 }, { note: 3, beats: 1 }, { note: 2, beats: 1 },
        { note: 2, beats: 1 }, { note: 4, beats: 1 }, { note: 5, beats: 1.5 }, { note: 7, beats: 0.5 },
        { note: 9, beats: 1.5 }, { note: 8, beats: 0.5 }, { note: 7, beats: 1 }, { note: 5, beats: 1 },
        { note: 6, beats: 1 }, { note: 7, beats: 0.5 }, { note: 8, beats: 0.5 }, { note: 9, beats: 1.5 }, { note: 8, beats: 0.5 },
        { note: 7, beats: 3.5 }
      ];

      let step = 0;
      let melodyIdx = 0;
      let nextMelodyTime = 0;

      const tick = () => {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const eighth = step % 8;

        // 1. Tabla Bayan (Deep Bass) on beats 0, 4, and soft on 1, 5
        if (eighth === 0 || eighth === 4) {
          this.synthBayan(now, 110, 58, 0.28);
        } else if (eighth === 1 || eighth === 5) {
          this.synthBayan(now, 95, 55, 0.16);
        }

        // 2. Tabla Dayan (Sharp Rim Snap) on beats 0, 2, 3, 4, 6, 7
        if (eighth === 2 || eighth === 6) {
          this.synthDayan(now, 432, 0.16);
        } else if (eighth === 0 || eighth === 4) {
          this.synthDayan(now, 480, 0.12);
        } else if (eighth === 3 || eighth === 7) {
          this.synthDayan(now, 520, 0.08);
        }

        // 3. Shimmering Ghungroo / Manjira chime on offbeats
        if (eighth % 2 === 1) {
          this.synthChime(now, 6800, 0.04);
        }

        // 4. Santoor arpeggio plucks
        const santoorNote = scale[(step * 2) % scale.length];
        this.synthSantoor(now, santoorNote, 0.06);

        // 5. Shehnai / Flute Lead Melody
        if (step >= nextMelodyTime) {
          const item = melody[melodyIdx % melody.length];
          const freq = scale[item.note];
          const durSec = item.beats * (beatMs / 1000);
          this.synthShehnai(now, freq, durSec);
          nextMelodyTime = step + Math.round(item.beats * 2);
          melodyIdx++;
        }

        step++;
        this.timer = setTimeout(tick, eighthMs);
      };

      tick();
    }

    synthBayan(now, startF, endF, vol) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startF, now);
      osc.frequency.exponentialRampToValueAtTime(endF, now + 0.25);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    }

    synthDayan(now, freq, vol) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(6.0, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.2);
    }

    synthChime(now, freq, vol) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.1);
    }

    synthSantoor(now, freq, vol) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.28);
    }

    synthShehnai(now, freq, dur) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * 0.97, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.05);
      // Vibrato
      osc.frequency.exponentialRampToValueAtTime(freq * 1.012, now + dur * 0.6);
      osc.frequency.exponentialRampToValueAtTime(freq, now + dur);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + dur + 0.05);
    }

    stopLiveEnsemble() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }

  const audioPlayer = new WeddingAudioPlayer();

  /* =========================================================================
   * 2. OPENING 3D INVITATION BOOK ANIMATION
   * ========================================================================= */
  const scene = document.getElementById('scene');
  const book = document.getElementById('book');

  // Parallax tilt on book
  if (scene) {
    scene.classList.add('ready');

    window.addEventListener('mousemove', (e) => {
      if (scene.classList.contains('open')) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * -16;
      const wrap = document.querySelector('.bookwrap');
      if (wrap) {
        wrap.style.setProperty('--px', `${y}deg`);
        wrap.style.setProperty('--py', `${x}deg`);
      }
    });

    let hasOpened = false;
    const openInvitation = () => {
      if (hasOpened) return;
      hasOpened = true;

      // 1. Flip open book cover
      scene.classList.add('open');

      // Start music safely without blocking animation
      try {
        audioPlayer.play();
      } catch (err) {
        console.warn('Audio play on open error:', err);
      }

      // 2. Swoosh zoom in after cover opens
      setTimeout(() => {
        scene.classList.add('swoosh');
        document.body.classList.remove('locked');
        document.documentElement.classList.add('opened');

        // Reveal letter typewriter for couple's name
        revealCoupleNames();
        if (typeof updateScrollIndicator === 'function') {
          updateScrollIndicator();
        }
      }, 700);

      // 3. Remove scene overlay from view and deallocate 3D GPU layer
      setTimeout(() => {
        scene.classList.add('gone');
        scene.style.display = 'none';
      }, 1900);
    };

    if (book) {
      book.addEventListener('click', openInvitation);
      book.addEventListener('touchend', (e) => {
        e.preventDefault();
        openInvitation();
      }, { passive: false });
    }

    const bookWrap = document.querySelector('.bookwrap');
    if (bookWrap) {
      bookWrap.addEventListener('click', openInvitation);
      bookWrap.style.cursor = 'pointer';
    }

    const tapPrompt = document.querySelector('.tap');
    if (tapPrompt) {
      tapPrompt.addEventListener('click', openInvitation);
      tapPrompt.style.pointerEvents = 'auto';
      tapPrompt.style.cursor = 'pointer';
    }
  }

  function revealCoupleNames() {
    const chars = document.querySelectorAll('.name .ch');
    chars.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add('on');
      }, idx * 75 + 180);
    });
  }

  /* =========================================================================
   * 3. FALLING CHAMPAGNE & JASMINE PETALS (HTML5 Canvas)
   * ========================================================================= */
  const canvas = document.getElementById('petals');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    window.addEventListener('resize', () => {
      // Prevent mobile address bar collapse/expand from wiping the canvas context
      if (Math.abs(window.innerWidth - lastWidth) > 30 || Math.abs(window.innerHeight - lastHeight) > 150) {
        lastWidth = width = canvas.width = window.innerWidth;
        lastHeight = height = canvas.height = window.innerHeight;
      }
    }, { passive: true });

    const petalCount = window.innerWidth < 600 ? 18 : 30;
    const petals = [];

    // Theme-specific falling flower petals & starlight palettes
    const themePetalPalettes = {
      emerald: [
        { r: 46,  g: 204, b: 113, a: 0.85 }, // Vibrant emerald green leaf
        { r: 26,  g: 188, b: 156, a: 0.80 }, // Mint jade petal
        { r: 223, g: 183, b: 108, a: 0.85 }, // Shimmer antique gold
        { r: 241, g: 196, b: 15,  a: 0.80 }  // Radiant champagne gold
      ],
      sage: [
        { r: 46,  g: 204, b: 113, a: 0.85 },
        { r: 26,  g: 188, b: 156, a: 0.80 },
        { r: 223, g: 183, b: 108, a: 0.85 },
        { r: 241, g: 196, b: 15,  a: 0.80 }
      ],
      rose: [
        { r: 255, g: 117, b: 140, a: 0.90 }, // Vibrant rose petal pink
        { r: 232, g: 67,  b: 147, a: 0.85 }, // Deep rose
        { r: 139, g: 16,  b: 50,  a: 0.80 }, // Royal ruby wine
        { r: 212, g: 175, b: 55,  a: 0.82 }  // Gold sparkle
      ],
      marigold: [
        { r: 255, g: 121, b: 63,  a: 0.90 }, // Vibrant marigold orange
        { r: 255, g: 159, b: 26,  a: 0.88 }, // Amber saffron
        { r: 251, g: 197, b: 49,  a: 0.85 }, // Haldi golden yellow
        { r: 184, g: 58,  b: 4,   a: 0.80 }  // Terracotta flower
      ],
      midnight: [
        { r: 223, g: 183, b: 108, a: 0.92 }, // Starlight gold
        { r: 255, g: 255, b: 255, a: 0.90 }, // Diamond white starlight
        { r: 245, g: 205, b: 121, a: 0.85 }, // Glowing champagne spark
        { r: 112, g: 161, b: 255, a: 0.80 }  // Sapphire celestial ember
      ]
    };

    let currentPetalPalette = themePetalPalettes.marigold;

    updatePetalPalette = function (themeKey) {
      const k = themeKey === 'sage' ? 'emerald' : themeKey;
      currentPetalPalette = themePetalPalettes[k] || themePetalPalettes.marigold;
      petals.forEach((p) => {
        p.color = currentPetalPalette[Math.floor(Math.random() * currentPetalPalette.length)];
      });
    };

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -30;
        this.size = 11 + Math.random() * 14;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = 1.0 + Math.random() * 1.6;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = 0.02 + Math.random() * 0.03;
        this.color = currentPetalPalette[Math.floor(Math.random() * currentPetalPalette.length)];
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.03 + Math.random() * 0.02;
      }

      update(dt = 1) {
        this.y += this.vy * dt;
        this.wobble += this.wobbleSpeed * dt;
        this.x += (this.vx + Math.sin(this.wobble) * 0.8) * dt;
        this.rot += this.rotSpeed * dt;
        this.flip += this.flipSpeed * dt;

        if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.scale(Math.cos(this.flip), 1);

        const { r, g, b, a } = this.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.beginPath();
        // Delicate teardrop petal shape
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size * 0.9, this.size * 0.3, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.9, this.size * 0.3, -this.size * 0.8, -this.size * 0.8, 0, -this.size);
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    // Continuous delta-timed falling petals: totally unaffected by scroll velocity or frame timing
    let lastPetalTimestamp = performance.now();
    function renderPetals(timestamp) {
      requestAnimationFrame(renderPetals);

      if (document.hidden) {
        lastPetalTimestamp = timestamp;
        return;
      }

      const elapsed = timestamp - lastPetalTimestamp;
      lastPetalTimestamp = timestamp;
      const dt = Math.min(2.0, Math.max(0.5, elapsed / 16.67));

      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.update(dt);
        p.draw();
      }
    }
    requestAnimationFrame(renderPetals);
  }

  /* =========================================================================
   * 4. SAVE THE DATE: PULL-DOWN SILK TASSEL TO REVEAL SCROLL
   * ========================================================================= */
  const pullbox = document.getElementById('pullbox');
  const tassel = document.getElementById('tassel');
  const banner = document.getElementById('banner');
  const roller = document.getElementById('roller');
  const pulltip = document.getElementById('pulltip');
  const countBox = document.getElementById('countdown');

  let isRevealed = false;
  let isDragging = false;
  let startY = 0;
  let currentOpen = 0; // 0 to 1

  function setBannerOpen(progress) {
    currentOpen = Math.min(1, Math.max(0, progress));
    if (banner) banner.style.setProperty('--o', currentOpen);
    if (roller) roller.style.transform = `translateY(${currentOpen * 290}px)`;

    if (currentOpen >= 0.85 && !isRevealed) {
      triggerRevealComplete();
    }
  }

  function triggerRevealComplete() {
    isRevealed = true;
    setBannerOpen(1);
    if (pulltip) pulltip.style.display = 'none';
    const hand = document.querySelector('.pullbox .hand');
    if (hand) hand.classList.add('off');
    if (tassel) tassel.classList.remove('drag');
    if (countBox) countBox.classList.add('on');

    // Confetti celebration sparkle
    createCelebrationBurst(pullbox);
  }

  if (tassel) {
    const onStart = (e) => {
      if (isRevealed) return;
      isDragging = true;
      tassel.classList.add('drag');
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startY = clientY;
    };

    const onMove = (e) => {
      if (!isDragging || isRevealed) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const delta = clientY - startY;
      const progress = Math.max(0, delta / 180);
      setBannerOpen(progress);
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      if (!isRevealed) {
        if (currentOpen > 0.4) {
          triggerRevealComplete();
        } else {
          setBannerOpen(0);
        }
      }
    };

    tassel.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    tassel.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    tassel.addEventListener('click', () => {
      if (!isRevealed) triggerRevealComplete();
    });
  }

  function createCelebrationBurst(parent) {
    if (!parent) return;
    for (let i = 0; i < 24; i++) {
      const sparkle = document.createElement('i');
      sparkle.className = 'sparkle-burst';
      const angle = (i / 24) * Math.PI * 2;
      const dist = 50 + Math.random() * 80;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      sparkle.style.cssText = `
        position: absolute;
        left: 50%;
        top: 60%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${['#c59e53', '#e8d3a6', '#082f2b', '#d7b56d'][i % 4]};
        pointer-events: none;
        z-index: 20;
        transform: translate(-50%, -50%);
        transition: transform 0.8s cubic-bezier(.2,.8,.2,1), opacity 0.8s ease;
      `;
      parent.appendChild(sparkle);

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${0.4 + Math.random() * 0.8})`;
        sparkle.style.opacity = '0';
      });

      setTimeout(() => sparkle.remove(), 850);
    }
  }

  /* =========================================================================
   * 5. REAL-TIME WEDDING COUNTDOWN TIMER
   * ========================================================================= */
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  const targetDate = new Date(config.weddingDate || '2026-12-27T18:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =========================================================================
   * 6. WEDDING FESTIVITIES 3D CAROUSEL (#celebrate)
   * 3 Canonical Events: Barat, Nikah, Dawat-e-Walima
   * Smooth 3D spherical carousel swipe animation (matching Dastaan-e-Ishq)
   * ========================================================================= */
  const evCards = document.querySelectorAll('.ev-card');
  const evDots = document.querySelectorAll('#evdots i');
  let currentEvent = 0;
  let evAutoTimer = null;
  let isEvInView = false;

  function setEventActive(index) {
    if (!evCards.length) return;
    currentEvent = (index + evCards.length) % evCards.length;

    evCards.forEach((card, i) => {
      let offset = i - currentEvent;
      // Circular offset so other cards flank left & right
      if (offset > evCards.length / 2) offset -= evCards.length;
      if (offset < -evCards.length / 2) offset += evCards.length;

      const angle = offset * 42;
      const tz = Math.cos(angle * Math.PI / 180) * 120 - 120;
      const tx = Math.sin(angle * Math.PI / 180) * 185;
      const scale = offset === 0 ? 1 : 0.86;
      const opacity = Math.abs(offset) > 2 ? 0 : offset === 0 ? 1 : 0.65;

      card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${-angle}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.pointerEvents = offset === 0 ? 'auto' : 'auto';
      card.style.zIndex = 10 - Math.abs(offset);
      card.style.cursor = offset === 0 ? 'default' : 'pointer';
    });

    evDots.forEach((dot, i) => {
      dot.classList.toggle('on', i === currentEvent);
    });
  }

  function startEvAutoScroll() {
    stopEvAutoScroll();
    evAutoTimer = setInterval(() => {
      if (isEvInView && !document.hidden) {
        // Auto-scroll forward: brings the right-side event card into center view
        setEventActive(currentEvent + 1);
      }
    }, 4200);
  }

  function stopEvAutoScroll() {
    if (evAutoTimer) {
      clearInterval(evAutoTimer);
      evAutoTimer = null;
    }
  }

  function resetEvAutoScroll() {
    stopEvAutoScroll();
    setTimeout(startEvAutoScroll, 6000);
  }

  if (evCards.length > 0) {
    // 1. Start strictly on Rawaangi-e-Barat (Event Index 0)
    setEventActive(0);

    evCards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        if (i !== currentEvent) {
          e.stopPropagation();
          setEventActive(i);
          resetEvAutoScroll();
        }
      });
    });

    evDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        setEventActive(i);
        resetEvAutoScroll();
      });
    });

    const evSphere = document.querySelector('.evsphere');
    if (evSphere) {
      let touchStartX = 0;
      let isDragging = false;

      evSphere.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopEvAutoScroll();
      }, { passive: true });

      evSphere.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 30) {
          if (diff > 0) setEventActive(currentEvent + 1); // Drag left brings right image
          else setEventActive(currentEvent - 1);           // Drag right brings left image
        }
        resetEvAutoScroll();
      });

      // Mouse drag support for desktop
      evSphere.addEventListener('mousedown', (e) => {
        isDragging = true;
        touchStartX = e.clientX;
        stopEvAutoScroll();
      });

      window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = touchStartX - e.clientX;
        if (Math.abs(diff) > 30) {
          if (diff > 0) setEventActive(currentEvent + 1);
          else setEventActive(currentEvent - 1);
        }
        resetEvAutoScroll();
      });

      // Auto-scroll runs when events section is in viewport
      const evSection = document.getElementById('events') || evSphere;
      const evViewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isEvInView = entry.isIntersecting;
          if (isEvInView) startEvAutoScroll();
          else stopEvAutoScroll();
        });
      }, { threshold: 0.2 });
      evViewObserver.observe(evSection);
    }
  }

  /* =========================================================================
   * 7. DASTAAN-E-ISHQ 3D STORY CAROUSEL (#story)
   * Auto-scrolls forward bringing right-side photo into center view
   * ========================================================================= */
  const storyCards = document.querySelectorAll('.story-card');
  const storyDots = document.querySelectorAll('#story-dots i');
  let currentStory = 0;
  let storyAutoTimer = null;
  let isStoryInView = false;

  function setStoryActive(index) {
    if (!storyCards.length) return;
    currentStory = (index + storyCards.length) % storyCards.length;

    storyCards.forEach((card, i) => {
      let offset = i - currentStory;
      if (offset > storyCards.length / 2) offset -= storyCards.length;
      if (offset < -storyCards.length / 2) offset += storyCards.length;

      const angle = offset * 42;
      const tz = Math.cos(angle * Math.PI / 180) * 120 - 120;
      const tx = Math.sin(angle * Math.PI / 180) * 185;
      const scale = offset === 0 ? 1 : 0.86;
      const opacity = Math.abs(offset) > 2 ? 0 : offset === 0 ? 1 : 0.65;

      card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${-angle}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
      card.style.zIndex = 10 - Math.abs(offset);
    });

    storyDots.forEach((dot, i) => {
      dot.classList.toggle('on', i === currentStory);
    });
  }

  function startStoryAutoScroll() {
    stopStoryAutoScroll();
    storyAutoTimer = setInterval(() => {
      if (isStoryInView && !document.hidden) {
        // Auto-scroll forward: brings the right-side story photo into center view
        setStoryActive(currentStory + 1);
      }
    }, 3800);
  }

  function stopStoryAutoScroll() {
    if (storyAutoTimer) {
      clearInterval(storyAutoTimer);
      storyAutoTimer = null;
    }
  }

  function resetStoryAutoScroll() {
    stopStoryAutoScroll();
    setTimeout(startStoryAutoScroll, 6000);
  }

  if (storyCards.length > 0) {
    setStoryActive(0);

    storyDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        setStoryActive(i);
        resetStoryAutoScroll();
      });
    });

    const storySphere = document.querySelector('.story-sphere');
    if (storySphere) {
      let touchStartX = 0;
      storySphere.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopStoryAutoScroll();
      }, { passive: true });

      storySphere.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 35) {
          if (diff > 0) setStoryActive(currentStory + 1); // Drag left brings right image
          else setStoryActive(currentStory - 1);           // Drag right brings left image
        }
        resetStoryAutoScroll();
      });

      storySphere.addEventListener('click', (e) => {
        const rect = storySphere.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width * 0.3) {
          setStoryActive(currentStory - 1);
          resetStoryAutoScroll();
        } else if (clickX > rect.width * 0.7) {
          setStoryActive(currentStory + 1);
          resetStoryAutoScroll();
        }
      });

      // Auto-scroll runs when story section is in viewport
      const storySection = document.getElementById('story') || storySphere;
      const storyViewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isStoryInView = entry.isIntersecting;
          if (isStoryInView) startStoryAutoScroll();
          else stopStoryAutoScroll();
        });
      }, { threshold: 0.2 });
      storyViewObserver.observe(storySection);
    }
  }

  /* =========================================================================
   * 8. COPY ADDRESS TO CLIPBOARD
   * ========================================================================= */
  const copyBtn = document.getElementById('btnCopyAddress');
  const copyToast = document.getElementById('copied');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const address = config.venue ? config.venue.address : 'Bharat Lawns, Muktainagar Road, Near Dr. VB Kolte College, Malkapur, District Buldhana, Maharashtra 443101';
      navigator.clipboard.writeText(address).then(() => {
        if (copyToast) {
          copyToast.textContent = '✓ Venue address copied to clipboard!';
          setTimeout(() => {
            copyToast.textContent = '';
          }, 3500);
        }
      });
    });
  }

  /* =========================================================================
   * 9. RSVP FORM SUBMISSION
   * ========================================================================= */
  const rsvpForm = document.getElementById('rsvp');
  const rsvpNameInput = document.getElementById('r-name');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitter = e.submitter;
      const status = submitter ? submitter.getAttribute('data-a') : 'yes';
      const name = rsvpNameInput ? rsvpNameInput.value.trim() : 'Honoured Guest';

      if (!name) return;

      localStorage.setItem('wedding_rsvp', JSON.stringify({
        name,
        attending: status === 'yes',
        timestamp: new Date().toISOString()
      }));

      rsvpForm.innerHTML = `
        <div class="thanks" style="animation: fin 0.8s ease both; padding: 12px 0;">
          <h3 style="color:var(--wine); font-family:var(--f-head); font-size:22px; margin-bottom:8px;">
            ${status === 'yes' ? 'JazakAllah Khair! We Look Forward to Celebrating With You' : 'JazakAllah Khair for Your Heartfelt Du’as'}
          </h3>
          <p style="color:var(--muted); font-size:14px; margin:0;">
            ${status === 'yes' ? `Warm du'as and RSVP recorded for ${name}. Insha'Allah see you at the celebrations!` : `Your loving blessings and wishes are deeply cherished, ${name}.`}
          </p>
        </div>
      `;

      createCelebrationBurst(rsvpForm.parentElement);
    });

    const saved = localStorage.getItem('wedding_rsvp');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.name) {
          rsvpNameInput.value = data.name;
        }
      } catch (err) {}
    }
  }

  /* =========================================================================
   * 10. SCROLL REVEALS & PARALLAX WATERMARK
   * ========================================================================= */
  const revealElements = document.querySelectorAll('.rv, .fade, .hang, .map');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        if (entry.target.classList.contains('map')) {
          entry.target.classList.add('go');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((el) => observer.observe(el));

  /* =========================================================================
   * 11. HIGH-PERFORMANCE 60FPS SCROLL ENGINE (PARALLAX + INDICATOR)
   * Throttled with requestAnimationFrame to prevent layout thrashing on mobile
   * ========================================================================= */
  const bgWords = document.querySelectorAll('.bgword');
  const arrowEl = document.getElementById('arrow');
  let scrollTicking = false;
  let cachedVh = window.innerHeight;
  let cachedDocHeight = document.documentElement.scrollHeight;

  window.addEventListener('resize', () => {
    cachedVh = window.innerHeight;
    cachedDocHeight = document.documentElement.scrollHeight;
  }, { passive: true });

  function onUnifiedScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;

        // Subtle watermark parallax without triggering layout reflow
        bgWords.forEach((word) => {
          const parent = word.parentElement;
          if (!parent) return;
          const offset = (parent.offsetTop - scrollY - cachedVh * 0.5) * 0.14;
          word.style.transform = `translate(-50%, -50%) translateY(${offset}px)`;
        });

        // Hide scroll indicator near bottom
        if (arrowEl) {
          const atBottom = (scrollY + cachedVh) >= (cachedDocHeight - 120);
          if (atBottom) {
            arrowEl.classList.remove('on');
            arrowEl.classList.add('hidden');
          } else if (!document.body.classList.contains('locked')) {
            arrowEl.classList.add('on');
            arrowEl.classList.remove('hidden');
          }
        }

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onUnifiedScroll, { passive: true });
  window.addEventListener('resize', onUnifiedScroll, { passive: true });

  /* =========================================================================
   * 12. INTERACTIVE THEME SELECTOR & PREFERENCES
   * Supports 4 regal aesthetics:
   * - Rose Shubh Vivaah (Blush ivory & ruby wine)
   * - Royal Marigold (Saffron & terracotta gold)
   * - Midnight Gold (Celestial starlight gold & midnight navy)
   * - Sage Garden (Royal emerald & champagne default)
   * ========================================================================= */
  const themeBtn = document.getElementById('theme-btn');
  const themeModal = document.getElementById('theme-modal');
  const themeBackdrop = document.getElementById('theme-backdrop');
  const themeClose = document.getElementById('theme-close');
  const themeCards = document.querySelectorAll('.theme-card');

  function openThemeModal() {
    if (!themeModal) return;
    themeModal.classList.add('active');
    themeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeThemeModal() {
    if (!themeModal) return;
    themeModal.classList.remove('active');
    themeModal.setAttribute('aria-hidden', 'true');
    // Only restore body overflow if opening book is already opened
    if (!document.getElementById('scene') || document.getElementById('scene').classList.contains('gone')) {
      document.body.style.overflow = '';
    }
  }

  function applyTheme(themeKey, save = true) {
    const validThemes = ['emerald', 'rose', 'marigold', 'midnight', 'sage'];
    const key = validThemes.includes(themeKey) ? (themeKey === 'sage' ? 'emerald' : themeKey) : 'marigold';

    document.documentElement.setAttribute('data-theme', key);
    document.body.setAttribute('data-theme', key);

    if (save) {
      try {
        localStorage.setItem('wedding_theme', key);
      } catch (e) {}
    }

    // Update active checkmarks
    themeCards.forEach((card) => {
      const choice = card.getAttribute('data-theme-choice');
      if (choice === key || (choice === 'emerald' && key === 'sage')) {
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
      }
    });

    // Update dynamic falling petals
    if (typeof updatePetalPalette === 'function') {
      updatePetalPalette(key);
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openThemeModal();
    });
  }

  if (themeClose) {
    themeClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeThemeModal();
    });
  }

  if (themeBackdrop) {
    themeBackdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      closeThemeModal();
    });
  }

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && themeModal && themeModal.classList.contains('active')) {
      closeThemeModal();
    }
  });

  themeCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const choice = card.getAttribute('data-theme-choice');
      if (choice) {
        applyTheme(choice, true);
        if (navigator.vibrate) {
          try { navigator.vibrate(30); } catch (err) {}
        }
        setTimeout(() => {
          closeThemeModal();
        }, 320);
      }
    });
  });

  // Initialize theme on page load from localStorage (default: marigold)
  const savedTheme = localStorage.getItem('wedding_theme') || 'marigold';
  applyTheme(savedTheme, false);

})();
