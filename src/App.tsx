import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import AppRouter from "./router/AppRouter";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./core/api/axios";
import { completeInitialHydration } from "./features/auth/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import Spinner from "./core/components/Spinner";
import { API_ROUTES } from "./core/api/apiRoutes";
import {
  clearPrivateRoom,
  setPrivateRoom,
} from "./features/user/slice/privateRoomSlice";
import {
  InviteState,
  setBulkInvite,
} from "./features/user/slice/inviteState.slice";

const AppContext: React.FC = () => {
  const dispatch = useDispatch();
  const { initialHydrationComplete } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get(API_ROUTES.AUTH_STATUS);
        const { user, accessToken, roomState, pendingInvite } = response.data;

        console.log("hydra ", response.data);
        dispatch(completeInitialHydration({ user, accessToken }));

        const bulkInviteStates: Record<string, InviteState> = {};

        if (roomState) {
          dispatch(setPrivateRoom(roomState));
          const isHost = roomState.hostId === user.id;

          // Room is Active (Jamming)
          if (roomState.status === "jamming") {
            roomState.members.forEach((m: any) => {
              if (m.id !== user.id) bulkInviteStates[m.id] = "connected";
            });
          }
          //  Host interface show pending state of guets (users)
          if (
            isHost &&
            roomState.pendingGuests &&
            Array.isArray(roomState.pendingGuests)
          ) {
            roomState.pendingGuests.forEach((guestId: string) => {
              if (!bulkInviteStates[guestId]) {
                bulkInviteStates[guestId] = "pending";
              }
            });
          }
        }

        // Guest persistence (Before  join any room)
        // If the backend found a pending invite key in Redis for this user
        if (pendingInvite) {
          bulkInviteStates[pendingInvite.hostId] = "recieved";
        }

        dispatch(setBulkInvite(bulkInviteStates));

        if (!roomState) {
          dispatch(clearPrivateRoom());
        }
      } catch (error) {
        console.error("Hydration error:", error);
      }
    };

    if (!initialHydrationComplete) {
      checkAuthStatus();
    }
  }, [dispatch, initialHydrationComplete]);

  if (!initialHydrationComplete) {
    return <Spinner />;
  }

  return <AppRouter />;
};

function App() {
  return (
    <Provider store={store}>
      <AppContext />
    </Provider>
  );
}

export default App;
