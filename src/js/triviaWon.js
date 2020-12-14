import { scoreSpan, summary } from "./lib/elements";

export function winScreen(mcqChosenIndex, triviaQuestions, score) {
  scoreSpan.innerHTML = score;
  const reportHTML = generateReport(mcqChosenIndex, triviaQuestions);
  summary.innerHTML = reportHTML.join("");
}

function generateReport(mcqChosenIndex, triviaQuestions) {
  const html = triviaQuestions.map((triviaQuestion, index) => {
    return `
        <div class="summary__result">
        <h3>${triviaQuestion.question}</h3>
        <p>
            ${generateMcqReport(
              triviaQuestion.correctAnswer,
              triviaQuestion.mcqs,
              mcqChosenIndex,
              index
            )}
        </p>
        </div>
        <hr/>
    `;
  });
  return html;
}

function generateMcqReport(correctAnswer, mcqs, mcqChosenIndex, index) {
  let mcqHtml = ``;
  mcqs.forEach((mcq, idx) => {
    if (idx != mcqChosenIndex[index] && idx != correctAnswer) {
      mcqHtml += `<span>${mcq}</span>`;
    } else if (idx != correctAnswer && idx == mcqChosenIndex[index]) {
      mcqHtml += `<span class="incorrect">${mcq}</span>`;
    } else {
      mcqHtml += `<span class="correct">${mcq}</span>`;
    }
  });
  return mcqHtml;
}
