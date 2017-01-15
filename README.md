# Hold.js
A tiny (no dependency) library for click / touch and hold functionality.
Size: `2.0kb (minified)` and  `0.8kb (gzip)`

# Usage
``` javascript
const hold = new Hold();
```

### Parameters
* `element` *(default: window)* - Element in which the click and touch events should be added.
* `begin` *(default: 0)* - Lowest number from where to begin counting.
* `end` *(default: 1)* - Highest number from where to stop counting.
* `duration` *(default: 1)* - Duration of holding from begin to end (in seconds).
* `intervalDuration` *(default: 8)* - Length of every interval while holding (in ms).
* `loop` *(default: false)* - Use when value reaches end and should start from begin.
* `reset` *(default: false)* - Use when value reaches end and should discontinue the interval and reset current to begin.
* `onProgress` - Callback for every interval. Returns mix of begin and end based on calculated progress).
* `onComplete` - Callback for reaching the end value and stopping the interval. If not provided the interval won't be stopped.


