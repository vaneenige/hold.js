export default class Hold {

  /**
   * Creates an instance of Hold.
   *
   * @param {object} element || window
   * @param {number} start || 0
   * @param {number} end || 1
   * @param {number} duration || 1
   * @param {number} intervalDuration || 8
   * @param {boolean} loop || false
   * @param {function} onProgress || false
   * @param {function} onComplete || false
   */
  constructor(props) {
    this.element = props.element || window;
    this.start = props.start || 0;
    this.end = props.end || 1;
    this.duration = props.duration || 1;
    this.intervalDuration = props.intervalDuration || 8;
    this.loop = props.loop || false;
    this.onProgress = props.onProgress || false;
    this.onComplete = props.onComplete || false;

    this.step = (this.end - this.start) / ((this.duration * 1000) / this.intervalDuration);
    this.current = this.start;
    this.state = 'hold';

    this.element.addEventListener('mousedown', this.onHold.bind(this), false);
    this.element.addEventListener('touchstart', this.onHold.bind(this), false);
    this.element.addEventListener('mouseup', this.onRelease.bind(this), false);
    this.element.addEventListener('touchend', this.onRelease.bind(this), false);
  }

  /**
   * Handles mousedown and touchstart events.
   */
  onHold() {
    this.state = 'hold';
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.onStep.bind(this), this.intervalDuration);
  }

  /**
   * Handles every interval update.
   */
  onStep() {
    this.current += (this.state === 'hold' ? this.step : -this.step);

    if (this.current < this.start) {
      this.current = this.start;
      clearInterval(this.interval);
      this.onProgress(this.current);
      return;
    }

    if (this.current > this.end) {
      if (this.loop) {
        this.current = this.start;
      } else {
        this.current = this.end;
      }
      if (this.onComplete !== false) {
        clearInterval(this.interval);
        this.onProgress(this.current);
        this.onComplete();
        return;
      }
    }

    this.onProgress(this.current);
  }

  /**
   * Handles mouseup and touchend events.
   */
  onRelease() {
    this.state = 'release';
  }
}
