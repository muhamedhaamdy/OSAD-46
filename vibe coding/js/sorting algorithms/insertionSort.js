/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  File:         insertionSort.js                                 ║
 * ║  Project:      Sorting Algorithm Visualizer                     ║
 * ║  Author:       Hamdy                                            ║
 * ║  Purpose:      Implements the Insertion Sort algorithm with     ║
 * ║                per-step visual delay, comparison/swap callbacks, ║
 * ║                and sorted-region tracking for animation.        ║
 * ║  Dependencies: Called by main.js runSort() dispatcher.          ║
 * ║                Receives renderBars, sleep, getSpeed,            ║
 * ║                isRunningFn, onCompare, onSwap as arguments.     ║
 * ║  Structure:    1. insertionSort (main exported async function)  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/* ─── INSERTION SORT ALGORITHM ───────────────────────────────────
   Builds the sorted portion from left to right. For each new
   element, it slides it leftward through the sorted region until
   it finds the correct position. O(n²) worst-case but O(n) on
   nearly-sorted input.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Performs an in-place Insertion Sort on the provided
 *              array, visualising comparisons and shifts with coloured
 *              bars and appropriate delays. The growing sorted region
 *              on the left is highlighted after each insertion.
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
 *        Callback to increment the swap counter.
 * @returns {Promise<void>}
 */
async function insertionSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) {
  const n = array.length;

  /* Track which indices are already in their final sorted position.
     The sorted region grows from the left with each completed insertion. */
  const sortedIndices = { 0: 'sorted' }; // index 0 is trivially sorted

  /* Start from index 1; index 0 is already considered sorted */
  for (let i = 1; i < n; i++) {
    /* Bail out immediately if the user pressed Stop */
    if (!isRunningFn()) return;

    /* Store the current element to be inserted ("key") */
    const key = array[i];

    /* `j` starts one position to the left of the current element */
    let j = i - 1;

    /* Highlight the current element as "pivot" (the element being inserted) */
    const pivotStates = { ...sortedIndices, [i]: 'pivot' };
    renderBars(pivotStates);
    await sleep(getSpeed());

    /* Shift elements of the sorted region that are greater than `key`
       one position to the right to make room for the insertion */
    while (j >= 0) {
      /* Bail out if user stopped */
      if (!isRunningFn()) return;

      /* Record this comparison */
      onCompare();

      /* Show the comparison between the key's future position and j */
      const cmpStates = { ...sortedIndices, [j]: 'comparing', [i]: 'pivot' };
      renderBars(cmpStates);
      await sleep(getSpeed());

      /* If array[j] is larger than key, shift it right */
      if (array[j] > key) {
        /* Record this as a swap (technically a shift, but counted as a swap) */
        onSwap();

        /* Move element at j one position to the right */
        array[j + 1] = array[j];

        /* Show the shift as a swapping animation */
        const swapStates = { ...sortedIndices, [j]: 'swapping', [j + 1]: 'swapping' };
        renderBars(swapStates);
        await sleep(getSpeed());

        /* Move to the next position left */
        j--;
      } else {
        /* key is in its correct position; stop shifting */
        break;
      }
    }

    /* Place the key in its correct position in the sorted region */
    array[j + 1] = key;

    /* Mark all indices from 0 to i as sorted (the sorted region has grown) */
    for (let k = 0; k <= i; k++) {
      sortedIndices[k] = 'sorted';
    }

    /* Render with the updated sorted region */
    renderBars(sortedIndices);
    await sleep(getSpeed());
  }
}
