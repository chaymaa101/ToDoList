// Attend que la page soit complètement chargée avant d'exécuter le code
window.addEventListener('load', () => {
    // Sélectionne les éléments HTML nécessaires
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    // Ajoute un écouteur d'événements pour le formulaire d'ajout de tâche
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        const taskText = input.value.trim(); //  recupere la valeur et Supprime les espaces vides au début et à la fin

        if (!taskText) {
            alert("Please enter a task");
            return;
        }

        const task = {
            text: taskText,
            isComplete: false
        };

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        task_el.appendChild(task_content_el);

        const task_checkbox_el = document.createElement('input');
        task_checkbox_el.classList.add('checkbox');
        task_checkbox_el.type = 'checkbox';
        task_checkbox_el.checked = task.isComplete;
        task_content_el.appendChild(task_checkbox_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task.text;
        task_input_el.setAttribute('readonly', 'readonly');
        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_complete_el = document.createElement('button');
        task_complete_el.classList.add('complete-button');
        task_complete_el.innerHTML = "Complete";

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_complete_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);
        list_el.appendChild(task_el);

        input.value = '';

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });

        task_complete_el.addEventListener('click', () => {
            task.isComplete = true;
            updateTaskStatus(task_el, task.isComplete);
        });

        task_checkbox_el.addEventListener('change', () => {
            task.isComplete = task_checkbox_el.checked;
            updateTaskStatus(task_el, task.isComplete);
        });
    });

    function updateTaskStatus(taskElement, isComplete) {
        taskElement.classList.toggle('completed', isComplete);
    }
});
