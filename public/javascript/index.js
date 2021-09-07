const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {

  // LISTA DE TODOS LOS MINIONS
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
    .getFullList()
    .then (response => {
      let text = ''
      response.data.forEach(elm=> { text +=
        `<div class="character-info">
          <div class="name">Character Name : ${elm.name}</div>
          <div class="occupation">Character Occupation: ${elm.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${elm.cartoon}</div>
          <div class="weapon">Character Weapon: ${elm.weapon}</div>
        </div>`
      })
      document.querySelector('.characters-container').innerHTML = text
    })
    .catch (err => console.log('ERROR', err))
  });



  // ELEGIR UN MINION
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const id = document.querySelector('#character-id').value
    document.querySelector('#character-id').value = ''

    charactersAPI
    .getOneRegister(id)
    .then(response => {
      const { name, occupation, cartoon, weapon } = response.data
      let text =
      `<div class="character-info">
          <div class="name">Character Name : ${name}</div>
          <div class="occupation">Character Occupation: ${occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${cartoon}</div>
          <div class="weapon">Character Weapon: ${weapon}</div>
        </div>`
      document.querySelector('.characters-container').innerHTML = text  
    })
    .catch (err => console.log('ERROR', err))
  });



  // BORRAR MINION
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.querySelector('#character-id-delete').value;
    document.querySelector('#character-id-delete').value = ''

    charactersAPI
    .deleteOneRegister(id)
    .then(response => {
      if(response.data){
        document.querySelector('#delete-one').classList.add('active')
        setTimeout(() => document.querySelector('delete-one').classList.remove('active'), 3000)
      } else {
        document.querySelector('#delete-one').classList.add('desactive')
        setTimeout(() => document.querySelector('delete-one').classList.remove('desactive'), 3000)
      }
      
    })
    .catch (err => console.log('ERROR', err))
  });


  // EDITAR MINION
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()
    const inputs = document.querySelectorAll('#edit-character-form input')
    const id = inputs[0].value

		const characterInfo = {
			name: inputs[1].value,
			occupation: inputs[2].value,
			weapon: inputs[3].value,
			cartoon: inputs[4].checked,
		};

		charactersAPI
			.updateOneRegister(id, characterInfo)
			.then(response => {
				document.querySelector('#edit-character-form').reset()
        if(response.data){
          document.querySelector('#send-data-update').classList.add('active')
          setTimeout(() => document.querySelector('edit-character-form').classList.remove('active'), 3000)
        }
			})
			.catch((err) => {
				console.error(err);
			});
  });


  // CREAR UN NUEVO MINION
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    
    event.preventDefault()
		const inputs = document.querySelectorAll('#new-character-form input');

		const characterInfo = {
			name: inputs[0].value,
			occupation: inputs[1].value,
			weapon: inputs[2].value,
      cartoon: inputs[3].checked,
		};
    console.log(characterInfo)

		charactersAPI
			.createOneRegister(characterInfo)
			.then(response => {
        document.querySelector('#new-character-form').reset()
        if(response.data){
          document.querySelector('#send-data-create').classList.add('active')
          setTimeout(() => document.querySelector('new-character-form').classList.remove('active'), 3000)
        }
			})
			.catch((err) => {
				console.error(err);
			});
  });
});
