export const dummyProspects = [
  // ... (previous 22 prospects remain unchanged)
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
  "Connection Request Sent",
  "Connected",
  "Sequenced",
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
  "Not Interested",
  "Wrong Person",
  "Left Company",
  "Unsubscribe/Do Not Contact"
];

export const sortProspects = (prospects, config) => {
  return [...prospects].sort((a, b) => {
    if (config.key === 'status') {
      return (statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)) * (config.direction === 'asc' ? 1 : -1);
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