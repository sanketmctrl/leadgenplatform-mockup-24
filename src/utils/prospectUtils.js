export const dummyProspects = [
  {
    id: 1,
    name: "John Doe",
    organisation: "Tech Corp",
    title: "Software Engineer",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    email: "john.doe@techcorp.com",
    activeCampaign: "Summer Outreach",
    status: "Connected",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 123-456-7890",
    linkedinHeadline: "Passionate Software Engineer | AI Enthusiast",
    linkedinSummary: "Experienced software engineer with a focus on AI and machine learning...",
    location: "San Francisco, CA",
    connections: 500,
    followerCount: 1000,
    organisationLinkedinUrl: "https://linkedin.com/company/techcorp",
    website: "https://techcorp.com",
    organisationDescription: "Leading technology solutions provider...",
    industry: "Information Technology",
    organisationLocation: "Silicon Valley, CA",
    employeeCount: 1000,
    size: "Medium Enterprise",
    type: "Public Company",
    organisationFollowerCount: 50000,
    activityStream: [
      { date: "2023-03-15T09:30:00Z", action: "Added to campaign 'Summer Outreach'" },
      { date: "2023-03-16T14:45:00Z", action: "Connection request sent" },
      { date: "2023-03-18T11:20:00Z", action: "Connection accepted" },
      { date: "2023-03-20T16:00:00Z", action: "Initial message sent" },
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    organisation: "Innovate Inc",
    title: "Product Manager",
    linkedinUrl: "https://linkedin.com/in/janesmith",
    email: "jane.smith@innovateinc.com",
    activeCampaign: "Q4 Sales Push",
    status: "For Approval",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 987-654-3210",
    linkedinHeadline: "Product Manager | Innovation Enthusiast",
    linkedinSummary: "Experienced product manager with a passion for innovative solutions...",
    location: "New York, NY",
    connections: 750,
    followerCount: 1500,
    organisationLinkedinUrl: "https://linkedin.com/company/innovateinc",
    website: "https://innovateinc.com",
    organisationDescription: "Leading innovation company...",
    industry: "Technology",
    organisationLocation: "New York, NY",
    employeeCount: 500,
    size: "Small Enterprise",
    type: "Private Company",
    organisationFollowerCount: 30000,
    activityStream: [
      { date: "2023-04-01T10:00:00Z", action: "Added to campaign 'Q4 Sales Push'" },
      { date: "2023-04-02T11:30:00Z", action: "Pending approval" },
    ]
  },
];

export const getStatusColor = (status) => {
  const positiveStatuses = ["Connected", "Meeting Request", "Interested", "Pricing Request", "Referral to Colleague", "Future Interest"];
  const neutralStatuses = ["No Active Campaign", "Sequenced", "Connection Request Sent", "Awaiting Reply", "Needs More Information", "Neutral", "Out of Office", "Other", "N/A", "For Approval"];
  const negativeStatuses = ["Left Company", "Wrong Person", "Not Interested", "Unsubscribe/Do Not Contact"];

  if (positiveStatuses.includes(status)) return "bg-green-100 text-green-800";
  if (neutralStatuses.includes(status)) return "bg-yellow-100 text-yellow-800";
  if (negativeStatuses.includes(status)) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

export const getActivityColor = (action) => {
  if (action.includes("Added to campaign")) return "text-blue-600";
  if (action.includes("Connection request sent")) return "text-yellow-600";
  if (action.includes("Connection accepted")) return "text-green-600";
  if (action.includes("message sent")) return "text-purple-600";
  if (action.includes("reply received")) return "text-indigo-600";
  return "text-gray-600";
};