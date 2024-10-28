import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface UseFetchOnViewProps {
  fetchFunction: any;
  sectionName: string;
  data: any;
}

const useFetchOnView = ({
  fetchFunction,
  sectionName,
  data,
}: UseFetchOnViewProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    console.log("ZXXX", data);

    if (inView) {
      fetchFunction(sectionName, true); // просто вызываем ее и передаем название секции
    }
  }, [inView, sectionName]);

  return ref;
};

export default useFetchOnView;
