/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  File:         mergeSort.js                                     ║
 * ║  Project:      Sorting Algorithm Visualizer                     ║
 * ║  Author:       Hamdy                                            ║
 * ║  Purpose:      Implements the Merge Sort algorithm with         ║
 * ║                recursive divide-and-conquer, per-step visual    ║
 * ║                delay, and comparison/write callbacks. Uses a    ║
 * ║                helper mergeSortHelper for recursion and a merge ║
 * ║                function for combining halves with animation.    ║
 * ║  Dependencies: Called by main.js runSort() dispatcher.          ║
 * ║                Receives renderBars, sleep, getSpeed,            ║
 * ║                isRunningFn, onCompare, onSwap as arguments.     ║
 * ║  Structure:    1. mergeSort (top-level async function)          ║
 * ║                2. mergeSortHelper (recursive divider)           ║
 * ║                3. merge (two-pointer merge with visuals)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/* ─── MERGE SORT ALGORITHM ───────────────────────────────────────
   Divide-and-conquer algorithm. Recursively splits the array in
   half, sorts each half, then merges them back together. Achieves
   O(n log n) in all cases but requires O(n) extra space for the
   temporary merge array. This implementation operates directly on
   the shared `array` (visualised in the bar chart) so that every
   write is immediately rendered.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Entry point for merge sort. Delegates to the recursive
 *              helper `mergeSortHelper` which operates on sub-ranges
 *              of the array.
 * @param {number[]} array — The array of bar heights to sort in place.
 * @param {function(Object.<number, string>): void} renderBars —
 *        Callback to re-draw bars with state highlighting.
 * @param {function(number): Promise<void>} sleep —
 *        Async delay function; pauses for the given milliseconds.
 * @param {function(): number} getSpeed —
 *        Returns the current animation delay in milliseconds.
 * @param {function(): boolean} isRunningFn —
 *        Returns true while the sort should continue (false = user stopped).
 * @param {function(): void} onCompare —
 *        Callback to increment the comparison counter.
 * @param {function(): void} onSwap —
 *        Callback to increment the swap/write counter.
 * @returns {Promise<void>}
 */
async function mergeSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) {
  /* Kick off recursion over the full array range [0, n-1] */
  await mergeSortHelper(array, 0, array.length - 1, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);
}

/* ─── RECURSIVE HELPER ───────────────────────────────────────────
   Splits the range [left, right] into two halves, recursively
   sorts each, then merges them.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Recursively divides the array range [left, right] into
 *              halves and merges them back in sorted order.
 * @param {number[]} array — The array being sorted.
 * @param {number} left — Start index of the current sub-range (inclusive).
 * @param {number} right — End index of the current sub-range (inclusive).
 * @param {function(Object.<number, string>): void} renderBars —
 *        Callback to re-draw bars with state highlighting.
 * @param {function(number): Promise<void>} sleep —
 *        Async delay function.
 * @param {function(): number} getSpeed —
 *        Returns current delay in ms.
 * @param {function(): boolean} isRunningFn —
 *        Returns true while sorting should continue.
 * @param {function(): void} onCompare —
 *        Increments comparison counter.
 * @param {function(): void} onSwap —
 *        Increments swap/write counter.
 * @returns {Promise<void>}
 */
async function mergeSortHelper(array, left, right, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) {
  /* Base case: a single element or invalid range — already sorted */
  if (left >= right) return;

  /* Bail out if the user pressed Stop */
  if (!isRunningFn()) return;

  /* Calculate the midpoint to split the range in half */
  const mid = Math.floor((left + right) / 2);

  /* Recursively sort the left half */
  await mergeSortHelper(array, left, mid, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);

  /* Recursively sort the right half */
  await mergeSortHelper(array, mid + 1, right, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);

  /* Merge the two sorted halves back together with visual feedback */
  await merge(array, left, mid, right, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap);
}

