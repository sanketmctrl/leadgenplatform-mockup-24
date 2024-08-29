import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CampaignsPage = () => {
  const [campaigns] = useState([
    { id: 1, name: "Summer Outreach", prospects: 500, connected: 150, messagesSent: 450, replies: 75, positiveReplies: 30 },
    { id: 2, name: "Q4 Sales Push", prospects: 750, connected: 200, messagesSent: 600, replies: 100, positiveReplies: 45 },
    { id: 3, name: "New Product Launch", prospects: 1000, connected: 300, messagesSent: 900, replies: 150, positiveReplies: 60 },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1) + '%';
  };

  const getColorClass = (metric) => {
    switch(metric) {
      case 'connected': return 'bg-main-blue text-white';
      case 'messagesSent': return 'bg-purple text-white';
      case 'replies': return 'bg-sky-blue text-white';
      case 'positiveReplies': return 'bg-light-blue text-main-blue';
      case 'prospects': return 'text-main-blue';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="cursor-pointer" onClick={() => handleCampaignClick(campaign)}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{campaign.name}</h2>
              <div className="grid grid-cols-5 gap-4">
                {['prospects', 'connected', 'messagesSent', 'replies', 'positiveReplies'].map((metric) => (
                  <div key={metric} className={`p-4 rounded-lg ${getColorClass(metric)}`}>
                    <p className="font-semibold">{metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-2xl font-bold">{campaign[metric]}</p>
                    {metric !== 'prospects' && <p>{calculatePercentage(campaign[metric], campaign.prospects)}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedCampaign && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Message Templates for {selectedCampaign.name}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Step</TableHead>
                <TableHead>Template</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Hi {{name}}, I noticed you're in {{industry}}. Our product might be a great fit...</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>{{name}}, just following up on my previous message. Have you had a chance to consider...</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Last touch - {{name}}, I wanted to share a case study that might be relevant to your role at {{company}}...</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
