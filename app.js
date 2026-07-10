const quotes = [
  {
    id: 1,
    text: "Small steps become great journeys when you take them consistently."
  },
  {
    id: 2,
    text: "Your future changes the moment your habits change."
  },
  {
    id: 3,
    text: "Progress begins when excuses end."
  },
  {
    id: 4,
    text: "A difficult beginning can still lead to a remarkable ending."
  },
  {
    id: 5,
    text: "Do not wait for confidence; build it through action."
  },
  {
    id: 6,
    text: "Success is often hidden inside ordinary days of disciplined work."
  },
  {
    id: 7,
    text: "The courage to begin is more valuable than the desire to be perfect."
  },
  {
    id: 8,
    text: "Every mistake can become a lesson when pride does not block the way."
  },
  {
    id: 9,
    text: "You grow whenever you choose effort over comfort."
  },
  {
    id: 10,
    text: "A clear goal turns hard work into meaningful progress."
  },
  {
    id: 11,
    text: "The life you want is built by the choices you repeat."
  },
  {
    id: 12,
    text: "Fear becomes smaller when you move toward it."
  },
  {
    id: 13,
    text: "You do not need more time; you need a clearer priority."
  },
  {
    id: 14,
    text: "Patience is not inactivity; it is disciplined persistence."
  },
  {
    id: 15,
    text: "Your attitude can turn an obstacle into a training ground."
  },
  {
    id: 16,
    text: "The strongest people are often those who kept going quietly."
  },
  {
    id: 17,
    text: "Dreams become plans when you give them deadlines."
  },
  {
    id: 18,
    text: "Do not measure your beginning against someone else's middle."
  },
  {
    id: 19,
    text: "Consistency can achieve what motivation alone cannot."
  },
  {
    id: 20,
    text: "A better life is created one better decision at a time."
  },
  {
    id: 21,
    text: "The work you avoid today often becomes the regret you carry tomorrow."
  },
  {
    id: 22,
    text: "You discover your strength only after life asks you to use it."
  },
  {
    id: 23,
    text: "Learning is the bridge between where you are and where you want to be."
  },
  {
    id: 24,
    text: "A closed door may simply be directing you toward a better entrance."
  },
  {
    id: 25,
    text: "Your limits often exist longer in your thoughts than in reality."
  },
  {
    id: 26,
    text: "Discipline is choosing what matters most over what feels easiest now."
  },
  {
    id: 27,
    text: "Every expert once struggled with the basics."
  },
  {
    id: 28,
    text: "You cannot control every event, but you can control your response."
  },
  {
    id: 29,
    text: "The right direction matters more than the fastest speed."
  },
  {
    id: 30,
    text: "Your potential grows when you stop asking permission to use it."
  },
  {
    id: 31,
    text: "Hard seasons often prepare you for meaningful opportunities."
  },
  {
    id: 32,
    text: "A calm mind can solve problems that panic makes larger."
  },
  {
    id: 33,
    text: "Success starts with believing that improvement is possible."
  },
  {
    id: 34,
    text: "You become reliable by keeping promises made to yourself."
  },
  {
    id: 35,
    text: "The smallest act of courage can change the direction of your life."
  },
  {
    id: 36,
    text: "Do not fear slow progress; fear standing still without purpose."
  },
  {
    id: 37,
    text: "Your daily routine is quietly writing your future."
  },
  {
    id: 38,
    text: "Growth begins when you become honest about what must change."
  },
  {
    id: 39,
    text: "A setback is not a final result unless you stop there."
  },
  {
    id: 40,
    text: "The effort no one sees often creates the success everyone notices."
  },
  {
    id: 41,
    text: "You are more capable than your most doubtful moment suggests."
  },
  {
    id: 42,
    text: "Purpose gives energy to work that once felt difficult."
  },
  {
    id: 43,
    text: "A meaningful goal can make temporary discomfort worth enduring."
  },
  {
    id: 44,
    text: "Your next opportunity may be hiding behind your next attempt."
  },
  {
    id: 45,
    text: "Improvement does not require perfection; it requires repetition."
  },
  {
    id: 46,
    text: "The best time to correct your direction is the moment you notice the mistake."
  },
  {
    id: 47,
    text: "Confidence grows from evidence, and evidence grows from action."
  },
  {
    id: 48,
    text: "You cannot rewrite yesterday, but you can influence every page that follows."
  },
  {
    id: 49,
    text: "The habit of finishing is more powerful than the excitement of starting."
  },
  {
    id: 50,
    text: "Every challenge teaches something comfort never could."
  },
  {
    id: 51,
    text: "Focus is the ability to say no to what distracts you from what matters."
  },
  {
    id: 52,
    text: "You do not find your path by waiting; you find it by walking."
  },
  {
    id: 53,
    text: "A strong future is built from ordinary moments used wisely."
  },
  {
    id: 54,
    text: "Your progress may be invisible before it becomes undeniable."
  },
  {
    id: 55,
    text: "When the plan fails, improve the plan instead of abandoning the goal."
  },
  {
    id: 56,
    text: "The person you become matters as much as the result you achieve."
  },
  {
    id: 57,
    text: "Difficult work becomes easier when it is connected to a meaningful reason."
  },
  {
    id: 58,
    text: "You can begin again without returning to the beginning."
  },
  {
    id: 59,
    text: "Every day offers another chance to become more intentional."
  },
  {
    id: 60,
    text: "The strength to continue often appears after you decide not to quit."
  },
  {
    id: 61,
    text: "Your environment shapes your habits, so design it carefully."
  },
  {
    id: 62,
    text: "A disciplined hour can create more progress than a distracted day."
  },
  {
    id: 63,
    text: "The willingness to learn keeps failure from being wasted."
  },
  {
    id: 64,
    text: "Great results often come from improving small things repeatedly."
  },
  {
    id: 65,
    text: "You cannot build a new life with the habits that created the old one."
  },
  {
    id: 66,
    text: "Action turns uncertainty into experience."
  },
  {
    id: 67,
    text: "The courage to ask questions is the beginning of wisdom."
  },
  {
    id: 68,
    text: "A goal without effort is only a pleasant thought."
  },
  {
    id: 69,
    text: "Your response to difficulty reveals the direction of your character."
  },
  {
    id: 70,
    text: "Persistence is continuing after the excitement has disappeared."
  },
  {
    id: 71,
    text: "Do not underestimate the power of showing up prepared."
  },
  {
    id: 72,
    text: "The mind becomes stronger when it learns to stay focused under pressure."
  },
  {
    id: 73,
    text: "A temporary failure cannot define a person who continues learning."
  },
  {
    id: 74,
    text: "Your best work begins when you stop waiting for perfect conditions."
  },
  {
    id: 75,
    text: "Ambition gives you a destination; discipline gives you a route."
  },
  {
    id: 76,
    text: "You gain freedom when you stop being controlled by every passing feeling."
  },
  {
    id: 77,
    text: "The most valuable progress often happens before anyone applauds."
  },
  {
    id: 78,
    text: "A thoughtful pause can prevent a careless decision."
  },
  {
    id: 79,
    text: "The future rewards those who prepare before opportunity becomes visible."
  },
  {
    id: 80,
    text: "You become stronger each time you choose responsibility over blame."
  },
  {
    id: 81,
    text: "A difficult goal becomes manageable when divided into daily actions."
  },
  {
    id: 82,
    text: "Your attention is valuable; spend it on what helps you grow."
  },
  {
    id: 83,
    text: "Change becomes possible when comfort is no longer your highest priority."
  },
  {
    id: 84,
    text: "The willingness to start imperfectly is a powerful advantage."
  },
  {
    id: 85,
    text: "A lesson learned through failure can become a lifelong strength."
  },
  {
    id: 86,
    text: "Your standards shape your decisions, and your decisions shape your life."
  },
  {
    id: 87,
    text: "The distance between intention and achievement is filled with action."
  },
  {
    id: 88,
    text: "Do not let one bad moment become an unnecessary bad day."
  },
  {
    id: 89,
    text: "Wisdom grows when experience is followed by reflection."
  },
  {
    id: 90,
    text: "The results you want usually require routines you have not yet created."
  },
  {
    id: 91,
    text: "A patient mind can continue working while others become discouraged."
  },
  {
    id: 92,
    text: "You build self-respect by doing what you said you would do."
  },
  {
    id: 93,
    text: "The hardest part of change is often releasing what feels familiar."
  },
  {
    id: 94,
    text: "A focused beginner can eventually surpass a distracted expert."
  },
  {
    id: 95,
    text: "Your circumstances may influence you, but they do not have to define you."
  },
  {
    id: 96,
    text: "Every meaningful achievement begins as an uncertain first attempt."
  },
  {
    id: 97,
    text: "You improve faster when you seek feedback instead of avoiding it."
  },
  {
    id: 98,
    text: "A clear purpose makes sacrifice easier to understand."
  },
  {
    id: 99,
    text: "The path becomes clearer after you take the first few steps."
  },
  {
    id: 100,
    text: "Become the kind of person your future goals require."
  }
];

function generateQuote(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex].text;
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("new-quote-btn");
  const display = document.getElementById("quote-display");

  function showQuote() {
    display.textContent = generateQuote(quotes);
  }

  button.addEventListener("click", showQuote);
  showQuote();
});