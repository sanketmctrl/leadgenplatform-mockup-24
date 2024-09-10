import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const dummyProspects = [
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
      { date: "2023-03-15", action: "Added to campaign 'Summer Outreach'" },
      { date: "2023-03-16", action: "Connection request sent" },
      { date: "2023-03-18", action: "Connection accepted" },
      { date: "2023-03-20", action: "Initial message sent" },
    ]
  },
  // ... Add 19 more dummy prospects here with similar structure but different data
];

const getStatusColor = (status) => {
  const positiveStatuses = ["Connected", "Meeting Request", "Interested", "Pricing Request", "Referral to Colleague", "Future Interest"];
  const neutralStatuses = ["No Active Campaign", "Sequenced", "Connection Request Sent", "Awaiting Reply", "Needs More Information", "Neutral", "Out of Office", "Other", "N/A"];
  const negativeStatuses = ["Left Company", "Wrong Person", "Not Interested", "Unsubscribe/Do Not Contact"];

  if (positiveStatuses.includes(status)) return "bg-green-100 text-green-800";
  if (neutralStatuses.includes(status)) return "bg-yellow-100 text-yellow-800";
  if (negativeStatuses.includes(status)) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const ProspectsPage = () => {
  const [selectedProspect, setSelectedProspect] = useState(null);

  const handleProspectClick = (prospect) => {
    setSelectedProspect(prospect);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prospects</h1>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Active Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyProspects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>{prospect.name}</TableCell>
                  <TableCell>{prospect.organisation}</TableCell>
                  <TableCell>{prospect.title}</TableCell>
                  <TableCell>
                    <a href={prospect.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      LinkedIn Profile
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={`mailto:${prospect.email}`} className="text-blue-500 hover:underline">
                      {prospect.email}
                    </a>
                  </TableCell>
                  <TableCell>{prospect.activeCampaign}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(prospect.status)}>{prospect.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleProspectClick(prospect)}>View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Prospect Details</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[600px] pr-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p><strong>Name:</strong> {prospect.firstName} {prospect.lastName}</p>
                                <p><strong>Email:</strong> <a href={`mailto:${prospect.email}`} className="text-blue-500 hover:underline">{prospect.email}</a></p>
                                <p><strong>Phone:</strong> {prospect.phone}</p>
                                <p><strong>LinkedIn:</strong> <a href={prospect.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.linkedinUrl}</a></p>
                                <p><strong>LinkedIn Headline:</strong> {prospect.linkedinHeadline}</p>
                                <p><strong>LinkedIn Summary:</strong> {prospect.linkedinSummary}</p>
                                <p><strong>Location:</strong> {prospect.location}</p>
                                <p><strong>Connections:</strong> {prospect.connections}</p>
                                <p><strong>Followers:</strong> {prospect.followerCount}</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle>Organisation Information</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p><strong>Name:</strong> {prospect.organisation}</p>
                                <p><strong>LinkedIn:</strong> <a href={prospect.organisationLinkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.organisationLinkedinUrl}</a></p>
                                <p><strong>Website:</strong> <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.website}</a></p>
                                <p><strong>Description:</strong> {prospect.organisationDescription}</p>
                                <p><strong>Industry:</strong> {prospect.industry}</p>
                                <p><strong>Location:</strong> {prospect.organisationLocation}</p>
                                <p><strong>Employee Count:</strong> {prospect.employeeCount}</p>
                                <p><strong>Size:</strong> {prospect.size}</p>
                                <p><strong>Type:</strong> {prospect.type}</p>
                                <p><strong>Followers:</strong> {prospect.organisationFollowerCount}</p>
                              </CardContent>
                            </Card>
                          </div>
                          <Card className="mt-4">
                            <CardHeader>
                              <CardTitle>Activity Stream</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {prospect.activityStream.map((activity, index) => (
                                  <li key={index} className="flex justify-between">
                                    <span>{activity.action}</span>
                                    <span className="text-gray-500">{activity.date}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectsPage;