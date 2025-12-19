import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './core/store/store';
import AppRouter from './router/AppRouter';
import { useDispatch } from 'react-redux';
import { axiosInstance } from './core/api/axios';
import { completeInitialHydration } from './features/auth/slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from './core/store/store'; 
import Spinner from './core/components/Spinner';
import { API_ROUTES } from './core/api/apiRoutes';
import { clearPrivateRoom, setPrivateRoom } from './features/user/slice/privateRoomSlice';
import { InviteState, setInviteState } from './features/user/slice/inviteState.slice';

const AppContext : React.FC = ()=> {
  const dispatch = useDispatch()
   const {initialHydrationComplete } = useSelector((state: RootState)=> state.auth)
  
  useEffect(()=> {
    const checkAuthStatus = async ()=>{
      try {
        const response = await axiosInstance.get(API_ROUTES.AUTH_STATUS)
        const {user, accessToken, roomState} = response.data
        console.log("hydration suucess", response.data)
        
        dispatch(completeInitialHydration({user, accessToken}))
        if(roomState){
            dispatch(setPrivateRoom(roomState))

            const isHost = roomState.hostId === user.id
            const friendId = isHost ? roomState.guestId : roomState.hostId

            let uiState : InviteState = "none"
            if(roomState.status === "pending"){
              uiState = isHost ? "pending" : "recieved"
            }else if( roomState.status === "jamming"){
              uiState = "connected"
            }

            dispatch(setInviteState({friendId, state: uiState}))
        }else{
            dispatch(clearPrivateRoom())
        }
        
      } catch (error) {
        console.error("hydration error",error)
      }
    }

    if(!initialHydrationComplete){
      checkAuthStatus()
    }
    

  },[dispatch,initialHydrationComplete])

  if(!initialHydrationComplete){
    return <Spinner/>
  }

  return <AppRouter/>
}

function App() {
  return (
    <Provider store={store}>
      <AppContext/>
    </Provider>
  );
}

export default App;
