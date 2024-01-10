import { useEffect } from "react";
import useSubscriptions from "../hooks/useSubscription";
import { Navigate } from "react-router-dom";

export default function PlansManagePage() {
  const [{ data, loading, error }, fetchSubscription] = useSubscriptions();
  useEffect(() => {
    fetchSubscription();
  }, []);

  console.log(data, loading, error);
  if (loading) return <div>Loading...</div>;
  if (!loading && !error && !data) {
    return <Navigate to='/plans' />;
  }
  return <div>Manage</div>;
}
