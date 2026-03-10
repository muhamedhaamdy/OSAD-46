/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  File:         main.js                                          ║
 * ║  Project:      Sorting Algorithm Visualizer                     ║
 * ║  Author:       Hamdy                                            ║
 * ║  Purpose:      Core application logic — generates random arrays,║
 * ║                renders bars with state highlights, tracks live   ║
 * ║                stats (comparisons, swaps, elapsed time), manages ║
 * ║                the timer, and wires up all event listeners for   ║
 * ║                tabs, sliders, and buttons. Contains a runSort()  ║
 * ║                dispatcher and a markAllSorted() completion       ║
 * ║                handler.                                          ║
 * ║  Dependencies: bubbleSort.js, insertionSort.js, selectionSort.js,║
 * ║                mergeSort.js (loaded before this file via         ║
 * ║                <script> tags in index.html)                      ║
 * ║  Structure:    1. State Variables                                ║
 * ║                2. DOM References                                 ║
 * ║                3. Algorithm Metadata                             ║
 * ║                4. Utility Functions (sleep, generateArray)       ║
 * ║                5. Rendering (renderBars)                         ║
 * ║                6. Stats Tracking                                 ║
 * ║                7. Sort Dispatcher (runSort)                      ║
 * ║                8. Completion Handler (markAllSorted)             ║
 * ║                9. UI Update Helpers                              ║
 * ║               10. Event Listeners                                ║
 * ║               11. Initialisation                                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/* ─── 1. STATE VARIABLES ─────────────────────────────────────────
   Mutable application state shared across functions.
   ──────────────────────────────────────────────────────────────── */

/** @type {number[]} The current array of bar heights to sort */
let array = [];

/** @type {string} Currently selected algorithm key (bubble | insertion | selection | merge) */
let selectedAlgo = 'bubble';

/** @type {boolean} Whether a sort is currently running */
let isRunning = false;

/** @type {number} Count of element comparisons in the current sort */
let comparisons = 0;

/** @type {number} Count of element swaps in the current sort */
let swaps = 0;

/** @type {number|null} setInterval ID for the elapsed-time timer */
let timerInterval = null;

/** @type {number} Elapsed milliseconds since the sort started */
let elapsedMs = 0;

/** @type {number} Timestamp (ms since epoch) when the sort started */
let startTime = 0;

/* ─── 2. DOM REFERENCES ──────────────────────────────────────────
   Cached references to frequently-accessed DOM elements so we
   avoid repeated querySelector calls during animations.
   ──────────────────────────────────────────────────────────────── */

/** Bar chart container element */
const barContainer = document.getElementById('bar-container');

/** Array-size range slider */
const sizeSlider = document.getElementById('size-slider');
/** Live readout span for array size */
const sizeValue = document.getElementById('size-value');

/** Speed / delay range slider */
const speedSlider = document.getElementById('speed-slider');
/** Live readout span for speed */
const speedValue = document.getElementById('speed-value');

/** Action buttons */
const btnRun = document.getElementById('btn-run');
const btnStop = document.getElementById('btn-stop');
const btnRegen = document.getElementById('btn-regenerate');

/** Stat display spans */
const statComparisons = document.getElementById('stat-comparisons');
const statSwaps = document.getElementById('stat-swaps');
const statTime = document.getElementById('stat-time');

/** Complexity table cells */
const complexityBest = document.getElementById('complexity-best');
const complexityAvg = document.getElementById('complexity-avg');
const complexityWorst = document.getElementById('complexity-worst');
const complexitySpace = document.getElementById('complexity-space');

/** Algorithm description paragraph */
const algoDescription = document.getElementById('algo-description');

/** All algorithm tab buttons */
const tabButtons = document.querySelectorAll('.tab-btn');

/** Theme toggle button */
const themeToggle = document.getElementById('theme-toggle');

/* ─── 3. ALGORITHM METADATA ──────────────────────────────────────
   Complexity strings and description text for each algorithm.
   Used by updateAlgoInfo() when the user switches tabs.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Metadata object keyed by algorithm name.
 *              Each entry holds Big-O complexities and a short description.
 * @type {Object.<string, {best: string, avg: string, worst: string, space: string, description: string}>}
 */
