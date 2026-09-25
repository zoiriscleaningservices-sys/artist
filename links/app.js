/**
 * Luciano4E - Official Artist Hub Core Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CONFIGURATION - Easily customize links here
  // ==========================================
  const ARTIST_CONFIG = {
    name: 'Luciano4E',
    handle: '@luciano4e',
    websiteUrl: 'https://www.luciano4e.com',
    contactEmail: 'luciano4e@gmail.com', // Dirección de Gmail oficial donde se reciben las propuestas y contactos
    links: {
      spotify: 'https://open.spotify.com/artist/0OtaZUWi1z5G9pcURboTB2',
      apple: 'https://music.apple.com/us/artist/luciano4e/1672722974',
      audiomack: 'https://audiomack.com/luciano4e/song/247-1',
      youtube: 'https://www.youtube.com/@Luciano4E',
      youtubeMusic: 'https://music.youtube.com/channel/UCXX0IW6etYz_-d8jcU9mmLQ',
      instagram: 'https://www.instagram.com/luciano4e/',
      tiktok: 'https://www.tiktok.com/@luciano.4e',
      amazon: 'https://www.amazon.com/music/player/artists/B09ZTDJVNP/luciano4e',
      amazonDe: 'https://music.amazon.de/artists/B09ZT7483L/luciano4e',
      iheart: 'https://www.iheart.com/artist/luciano4e-39751506/?autoplay=true',
      vip: 'https://share.google/CAJ0cD0RvcbOMeNYg',
      single: 'https://open.spotify.com/album/2PEe1vLbdwAKeKYQDlLIpm'
    },
    gallery: [
      {
        src: 'assets/img/gallery1.jpg',
        caption: 'Luciano4E • Sesión de Estudio Miami Heat (Archivo Oficial)'
      },
      {
        src: 'assets/img/gallery3.jpg',
        caption: 'Luciano4E • Concierto en Vivo en el Escenario'
      },
      {
        src: 'assets/img/gallery4.jpg',
        caption: 'Luciano4E • Préndete (Edición Especial Neon Deluxe)'
      }
    ]
  };

  // ==========================================
  // DOM Elements
  // ==========================================
  const stickyNav = document.getElementById('stickyNav');
  const stickyPlayBtn = document.getElementById('stickyPlayBtn');
  const stickyShareBtn = document.getElementById('stickyShareBtn');

  const audioPlayerCard = document.getElementById('audioPlayerCard');
  const mainAudioBtn = document.getElementById('mainAudioBtn');
  const trackPlayTrigger = document.getElementById('trackPlayTrigger');

  const connectForm = document.getElementById('connectForm');
  const fanEmailInput = document.getElementById('fanEmailInput');
  const connectSubmitBtn = document.getElementById('connectSubmitBtn');
  const connectToast = document.getElementById('connectToast');

  const floatingBar = document.getElementById('floatingBar');
  const floatingJoinBtn = document.getElementById('floatingJoinBtn');
  const floatingDismissBtn = document.getElementById('floatingDismissBtn');

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const shareModal = document.getElementById('shareModal');
  const shareModalClose = document.getElementById('shareModalClose');
  const shareBackdrop = document.getElementById('shareBackdrop');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const copyLinkInput = document.getElementById('copyLinkInput');
  const shareProfileFooterBtn = document.getElementById('shareProfileFooterBtn');
  const qrProfileBtn = document.getElementById('qrProfileBtn');
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeBarBtn = document.getElementById('closeBarBtn');

  let currentGalleryIndex = 0;

  // ==========================================
  // Sticky Header on Scroll
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 220) {
      stickyNav.classList.add('visible');
    } else {
      stickyNav.classList.remove('visible');
    }
  }, { passive: true });

  // ==========================================
  // Music Player Logic
  // ==========================================
  const audio = window.AudioEngine;

  function updateAudioUI(isPlaying) {
    if (isPlaying) {
      audioPlayerCard.classList.add('playing');
      
      // Update Main button
      mainAudioBtn.querySelector('.audio-btn-play').classList.add('hidden');
      mainAudioBtn.querySelector('.audio-btn-pause').classList.remove('hidden');

      // Update Artwork Overlay
      trackPlayTrigger.querySelector('.thumb-play').classList.add('hidden');
      trackPlayTrigger.querySelector('.thumb-pause').classList.remove('hidden');

      // Update Sticky button
      stickyPlayBtn.querySelector('.play-icon').classList.add('hidden');
      stickyPlayBtn.querySelector('.pause-icon').classList.remove('hidden');
    } else {
      audioPlayerCard.classList.remove('playing');

      // Update Main button
      mainAudioBtn.querySelector('.audio-btn-play').classList.remove('hidden');
      mainAudioBtn.querySelector('.audio-btn-pause').classList.add('hidden');

      // Update Artwork Overlay
      trackPlayTrigger.querySelector('.thumb-play').classList.remove('hidden');
      trackPlayTrigger.querySelector('.thumb-pause').classList.add('hidden');

      // Update Sticky button
      stickyPlayBtn.querySelector('.play-icon').classList.remove('hidden');
      stickyPlayBtn.querySelector('.pause-icon').classList.add('hidden');
    }
  }

  const trackSwitchBtn = document.getElementById('trackSwitchBtn');

  if (audio) {
    audio.onStateChange = updateAudioUI;

    mainAudioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.toggle();
    });

    trackPlayTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.toggle();
    });

    stickyPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.toggle();
    });

    if (trackSwitchBtn) {
      trackSwitchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.next();
      });
    }

    // Audio Progress & Scrubber Sync
    const audioProgressFill = document.getElementById('audioProgressFill');
    const audioCurrentTime = document.getElementById('audioCurrentTime');

    if (audio.audio) {
      audio.audio.addEventListener('timeupdate', () => {
        const cur = audio.audio.currentTime || 0;
        const dur = audio.audio.duration || 130;
        if (audioProgressFill) {
          const pct = Math.min(100, Math.max(0, (cur / dur) * 100));
          audioProgressFill.style.width = `${pct}%`;
        }
        if (audioCurrentTime) {
          const mins = Math.floor(cur / 60);
          const secs = Math.floor(cur % 60);
          audioCurrentTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
      });
    }
  }

  // ==========================================
  // Email / VIP Connect Interaction
  // ==========================================
  if (connectForm) {
    const connectFormNext = document.getElementById('connectFormNext');
    if (connectFormNext) {
      connectFormNext.value = window.location.origin + window.location.pathname + '?sent=true';
    }

    connectForm.addEventListener('submit', () => {
      if (connectSubmitBtn) {
        connectSubmitBtn.innerHTML = `<span>Enviando al Gmail...</span>`;
      }
    });
  }

  // ==========================================
  // Media Cards Interactive Navigation
  // ==========================================
  const mediaCards = document.querySelectorAll('.media-card');
  mediaCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If native anchor tag, browser handles navigation cleanly
      if (card.tagName.toLowerCase() === 'a') return;
      const url = card.getAttribute('data-url') || card.getAttribute('href');
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // Top close and menu simulated buttons
  closeBarBtn.addEventListener('click', () => {
    alert("Luciano4E • Portal Oficial de Artista • ¡Toca '...' o Compartir para copiar el enlace!");
  });

  openMenuBtn.addEventListener('click', () => {
    openShareModal();
  });

  // ==========================================
  // Photo Lightbox Gallery
  // ==========================================
  function openLightbox(index) {
    currentGalleryIndex = index;
    const item = ARTIST_CONFIG.gallery[index];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function nextLightboxPhoto() {
    currentGalleryIndex = (currentGalleryIndex + 1) % ARTIST_CONFIG.gallery.length;
    openLightbox(currentGalleryIndex);
  }

  function prevLightboxPhoto() {
    currentGalleryIndex = (currentGalleryIndex - 1 + ARTIST_CONFIG.gallery.length) % ARTIST_CONFIG.gallery.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10) || 0;
      openLightbox(index);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(item.getAttribute('data-index'), 10) || 0;
        openLightbox(index);
      }
    });
  });

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextLightboxPhoto();
  });
  lightboxPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevLightboxPhoto();
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
    }
    if (!shareModal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeShareModal();
    }
  });

  // ==========================================
  // Universal Apple Spatial 3D Tilt Physics
  // ==========================================
  function applySpatialTilt(el, maxTilt = 5) {
    if (!el) return;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      
      el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      el.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Apply to Hero Stage, Footer Card & Media Cards
  applySpatialTilt(document.getElementById('appleHeroStage'), 4);
  applySpatialTilt(document.getElementById('appleGlassFooterCard'), 6);
  document.querySelectorAll('.apple-vision-card').forEach(card => {
    applySpatialTilt(card, 5);
  });
  document.querySelectorAll('.media-card').forEach(card => {
    applySpatialTilt(card, 4);
  });

  // ==========================================
  // Global Toast System
  // ==========================================
  const globalToast = document.getElementById('globalToast');
  const toastText = document.getElementById('toastText');
  const toastEmoji = document.getElementById('toastEmoji');
  let toastTimer = null;

  function showToast(message, emoji = '✨') {
    if (!globalToast) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastText.textContent = message;
    if (toastEmoji) toastEmoji.textContent = emoji;

    globalToast.classList.remove('hidden');

    toastTimer = setTimeout(() => {
      globalToast.classList.add('hidden');
    }, 2800);
  }

  // ==========================================
  // Handle Click-to-Copy with Rich Animation
  // ==========================================
  const handleCopyBtn = document.getElementById('handleCopyBtn');
  let handleCopyTimeout = null;

  window.copyHandleLink = async function() {
    const btn = document.getElementById('handleCopyBtn');
    const shareUrl = (typeof ARTIST_CONFIG !== 'undefined' && ARTIST_CONFIG.websiteUrl) 
      ? ARTIST_CONFIG.websiteUrl 
      : 'https://www.luciano4e.com';

    // Copy to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
    } catch (err) {
      console.warn('Clipboard write fallback error:', err);
    }

    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      try { navigator.vibrate(40); } catch (_) {}
    }

    if (btn) {
      // Trigger pop/bounce animation
      btn.classList.remove('copied');
      void btn.offsetWidth; // Force CSS reflow
      btn.classList.add('copied');

      if (handleCopyTimeout) clearTimeout(handleCopyTimeout);
      handleCopyTimeout = setTimeout(() => {
        btn.classList.remove('copied');
      }, 1900);
    }

    // Toast notification
    showToast('¡Enlace copiado: ' + shareUrl.replace(/^https?:\/\//, '') + '!', '🔗');
  };

  if (handleCopyBtn) {
    handleCopyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.copyHandleLink();
    });
  }

  // ==========================================
  // Real Scannable QR Code Engine
  // ==========================================
  const qrModal = document.getElementById('qrModal');
  const qrModalClose = document.getElementById('qrModalClose');
  const qrBackdrop = document.getElementById('qrBackdrop');
  const qrRealContainer = document.getElementById('qrcodeReal');
  const downloadQrBtn = document.getElementById('downloadQrBtn');
  const qrCopyLinkBtn = document.getElementById('qrCopyLinkBtn');
  const qrCopyBtnLabel = document.getElementById('qrCopyBtnLabel');

  let qrInstance = null;

  function renderRealQRCode() {
    if (!qrRealContainer) return;
    const targetUrl = window.location.href.startsWith('http') 
      ? window.location.href 
      : ARTIST_CONFIG.websiteUrl;

    qrRealContainer.innerHTML = '';

    if (typeof QRCode !== 'undefined') {
      try {
        qrInstance = new QRCode(qrRealContainer, {
          text: targetUrl,
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H // Highest error correction (30%) allows center logo
        });
      } catch (err) {
        console.warn('QRCode JS error, falling back:', err);
      }
    }
  }

  function openQRModal() {
    renderRealQRCode();
    if (qrModal) {
      qrModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQRModal() {
    if (qrModal) {
      qrModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (qrProfileBtn) qrProfileBtn.addEventListener('click', openQRModal);
  if (qrModalClose) qrModalClose.addEventListener('click', closeQRModal);
  if (qrBackdrop) qrBackdrop.addEventListener('click', closeQRModal);

  // Download High-Res Branded QR Pass
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', () => {
      const qrCanvas = qrRealContainer ? qrRealContainer.querySelector('canvas') : null;
      const qrImg = qrRealContainer ? qrRealContainer.querySelector('img') : null;

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 600;
      exportCanvas.height = 760;
      const ctx = exportCanvas.getContext('2d');

      // Dark obsidian background
      const grad = ctx.createLinearGradient(0, 0, 0, 760);
      grad.addColorStop(0, '#1c1c2e');
      grad.addColorStop(1, '#090a12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 760);

      // Gold & violet rim border
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, 568, 728);

      // Header Brand
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LUCIANO4E', 300, 80);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Portal Oficial del Artista • Escanea para Escuchar', 300, 115);

      // White rounded QR holder
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(140, 160, 320, 320, 24);
      ctx.fill();

      // Draw QR image
      const source = qrCanvas || qrImg;
      if (source) {
        ctx.drawImage(source, 160, 180, 280, 280);
      }

      // Draw Center 4E Badge
      ctx.fillStyle = '#090a12';
      ctx.beginPath();
      ctx.arc(300, 320, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('4E', 300, 327);

      // Call to Action
      ctx.fillStyle = '#25f4ee';
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('🔥 PRÉNDETE — SENCILLO DISPONIBLE YA', 300, 540);

      ctx.fillStyle = '#71717a';
      ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Compatible con cámara de iPhone, Android y lectores QR', 300, 580);
      ctx.fillText('© 2026 Luciano4E • Discografía Oficial', 300, 680);

      // Trigger Download
      const link = document.createElement('a');
      link.download = 'Luciano4E_Pase_Oficial.png';
      link.href = exportCanvas.toDataURL('image/png');
      link.click();

      showToast('¡Pase QR guardado en tus descargas! 📲', '✅');
    });
  }

  // QR Modal Copy Link
  if (qrCopyLinkBtn) {
    qrCopyLinkBtn.addEventListener('click', () => {
      const url = window.location.href.startsWith('http') ? window.location.href : ARTIST_CONFIG.websiteUrl;
      navigator.clipboard.writeText(url).then(() => {
        if (qrCopyBtnLabel) qrCopyBtnLabel.textContent = '¡Copiado! ✓';
        showToast('¡Enlace del perfil copiado al portapapeles! 📋', '✅');
        setTimeout(() => {
          if (qrCopyBtnLabel) qrCopyBtnLabel.textContent = 'Copiar Enlace';
        }, 2200);
      });
    });
  }

  // ==========================================
  // Real Native & Liquid Glass Share System
  // ==========================================
  const copyLinkBtnText = document.getElementById('copyLinkBtnText');
  const quickCopyFooterBtn = document.getElementById('quickCopyFooterBtn');
  const quickCopyBtnText = document.getElementById('quickCopyBtnText');

  const shareWhatsApp = document.getElementById('shareWhatsApp');
  const shareInstagram = document.getElementById('shareInstagram');
  const shareTwitter = document.getElementById('shareTwitter');
  const shareTelegram = document.getElementById('shareTelegram');
  const shareSMS = document.getElementById('shareSMS');

  function getShareUrl() {
    return window.location.href.startsWith('http') ? window.location.href : ARTIST_CONFIG.websiteUrl;
  }

  function setupSocialShareLinks() {
    const url = getShareUrl();
    const msg = `🔥 Escucha "Préndete" y toda la música oficial de Luciano4E en Spotify, Apple Music y YouTube: ${url}`;
    const encMsg = encodeURIComponent(msg);
    const encUrl = encodeURIComponent(url);

    if (copyLinkInput) copyLinkInput.value = url;

    if (shareWhatsApp) {
      shareWhatsApp.href = `https://api.whatsapp.com/send?text=${encMsg}`;
    }
    if (shareTwitter) {
      shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('🔥 Escucha el nuevo sencillo "Préndete" de @luciano4e: ' + url)}`;
    }
    if (shareTelegram) {
      shareTelegram.href = `https://t.me/share/url?url=${encUrl}&text=${encodeURIComponent('Luciano4E • Portal Oficial de Música')}`;
    }
    if (shareSMS) {
      shareSMS.href = `sms:?&body=${encMsg}`;
    }
    if (shareInstagram) {
      shareInstagram.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(url).then(() => {
          showToast('¡Enlace copiado! Abre tus Historias de Instagram y añade el sticker de enlace 📸', '📸');
        });
      });
    }
  }

  setupSocialShareLinks();

  function openShareModal() {
    setupSocialShareLinks();
    if (shareModal) {
      shareModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeShareModal() {
    if (shareModal) {
      shareModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function handleShareAction() {
    const url = getShareUrl();
    const shareData = {
      title: 'Luciano4E | Artista Oficial • Música Urbana y Enlaces',
      text: 'Escucha "Préndete" y los sencillos oficiales de Luciano4E:',
      url: url
    };

    // Use native Web Share on mobile devices (iOS Safari, Android Chrome)
    if (navigator.share && /mobile|iphone|android|ipad/i.test(navigator.userAgent)) {
      navigator.share(shareData).catch(() => {
        openShareModal();
      });
    } else {
      openShareModal();
    }
  }

  if (stickyShareBtn) stickyShareBtn.addEventListener('click', handleShareAction);
  if (shareProfileFooterBtn) shareProfileFooterBtn.addEventListener('click', handleShareAction);
  if (shareModalClose) shareModalClose.addEventListener('click', closeShareModal);
  if (shareBackdrop) shareBackdrop.addEventListener('click', closeShareModal);

  // Copy Link in Share Sheet
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      const url = getShareUrl();
      navigator.clipboard.writeText(url).then(() => {
        if (copyLinkBtnText) copyLinkBtnText.textContent = '¡Copiado! ✓';
        showToast('¡Enlace oficial copiado al portapapeles! 📋', '✅');
        setTimeout(() => {
          if (copyLinkBtnText) copyLinkBtnText.textContent = 'Copiar Enlace';
        }, 2200);
      });
    });
  }

  // Quick Copy in Footer
  if (quickCopyFooterBtn) {
    quickCopyFooterBtn.addEventListener('click', () => {
      const url = getShareUrl();
      navigator.clipboard.writeText(url).then(() => {
        if (quickCopyBtnText) quickCopyBtnText.textContent = '¡Copiado! ✓';
        showToast('¡Enlace de Luciano4E copiado al portapapeles! 📋', '✨');
        setTimeout(() => {
          if (quickCopyBtnText) quickCopyBtnText.textContent = 'Copiar Enlace';
        }, 2200);
      });
    });
  }

  // ==========================================
  // Floating VIP Bar Controls
  // ==========================================
  if (floatingBar) {
    if (sessionStorage.getItem('luciano4e_floating_dismissed') === '1') {
      floatingBar.style.display = 'none';
    }
  }

  if (floatingDismissBtn && floatingBar) {
    floatingDismissBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingBar.classList.add('dismissed');
      sessionStorage.setItem('luciano4e_floating_dismissed', '1');
    });
  }

  // ==========================================
  // VIP Email Club Modal System
  // ==========================================
  const vipEmailModal = document.getElementById('vipEmailModal');
  const vipEmailModalClose = document.getElementById('vipEmailModalClose');
  const vipEmailBackdrop = document.getElementById('vipEmailBackdrop');
  const vipModalForm = document.getElementById('vipModalForm');
  const vipModalNameInput = document.getElementById('vipModalNameInput');
  const vipModalEmailInput = document.getElementById('vipModalEmailInput');
  const vipModalSubmitBtn = document.getElementById('vipModalSubmitBtn');
  const vipSuccessBox = document.getElementById('vipSuccessBox');
  const vipSuccessDesc = document.getElementById('vipSuccessDesc');
  const vipDirectGmailBtn = document.getElementById('vipDirectGmailBtn');
  const vipTopicsRow = document.getElementById('vipTopicsRow');
  const vipFormSubject = document.getElementById('vipFormSubject');

  function openVipEmailModal() {
    if (vipEmailModal) {
      vipEmailModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (vipSuccessBox) vipSuccessBox.classList.add('hidden');
      if (vipModalForm) vipModalForm.style.display = 'flex';
      if (vipTopicsRow) vipTopicsRow.style.display = 'flex';
      setTimeout(() => {
        if (vipModalNameInput) {
          vipModalNameInput.focus();
        } else if (vipModalEmailInput) {
          vipModalEmailInput.focus();
        }
      }, 150);
    }
  }

  function closeVipEmailModal() {
    if (vipEmailModal) {
      vipEmailModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (vipEmailModalClose) vipEmailModalClose.addEventListener('click', closeVipEmailModal);
  if (vipEmailBackdrop) vipEmailBackdrop.addEventListener('click', closeVipEmailModal);

  // Topic selection pills
  const vipTopicPills = document.querySelectorAll('.vip-topic-pill');
  const vipSelectedTopic = document.getElementById('vipSelectedTopic');
  const vipModalMessageInput = document.getElementById('vipModalMessageInput');

  vipTopicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      vipTopicPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const topic = pill.getAttribute('data-topic');
      if (vipSelectedTopic) vipSelectedTopic.value = topic;
      if (vipFormSubject) vipFormSubject.value = `🎵 [${topic}] Propuesta de Contacto - Luciano4E`;
    });
  });

  const vipFormNext = document.getElementById('vipFormNext');
  if (vipFormNext) {
    vipFormNext.value = window.location.origin + window.location.pathname + '?sent=true';
  }

  if (vipModalForm) {
    vipModalForm.addEventListener('submit', () => {
      // Do NOT preventDefault! Allow standard FormSubmit POST to luciano4e@gmail.com!
      const name = vipModalNameInput ? vipModalNameInput.value.trim() : '';
      const email = vipModalEmailInput ? vipModalEmailInput.value.trim() : '';
      const topic = vipSelectedTopic ? vipSelectedTopic.value : 'Colaboración / Feat';
      const message = vipModalMessageInput ? vipModalMessageInput.value.trim() : '';

      // Update FormSubmit Subject dynamically before submit
      if (vipFormSubject) {
        vipFormSubject.value = `🎵 [${topic}] Propuesta de ${name || email} - Luciano4E`;
      }

      // Save to localStorage backup
      try {
        const saved = JSON.parse(localStorage.getItem('luciano4e_contacts') || '[]');
        saved.push({ name, email, topic, message, timestamp: new Date().toISOString() });
        localStorage.setItem('luciano4e_contacts', JSON.stringify(saved));
      } catch(err){}

      if (vipModalSubmitBtn) {
        vipModalSubmitBtn.innerHTML = `<span>Enviando al Gmail...</span>`;
      }
    });
  }

  // Handle return redirect from FormSubmit (_next parameter)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sent') === 'true') {
    setTimeout(() => {
      showToast('¡Mensaje enviado con éxito a luciano4e@gmail.com! 📬', '✓');
    }, 400);
    // Clean URL
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  if (floatingJoinBtn) {
    floatingJoinBtn.addEventListener('click', () => {
      openVipEmailModal();
    });
  }

  // ==========================================
  // Mobile Swipe-to-Dismiss on Glass Sheets
  // ==========================================
  document.querySelectorAll('.apple-glass-sheet').forEach(sheet => {
    let startY = 0;
    let currentY = 0;
    let isTracking = false;

    sheet.addEventListener('touchstart', (e) => {
      if (sheet.scrollTop <= 0) {
        startY = e.touches[0].clientY;
        currentY = startY;
        isTracking = true;
      }
    }, { passive: true });

    sheet.addEventListener('touchmove', (e) => {
      if (!isTracking) return;
      currentY = e.touches[0].clientY;
      const diffY = currentY - startY;
      if (diffY > 0 && sheet.scrollTop <= 0) {
        sheet.style.transform = `translateY(${diffY * 0.7}px)`;
        sheet.style.transition = 'none';
      }
    }, { passive: true });

    sheet.addEventListener('touchend', () => {
      if (!isTracking) return;
      isTracking = false;
      const diffY = currentY - startY;
      sheet.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      if (diffY > 80 && sheet.scrollTop <= 0) {
        closeVipEmailModal();
        closeQRModal();
        closeShareModal();
      } else {
        sheet.style.transform = '';
      }
    });
  });

});

