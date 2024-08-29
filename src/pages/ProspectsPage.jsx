import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ProspectsPage = () => {
  const [prospects] = useState([
    { id: 1, name: "John Doe", company: "Tech Corp", campaign: "Summer Outreach", lastActivity: "Replied to email" },
    { id: 2, name: "Jane Smith", company: "Innovate Inc", campaign: "Q4 Sales Push", lastActivity: "Viewed LinkedIn profile" },
    { id: 3, name: "Bob Johnson", company: "Global Solutions", campaign: "New Product Launch", lastActivity: "Opened email" },
  ]);

  const [selectedProspect, setSelectedProspect] = useState(null);

  const handleProspectClick = (prospect) => {
    setSelectedProspect(prospect);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Prospects</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.map((prospect) => (
            <TableRow key={prospect.id}>
              <TableCell>{prospect.name}</TableCell>
              <TableCell>{prospect.company}</TableCell>
              <TableCell>{prospect.campaign}</TableCell>
              <TableCell>{prospect.lastActivity}</TableCell>
              <TableCell>
                <Button onClick={() => handleProspectClick(prospect)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedProspect && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Prospect Details</h2>
          <p>Name: {selectedProspect.name}</p>
          <p>Company: {selectedProspect.company}</p>
          <p>Campaign: {selectedProspect.campaign}</p>
          <p>Last Activity: {selectedProspect.lastActivity}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default ProspectsPage;
