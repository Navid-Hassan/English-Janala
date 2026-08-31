const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json())
        .then(data => displayLessons(data.data))
};
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");

    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn border-[#422AD5] text-[#422AD5] rounded-[4px] hover:bg-blue-600 hover:text-white group"><img class="transition-all duration-75 group-hover:brightness-[0] group-hover:invert" src="./assets/fa-book-open.png" alt=""> Lesson -${lesson.level_no} </button>
        `;
        levelContainer.append(btnDiv);
    }
};


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data, id))
};
const displayLevelWord = (words, id) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (id === 7) {
        wordContainer.innerHTML = `
            <div class="col-span-3 space-y-3 py-10 flex flex-col items-center justify-center">
                <img class="" src="./assets/alert-error.png" alt="">
                <p class="text-sm  text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-3xl font-medium text-gray-900">নেক্সট Lesson এ যান</h1>
            </div>
        `
        return;
    };
    words.forEach(word => {

        const card = document.createElement("div");
        card.innerHTML = `
    <div class="bg-white p-5 text-center rounded-[12px] shadow-mid aspect-auto">
        <h1 class="text-l font-bold">${word.word}</h1>
        <p class="text-sm font-light">Meaning /Pronounciation</p>
        <p class="text-l font-semibold pt-2 hind-siliguri">"${word.meaning} / ${word.pronunciation}"</p>
        <div class="flex justify-between">
          <div class="transition-all duration-75 hover:bg-gray-400 items-center bg-gray-100 rounded-[8px] size-[3.5rem] flex justify-center hover:cursor-pointer"><i class="fa-solid fa-circle-info"></i></div>
          <div class="transition-all duration-75 hover:bg-gray-400 size-[3.5rem] bg-gray-100 rounded-[8px] flex justify-center items-center hover:cursor-pointer"><i class="fa-solid fa-volume-high"></i></div>
        </div>
      </div>
    `
        wordContainer.append(card);
    });
}


loadLessons();