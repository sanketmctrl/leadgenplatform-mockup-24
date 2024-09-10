import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { DatePicker } from "@/components/ui/date-picker";
import { format, subDays, subMonths, isWithinInterval } from 'date-fns';

const DashboardPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [performanceData, setPerformanceData] = useState({});
  const [dailyPerformanceData, setDailyPerformanceData] = useState([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 30 Days');
  const [customDateRange, setCustomDateRange] = useState({ start: null, end: null });

  const campaigns = [
    "All Campaigns",
    "Summer Outreach",
    "Q4 Sales Push",
    "New Product Launch"
  ];

  const channels = [
    "All Channels",
    "Email",
    "LinkedIn",
    "Email & LinkedIn"
  ];

  // Mock data generation functions
  const generatePerformanceData = (campaign, channel) => {
    // Implement mock data generation logic here
    return {
      newConnections: Math.floor(Math.random() * 100),
      repliesReceived: Math.floor(Math.random() * 50),
      positiveRepliesReceived: Math.floor(Math.random() * 25)
    };
  };

  const generateDailyData = (campaign, channel, startDate, endDate) => {
    const data = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      data.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        newConnections: Math.floor(Math.random() * 10),
        repliesReceived: Math.floor(Math.random() * 5),
        positiveRepliesReceived: Math.floor(Math.random() * 3)
      });
      currentDate = subDays(currentDate, -1);
    }
    return data;
  };

  const getDateRangeForTimePeriod = (period) => {
    const endDate = new Date();
    let startDate;

    switch (period) {
      case 'Last 7 Days':
        startDate = subDays(endDate, 6);
        break;
      case 'Last 14 Days':
        startDate = subDays(endDate, 13);
        break;
      case 'Last Month':
        startDate = subMonths(endDate, 1);
        break;
      case 'Last 6 Months':
        startDate = subMonths(endDate, 6);
        break;
      case 'All Time':
        startDate = new Date(2020, 0, 1); // Arbitrary start date
        break;
      case 'Custom Date Range':
        return { 
          startDate: customDateRange.start || subDays(endDate, 29),
          endDate: customDateRange.end || endDate
        };
      default: // 'Last 30 Days'
        startDate = subDays(endDate, 29);
    }

    return { startDate, endDate };
  };

  useEffect(() => {
    setPerformanceData(generatePerformanceData(selectedCampaign, selectedChannel));
    const { startDate, endDate } = getDateRangeForTimePeriod(selectedTimePeriod);
    setDailyPerformanceData(generateDailyData(selectedCampaign, selectedChannel, startDate, endDate));
  }, [selectedCampaign, selectedChannel, selectedTimePeriod, customDateRange]);

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
      case 'positiveRepliesReceived': return 'bg-[#00FFE0] text-main-blue';
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
        {isAbove ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
        <span className="text-xs">{Math.abs(difference).toFixed(1)} ppts</span>
        <span className="ml-1 text-xs text-gray-500">({average}% avg)</span>
      </div>
    );
  };

  const PerformanceAcrossCampaigns = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Performance Across Campaigns</h2>
      <div className="flex space-x-4">
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Campaign" />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Channel" />
          </SelectTrigger>
          <SelectContent>
            {channels.map((channel) => (
              <SelectItem key={channel} value={channel}>{channel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(performanceData).map(([key, value]) => (
          <Card key={key} className={getColorClass(key)}>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <p className="text-2xl font-bold">{calculatePercentage(value, 100)}</p>
              <p className="text-lg">{value}</p>
              <ComparisonWidget 
                metric={key}
                value={value}
                average={averagePerformance[key]}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const PerformanceChart = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Performance Over Time</h2>
      <div className="flex space-x-4 items-center">
        <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Period" />
          </SelectTrigger>
          <SelectContent>
            {['Last 7 Days', 'Last 14 Days', 'Last 30 Days', 'Last Month', 'Last 6 Months', 'All Time', 'Custom Date Range'].map((period) => (
              <SelectItem key={period} value={period}>{period}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedTimePeriod === 'Custom Date Range' && (
          <div className="flex space-x-2">
            <DatePicker
              selected={customDateRange.start}
              onSelect={(date) => setCustomDateRange(prev => ({ ...prev, start: date }))}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={customDateRange.end}
              onSelect={(date) => setCustomDateRange(prev => ({ ...prev, end: date }))}
              placeholderText="End Date"
            />
          </div>
        )}
      </div>
      <Card>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="newConnections" stackId="1" stroke="#040056" fill="#040056" />
              <Area type="monotone" dataKey="repliesReceived" stackId="1" stroke="#63CDFF" fill="#63CDFF" />
              <Area type="monotone" dataKey="positiveRepliesReceived" stackId="1" stroke="#00FFE0" fill="#00FFE0" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const BestPerformingSection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Best Performing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Top Campaigns</h3>
            <ScrollArea className="h-48">
              {bestCampaigns.map((campaign, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{campaign.name}</p>
                  <p className="text-sm text-gray-600">{campaign.positiveReplyRate} positive reply rate</p>
                  <p className="text-sm text-gray-500">{campaign.description}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Top Messages</h3>
            <ScrollArea className="h-48">
              {bestMessages.map((message, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{message.content}</p>
                  <p className="text-sm text-gray-600">{message.positiveReplyRate} positive reply rate</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Opportunities</h3>
            <ScrollArea className="h-48">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{opportunity.name} - {opportunity.company}</p>
                  <p className="text-sm text-gray-600">{opportunity.status}</p>
                  <p className="text-sm text-gray-500">{opportunity.notes}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <PerformanceAcrossCampaigns />
      <PerformanceChart />
      <BestPerformingSection />
    </div>
  );
};

export default DashboardPage;