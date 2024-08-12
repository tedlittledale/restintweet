import React, { useEffect, useState } from "react";

const Stat = ({ title, value }: { title: String; value: number }) => {
  return (
    <div className="rounded-xl bg-gray-50 p-2 sm:p-4 shadow-sm">
      <div className="flex p-2 sm:p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`
             rounded-xl bg-white p-2 sm:p-4 text-center text-2xl`}
      >
        {new Intl.NumberFormat().format(value)}
      </p>
    </div>
  );
};

export default function Stats({ visible = true }: { visible: boolean }) {
  console.log("Stats");
  const [statsData, setStatsData] = useState<any>();
  useEffect(() => {
    const fetchStats = async () => {
      const stats = await fetch(`/api/stats`).then((res) => res.json());
      console.log({ stats });
      setStatsData(stats);
    };
    fetchStats();
    return () => {};
  }, []);

  return (
    <section className={`${visible ? "visible" : "hidden"}`}>
      {statsData && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <Stat title="Tweets sent" value={statsData?.tweets} />
          <Stat title="Retweets sent" value={statsData?.retweets} />
          <Stat title="Likes gained" value={statsData?.favorite_count} />
          <Stat title="Retweets gained" value={statsData?.retweet_count} />
          <Stat title="Hashtags used" value={statsData?.hashtags_count} />
          <Stat
            title="Tweets w/ media"
            value={statsData?.video_count + statsData?.image_count}
          />
        </div>
      )}
    </section>
  );
}
