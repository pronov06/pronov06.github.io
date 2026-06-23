export class SplitTextHelper {
  elements: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  originalHTMLs: { element: HTMLElement; html: string }[] = [];

  constructor(
    target: any,
    options: { type?: string; linesClass?: string } = {}
  ) {
    let targets: HTMLElement[] = [];
    if (typeof target === "string") {
      targets = Array.from(document.querySelectorAll(target));
    } else if (Array.isArray(target)) {
      target.forEach((t: any) => {
        if (typeof t === "string") {
          targets = targets.concat(Array.from(document.querySelectorAll(t)));
        } else if (t instanceof HTMLElement) {
          targets.push(t);
        }
      });
    } else if (target instanceof HTMLElement) {
      targets = [target];
    } else if (target instanceof NodeList) {
      targets = Array.from(target) as HTMLElement[];
    }

    this.elements = targets;

    targets.forEach((element) => {
      // Save original HTML so we can revert it
      this.originalHTMLs.push({ element, html: element.innerHTML });

      const text = element.textContent || "";
      element.innerHTML = ""; // Clear existing contents

      const types = options.type || "chars,lines";
      const wordsArr = text.trim().split(/\s+/);
      const wordElements: HTMLElement[] = [];
      const charElements: HTMLElement[] = [];

      wordsArr.forEach((wordText, wIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        if (types.includes("chars")) {
          Array.from(wordText).forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "split-char";
            charSpan.style.display = "inline-block";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
            charElements.push(charSpan);
          });
        } else {
          wordSpan.textContent = wordText;
        }

        element.appendChild(wordSpan);
        wordElements.push(wordSpan);

        // Add a space between words, unless it's the last word
        if (wIdx < wordsArr.length - 1) {
          element.appendChild(document.createTextNode(" "));
        }
      });

      this.words = this.words.concat(wordElements);
      this.chars = this.chars.concat(charElements);

      // If linesClass is specified, wrap in a line container
      if (options.linesClass) {
        const wrapperSpan = document.createElement("span");
        wrapperSpan.className = options.linesClass;
        wrapperSpan.style.display = "block";
        wrapperSpan.style.position = "relative";
        
        while (element.firstChild) {
          wrapperSpan.appendChild(element.firstChild);
        }
        element.appendChild(wrapperSpan);
        this.lines.push(wrapperSpan);
      }
    });
  }

  revert() {
    this.originalHTMLs.forEach(({ element, html }) => {
      element.innerHTML = html;
    });
  }
}