const algoMeta = {
  bubble: {
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.'
  },
  insertion: {
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Insertion Sort builds the sorted array one item at a time by repeatedly picking the next element and inserting it into its correct position among the already-sorted elements.'
  },
  selection: {
    best: 'O(n²)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Selection Sort divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region.'
  },
  merge: {
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    description:
      'Merge Sort is a divide-and-conquer algorithm that splits the array in half, recursively sorts each half, and then merges the two sorted halves back together.'
  }
};

/* ─── 4. UTILITY FUNCTIONS ───────────────────────────────────────
   General-purpose helpers used by multiple parts of the app.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Returns a Promise that resolves after `ms` milliseconds.
 *              Used to add visual delay between sort steps.
 * @param {number} ms — Number of milliseconds to wait.
 * @returns {Promise<void>} Resolves when the delay has elapsed.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @description Generates a new random array of integers (values between
 *              10 and the bar container's client height) and stores it
 *              in the global `array` variable. Also resets stats and
 *              re-renders bars.
 * @param {number} [size] — Optional custom size; defaults to the slider value.
 * @returns {void}
 */
function generateArray(size) {
  /* Fall back to slider value if no size is explicitly provided */
  const n = size || parseInt(sizeSlider.value, 10);

  /* Maximum bar height is capped to the container height minus some padding */
  const maxHeight = barContainer.clientHeight - 10 || 340;

  /* Fill array with random integers between 10 and maxHeight */
  array = Array.from({ length: n }, () =>
    Math.floor(Math.random() * (maxHeight - 10) + 10)
  );

  /* Reset statistics for the new array */
  resetStats();

  /* Draw the fresh array on screen */
  renderBars();
}

/**
 * @description Returns the current speed slider value (delay in ms).
 *              Passed into sorting algorithms so they can read the
 *              live speed setting between each step.
 * @returns {number} Current delay in milliseconds.
 */
function getSpeed() {
  return parseInt(speedSlider.value, 10);
}

/**
 * @description Returns whether a sort is currently running.
 *              Sorting algorithms call this before each step to
 *              check if the user pressed Stop.
 * @returns {boolean} True if sorting is active.
 */
function isRunningFn() {
  return isRunning;
}

/* ─── 5. RENDERING ───────────────────────────────────────────────
   Functions that draw / update the bar chart in the DOM.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Clears the bar container and re-renders all bars
 *              from the current `array`. Each bar's height corresponds
 *              to its value, and state classes (comparing, swapping,
 *              pivot, sorted) are applied via the `states` map.
 * @param {Object.<number, string>} [states={}] — Map of array index →
 *        CSS class name to apply (e.g. { 0: 'comparing', 3: 'swapping' }).
 * @returns {void}
 */
function renderBars(states = {}) {
  /* Remove all existing bars */
  barContainer.innerHTML = '';

  /* Calculate bar width: available width divided by the number of bars,
     minus 1px gap between each. Minimum 2px so tiny bars are still visible. */
  const containerWidth = barContainer.clientWidth;
  const barWidth = Math.max(2, (containerWidth / array.length) - 1);

  /* Create and append a <div> for every element in the array */
  array.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');

    /* Set the bar height to match the array value */
    bar.style.height = `${value}px`;
    /* Set the bar width based on calculation above */
    bar.style.width = `${barWidth}px`;

    /* If this index has a state (comparing, swapping, pivot, sorted),
       add the corresponding CSS class */
    if (states[index]) {
      bar.classList.add(states[index]);
    }

    barContainer.appendChild(bar);
  });
}

/* ─── 6. STATS TRACKING ─────────────────────────────────────────
   Functions to reset, increment, and display live counters.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Resets all live stat counters (comparisons, swaps,
 *              elapsed time) to zero and updates the DOM readouts.
 * @returns {void}
 */
function resetStats() {
  comparisons = 0;
  swaps = 0;
  elapsedMs = 0;

  /* Update the DOM text content */
  statComparisons.textContent = '0';
  statSwaps.textContent = '0';
  statTime.textContent = '0 ms';
}

/**
 * @description Increments the comparison counter by 1 and updates
 *              the DOM. Called by sorting algorithms after each
 *              element comparison.
 * @returns {void}
 */
