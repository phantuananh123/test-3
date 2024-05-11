const module = document.getElementById("module");
const name = document.getElementById("name");
const date = document.getElementById("date");
const ul = document.getElementById("ul");
const input = document.getElementById("input");

const moduleData = "Module 1 Technical Interview";
const nameData = "phan duong tuan anh";
const dateData = new Date();
let page = 1;

module.innerHTML = `${moduleData}`;
name.innerHTML = `Learner name: ${nameData}`;
date.innerHTML = `Date: ${dateData}`;
let queryData = "";
console.log(queryData);

const getAllJobs = async (query) => {
  let url = `https://frcz3-8080.csb.app/jobs?&_limit=10&_page=${page}`;
  if (query && query !== "") {
    url += `&q=${query}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const renderJob = async (inputValue) => {
  const data = await getAllJobs(inputValue);
  ul.innerHTML = ``;
  data.map((job) => {
    const x = document.createElement(`li`);
    x.innerHTML = `${job.title}`;
    ul.appendChild(x);
  });
};

const prev = () => {
  if (page > 1) {
    page--;
    renderJob(queryData);
  }
};

const next = () => {
  page++;
  renderJob(queryData);
};

const search = () => {
  const inputValue = input.value;
    if (inputValue !== queryData) {
      page = 1;
    }
  queryData = inputValue;
  renderJob(inputValue);
};

renderJob();
