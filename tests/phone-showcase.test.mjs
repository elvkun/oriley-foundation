import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../src/site.js', import.meta.url), 'utf8');
function fixture(reduced = false) {
  const timers = new Set();
  function node() {
    return { hidden: true, textContent: '', listeners: {}, attrs: {},
      addEventListener(type, handler) { this.listeners[type] = handler; },
      setAttribute(key, value) { this.attrs[key] = value; },
      hasAttribute(key) { return key in this.attrs; },
    };
  }
  const track = { ...node(), hidden: false, clientWidth: 320, scrollLeft: 0 };
  track.scrollTo = ({left}) => { track.scrollLeft = left; track.listeners.scroll?.(); };
  const slides = ['Overview', 'Community', 'Marketplace', 'Profile'].map(title => ({dataset: {title, caption: `${title} sample-data preview`}}));
  const dots = slides.map(node);
  track.querySelectorAll = () => slides;
  const selectors = Object.fromEntries([
    '.phone-carousel', '.phone-live-demo', '.showcase-controls', '[data-play]',
    '[data-toggle-demo]', '[data-previous]', '[data-next]',
    '[data-showcase-index]', '[data-showcase-title]', '[data-showcase-caption]',
  ].map(key => [key, key === '.phone-carousel' ? track : node()]));
  const frame = selectors['.phone-live-demo'];
  Object.defineProperty(frame, 'src', {set(value) {frame.attrs.src = value;}, get() {return frame.attrs.src;}});
  const root = {...node(), querySelector: key => selectors[key], querySelectorAll: () => dots};
  const document = {hidden: false, querySelectorAll: () => [root], addEventListener() {}};
  let observer;
  const motion = {matches: reduced, addEventListener() {}};
  vm.runInNewContext(source, {
    HTMLElement: class {}, customElements: {define() {}}, document,
    window: {matchMedia: () => motion},
    setInterval(fn) {timers.add(fn); return fn;}, clearInterval(id) {timers.delete(id);},
    IntersectionObserver: class {constructor(callback) {observer = callback;} observe() {}},
    ResizeObserver: class {observe() {}},
  });
  return {selectors, dots, track, frame, timers, visible(ratio) {observer([{isIntersecting: ratio > 0, intersectionRatio: ratio}]);}};
}

test('phone loads the actual sample-data app only after explicit selection and pauses slides', () => {
  const f = fixture();
  f.visible(.7);
  assert.equal(f.timers.size, 1);
  assert.equal(f.frame.src, undefined);
  const toggle = f.selectors['[data-toggle-demo]'];
  assert.equal(toggle.hidden, false);
  toggle.listeners.click();
  assert.equal(f.frame.src, '/demo/');
  assert.equal(f.frame.hidden, false);
  assert.equal(f.track.hidden, true);
  assert.equal(f.selectors['.showcase-controls'].hidden, true);
  assert.equal(f.selectors['[data-play]'].hidden, true);
  assert.equal(f.timers.size, 0);
  assert.equal(toggle.attrs['aria-pressed'], 'true');
  toggle.listeners.click();
  assert.equal(f.track.hidden, false);
  assert.equal(f.frame.hidden, true);
  assert.equal(f.selectors['.showcase-controls'].hidden, false);
  assert.equal(f.selectors['[data-play]'].textContent, 'Play slideshow');
  assert.equal(f.timers.size, 0);
});

test('manual feature navigation updates captions and stays paused when entering/leaving demo', () => {
  const f = fixture();
  f.selectors['[data-next]'].listeners.click();
  assert.equal(f.track.scrollLeft, 320);
  assert.equal(f.selectors['[data-showcase-title]'].textContent, 'Community');
  assert.equal(f.dots[1].attrs['aria-pressed'], 'true');
  f.selectors['[data-toggle-demo]'].listeners.click();
  f.selectors['[data-toggle-demo]'].listeners.click();
  assert.equal(f.track.scrollLeft, 320);
  assert.equal(f.timers.size, 0);
});

test('reduced motion and partial visibility do not start autoplay', () => {
  const partial = fixture(); partial.visible(.1); assert.equal(partial.timers.size, 0);
  const f = fixture(true); f.visible(.8);
  assert.equal(f.selectors['[data-play]'].hidden, true);
  assert.equal(f.timers.size, 0);
  f.selectors['[data-toggle-demo]'].listeners.click();
  assert.equal(f.frame.hidden, false);
});
