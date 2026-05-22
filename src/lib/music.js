import { Howl } from 'howler'

const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

let musicHowl = null

export function startMusic() {
  if (musicHowl) return
  musicHowl = new Howl({
    src: [MUSIC_URL],
    loop: true,
    volume: 0.25,
    autoplay: true,
  })
}

export function duckMusic() {
  if (musicHowl) musicHowl.volume(0.05)
}

export function restoreMusic() {
  if (musicHowl) musicHowl.volume(0.25)
}
