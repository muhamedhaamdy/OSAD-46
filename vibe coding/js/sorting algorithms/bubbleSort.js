/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  File:         bubbleSort.js                                    ║
 * ║  Project:      Sorting Algorithm Visualizer                     ║
 * ║  Author:       Hamdy                                            ║
 * ║  Purpose:      Implements the Bubble Sort algorithm with        ║
 * ║                per-step visual delay, comparison/swap callbacks, ║
 * ║                and sorted-region tracking for animation.        ║
 * ║  Dependencies: Called by main.js runSort() dispatcher.          ║
 * ║                Receives renderBars, sleep, getSpeed,            ║
 * ║                isRunningFn, onCompare, onSwap as arguments.     ║
 * ║  Structure:    1. bubbleSort (main exported async function)     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/* ─── BUBBLE SORT ALGORITHM ──────────────────────────────────────
   Classic O(n²) algorithm that repeatedly walks through the array,
   swapping adjacent out-of-order elements. After each full pass the
   largest unsorted element "bubbles" to its correct position at the
   end, so the sorted region grows from the right.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Performs an in-place Bubble Sort on the provided array,
 *              visualising each comparison and swap step with coloured
 *              bars and appropriate delays.
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
async function bubbleSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) {
  const n = array.length;

  /* Track which indices are already in their final sorted position.
     Entries are accumulated from the right as each pass completes. */
  const sortedIndices = {};

  /* Outer loop: each pass places one more element in its final position */
  for (let i = 0; i < n - 1; i++) {
    /* Flag to detect if no swaps occurred (array is already sorted) */
    let swapped = false;

    /* Inner loop: walk through the unsorted portion, comparing neighbours */
    for (let j = 0; j < n - 1 - i; j++) {
      /* Bail out immediately if the user pressed Stop */
      if (!isRunningFn()) return;

      /* Record the comparison in stats */
      onCompare();

      /* Build the state map: mark j and j+1 as "comparing", keep sorted markers */
      const states = { ...sortedIndices, [j]: 'comparing', [j + 1]: 'comparing' };
      renderBars(states);

      /* Wait for the user-defined delay so the step is visible */
      await sleep(getSpeed());

      /* If the left element is greater than the right, swap them */
      if (array[j] > array[j + 1]) {
        /* Record the swap in stats */
        onSwap();

        /* Perform the actual swap in the array */
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        /* Show both indices in "swapping" colour */
        const swapStates = { ...sortedIndices, [j]: 'swapping', [j + 1]: 'swapping' };
        renderBars(swapStates);

        /* Brief extra delay so the swap colour is visible */
        await sleep(getSpeed());

        /* Mark that a swap happened so we know the array isn't fully sorted yet */
        swapped = true;
      }
    }

    /* After this pass, position (n - 1 - i) is guaranteed sorted */
    sortedIndices[n - 1 - i] = 'sorted';

    /* Re-render with the newly sorted bar highlighted */
    renderBars(sortedIndices);

    /* Early exit optimisation: if no swaps occurred, the array is sorted */
    if (!swapped) {
      /* Mark all remaining unsorted bars as sorted since the array is now in order */
      for (let k = 0; k < n - i; k++) {
        sortedIndices[k] = 'sorted';
      }
      renderBars(sortedIndices);
      break;
    }
  }

  /* Mark the very first element as sorted (it's the last one remaining) */
  sortedIndices[0] = 'sorted';
  renderBars(sortedIndices);
}
