/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  File:         selectionSort.js                                 ║
 * ║  Project:      Sorting Algorithm Visualizer                     ║
 * ║  Author:       Hamdy                                            ║
 * ║  Purpose:      Implements the Selection Sort algorithm with     ║
 * ║                per-step visual delay, comparison/swap callbacks, ║
 * ║                and pivot (minimum) highlighting for animation.  ║
 * ║  Dependencies: Called by main.js runSort() dispatcher.          ║
 * ║                Receives renderBars, sleep, getSpeed,            ║
 * ║                isRunningFn, onCompare, onSwap as arguments.     ║
 * ║  Structure:    1. selectionSort (main exported async function)  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/* ─── SELECTION SORT ALGORITHM ───────────────────────────────────
   Divides the array into sorted (left) and unsorted (right) regions.
   On each pass it scans the unsorted region to find the minimum
   element, then swaps it into the position at the boundary of the
   sorted region. Always O(n²) comparisons regardless of input order.
   ──────────────────────────────────────────────────────────────── */

/**
 * @description Performs an in-place Selection Sort on the provided
 *              array, visualising each scan and swap with coloured
 *              bars. The current minimum is highlighted as "pivot"
 *              (yellow) during each scan of the unsorted region.
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
async function selectionSort(array, renderBars, sleep, getSpeed, isRunningFn, onCompare, onSwap) {
  const n = array.length;

  /* Track which indices are already in their final sorted position.
     The sorted region grows from the left as each minimum is placed. */
  const sortedIndices = {};

  /* Outer loop: for each position i, find the minimum in the remaining unsorted portion */
  for (let i = 0; i < n - 1; i++) {
    /* Bail out immediately if the user pressed Stop */
    if (!isRunningFn()) return;

    /* Assume the first unsorted element is the minimum */
    let minIndex = i;

    /* Highlight the assumed minimum as "pivot" (yellow) */
    const initStates = { ...sortedIndices, [minIndex]: 'pivot' };
    renderBars(initStates);
    await sleep(getSpeed());

    /* Inner loop: scan through the rest of the unsorted region to find the actual minimum */
    for (let j = i + 1; j < n; j++) {
      /* Bail out if user stopped */
      if (!isRunningFn()) return;

      /* Record this comparison */
      onCompare();

      /* Highlight the current scan position as "comparing" and
         keep the minimum highlighted as "pivot" */
      const scanStates = { ...sortedIndices, [minIndex]: 'pivot', [j]: 'comparing' };
      renderBars(scanStates);
      await sleep(getSpeed());

      /* Update minimum if a smaller element is found */
      if (array[j] < array[minIndex]) {
        /* The old minimum goes back to default; the new one becomes "pivot" */
        minIndex = j;

        /* Re-render with the new minimum highlighted */
        const newMinStates = { ...sortedIndices, [minIndex]: 'pivot' };
        renderBars(newMinStates);
        await sleep(getSpeed());
      }
    }

    /* If the minimum is not already at position i, swap them */
    if (minIndex !== i) {
      /* Record the swap */
      onSwap();

      /* Perform the actual swap in the array */
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      /* Show both positions in "swapping" colour */
      const swapStates = { ...sortedIndices, [i]: 'swapping', [minIndex]: 'swapping' };
      renderBars(swapStates);
      await sleep(getSpeed());
    }

    /* Position i is now sorted — mark it */
    sortedIndices[i] = 'sorted';
    renderBars(sortedIndices);
  }

  /* The last remaining element is trivially sorted */
  sortedIndices[n - 1] = 'sorted';
  renderBars(sortedIndices);
}
