import { useEffect, useState } from "react";
import PlanCard from "../Components/PlanCard";
import usePlans from "../hooks/usePlans";
import axios from "axios";
import { useSelector } from "react-redux";
import { Rootstate } from "../app/store";
import useSubscriptions from "../hooks/useSubscription";
import { Navigate } from "react-router-dom";

const createSession = async (email: string, priceId: string) => {
  const response = await axios.post("http://localhost:8080/sub/session", {
    email,
    priceId,
  });
  const { url } = response.data;
  window.location.href = url;
};

export default function PlanPage() {
  const { data, loading } = usePlans();
  const [
    { data: subscription, loading: subscriptionLoading },
    fetchSubscription,
  ] = useSubscriptions();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const [selectedSession, setSelectedSession] = useState<null | string>(null);
  const { user } = useSelector((state: Rootstate) => state.user.value);

  if (loading || subscriptionLoading) return <div>Loading...</div>;

  if (subscription) {
    return <Navigate to='/plans/manage' />;
  }

  const handleClick = () => {
    if (user && selectedSession) {
      createSession(user.email, selectedSession);
    }
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[600px]'>
        <h1 className='font-semibold text-3xl'>
          Choose a plan that works for you
        </h1>
        <div className='flex mt-4'>
          {data &&
            data.map((plan) => (
              <PlanCard
                plan={plan}
                key={plan.price.id}
                selectedSession={selectedSession}
                setSelectedSession={setSelectedSession}
              />
            ))}
        </div>
        <button
          className={`rounded bg-red-400 p-3 ${
            selectedSession && " hover:bg-red-500"
          } text-white px-10 mt-3 w-full`}
          disabled={!selectedSession}
          onClick={handleClick}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
