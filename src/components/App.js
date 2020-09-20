import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilter=(val)=>{
    this.setState({
      filters:{
        type: val
      }
    })
  }

  fetchPets=()=>{
    let url = ""
    if(this.state.filters.type ==='all'){url='/api/pets'}
    else{url=`/api/pets?type=${this.state.filters.type}`}
    fetch(url)
    .then(res=>res.json())
    .then(pets=>this.setState({
      pets: pets
    }))
  }

  onAdoptPet=(petId)=>{
    let newPetArray= this.state.pets.map(pet=>{
      if(pet.id===petId){
        return{...pet,isAdopted: true}
        // pet.isAdopted=true
      }
      return pet
    })
    this.setState({pets: newPetArray})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilter} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
