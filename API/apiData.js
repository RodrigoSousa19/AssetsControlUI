document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://localhost:7285/ActiveControl/api/GetAllUsers'; // Substitua pelo endpoint correto da sua API
  
    // Função para obter e exibir os dados da API na tabela
    function fetchData() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const tableBody = document.querySelector('#dataTable tbody');
          tableBody.innerHTML = ''; // Limpa os dados existentes na tabela
  
          data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item.userName}</td>
              <td>${item.email}</td>
              <td>${item.costCenterid}</td>
            `;
            tableBody.appendChild(row);
          });
        })
        .catch(error => console.error('Erro ao obter dados da API:', error));
    }
  
    // Chama a função fetchData ao carregar a página para exibir os dados iniciais
    fetchData();
  
    // Adiciona um evento de clique no botão "Atualizar" para obter os dados novamente
    const refreshButton = document.querySelector('.bx-refresh');
    refreshButton.addEventListener('click', () => {
      fetchData();
    });
  });
  