const countries = [
  { code: "br", name: "Brazil", averageScore: "-", maxScore: "-" },
  { code: "cz", name: "Czechia", averageScore: "-", maxScore: "-" },
  { code: "gr", name: "Greece", averageScore: "-", maxScore: "-" },
  { code: "fr", name: "France (3 digits)", averageScore: "-", maxScore: "-" },
  { code: "th", name: "Thailand", averageScore: "-", maxScore: "-" },
  { code: "ua", name: "Ukraine", averageScore: "-", maxScore: "-" },
  { code: "ru", name: "Russia", averageScore: "-", maxScore: "-" },
  { code: "kr", name: "South Korea", averageScore: "-", maxScore: "-" },
  { code: "ph", name: "Philippines", averageScore: "-", maxScore: "-" },
  { code: "uy", name: "Uruguay", averageScore: "-", maxScore: "-" },
  { code: "es", name: "Spain", averageScore: "-", maxScore: "-" },
  { code: "za", name: "South Africa", averageScore: "-", maxScore: "-" },
  { code: "ie", name: "Ireland", averageScore: "-", maxScore: "-" },
  { code: "pl", name: "Poland", averageScore: "-", maxScore: "-" },
  { code: "it", name: "Italy", averageScore: "-", maxScore: "-" },
  { code: "ca", name: "Canada", averageScore: "-", maxScore: "-" },
  { code: "au", name: "Australia", averageScore: "-", maxScore: "-" },
  { code: "nz", name: "New Zealand", averageScore: "-", maxScore: "-" },
];

const tableBody = document.querySelector("#country-table tbody");

countries.forEach(country => {
	const row = document.createElement("tr");

	const countryCell = document.createElement("td");
	const flagImg = document.createElement("img");
	flagImg.src = `https://flagpedia.net/data/flags/h80/${country.code}.png`;
	flagImg.alt = `${country.name} Flag`;
	flagImg.classList.add("flag-img"); /* 追加 */
	countryCell.appendChild(flagImg);
	const countryName = document.createElement("span");
	countryName.textContent = country.name;
  	countryName.classList.add("country-name"); /* 追加 */
	countryCell.appendChild(countryName);
	row.appendChild(countryCell);

	const averageScoreCell = document.createElement("td");
	averageScoreCell.textContent = country.averageScore;
	row.appendChild(averageScoreCell);

	const maxScoreCell = document.createElement("td");
	maxScoreCell.textContent = country.maxScore;
	row.appendChild(maxScoreCell);

	const playButtonCell = document.createElement("td");
	playButtonCell.classList.add("play-button"); // クラスを追加
	const playButton = document.createElement("button");
	playButton.textContent = "Play";
	playButton.addEventListener("click", () => {
	  window.location.href = `code-quiz.html?country=${country.code}`;
	});
	playButtonCell.appendChild(playButton);
	row.appendChild(playButtonCell);

	tableBody.appendChild(row);
});
