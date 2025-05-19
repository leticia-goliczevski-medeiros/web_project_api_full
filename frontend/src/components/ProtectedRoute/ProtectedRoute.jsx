import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import {IsLoggedInContext} from '../../contexts/IsLoggedInContext';

export default function ProtectedRoute({children}) {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  if (!isLoggedIn) {
    return <Navigate to="/signin" />
  }

  return children
}