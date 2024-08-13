import React, { useEffect, useState, useRef, useCallback, memo } from "react";

import WordCloud from "react-d3-cloud";

const data = [
  { text: "Hey", value: 1000 },
  { text: "lol", value: 200 },
  { text: "first impression", value: 800 },
  { text: "very cool", value: 1000000 },
  { text: "duck", value: 10 },
];

const Keywords = ({
  visible = true,
  setSelectedKeyword,
}: {
  visible: boolean;
  setSelectedKeyword: any;
}) => {
  console.log("Stats");
  const [keywordsData, setKeywordsData] = useState<any>();
  useEffect(() => {
    const fetchStats = async () => {
      const stats = await fetch(`/api/keywords`).then((res) => res.json());
      console.log({ stats });
      setKeywordsData(stats);
    };
    fetchStats();
    return () => {};
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  console.log({ containerWidth, keywordsData });
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      const handleResize = () => {
        containerRef.current &&
          setContainerWidth(containerRef.current.offsetWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const onWordClick = useCallback((e: any) => {
    setSelectedKeyword(e.syntheticEvent.target.textContent);
  }, []);

  return (
    <div
      className={`w-full my-6 relative z-0 ${
        visible ? "visible" : "hidden"
      } md:scale-150 `}
      ref={containerRef}
      style={{ transformOrigin: "center" }}
    >
      {!!keywordsData?.length ? (
        <WordCloud
          data={
            keywordsData
              ? keywordsData.map(
                  ({ keyword, count }: { keyword: string; count: number }) => ({
                    text: keyword,
                    value: count,
                  })
                )
              : []
          }
          onWordClick={onWordClick}
          rotate={(word) => 0}
          fill={() => "#fff"}
          width={containerWidth}
          height={containerWidth / 2}
        />
      ) : null}
    </div>
  );
};

export default memo(Keywords);
