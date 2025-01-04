
const taskForm = document.getElementById('task-form');
const taskDescInput = document.getElementById('task-desc');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskContainer = document.getElementById('task-container');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();


taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskDesc = taskDescInput.value.trim();
    const taskDeadline = taskDeadlineInput.value;

    if (!taskDesc || !taskDeadline) {
        alert('Please fill out both the task description and the deadline.');
        return;
    }

    const isDuplicate = tasks.some(task => task.desc === taskDesc && task.deadline === taskDeadline);
    if (isDuplicate) {
        alert('A task with the same description and deadline already exists.');
        return;
    }

    const task = {
        id: Date.now(),
        desc: taskDesc,
        deadline: taskDeadline,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskDescInput.value = '';
    taskDeadlineInput.value = '';
});


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
    taskContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskContent = document.createElement('div');
        taskContent.innerHTML = `
            <strong>${task.desc}</strong><br>
            <small>Deadline: ${new Date(task.deadline).toLocaleString()}</small>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
            }
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        taskContainer.appendChild(taskItem);
    });
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
