export default function TrainingsServices() {

const serverUrl = "https://customerrest.herokuapp.com/api";    

const addTraining = (newTraining) => {
    return fetch(serverUrl + '/trainings',
    { method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(newTraining)
  })
  }

}