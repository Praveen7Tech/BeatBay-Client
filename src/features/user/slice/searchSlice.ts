import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState{
    query: string
}

const InitialState: SearchState = {
    query: ""
}

const SearchSlice = createSlice({
    name: 'search',
    initialState: InitialState,
    reducers:{
        setSearchQuery(state, action: PayloadAction<string>){
            state.query = action.payload
        },
        clearSearchQuery(state){
            state.query = ""
        }
    }
})

export const {setSearchQuery, clearSearchQuery} = SearchSlice.actions;

export default SearchSlice.reducer