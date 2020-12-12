const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

async function getQuestions(category, difficulty) {
  const results = await fetchQuestions(category, difficulty);
  const qna = results.map((result) => {
    const mcqs = jumbleMcqs(result.correct_answer, result.incorrect_answers);
    return {
      question: result.question,
      mcqs: mcqs.incorrectOptions,
      correctAnswer: mcqs.randomIndex,
    };
  });

  return qna;
}

async function fetchQuestions(category, difficulty) {
  console.log(`${URL}&category=${category}&difficulty=${difficulty}`);
  const response = await fetch(
    `${URL}&category=${category}&difficulty=${difficulty}`
  );
  const { results } = await response.json();
  return results;
}

function jumbleMcqs(correctOption, incorrectOptions) {
  const randomIndex = Math.floor(Math.random() * 4);
  incorrectOptions.splice(randomIndex, 0, correctOption);
  return { incorrectOptions, randomIndex };
}

export default getQuestions;
