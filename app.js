const charId = document.getElementById('charId');
const btnGo = document.getElementById('btnGo');
const btnCreate = document.getElementById('btnCreate');
const btnUpdate = document.getElementById('btnUpdate');
const btnDelete = document.getElementById('btnDelete');
const content = document.getElementById('content');
const image = document.getElementById('img');

// Campos para criação de personagem
const createName = document.getElementById('createName');
const createStatus = document.getElementById('createStatus');
const createSpecies = document.getElementById('createSpecies');

// Campos para atualização de personagem
const updateId = document.getElementById('updateId');
const updateName = document.getElementById('updateName');
const updateStatus = document.getElementById('updateStatus');
const updateSpecies = document.getElementById('updateSpecies');

// Campo para deletar personagem
const deleteId = document.getElementById('deleteId');

// Seções de visibilidade
const createFields = document.getElementById('create-character');
const updateFields = document.getElementById('update-character');
const deleteFields = document.getElementById('delete-character');

// URL base da API
const baseUrl = "https://rickandmortyapi.com/api/api/character";

// Função para buscar um personagem por ID
const fetchApi = (value) => {
  return fetch(`${baseUrl}/${value}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Erro ao buscar dados:', error);
      return null;
    });
};

// Função para criar um personagem (simulado)
const createCharacter = (name, status, species) => { 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000), // ID aleatório
        name,
        status,
        species,
        image: "https://via.placeholder.com/150", // Imagem fictícia
      });
    }, 1000);
  });
};

// Função para atualizar um personagem (simulado)
const updateCharacter = (id, name, status, species) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        image: "https://via.placeholder.com/150", // Imagem fictícia
        name,
        status,
        species,
      });
    }, 1000);
  });
};

// Função para deletar um personagem (simulado)
const deleteCharacter = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: `Personagem ${id} deletado com sucesso!` });
    }, 1000);
  });
};

// Buscar um personagem
btnGo.addEventListener('click', (event) => {
  event.preventDefault();
  fetchApi(charId.value)
    .then((result) => {
      if (result) {
        content.textContent = `Dados do personagem: ${JSON.stringify(result, null, 2)}`;
        image.src = result.image;
      } else {
        content.textContent = 'Personagem não encontrado.';
        image.src = '';
      }
    });
});

// Mostrar campos para criação de personagem
btnCreate.addEventListener('click', () => {
  event.preventDefault();
  createFields.style.display = 'block';
  updateFields.style.display = 'none';
  deleteFields.style.display = 'none';
});

// Criar personagem
btnCreate.addEventListener('click', () => {
  event.preventDefault();
  const name = createName.value;
  const status = createStatus.value;
  const species = createSpecies.value;

  if (name && status && species) {
    createCharacter(name, status, species)
      .then((newCharacter) => {
        content.textContent = `Personagem criado: ${JSON.stringify(newCharacter, null, 2)}`;
        image.src = newCharacter.image;

        // Limpa os campos após a criação
        createName.value = '';
        createStatus.value = '';
        createSpecies.value = '';
      });
  } else {
    content.textContent = "Todos os campos são obrigatórios para criar um personagem.";
  }
});

// Mostrar campos para atualizar personagem
btnUpdate.addEventListener('click', () => {
  event.preventDefault();
  createFields.style.display = 'none';
  updateFields.style.display = 'block';
  deleteFields.style.display = 'none';
});

// Atualizar personagem
btnUpdate.addEventListener('click', () => {
  event.preventDefault();
  const id = updateId.value;
  const name = updateName.value;
  const status = updateStatus.value;
  const species = updateSpecies.value;

  if (id && name && status && species) {
    updateCharacter(id, name, status, species)
      .then((updatedCharacter) => {
        content.textContent = `Personagem atualizado: ${JSON.stringify(updatedCharacter, null, 2)}`;
        image.src = updatedCharacter.image;

        // Limpa os campos após a atualização
        updateId.value = '';
        updateName.value = '';
        updateStatus.value = '';
        updateSpecies.value = '';
      });
  } else {
    content.textContent = "Todos os campos são obrigatórios para atualizar um personagem.";
  }
});

// Mostrar campos para deletar personagem
btnDelete.addEventListener('click', () => {
  event.preventDefault();
  createFields.style.display = 'none';
  updateFields.style.display = 'none';
  deleteFields.style.display = 'block';
});

// Deletar personagem
btnDelete.addEventListener('click', () => {
  event.preventDefault();
  const id = deleteId.value;

  if (id) {
    deleteCharacter(id)
      .then((response) => {
        content.textContent = response.message;
        image.src = '';
        // Limpa o campo de ID após a exclusão
        deleteId.value = '';
      })
      .catch((error) => {
        content.textContent = "Erro ao deletar o personagem.";
        console.error(error);
      });
  } else {
    content.textContent = "Por favor, digite o ID para deletar o personagem.";
  }
});
