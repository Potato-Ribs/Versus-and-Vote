import { useEffect } from "react";

export const useLoading = (setLoading) => {
  useEffect(() => {
    setLoading(true);
    // 로딩이미지 애니메이션 재생중에 스크롤을 막습니다.
    document.body.style.overflow = "hidden";
    // setTimeout을 비동기적으로 실행하기 위해 Promise를 정의했습니다.
    const wait = (timeToDelay) =>
      new Promise((resolve) => setTimeout(resolve, timeToDelay));

    return async () => {
      await wait(1000);
      document.body.style.overflow = "auto";
      setLoading(false);
    };
  }, [setLoading]);
};
