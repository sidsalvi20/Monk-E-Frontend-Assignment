import {EDIT_PET, DELETE_PET, ADD_PET} from './pet-actions';


const petReducer = (state,action) => {
    switch(action.type){
        
        case ADD_PET:
            return{
                ...state,
                pets: [...state.pets, action.payload]
            }

        case EDIT_PET:
            return {
                ...state,
                pets: state.pets.map((pet,key) => key === action.payload.pid ? {...pet, name:action.payload.pet_name, species:action.payload.pet_species}:pet)
            }
        case DELETE_PET:
            return {
                ...state,
                pets: state.pets.filter((pet,key) => key !== action.payload.pid)
            }

        default:
            return state;

    }
}

export default petReducer;