function onCompare() {
  comparisons += 1;
  statComparisons.textContent = comparisons;
}

/**
 * @description Increments the swap counter by 1 and updates the DOM.
 *              Called by sorting algorithms after each element swap.
 * @returns {void}
 */
function onSwap() {
  swaps += 1;
  statSwaps.textContent = swaps;
}

/**
 * @description Starts the elapsed-time timer. Uses setInterval to
 *              update the elapsed milliseconds display every 50ms.
 * @returns {void}
 */
function startTimer() {
  /* Record the start timestamp */
  startTime = performance.now();

  /* Update the timer display every 50ms for a smooth readout */
  timerInterval = setInterval(() => {
    elapsedMs = Math.round(performance.now() - startTime);
    statTime.textContent = `${elapsedMs} ms`;
  }, 50);
}

/**
 * @description Stops the elapsed-time timer by clearing the interval.
 *              Performs one final update so the displayed value is accurate.
 * @returns {void}
 */
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  /* Final accurate reading */
  elapsedMs = Math.round(performance.now() - startTime);
  statTime.textContent = `${elapsedMs} ms`;
}

/* ─── 7. SORT DISPATCHER ────────────────────────────────────────
   Calls the correct sorting algorithm based on the selected tab.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Entry point for starting a sort. Disables controls,
 *              resets stats, starts the timer, calls the appropriate
 *              algorithm function, and re-enables controls on completion.
 * @returns {Promise<void>}
 */
async function runSort() {
  /* Prevent starting a new sort while one is already running */
  if (isRunning) return;

  /* Transition to "running" state */
  isRunning = true;
  btnRun.disabled = true;
  btnRun.classList.add('running'); // triggers the pulse animation
  btnStop.disabled = false;
  btnRegen.disabled = true;

  /* Disable sliders and tabs during the sort to prevent state conflicts */
  sizeSlider.disabled = true;
  tabButtons.forEach(btn => (btn.disabled = true));

  /* Reset counters and start the timer */
  resetStats();
  startTimer();

  /* Dispatch to the correct algorithm based on the selected tab.
     All algorithms share the same function signature:
       async function(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) */
  switch (selectedAlgo) {
    case 'bubble':
      await bubbleSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);
      break;
    case 'insertion':
      await insertionSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);
      break;
    case 'selection':
      await selectionSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);
      break;
    case 'merge':
      await mergeSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);
      break;
  }

  /* Stop the timer now that sorting is complete (or was stopped) */
  stopTimer();

  /* If the sort completed naturally (wasn't stopped), animate all bars as sorted */
  if (isRunning) {
    await markAllSorted();
  }

  /* Transition back to "idle" state */
  isRunning = false;
  btnRun.disabled = false;
  btnRun.classList.remove('running');
  btnStop.disabled = true;
  btnRegen.disabled = false;
  sizeSlider.disabled = false;
  tabButtons.forEach(btn => (btn.disabled = false));
}

/* ─── 8. COMPLETION HANDLER ──────────────────────────────────────
   Sequentially marks each bar as "sorted" with a brief delay to
   create a satisfying green sweep across the chart.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Iterates through every bar and applies the .sorted
 *              class with a staggered delay so the green "sorted"
 *              state sweeps from left to right.
 * @returns {Promise<void>}
 */
async function markAllSorted() {
  /* Build a full states map marking every index as sorted */
  const states = {};
  for (let i = 0; i < array.length; i++) {
    states[i] = 'sorted';

    /* Render with progressively more bars marked sorted */
    renderBars(states);

    /* Short fixed delay per bar for the sweep effect (15ms feels snappy) */
    await sleep(15);
  }
}

/* ─── 9. UI UPDATE HELPERS ───────────────────────────────────────
   Functions that keep the controls panel in sync with the
   selected algorithm.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Updates the complexity table and algorithm description
 *              paragraph to reflect the currently selected algorithm.
 * @returns {void}
 */
function updateAlgoInfo() {
  /* Look up metadata for the selected algorithm */
  const meta = algoMeta[selectedAlgo];

  /* Populate complexity table cells */
  complexityBest.textContent = meta.best;
  complexityAvg.textContent = meta.avg;
  complexityWorst.textContent = meta.worst;
  complexitySpace.textContent = meta.space;

  /* Update the description text */
  algoDescription.textContent = meta.description;
}

