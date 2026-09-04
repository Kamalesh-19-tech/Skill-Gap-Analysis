import React, { useState } from 'react';


const cardImage = 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'; // Game controller icon
const rewardsData = [
   {
      id: 1,
      title: 'Amazon Gift Card',
      image: cardImage,
      points: 6000,
      offer: 'LIMITED TIME OFFER',
      redeemUrl: '#',
   },
   {
      id: 2,
      title: 'Flipkart Gift Card',
      image: cardImage,
      points: 6500,
      redeemUrl: '#',
   },
   {
      id: 3,
      title: 'Myntra Gift Card',
      image: cardImage,
      points: 10000,
      redeemUrl: '#',
   },
   {
      id: 4,
      title: 'LeetCode Premium',
      image: cardImage,
      points: 8000,
      redeemUrl: '#',
   },
   {
      id: 5,
      title: 'Zomato Voucher',
      image: cardImage,
      points: 7000,
      redeemUrl: '#',
   },
   {
      id: 6,
      title: 'Uber Ride Credit',
      image: cardImage,
      points: 9000,
      redeemUrl: '#',
   },
];

const RewardsPage = () => {
    const [search, setSearch] = useState('');
    const filteredRewards = rewardsData.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-200">
                    Rewards
                </h1>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="md:w-1/4">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full p-3 bg-slate-800 border border-blue-800 rounded-lg mb-4 text-white placeholder-blue-300"
                        />
                        <div className="mb-4">
                            <div className="font-semibold mb-2 text-blue-300">Show</div>
                            <div className="bg-slate-800 p-2 rounded-lg border border-blue-800 text-blue-200">
                                All categories
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold mb-2 text-blue-300">Sort by</div>
                            <div className="bg-slate-800 p-2 rounded-lg border border-blue-800 mb-2 text-blue-200">
                                Suggested for you
                            </div>
                            <div className="bg-slate-800 p-2 rounded-lg border border-blue-800 mb-2 text-blue-200">
                                Price low to high
                            </div>
                            <div className="bg-slate-800 p-2 rounded-lg border border-blue-800 text-blue-200">
                                Price high to low
                            </div>
                        </div>
                    </div>
                    <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRewards.map(reward => (
                            <div
                                key={reward.id}
                                className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 rounded-xl shadow-2xl overflow-hidden relative flex flex-col border border-blue-800"
                            >
                                {reward.offer && (
                                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 z-10">
                                        {reward.offer}
                                    </div>
                                )}
                                <img
                                    src={reward.image}
                                    alt={reward.title}
                                    className="w-full h-40 object-contain bg-slate-800"
                                    onError={e => { e.target.onerror = null; e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'; }}
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="font-bold text-lg mb-2 text-white">
                                            {reward.title}
                                        </h2>
                                        <div className="text-blue-400 font-semibold text-md mb-2">
                                            {reward.points.toLocaleString()} points
                                        </div>
                                    </div>
                                    <a
                                        href={reward.redeemUrl}
                                        className="mt-4 text-blue-400 font-bold text-sm underline"
                                    >
                                        REDEEM REWARD &gt;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center mb-8">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition">
                        SIGN IN TO START EARNING &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RewardsPage;
