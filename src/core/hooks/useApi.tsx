import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthLoading, setAuthFailure } from '../../features/auth/slices/authSlice';

export const useApi = <TData, TParams = any>(
  apiCall: (params: TParams) => Promise<TData>,
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const execute = useCallback(
    async (params: TParams) => {
      setLoading(true);
      dispatch(setAuthLoading());
      setError(null);
      try {
        const response = await apiCall(params);
        setData(response);
        console.log("res--",response)
        return response;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
        dispatch(setAuthFailure(errorMessage));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, dispatch]
  );

  return { data, loading, error, execute };
};

