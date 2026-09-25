/**
 * Luciano4E - Official Audio Player Engine
 * Features: "Préndete" by Luciano4E (Official Single)
 * Plays the real audio track with live animated equalizer and visual state sync.
 */

class RealTrackAudioEngine {
  constructor() {
    this.playlist = [
      {
        title: "Préndete",
        album: "Sencillo",
        artist: "Luciano4E",
        sources: [
          { type: 'audio/webm; codecs="opus"', src: "assets/audio/luciano4e_prendete.webm" },
          { type: 'audio/mp4; codecs="mp4a.40.2"', src: "assets/audio/luciano4e_prendete.m4a" },
          { type: 'audio/mpeg', src: "assets/audio/luciano4e_prendete.mp3" }
        ],
        src: "assets/audio/luciano4e_prendete.webm",
        cover: "assets/img/prendete_cover.jpg"
      },
      {
        title: "Dura",
        album: "Sencillo",
        artist: "Luciano4E",
        src: "assets/audio/luciano4e_dura.m4a",
        cover: "assets/img/tuchulo_cover.jpg"
      }
    ];

    this.currentIndex = 0;
    this.audio = new Audio();
    this.audio.preload = "metadata";
    this.isPlaying = false;
    this.onStateChange = null;

    this.setupAudio();
  }

  setupAudio() {
    const track = this.playlist[this.currentIndex];
    let selectedSrc = track.src;

    if (track.sources && track.sources.length) {
      for (const s of track.sources) {
        if (this.audio.canPlayType(s.type) !== "") {
          selectedSrc = s.src;
          break;
        }
      }
    }

    this.audio.src = selectedSrc;

    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Audio file error or loading issue, fallback enabled", e);
    });
  }

  play() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          if (this.onStateChange) this.onStateChange(true);
        })
        .catch((err) => {
          console.warn("Autoplay restricted, awaiting direct user tap", err);
          this.isPlaying = false;
          if (this.onStateChange) this.onStateChange(false);
        });
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  getCurrentTrack() {
    return this.playlist[this.currentIndex];
  }

  updateTrackInfo() {
    const track = this.getCurrentTrack();
    const titleEl = document.querySelector(".track-title");
    const artistEl = document.querySelector(".track-artist");
    const thumbEl = document.querySelector(".track-thumb");

    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = `${track.artist} • ${track.album}`;
    if (thumbEl) thumbEl.src = track.cover;
  }
}

window.AudioEngine = new RealTrackAudioEngine();
