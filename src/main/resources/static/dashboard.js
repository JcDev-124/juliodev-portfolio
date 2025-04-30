// Constantes
const API_BASE_URL = 'https://routinely-diverse-sunbeam.ngrok-free.app/api';
let currentProjectId = null;

// Elementos do DOM
const projectsList = document.getElementById('projectsList');
const createProjectBtn = document.getElementById('createProjectBtn');
const projectModal = document.getElementById('projectModal');
const deleteModal = document.getElementById('deleteModal');
const projectForm = document.getElementById('projectForm');
const messageDiv = document.getElementById('message');

// Funções auxiliares
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-md ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
    messageDiv.classList.remove('hidden');

    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

function showModal(modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function hideModal(modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Carregar projetos
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/all`, {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao carregar projetos');
        }

        const projects = await response.json();
        console.log('Projetos recebidos:', projects);
        renderProjects(projects);
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        showMessage('Erro ao carregar projetos: ' + error.message, 'error');
    }
}

// Renderizar projetos
function renderProjects(projects) {
    console.log('Renderizando projetos:', projects);
    projectsList.innerHTML = projects.map(project => {
        console.log('Projeto atual:', project);
        const projectId = project.id ? Number(project.id) : null;
        if (!projectId) {
            console.error('Projeto sem ID:', project);
            return '';
        }
        return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${project.name}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => `
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">${project.stack}</span>
                    <div class="space-x-2">
                        <button onclick="editProject(${projectId})" class="text-blue-500 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="confirmDelete(${projectId})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `}).join('');
}

// Editar projeto
async function editProject(id) {
    try {
        const projectId = Number(id);
        if (isNaN(projectId)) {
            throw new Error('ID do projeto inválido');
        }

        console.log('Editando projeto com ID:', projectId);
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao carregar projeto');
        }

        const project = await response.json();
        console.log('Projeto carregado:', project);
        currentProjectId = projectId;

        // Preencher formulário
        document.getElementById('projectId').value = projectId;
        document.getElementById('name').value = project.name;
        document.getElementById('description').value = project.description;
        document.getElementById('technologies').value = project.technologies.join(', ');
        document.getElementById('stack').value = project.stack;
        document.getElementById('link').value = project.link;

        // Mostrar imagem atual
        const currentImageDiv = document.getElementById('currentImage');
        const currentImage = currentImageDiv.querySelector('img');
        if (project.imageBase64) {
            currentImage.src = `data:image/jpeg;base64,${project.imageBase64}`;
            currentImageDiv.classList.remove('hidden');
        } else {
            currentImageDiv.classList.add('hidden');
        }

        document.getElementById('modalTitle').textContent = 'Editar Projeto';
        showModal(projectModal);
    } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        showMessage('Erro ao carregar projeto: ' + error.message, 'error');
    }
}

// Confirmar exclusão
function confirmDelete(id) {
    const projectId = Number(id);
    if (isNaN(projectId)) {
        showMessage('ID do projeto inválido', 'error');
        return;
    }

    console.log('Confirmando exclusão do projeto:', projectId);
    currentProjectId = projectId;
    showModal(deleteModal);
}

// Event Listeners
createProjectBtn.addEventListener('click', () => {
    currentProjectId = null;
    projectForm.reset();
    document.getElementById('currentImage').classList.add('hidden');
    document.getElementById('modalTitle').textContent = 'Novo Projeto';
    showModal(projectModal);
});

document.getElementById('closeModal').addEventListener('click', () => {
    hideModal(projectModal);
});

document.getElementById('cancelForm').addEventListener('click', () => {
    hideModal(projectModal);
});

document.getElementById('cancelDelete').addEventListener('click', () => {
    hideModal(deleteModal);
});

document.getElementById('confirmDelete').addEventListener('click', async () => {
    try {
        if (isNaN(currentProjectId)) {
            throw new Error('ID do projeto inválido');
        }

        console.log('Excluindo projeto:', currentProjectId);
        const response = await fetch(`${API_BASE_URL}/projects/${currentProjectId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao excluir projeto');
        }

        showMessage('Projeto excluído com sucesso!', 'success');
        hideModal(deleteModal);
        loadProjects();
    } catch (error) {
        console.error('Erro ao excluir projeto:', error);
        showMessage('Erro ao excluir projeto: ' + error.message, 'error');
    }
});

projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = projectForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Salvando...';

    try {
        const formData = new FormData(projectForm);
        const projectData = {
            name: formData.get('name'),
            description: formData.get('description'),
            technologies: formData.get('technologies').split(',').map(tech => tech.trim()),
            stack: formData.get('stack'),
            link: formData.get('link')
        };

        // Se houver uma nova imagem, converter para base64
        const imageFile = document.getElementById('image').files[0];
        if (imageFile) {
            projectData.imageBase64 = await convertImageToBase64(imageFile);
        } else if (currentProjectId) {
            // Se estiver editando e não houver nova imagem, manter a imagem atual
            const currentImage = document.getElementById('currentImage').querySelector('img');
            if (currentImage && currentImage.src) {
                projectData.imageBase64 = currentImage.src.split(',')[1];
            }
        }

        const url = currentProjectId 
            ? `${API_BASE_URL}/projects/${currentProjectId}`
            : `${API_BASE_URL}/projects/create`;

        console.log('Enviando dados:', projectData);
        const response = await fetch(url, {
            method: currentProjectId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao salvar projeto');
        }

        showMessage('Projeto salvo com sucesso!', 'success');
        hideModal(projectModal);
        loadProjects();
    } catch (error) {
        console.error('Erro ao salvar projeto:', error);
        showMessage('Erro ao salvar projeto: ' + error.message, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Salvar';
    }
});

// Função auxiliar para converter imagem para base64
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

// Inicializar
loadProjects(); 