// サンプルデータ
const countries = [
  { code: "br", name: "Brazil", averageScore: 80, maxScore: 100 },
  { code: "cz", name: "Czechia", averageScore: 70, maxScore: 95 },
  { code: "gr", name: "Greece", averageScore: 75, maxScore: 90 },
  { code: "fr", name: "France (3 digits)", averageScore: 85, maxScore: 98 },
  { code: "th", name: "Thailand", averageScore: 65, maxScore: 88 },
  { code: "ua", name: "Ukraine", averageScore: 78, maxScore: 94 },
  { code: "ru", name: "Russia", averageScore: 72, maxScore: 89 }
];

const tableBody = document.querySelector("#country-table tbody");

countries.forEach(country => {
	const row = document.createElement("tr");

	const countryCell = document.createElement("td");
	const flagImg = document.createElement("img");
	flagImg.src = `https://flagpedia.net/data/flags/h80/${country.code}.png`;
	flagImg.alt = `${country.name} Flag`;
	countryCell.appendChild(flagImg);
	const countryName = document.createElement("span");
	countryName.textContent = country.name;
	countryCell.appendChild(countryName);
	row.appendChild(countryCell);

	const averageScoreCell = document.createElement("td");
	averageScoreCell.textContent = country.averageScore;
	row.appendChild(averageScoreCell);

	const maxScoreCell = document.createElement("td");
	maxScoreCell.textContent = country.maxScore;
	row.appendChild(maxScoreCell);

	const playButtonCell = document.createElement("td");
	const playButton = document.createElement("button");
	playButton.textContent = "Play";
	playButton.addEventListener("click", () => {
	window.location.href = `code-quiz.html?country=${country.code}`;
	});
	playButtonCell.appendChild(playButton);
	row.appendChild(playButtonCell);

	tableBody.appendChild(row);
});