/* ─── MERGE FUNCTION ─────────────────────────────────────────────
   Merges two adjacent sorted sub-arrays [left..mid] and
   [mid+1..right] back into the original array, visualising each
   comparison and write operation.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Merges two sorted halves of the array
 *              ([left..mid] and [mid+1..right]) into a single sorted
 *              region, writing results back to the original array and
 *              rendering each step.
 * @param {number[]} array — The array being sorted.
 * @param {number} left — Start index of the left half (inclusive).
 * @param {number} mid — End index of the left half (inclusive) / midpoint.
 * @param {number} right — End index of the right half (inclusive).
 * @param {function(Object.<number, string>): void} renderBars —
 *        Callback to re-draw bars with state highlighting.
 * @param {function(number): Promise<void>} sleep —
 *        Async delay function.
 * @param {function(): number} getSpeed —
 *        Returns current delay in ms.
 * @param {function(): boolean} isRunningFn —
 *        Returns true while sorting should continue.
 * @param {function(): void} onCompare —
 *        Increments comparison counter.
 * @param {function(): void} onSwap —
 *        Increments swap/write counter.
 * @returns {Promise<void>}
 */
async function merge(array, left, mid, right, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) {
  /* Create temporary copies of the left and right halves */
  const leftArr = array.slice(left, mid + 1);   // elements [left..mid]
  const rightArr = array.slice(mid + 1, right + 1); // elements [mid+1..right]

  let i = 0;           // pointer for leftArr
  let j = 0;           // pointer for rightArr
  let k = left;        // pointer for the write position in the original array

  /* Two-pointer merge: pick the smaller element from leftArr or rightArr
     and write it into the original array at position k */
  while (i < leftArr.length && j < rightArr.length) {
    /* Bail out if the user pressed Stop */
    if (!isRunningFn()) return;

    /* Record this comparison */
    onCompare();

    /* Show the two elements being compared.
       Map the local indices back to global array indices for rendering.
       left + i = current position of leftArr pointer in the original array,
       mid + 1 + j = current position of rightArr pointer. */
    const cmpStates = { [left + i]: 'comparing', [mid + 1 + j]: 'comparing' };
    renderBars(cmpStates);
    await sleep(getSpeed());

    /* Pick the smaller element and write it into position k */
    if (leftArr[i] <= rightArr[j]) {
      /* Left element is smaller or equal — write it */
      array[k] = leftArr[i];
      i++;
    } else {
      /* Right element is smaller — write it */
      array[k] = rightArr[j];
      j++;
    }

    /* Record this write as a swap (element placed into sorted position) */
    onSwap();

    /* Show the write operation by highlighting the position that was just written */
    const writeStates = { [k]: 'swapping' };
    renderBars(writeStates);
    await sleep(getSpeed());

    /* Advance the write pointer */
    k++;
  }

  /* Copy any remaining elements from the left half */
  while (i < leftArr.length) {
    /* Bail out if user stopped */
    if (!isRunningFn()) return;

    /* Write remaining left element into position k */
    array[k] = leftArr[i];

    /* Record the write */
    onSwap();

    /* Show the write */
    const writeStates = { [k]: 'swapping' };
    renderBars(writeStates);
    await sleep(getSpeed());

    i++;
    k++;
  }

  /* Copy any remaining elements from the right half */
  while (j < rightArr.length) {
    /* Bail out if user stopped */
    if (!isRunningFn()) return;

    /* Write remaining right element into position k */
    array[k] = rightArr[j];

    /* Record the write */
    onSwap();

    /* Show the write */
    const writeStates = { [k]: 'swapping' };
    renderBars(writeStates);
    await sleep(getSpeed());

    j++;
    k++;
  }

  /* After merging, briefly highlight the entire merged region as sorted
     to give visual feedback that this sub-range is now in order */
  const mergedStates = {};
  for (let m = left; m <= right; m++) {
    mergedStates[m] = 'sorted';
  }
  renderBars(mergedStates);
  await sleep(getSpeed());
}
