import React, { useState, useEffect } from 'react';

const getRandomQuestion = () => {
  const a = Math.floor(Math.random() * 50) + 1;
  const b = Math.floor(Math.random() * 50) + 1;
  const isAddition = Math.random() > 0.5;
  const question = `${a} ${isAddition ? '+' : '-'} ${b}`;
  const answer = isAddition ? a + b : a - b;

  let answers = new Set([answer]);
  while (answers.size < 4) {
    answers.add(answer + Math.floor(Math.random() * 20) - 10);
  }

  const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);

  return { question, answer, options: shuffledAnswers };
};

export default function FastMathQuiz() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [questionData, setQuestionData] = useState(getRandomQuestion());
  const [gameOver, setGameOver] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      setShowLeaderboard(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (value) => {
    if (value === questionData.answer) {
      setScore(score + 1);
      setQuestionData(getRandomQuestion());
    } else {
      setGameOver(true);
      setShowLeaderboard(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(30);
    setQuestionData(getRandomQuestion());
    setGameOver(false);
    setShowLeaderboard(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">🧠 Fast Math Quiz</h1>
      {showLeaderboard ? (
        <div className="text-center">
          <p className="text-2xl font-semibold text-red-600 mb-2">🏁 Game Over!</p>
          <p className="text-lg mb-4">🎯 Your score: <span className="font-bold">{score}</span></p>
          <div className="bg-blue-100 p-4 rounded-xl shadow-md mb-4">
            <p className="text-lg font-semibold mb-2 text-blue-800">🏆 Leaderboard</p>
            <ul className="text-left text-blue-900">
              <li>👤 You: {score} pts</li>
              <li>🥇 Alice: 15 pts</li>
              <li>🥈 Bob: 12 pts</li>
              <li>🥉 Carol: 9 pts</li>
            </ul>
          </div>
          <button onClick={handleRestart} className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-600">🔄 Play Again</button>
        </div>
      ) : (
        <>
          <div className="text-xl mb-2 font-medium text-gray-700 text-center">⏱ Time Left: <span className="font-bold">{timeLeft}s</span></div>
          <div className="text-4xl font-bold text-blue-700 mb-6 bg-blue-50 rounded-xl px-6 py-4 shadow-md text-center">
            {questionData.question} = ?
          </div>

          <div className="w-full max-w-xs bg-blue-100 rounded-2xl p-4 shadow-lg mb-4">
            <div className="grid grid-cols-2 gap-4">
              {questionData.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(opt)}
                  className="bg-white text-xl font-semibold text-blue-800 px-4 py-3 rounded-xl shadow hover:bg-blue-200 w-full"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 text-lg text-blue-700 font-medium text-center">Score: <span className="font-bold">{score}</span></div>
        </>
      )}
    </div>
  );
}
