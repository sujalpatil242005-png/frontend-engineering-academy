/* ============================================================
   quiz.js — one quiz renderer for the whole app.
   Input shape (same for every module):
     [{ q: "question text", opts: ["a","b","c"], correct: 1 }, ...]
   This is the exact shape CSS Academy's *_QUIZ arrays already use,
   so porting CSS Academy's ~50 quizzes in Phase 5 is a data copy,
   not a rewrite. HTML Academy's single inline quiz gets reshaped
   into this same format in Phase 4.
   ============================================================ */

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function renderQuiz(container, questions, opts = {}) {
  if (!questions || !questions.length) {
    container.innerHTML = '';
    return;
  }

  const alreadyBoxed = container.classList.contains('quiz-box');
  const inner = `
      ${questions.map((q, qi) => `
        <div class="quiz-q" data-qindex="${qi}">
          <p class="qtext">${qi + 1}. ${escapeHtml(q.q)}</p>
          <div class="quiz-opts">
            ${q.opts.map((opt, oi) => `
              <div class="quiz-opt" data-qindex="${qi}" data-oindex="${oi}">${escapeHtml(opt)}</div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <button class="btn primary quiz-submit">Check my answers</button>
      <div class="quiz-score" hidden></div>`;

  container.innerHTML = alreadyBoxed ? inner : `<div class="quiz-box">${inner}</div>`;

  const answers = new Array(questions.length).fill(null);

  container.querySelectorAll('.quiz-opt').forEach((optEl) => {
    optEl.addEventListener('click', () => {
      const qi = Number(optEl.dataset.qindex);
      const oi = Number(optEl.dataset.oindex);
      answers[qi] = oi;
      container.querySelectorAll(`.quiz-opt[data-qindex="${qi}"]`).forEach((el) => {
        el.classList.toggle('selected', Number(el.dataset.oindex) === oi);
      });
    });
  });

  const submitBtn = container.querySelector('.quiz-submit');
  const scoreEl = container.querySelector('.quiz-score');

  submitBtn.addEventListener('click', () => {
    let correct = 0;
    questions.forEach((q, qi) => {
      container.querySelectorAll(`.quiz-opt[data-qindex="${qi}"]`).forEach((el) => {
        const oi = Number(el.dataset.oindex);
        el.classList.remove('selected');
        if (oi === q.correct) el.classList.add('correct');
        else if (oi === answers[qi]) el.classList.add('wrong');
      });
      if (answers[qi] === q.correct) correct += 1;
    });
    scoreEl.hidden = false;
    scoreEl.textContent = `${correct} / ${questions.length} correct`;
    if (typeof opts.onComplete === 'function') opts.onComplete(correct, questions.length);
  });
}