/* ─── 10. EVENT LISTENERS ────────────────────────────────────────
   Wires up user interactions: tab clicks, slider changes,
   and button clicks.
   ──────────────────────────────────────────────────────────────── */

/* --- Tab Buttons ---
   Clicking a tab switches the active algorithm, updates styles,
   regenerates the array, and refreshes the info panel. */
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    /* Do nothing if a sort is active */
    if (isRunning) return;

    /* Remove .active from all tabs, add to the clicked one */
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* Update the selected algorithm key from the data attribute */
    selectedAlgo = btn.dataset.algo;

    /* Refresh the complexity table and description */
    updateAlgoInfo();

    /* Generate a new array so the user starts fresh with each algorithm */
    generateArray();
  });
});

/* --- Size Slider ---
   Live-updates the displayed value and regenerates the array
   so the number of bars matches the new size. */
sizeSlider.addEventListener('input', () => {
  /* Update the visible value readout next to the slider label */
  sizeValue.textContent = sizeSlider.value;

  /* Only regenerate if not currently sorting */
  if (!isRunning) {
    generateArray(parseInt(sizeSlider.value, 10));
  }
});

/* --- Speed Slider ---
   Live-updates the displayed speed value. The actual delay is
   read in real time by getSpeed(), so no further action is needed. */
speedSlider.addEventListener('input', () => {
  speedValue.textContent = speedSlider.value;
});

/* --- Run Button ---
   Starts the selected sorting algorithm. */
btnRun.addEventListener('click', () => {
  runSort();
});

/* --- Stop Button ---
   Sets isRunning to false so the next algorithm iteration
   will detect the flag and exit its loop cleanly. */
btnStop.addEventListener('click', () => {
  isRunning = false;
});

/* --- Regenerate Button ---
   Creates a new random array while preserving the current size. */
btnRegen.addEventListener('click', () => {
  if (!isRunning) {
    generateArray();
  }
});

/* --- Theme Toggle ---
   Switches between dark and light mode. Persists the choice
   to localStorage so it survives page reloads. */
themeToggle.addEventListener('click', () => {
  toggleTheme();
});

/* ─── 11. THEME MANAGEMENT ──────────────────────────────────────
   Functions to initialise and toggle the dark/light theme.
   The user's preference is stored in localStorage under the
   key 'sort-viz-theme' so it persists across sessions.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Reads the saved theme preference from localStorage
 *              and applies it to the <html> element. Falls back to
 *              'dark' if no preference is stored. Also updates the
 *              toggle button icon accordingly.
 * @returns {void}
 */
function initTheme() {
  /* Read stored preference, default to 'dark' */
  const saved = localStorage.getItem('sort-viz-theme') || 'dark';

  /* Apply the theme by setting the data attribute on <html> */
  document.documentElement.setAttribute('data-theme', saved);

  /* Update the button icon: moon for dark, sun for light */
  themeToggle.textContent = saved === 'dark' ? '🌙' : '☀️';
}

/**
 * @description Toggles between dark and light themes. Reads the
 *              current theme from the <html> data attribute, flips
 *              it, persists the new value to localStorage, and
 *              updates the toggle button icon.
 * @returns {void}
 */
function toggleTheme() {
  /* Determine the current theme */
  const current = document.documentElement.getAttribute('data-theme') || 'dark';

  /* Flip to the opposite theme */
  const next = current === 'dark' ? 'light' : 'dark';

  /* Apply the new theme */
  document.documentElement.setAttribute('data-theme', next);

  /* Persist the choice so it survives page reloads */
  localStorage.setItem('sort-viz-theme', next);

  /* Update button icon: moon for dark mode, sun for light mode */
  themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
}

/* ─── 12. INITIALISATION ────────────────────────────────────────
   Run on page load: restore theme, set initial info, generate array.
   ──────────────────────────────────────────────────────────────── */

/* Restore the user's saved theme preference (or default to dark) */
initTheme();

/* Populate the complexity table and description for the default algorithm */
updateAlgoInfo();

/* Generate the initial array of bars */
generateArray();
