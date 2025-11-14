
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {GoogleOAuthProvider} from "@react-oauth/google"
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/hooks/artist/queryClientSetup.ts';
const CLINT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <GoogleOAuthProvider clientId={CLINT_ID}>
    <QueryClientProvider client={queryClient}>
      <App />
     </QueryClientProvider> 
   </GoogleOAuthProvider>   
  //</React.StrictMode>,
);
