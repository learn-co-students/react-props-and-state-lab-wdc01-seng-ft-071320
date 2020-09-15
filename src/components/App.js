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

  onChangeType = (e) => {
    console.log(e)
    this.setState({
      filters: {...this.state.filters, 
      type: e.target.value
      }
    })
  }

  onAdoptPet = (petId) => {
    let newPetsArray = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })
    
  // this.setState({
    //   x.isAdopted : true
    //   })

    this.setState({
      pets: newPetsArray
    })
  }

  onFindPetsClick = () => {
    console.log(this.state.filters.type)
    if (this.state.filters.type === 'all'){
        fetch('/api/pets')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              pets: result
            })
            console.log(result)
          })
    }
    else if (this.state.filters.type === 'cat'){
      fetch('/api/pets?type=cat')
      .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              pets: result})
            console.log(result)
          })
    }
    else if (this.state.filters.type === 'dog'){
      fetch('/api/pets?type=dog')
      .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              pets: result})
            console.log(result)
          })
    }
    else if (this.state.filters.type === 'micropig'){
      fetch('/api/pets?type=micropig')
      .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              pets: result})
            console.log(result)
          })
    }
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
