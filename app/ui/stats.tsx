import React, { useEffect, useState } from "react";

export default function Stats() {
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
    <section>
      {statsData && (
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h3 className="ml-2 text-sm font-medium">Original Tweets</h3>
            </div>
            <p
              className={`
          truncate rounded-xl bg-white px-4 py-4 text-center text-2xl`}
            >
              {new Intl.NumberFormat().format(statsData?.tweets)}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h3 className="ml-2 text-sm font-medium">Retweets</h3>
            </div>
            <p
              className={`
          truncate rounded-xl bg-white px-4 py-4 text-center text-2xl`}
            >
              {new Intl.NumberFormat().format(statsData?.retweets)}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h3 className="ml-2 text-sm font-medium">Likes gained</h3>
            </div>
            <p
              className={`
          truncate rounded-xl bg-white px-4 py-4 text-center text-2xl`}
            >
              {new Intl.NumberFormat().format(statsData?.favorite_count)}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h3 className="ml-2 text-sm font-medium">Retweets gained</h3>
            </div>
            <p
              className={`
          truncate rounded-xl bg-white px-4 py-4 text-center text-2xl`}
            >
              {new Intl.NumberFormat().format(statsData?.retweet_count)}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h3 className="ml-2 text-sm font-medium">Hashtags used</h3>
            </div>
            <p
              className={`
          truncate rounded-xl bg-white px-4 py-4 text-center text-2xl`}
            >
              {new Intl.NumberFormat().format(statsData?.hashtags_count)}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h3 className="ml-2 text-sm font-medium">Tweets with media</h3>
            </div>
            <p
              className={`
          truncate rounded-xl bg-white px-4 py-4 text-center text-2xl`}
            >
              {new Intl.NumberFormat().format(
                statsData?.video_count + statsData?.image_count
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
