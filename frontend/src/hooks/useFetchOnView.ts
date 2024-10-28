import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface UseFetchOnViewProps {
  fetchFunction: (section: string) => void;
  sectionName: string;
}

const useFetchOnView = ({
  fetchFunction,
  sectionName,
}: UseFetchOnViewProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      fetchFunction(sectionName); // просто вызываем ее и передаем название секции
    }
  }, [inView, fetchFunction, sectionName]);

  return ref;
};

export default useFetchOnView;
