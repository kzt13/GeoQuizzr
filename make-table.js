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

	const flagCell = document.createElement("td");
	const flagImg = document.createElement("img");
	flagImg.src = `https://flagpedia.net/data/flags/h80/${country.code}.png`;
	flagImg.alt = `${country.name} Flag`;
	flagCell.appendChild(flagImg);
	row.appendChild(flagCell);

	const countryCell = document.createElement("td");
	const countryLink = document.createElement("a");
	countryLink.href = `code-quiz.html?country=${country.code}`;
	countryLink.textContent = country.name;
	countryCell.appendChild(countryLink);
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
	playButtonCell.appendChild(playButton);
	row.appendChild(playButtonCell);

	tableBody.appendChild(row);
});

