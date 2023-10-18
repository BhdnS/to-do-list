const input = document.querySelector('.footer__input');
const inputBtn = document.querySelector('.footer__btn')
const list = document.querySelector('.list');
const title = document.querySelector('.section__title');
const theme = document.querySelector('#theme')
const wrapper = document.querySelector('.wrapper');
let count = 1;

showTask();

title.innerText = `Number of tasks for today: 1`

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		input.focus();
	}
})

inputBtn.addEventListener('click',createTask);

input.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		createTask();
		saveTask();
	}
});

function createTask() {
	const value = input.value;
	const upCase = 	value.replace(/^\w/, c => c.toUpperCase());
	const text = `
	<li class="list__item">
		<span class="list__text">${count++}. ${upCase}</span>
		<div class="list__box">
			<button class="list__btn">Delete</button>
		</div>
	</li>
	`;

	list.insertAdjacentHTML('beforeend', text);
	input.value = '';
	title.innerText = `Number of tasks for today: ${list.children.length}`
	colorTask();
	saveTask();
};

list.addEventListener('click', (e) => {
	if (e.target.classList.contains('list__btn')) {
		const parentNode = e.target.closest('.list__item');
		parentNode.remove();
	}
	if (list.children.length === 0) {
		count = 1;
	}
	title.innerText = `Number of tasks for today: ${list.children.length}`
	colorTask();
	saveTask();
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Delete') {
		while(list.firstChild) {
			list.removeChild(list.firstChild);
			count = 1;
		}
	}
	title.innerText = `Number of tasks for today: ${list.children.length}`;
	colorTask();
	saveTask();
});

function colorTask() {
	const task = title.textContent;
	const num = task.match(/\d+/);
	const number = parseInt(num[0]);
	if (number <= 3) {
		title.style.backgroundColor = 'green';
	} else if (number <= 8) {
		title.style.backgroundColor = 'yellow';
	} else {
		title.style.backgroundColor = 'red';
	}
};

colorTask();

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  theme.classList.add('dark');
  wrapper.classList.add('theme-dark');
  title.style.color = 'white';
} else {
  theme.classList.add('light');
  title.style.color = 'black';
}

theme.addEventListener('click', (e) => {
	if (e.target.classList.contains('light')) {
		theme.classList.remove('light')
		theme.classList.add('dark');
		wrapper.classList.add('theme-dark');
		title.style.color = 'white';
		localStorage.setItem('theme', 'dark')
	} else if (e.target.classList.contains('dark')) {
		theme.classList.add('light')
		theme.classList.remove('dark');
		wrapper.classList.remove('theme-dark');
		title.style.color = 'black';
		localStorage.setItem('theme', 'light');
	}
});

function saveTask() {
	localStorage.setItem('task', list.innerHTML);
};

function showTask() {
	if(localStorage.getItem('task')) {
		list.innerHTML = localStorage.getItem('task');
	}
};