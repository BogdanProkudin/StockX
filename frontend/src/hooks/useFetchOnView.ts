import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FetchArgs {
  sectionName: string;
  page: number | null;
}

interface UseFetchOnViewProps {
  fetchFunction: (args: FetchArgs, shouldFetch: boolean) => void;
  threshold: number; // Позволяет задать threshold
  triggerOnce: boolean; // Позволяет задать triggerOnce
  sectionName: string;
  page: number | null;
}

const useFetchOnView = ({
  fetchFunction,
  sectionName,
  page,
  threshold,
  triggerOnce,
}: UseFetchOnViewProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      fetchFunction({ sectionName, page }, true);
    }
  }, [inView, sectionName, page, fetchFunction]);

  return ref;
};

export default useFetchOnView;
