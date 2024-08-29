import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  // Mock data for demonstration purposes
  const aggregatedData = {
    prospects: 2250,
    connected: 650,
    messagesSent: 1950,
    replies: 325,
    positiveReplies: 135
  };

  const performanceData = [
    { date: '2023-01-01', connected: 100, messagesSent: 300, replies: 50, positiveReplies: 20 },
    { date: '2023-02-01', connected: 150, messagesSent: 450, replies: 75, positiveReplies: 30 },
    { date: '2023-03-01', connected: 200, messagesSent: 600, replies: 100, positiveReplies: 40 },
    { date: '2023-04-01', connected: 250, messagesSent: 750, replies: 125, positiveReplies: 50 },
    { date: '2023-05-01', connected: 300, messagesSent: 900, replies: 150, positiveReplies: 60 },
  ];

  const bestCampaigns = [
    { name: "Summer Outreach", positiveReplyRate: "15%" },
    { name: "Q4 Sales Push", positiveReplyRate: "12%" },
    { name: "New Product Launch", positiveReplyRate: "10%" },
  ];

  const bestMessages = [
    { content: "Hi {{name}}, I noticed you're in {{industry}}...", positiveReplyRate: "18%" },
    { content: "{{name}}, just following up on my previous message...", positiveReplyRate: "15%" },
    { content: "Last touch - {{name}}, I wanted to share a case study...", positiveReplyRate: "12%" },
  ];

  const opportunities = [
    { name: "John Doe", company: "Tech Corp", status: "Meeting Scheduled" },
    { name: "Jane Smith", company: "Innovate Inc", status: "Proposal Sent" },
    { name: "Bob Johnson", company: "Global Solutions", status: "Negotiation" },
  ];

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
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Aggregated Metrics */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(aggregatedData).map(([key, value]) => (
          <Card key={key} className={`${getColorClass(key)}`}>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}</h2>
              <p className="text-3xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="connected" stackId="1" stroke="#040056" fill="#040056" />
                <Area type="monotone" dataKey="messagesSent" stackId="1" stroke="#DA0EAA" fill="#DA0EAA" />
                <Area type="monotone" dataKey="replies" stackId="1" stroke="#63CDFF" fill="#63CDFF" />
                <Area type="monotone" dataKey="positiveReplies" stackId="1" stroke="#00FFE0" fill="#00FFE0" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Best Performing Campaigns, Messages, and Opportunities */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Best Performing Campaigns</h2>
            <ul className="space-y-2">
              {bestCampaigns.map((campaign, index) => (
                <li key={index} className="flex justify-between">
                  <span>{campaign.name}</span>
                  <span className="font-semibold">{campaign.positiveReplyRate}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Best Performing Messages</h2>
            <ul className="space-y-2">
              {bestMessages.map((message, index) => (
                <li key={index}>
                  <p className="truncate">{message.content}</p>
                  <p className="text-sm font-semibold">{message.positiveReplyRate}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
            <ul className="space-y-2">
              {opportunities.map((opportunity, index) => (
                <li key={index}>
                  <p className="font-semibold">{opportunity.name}</p>
                  <p className="text-sm">{opportunity.company}</p>
                  <p className="text-sm text-gray-600">{opportunity.status}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;