// 🔥 Add your vacancies here
const vacancies = [
    {
        title: "DFS Vacancy",
        link: "http://dfs.nic.in/vacancy.html",
        isNew: true
    },
    {
        title: "NFSU Current Vacancy",
        link: "https://nfsu.ac.in/career",
        isNew: true
    },
    {
        title: "FSL Delhi Information",
        link: "https://fsl.delhi.gov.in/",
        isNew: false
    },
    {
        title: "UPSIFS Vacancy",
        link: "https://upsifs.ac.in/",
        isNew: false
    }
];

// Render list
const container = document.getElementById("vacancyList");

vacancies.forEach(job => {
    const card = document.createElement("div");
    card.className = "vacancy-card";

    card.innerHTML = `
        <div class="title">
            ${job.title}
            ${job.isNew ? '<span class="badge">NEW</span>' : ''}
        </div>
        <a href="${job.link}" target="_blank" class="apply-btn">
            View Details →
        </a>
    `;

    container.appendChild(card);
});
