// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}


// ——————————————————————————————————————————————————
// Lines
// ——————————————————————————————————————————————————

const phrases = [
  'Hey Sanju,',
  'I promise to be the constant in your life,',
  'never leaving your side',
  'through the highs and lows,',
  'the joys and sorrows.',
  'I will always support you,',
  'lifting you up when you need strength',
  'and standing by you when you need someone to lean on.',
  'I promise to guide and mentor you',
  'as you chase after your dreams,',
  'providing unwavering support',
  'and helping you overcome any obstacles that come your way.',
  'You are not just a part of my life,',
  'but a cherished member of my family.',
  'I wholeheartedly embrace your family as my own,',
  'celebrating their joys and sharing their sorrows.',
  'These promises I make to you',
  'are not mere words, but a lifelong commitment',
  'to follow through with love, care, and devotion.',
  'You are the one who has captured my heart',
  'in a way no one else ever could.',
  'I promise you, my love,',
  'to never look at another girl',
  'for my heart belongs to you alone.',
  'Every other girl in the world',
  'is like a sister to me,',
  'because my love for you is unmatched.',
  'With you, I want to build a future',
  'where our lives merge into one,',
  'our dreams intertwine,',
  'and our love shines brighter than ever.',
  'Just trust me and take this leap with me,',
  'and together, we will create a love story',
  'that is more beautiful than any fairytale.',
];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 100);
  });
  counter = (counter + 1) % phrases.length;
};

next();