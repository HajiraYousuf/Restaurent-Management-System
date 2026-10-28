export const initialState = {
    foods:[],
    total:0,
}

const CartReducer = (state,action) =>{
    const { type, payload } = action;

    switch(type) {
        case 'ADD_TO_CART':
            return{
                ...state,
                foods:payload.foods,
            }

        case 'UPDATE_CART_QUANTITY':
            return{
                ...state,
                foods:payload.foods
            }   
            
        case 'REMOVE_FROM_CART' :
            return{
                ...state,
                foods:payload.foods
            }  
            
        case 'CALCULATE_TOTAL_PRICE':
            return{
                ...state,
                total:payload.total,
            }   
        
        case 'CLEAR_CART':
            return initialState;
            
        default:
            throw new Error ("unknown reducer action");     
    }

};
export default CartReducer;