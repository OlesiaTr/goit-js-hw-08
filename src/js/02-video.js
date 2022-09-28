import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const refs = {
  iframe: document.querySelector('#vimeo-player'),
};

const player = new Player(refs.iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const onPlay = e => {
  let timeupdate = e.seconds;
  save(LOCALSTORAGE_KEY, timeupdate);
  if (!timeupdate) {
    return;
  }
};

const onFirstEnter = e => {
  const savedTime = load(LOCALSTORAGE_KEY);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
};

player.on('timeupdate', throttle(onPlay, 1000));
onFirstEnter();
