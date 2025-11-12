import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthLoading, setAuthFailure } from '../../features/auth/slices/authSlice';
import { showError, showSuccess } from '../utils/toast.config';



export const useApi = <TData extends { message?: string }, TParams = unknown>(
  apiCall: (params: TParams) => Promise<TData>,
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const execute = useCallback(
    async (params: TParams) => {
      setLoading(true);
      dispatch(setAuthLoading());
      setMessage(null);

      try {
        const response = await apiCall(params);
        console.log("reponse ", response)
        setData(response);
        
        if (response.message) {
          setMessage(response.message);
          showSuccess(response.message)
        }

        return response;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setMessage(errorMessage);
        dispatch(setAuthFailure(errorMessage));
        if(errorMessage !== "incorrect"){
          showError(errorMessage);
        }
        
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, dispatch]
  );

  return { data, loading, message, execute };
};

