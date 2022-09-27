import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

console.log(document.location);

refs = {
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

player.on('timeupdate', throttle(onPlay, 1000));
player.setCurrentTime(load(LOCALSTORAGE_KEY)).then(() => {});
// window.onbeforeunload = () =>
//   player.unload().then(() => remove(LOCALSTORAGE_KEY));
