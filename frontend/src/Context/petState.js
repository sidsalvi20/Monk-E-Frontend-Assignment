import React,{ useReducer } from 'react';
import { EDIT_PET, DELETE_PET, ADD_PET } from './pet-actions';
import petContext from './pet-context';
import petReducer from './pet-reducer';

const axios = require('axios');

const PetState = (props) => {

    
    
   
    
    
   const initialState = {
       pets:[]
   }
    console.log(initialState);
    const [state, dispatch] = useReducer(petReducer, initialState);

   const addPet = (pet) => {

    dispatch({
        type: ADD_PET,
        payload: pet
    })
   }

    const editPet = (petID,name,species) => {
        dispatch({
            type: EDIT_PET,
            payload: {pid:petID,pet_name:name,pet_species:species}


        })
    }

    const deletePet = (petID) => {
        dispatch({
            type: DELETE_PET,
            payload: {pid:petID}
        })
    }

    return(
        <petContext.Provider value = {{
            pets: state.pets,
            addPet,
            editPet,
            deletePet
        }}>
        {props.children}
        </petContext.Provider>
    )
}

export default PetState;