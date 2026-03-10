# ⚡ Sorting Algorithm Visualizer

An interactive web application that visualizes sorting algorithms in real time with a **dark cyberpunk/terminal** aesthetic.

![Sorting Visualizer Screenshot](https://img.shields.io/badge/Status-Complete-brightgreen)

## 🎯 Features

- **4 Sorting Algorithms** — Bubble Sort, Insertion Sort, Selection Sort, Merge Sort
- **Real-Time Animation** — Watch bars change color during comparisons, swaps, and sorted placement
- **Live Statistics** — Comparisons, swaps, and elapsed time updated in real time
- **Interactive Controls** — Adjustable array size and animation speed via sliders
- **Complexity Info** — Big-O time & space complexity table for each algorithm
- **Algorithm Descriptions** — Explains how each algorithm works
- **Color Legend** — Pink (comparing), Cyan (swapping), Yellow (pivot/min), Green (sorted)
- **Responsive Design** — Works on desktop and mobile

## 🚀 Getting Started

No build tools or dependencies required — just open the HTML file in a browser.

```bash
# Clone the repository
git clone https://github.com/muhamedhaamdy/sorting-visualizer.git

# Open in browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## 📂 Project Structure

```
├── index.html                          # Main page structure
├── style.css                           # Dark cyberpunk styling & animations
├── README.md
└── js/
    ├── main.js                         # Core app logic & event handlers
    └── sorting algorithms/
        ├── bubbleSort.js               # Bubble Sort implementation
        ├── insertionSort.js            # Insertion Sort implementation
        ├── selectionSort.js            # Selection Sort implementation
        └── mergeSort.js                # Merge Sort implementation
```

## 🎨 Visual States

| Color | Meaning |
|-------|---------|
| 🟣→🔵 Purple-Cyan gradient | Unsorted (default) |
| 🩷 Pink | Being compared |
| 🩵 Cyan | Being swapped |
| 🟡 Yellow | Pivot / current minimum |
| 🟢 Green | Sorted (final position) |

## 📖 Documentation

Every file is thoroughly documented with:
- **File header blocks** — name, project, author, purpose, dependencies, structure
- **Section comments** — labeled regions dividing each file
- **JSDoc** — `@description`, `@param`, `@returns` on every function
- **Inline comments** — explaining non-obvious logic

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid layout, keyframe animations
- **Vanilla JavaScript** — Async/await for animation, no frameworks

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
