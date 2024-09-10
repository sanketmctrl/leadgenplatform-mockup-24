import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

const CampaignsPage = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: "Summer Outreach",
      totalProspects: 1000,
      prospectsSequenced: 800,
      connectionRequestsSent: 600,
      prospectsMessaged: 750,
      newConnections: 450,
      repliesReceived: 200,
      positiveRepliesReceived: 100
    },
    {
      id: 2,
      name: "Q4 Sales Push",
      totalProspects: 1500,
      prospectsSequenced: 1200,
      connectionRequestsSent: 900,
      prospectsMessaged: 1100,
      newConnections: 700,
      repliesReceived: 300,
      positiveRepliesReceived: 150
    },
  ]);

  const averagePerformance = {
    newConnections: 75,
    repliesReceived: 25,
    positiveRepliesReceived: 12
  };

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1) + '%';
  };

  const getColorClass = (metric) => {
    switch(metric) {
      case 'newConnections': return 'bg-main-blue text-white';
      case 'repliesReceived': return 'bg-sky-blue text-white';
      case 'positiveRepliesReceived': return 'bg-[#00FFE0] text-main-blue';
      default: return 'bg-gray-100 text-main-blue';
    }
  };

  const ComparisonWidget = ({ metric, value, average }) => {
    const difference = value - average;
    const isAbove = difference > 0;
    return (
      <div className={`flex items-center ${isAbove ? 'text-green-500' : 'text-red-500'}`}>
        {isAbove ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
        <span className="text-xs">{Math.abs(difference).toFixed(1)} ppts</span>
        <span className="ml-1 text-xs text-gray-500">({average}% avg)</span>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="relative bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{campaign.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {['totalProspects', 'prospectsSequenced', 'connectionRequestsSent', 'prospectsMessaged'].map((key) => (
              <Card key={key} className="bg-gray-100">
                <CardContent className="p-3">
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 text-main-blue capitalize">{key.split(/(?=[A-Z])/).join(' ')}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-main-blue">
                    {campaign[key]}
                    {key === 'prospectsSequenced' && (
                      <span className="text-sm sm:text-base ml-1 sm:ml-2">
                        ({calculatePercentage(campaign.prospectsSequenced, campaign.totalProspects)})
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: 'newConnections', total: 'connectionRequestsSent', label: 'New Connections' },
              { key: 'repliesReceived', total: 'prospectsMessaged', label: 'Prospects Replied' },
              { key: 'positiveRepliesReceived', total: 'prospectsMessaged', label: 'Positive Prospect Replies' }
            ].map(({ key, total, label }) => (
              <Card key={key} className={getColorClass(key)}>
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold mb-1 capitalize">{label}</h3>
                  <p className="text-xl sm:text-2xl font-bold">{calculatePercentage(campaign[key], campaign[total])}</p>
                  <p className="text-base sm:text-lg">{campaign[key]}</p>
                  <ComparisonWidget 
                    metric={key}
                    value={parseFloat(calculatePercentage(campaign[key], campaign[total]))}
                    average={averagePerformance[key]}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="absolute top-4 right-4">View Details</Button>
        </div>
      ))}
    </div>
  );
};

export default CampaignsPage;