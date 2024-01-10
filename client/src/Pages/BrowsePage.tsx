import { useCallback, useRef, useState } from "react";
import Billboard from "../Components/Billboard";
import MovieList from "../Components/MovieList";

import NavBar from "../Components/NavBar";
import useMoviesList from "../hooks/useMoviesList";
import LoadingCards from "../Components/LoadingCard";
import { Navigate } from "react-router-dom";

export default function BrowsePage() {
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useMoviesList(offset);

  const observer = useRef<null | IntersectionObserver>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offset + 12);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );
  if (error === "Unauthorized; no plan") return <Navigate to='/plans' />;
  return (
    <div>
      <NavBar />
      <Billboard />
      <div className='pb-5'>
        {data && <MovieList movies={data} lastElementRef={lastElementRef} />}
        {error && <p>error</p>}
        {loading && <LoadingCards />}
      </div>
    </div>
  );
}
