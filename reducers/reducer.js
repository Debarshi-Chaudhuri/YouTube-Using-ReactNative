const initialState={
    videos:[]
}
export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'HOMEPAGE_LOAD':return{
            ...state,videos:action.payload
        }
        default:return state
    }
}