import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

const DashboardPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [selectedPerformanceCampaign, setSelectedPerformanceCampaign] = useState('All Campaigns');

  // Mock data for demonstration purposes
  const generatePerformanceData = (campaign) => ({
    totalProspects: 5000,
    prospectsSequenced: 3500,
    connectionRequestsSent: 2000,
    newConnections: 800,
    messagesSent: 1500,
    repliesReceived: 300,
    positiveRepliesReceived: 150
  });

  const performanceData = {
    totalProspects: 5000,
    prospectsSequenced: 3500,
    connectionRequestsSent: 2000,
    newConnections: 800,
    messagesSent: 1500,
    repliesReceived: 300,
    positiveRepliesReceived: 150
  };

  const generateDailyData = (campaign) => {
    const data = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        newConnections: Math.floor(Math.random() * 50) + 10,
        messagesSent: Math.floor(Math.random() * 150) + 50,
        repliesReceived: Math.floor(Math.random() * 30) + 5,
        positiveRepliesReceived: Math.floor(Math.random() * 15) + 1,
      });
    }
    return data;
  };

  const dailyPerformanceData = generateDailyData(selectedCampaign);

  const campaigns = [
    "All Campaigns",
    "Summer Outreach",
    "Q4 Sales Push",
    "New Product Launch"
  ];

  const bestCampaigns = [
    { name: "Summer Outreach", positiveReplyRate: "15%", description: "Targeting warm leads from previous interactions" },
    { name: "Q4 Sales Push", positiveReplyRate: "12%", description: "End-of-year discounts for enterprise clients" },
    { name: "New Product Launch", positiveReplyRate: "10%", description: "Introducing our latest SaaS solution to the market" },
  ];

  const bestMessages = [
    { content: "Hi {{name}}, I noticed you're in {{industry}}...", positiveReplyRate: "18%", fullContent: "Hi {{name}}, I noticed you're in {{industry}}. Our product has helped similar companies increase productivity by 30%. Would you be interested in a quick demo?" },
    { content: "{{name}}, just following up on my previous message...", positiveReplyRate: "15%", fullContent: "{{name}}, just following up on my previous message. I understand you might be busy, but I wanted to share a case study that's particularly relevant to your role at {{company}}. Do you have 10 minutes for a quick call this week?" },
    { content: "Last touch - {{name}}, I wanted to share a case study...", positiveReplyRate: "12%", fullContent: "Last touch - {{name}}, I wanted to share a case study from a company in your industry that achieved a 50% increase in ROI using our solution. If this piques your interest, I'd be happy to discuss how we could achieve similar results for {{company}}." },
  ];

  const opportunities = [
    { name: "John Doe", company: "Tech Corp", status: "Meeting Scheduled", notes: "Interested in our enterprise solution. Scheduled demo for next Tuesday." },
    { name: "Jane Smith", company: "Innovate Inc", status: "Proposal Sent", notes: "Sent customized proposal focusing on AI integration. Awaiting feedback." },
    { name: "Bob Johnson", company: "Global Solutions", status: "Negotiation", notes: "Discussing pricing terms. Need to follow up on volume discounts." },
  ];

  const getColorClass = (metric) => {
    switch(metric) {
      case 'newConnections': return 'bg-main-blue text-white';
      case 'repliesReceived': return 'bg-sky-blue text-white';
      case 'positiveRepliesReceived': return 'bg-[#00FFE0] text-white';
      case 'totalProspects':
      case 'prospectsSequenced':
      case 'connectionRequestsSent':
      case 'messagesSent':
        return 'bg-gray-100 text-main-blue';
      default: return 'bg-gray-100 text-main-blue';
    }
  };

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1) + '%';
  };

  const averagePerformance = {
    newConnections: 35,
    repliesReceived: 18,
    positiveRepliesReceived: 8
  };

  const ComparisonWidget = ({ metric, value, average }) => {
    const difference = value - average;
    const isAbove = difference > 0;
    return (
      <div className={`flex items-center ${isAbove ? 'text-green-500' : 'text-red-500'}`}>
        {isAbove ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
        <span>{Math.abs(difference).toFixed(1)} pts</span>
        <span className="ml-2 text-gray-500">({average}% avg)</span>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Aggregated Metrics */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Performance Across Campaigns</h2>
          <Select value={selectedPerformanceCampaign} onValueChange={setSelectedPerformanceCampaign}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(performanceData).map(([key, value]) => (
            <Card key={key} className={`${getColorClass(key)}`}>
              <CardContent className="p-3">
                <h2 className="text-sm font-semibold mb-1">{key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                <p className="text-xl font-bold">{value}</p>
                {['newConnections', 'repliesReceived', 'positiveRepliesReceived'].includes(key) && (
                  <p className="text-xs mt-1">
                    {calculatePercentage(value, key === 'newConnections' ? performanceData.connectionRequestsSent : performanceData.messagesSent)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Comparison */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance compared to our average campaigns</h2>
        <div className="grid grid-cols-3 gap-4">
          {['newConnections', 'repliesReceived', 'positiveRepliesReceived'].map((metric) => (
            <Card key={metric} className={getColorClass(metric)}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">{metric.replace(/([A-Z])/g, ' $1').trim()}</h2>
                <p className="text-3xl font-bold">
                  {calculatePercentage(performanceData[metric], metric === 'newConnections' ? performanceData.connectionRequestsSent : performanceData.messagesSent)}
                </p>
                <ComparisonWidget 
                  metric={metric}
                  value={parseFloat(calculatePercentage(performanceData[metric], metric === 'newConnections' ? performanceData.connectionRequestsSent : performanceData.messagesSent))}
                  average={averagePerformance[metric]}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Daily performance across campaigns</h2>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  interval={6}
                />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="newConnections" stackId="1" stroke="#040056" fill="#040056" />
                <Area type="monotone" dataKey="messagesSent" stackId="1" stroke="#DA0EAA" fill="#DA0EAA" />
                <Area type="monotone" dataKey="repliesReceived" stackId="1" stroke="#63CDFF" fill="#63CDFF" />
                <Area type="monotone" dataKey="positiveRepliesReceived" stackId="1" stroke="#00FFE0" fill="#00FFE0" />
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
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Positive Reply Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestCampaigns.map((campaign, index) => (
                    <TableRow key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => alert(`Campaign: ${campaign.name}\nDescription: ${campaign.description}`)}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.positiveReplyRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Best Performing Messages</h2>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Message Preview</TableHead>
                    <TableHead>Positive Reply Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestMessages.map((message, index) => (
                    <TableRow key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => alert(`Full Message:\n${message.fullContent}\n\nPositive Reply Rate: ${message.positiveReplyRate}`)}>
                      <TableCell className="truncate max-w-[200px]">{message.content}</TableCell>
                      <TableCell>{message.positiveReplyRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opportunity, index) => (
                    <TableRow key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => alert(`Opportunity Details:\nName: ${opportunity.name}\nCompany: ${opportunity.company}\nStatus: ${opportunity.status}\nNotes: ${opportunity.notes}`)}>
                      <TableCell>{opportunity.name}</TableCell>
                      <TableCell>{opportunity.company}</TableCell>
                      <TableCell>{opportunity.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
