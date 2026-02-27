import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import AppRouter from "./router/AppRouter";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./core/api/axios";
import { completeInitialHydration, User } from "./features/auth/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import Spinner from "./core/components/Spinner";
import { API_ROUTES } from "./core/api/apiRoutes";

const AppContext: React.FC = () => {
  const dispatch = useDispatch();
  const { initialHydrationComplete } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
      const checkAuthStatus = async () => {
        let data: { user: User; accessToken: string } | null = null;

        try {
          const response = await axiosInstance.get(API_ROUTES.AUTH_STATUS);
          data = response.data;
        } catch (error) {
          console.error("Hydration error:", error);
        } finally {
          dispatch(completeInitialHydration(data));
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
