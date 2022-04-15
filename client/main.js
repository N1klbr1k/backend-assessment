const container = document.querySelector('#spellcontainer')
const baseURL = 'http://localhost:4000/api';

const compBtn = document.getElementById("complimentButton")
const fortBtn = document.getElementById("fortuneButton")
const custSpellform = document.getElementById('addCustSpell');


 const getComp = (evt) => {
     evt.preventDefault;
     console.log('this working?')
    axios.get(`${baseURL}/compliment`)
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

  const getFort = (evt) => {
      evt.preventDefault;
      console.log('this working?')
      axios.get(`${baseURL}/fortune`)
      .then( (res) => {
          const data = res.data;
          alert(data);
      })
  }

  const callback = ({data: spells}) => displaySpells(spells)
  const oneSpCallback = ({data:spells}) => displayOneSpell(spells)
  const spellSelect = document.querySelector('select');

  const getAllSpells = () => axios.get(`${baseURL}/spells`).then(callback)
  const getOneSpell = id => axios.get(`${baseURL}/spells/${id}`).then(oneSpCallback)
  const createSpell = body => axios.post(`${baseURL}/spells`, body).then(callback)
  const deleteSpell = id => axios.delete(`${baseURL}/spells/${id}`).then(callback)
  const updateSpell = (id, type) => axios.put(`${baseURL}/spells/${id}`, {type}).then(callback)

  const spellSubmitHandler = (evt) => {
    evt.preventDefault()

    let spellName = document.getElementById('spellName');
    let spDeet = document.getElementById('spellDeets');
    let spLvl = document.getElementById('spellLevel')
    
    let splObj = {
        name: spellName.value,
        details: spDeet.value,
        level: spLvl.value
    }

    createSpell(splObj)

    spellName.value = '';
    spDeet.value = '';
    spLvl.value = 0;
  }

  const createSpellCard = (spell) => {
      const spellCard = document.createElement('div')
      spellCard.classList.add('spell-card')

      spellCard.innerHTML = `<h2>${spell.name}</h2><br>
      <p>Spell details: ${spell.details}</p>
      <button onclick="updateSpell(${spell.id},'increase')">+</button>
      <h3>Spell Level: ${spell.level}</h3>
      <button onclick="updateSpell(${spell.id},'decrease')">-</button><br>
      <button onclick="deleteSpell(${spell.id})"><p>Delete</p></button>
      `
        container.appendChild(spellCard)
    }

    const displaySpells = (arr) => {
        container.innerHTML= ''
        for (let i = 0; i < arr.length; i++){
            createSpellCard(arr[i])
        }
    }

    const displayOneSpell = (arr, id) => {
       
        container.innerHTML= ''
        for(let i = 0; i < arr.length; i++){

        if(arr[i] === (id - 1) ){
        createSpellCard(arr[i])
            }
        }
    }
    const spellSelectHandler = (dropdown) => {
        id = dropdown.value;
        return getOneSpell(id);
    }


  compBtn.addEventListener('click', getComp)

  fortBtn.addEventListener('click', getFort)

  custSpellform.addEventListener('submit',spellSubmitHandler);

  spellSelect.addEventListener('change', spellSelectHandler)

  getAllSpells();