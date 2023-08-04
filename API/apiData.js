document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://localhost:7285/ActiveControl/api/GetAllUsers';
  
    function fetchData() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const tableBody = document.querySelector('#dataTable tbody');
          tableBody.innerHTML = ''; 
  
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
  
    fetchData();
  
    const refreshButton = document.querySelector('.bx-refresh');
    refreshButton.addEventListener('click', () => {
      fetchData();
    });
  });
  
  function cadastrarFornecedor(event) {
    event.preventDefault();

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    const payload = {
        name: formData.get('renter'),
        contractDate: formData.get('contractDate'),
        status: formData.get('status') === 'Ativo',
        email: formData.get('email')
    };

    // Faça a requisição POST para a API
    fetch('https://localhost:7285/ActiveControl/api/RegisterNewRenter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar fornecedor');
        }
    })
    .then(data => {
        console.log(data);
        alert('Fornecedor cadastrado com sucesso!');
        form.reset();
    })
}