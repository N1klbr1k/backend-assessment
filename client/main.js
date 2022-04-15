const container = document.querySelector('.container')
const baseURL = 'http://localhost:4000/api/compliment';

const comBtn = document.getElementById("complimentButton")


 const getComp = (evt) => {
    axios.get('baseURL')
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

  combBtn.addEventListener('click', getComp)