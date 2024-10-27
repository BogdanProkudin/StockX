import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch } from "../redux/hook";

const useFetchOnView = (fetchAction: () => any) => {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      dispatch(fetchAction());
    }
  }, [inView, dispatch, fetchAction]);

  return ref;
};

export default useFetchOnView;
