export const dummyProspects = [
  {
    id: 1,
    name: "John Doe",
    organisation: "Tech Corp",
    title: "Software Engineer",
    linkedinUrl: "https://www.linkedin.com/in/johndoe",
    email: "john.doe@techcorp.com",
    activeCampaign: "Summer Outreach",
    status: "For Approval",
    phone: "+1 (555) 123-4567",
    linkedinHeadline: "Passionate Software Engineer | Full Stack Developer",
    linkedinSummary: "Experienced software engineer with a focus on web technologies and cloud computing.",
    location: "San Francisco, CA",
    connections: 500,
    followerCount: 1000,
    organisationLinkedinUrl: "https://www.linkedin.com/company/techcorp",
    website: "https://www.techcorp.com",
    organisationDescription: "Leading technology solutions provider",
    industry: "Information Technology",
    organisationLocation: "Silicon Valley, CA",
    employeeCount: "1001-5000",
    size: "Large Enterprise",
    type: "Public Company",
    organisationFollowerCount: 50000,
    activityStream: [
      { action: "Added to campaign", date: "2023-03-01T10:00:00Z" },
      { action: "Connection request sent", date: "2023-03-02T14:30:00Z" },
      { action: "Connection accepted", date: "2023-03-05T09:15:00Z" },
      { action: "First message sent", date: "2023-03-07T11:00:00Z" },
      { action: "Reply received", date: "2023-03-10T16:45:00Z" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    organisation: "Innovate Inc",
    title: "Product Manager",
    linkedinUrl: "https://www.linkedin.com/in/janesmith",
    email: "jane.smith@innovateinc.com",
    activeCampaign: "Q4 Sales Push",
    status: "Connected",
    phone: "+1 (555) 987-6543",
    linkedinHeadline: "Product Manager | Innovation Enthusiast",
    linkedinSummary: "Experienced product manager with a track record of launching successful products in the tech industry.",
    location: "New York, NY",
    connections: 750,
    followerCount: 1500,
    organisationLinkedinUrl: "https://www.linkedin.com/company/innovateinc",
    website: "https://www.innovateinc.com",
    organisationDescription: "Cutting-edge innovation company",
    industry: "Technology",
    organisationLocation: "New York City, NY",
    employeeCount: "501-1000",
    size: "Mid-Market",
    type: "Private Company",
    organisationFollowerCount: 25000,
    activityStream: [
      { action: "Added to campaign", date: "2023-02-15T09:00:00Z" },
      { action: "Connection request sent", date: "2023-02-16T13:45:00Z" },
      { action: "Connection accepted", date: "2023-02-18T10:30:00Z" },
      { action: "First message sent", date: "2023-02-20T14:00:00Z" },
      { action: "Reply received", date: "2023-02-23T11:15:00Z" },
      { action: "Follow-up message sent", date: "2023-02-25T16:30:00Z" }
    ]
  },
  {
    id: 3,
    name: "Bob Johnson",
    organisation: "Global Solutions",
    title: "Sales Director",
    linkedinUrl: "https://www.linkedin.com/in/bobjohnson",
    email: "bob.johnson@globalsolutions.com",
    activeCampaign: "New Product Launch",
    status: "Meeting Scheduled",
    phone: "+1 (555) 246-8135",
    linkedinHeadline: "Sales Director | B2B Solutions Expert",
    linkedinSummary: "Results-driven sales director with over 15 years of experience in B2B software sales.",
    location: "Chicago, IL",
    connections: 1000,
    followerCount: 2000,
    organisationLinkedinUrl: "https://www.linkedin.com/company/globalsolutions",
    website: "https://www.globalsolutions.com",
    organisationDescription: "Worldwide business solutions provider",
    industry: "Business Services",
    organisationLocation: "Chicago, IL",
    employeeCount: "5001-10000",
    size: "Enterprise",
    type: "Public Company",
    organisationFollowerCount: 75000,
    activityStream: [
      { action: "Added to campaign", date: "2023-01-10T08:30:00Z" },
      { action: "Connection request sent", date: "2023-01-11T11:00:00Z" },
      { action: "Connection accepted", date: "2023-01-13T14:45:00Z" },
      { action: "First message sent", date: "2023-01-15T09:30:00Z" },
      { action: "Reply received", date: "2023-01-18T13:15:00Z" },
      { action: "Follow-up call scheduled", date: "2023-01-20T10:00:00Z" },
      { action: "Meeting scheduled", date: "2023-01-25T15:30:00Z" }
    ]
  }
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

const statusOrder = [
  "For Approval",
  "No Active Campaign",
  "Sequenced",
  "Connection Request Sent",
  "Connected",
  "Awaiting Reply",
  "Interested",
  "Meeting Request",
  "Pricing Request",
  "Referral to Colleague",
  "Future Interest",
  "Needs More Information",
  "Neutral",
  "Out of Office",
  "Other",
  "N/A",
  "Left Company",
  "Wrong Person",
  "Not Interested",
  "Unsubscribe/Do Not Contact"
];

export const sortProspects = (prospects, config) => {
  return [...prospects].sort((a, b) => {
    if (config.key === 'status') {
      const indexA = statusOrder.indexOf(a.status);
      const indexB = statusOrder.indexOf(b.status);
      return config.direction === 'asc' ? indexA - indexB : indexB - indexA;
    }
    if (a[config.key] < b[config.key]) {
      return config.direction === 'asc' ? -1 : 1;
    }
    if (a[config.key] > b[config.key]) {
      return config.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};