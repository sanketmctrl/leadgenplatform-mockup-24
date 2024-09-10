import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import ProspectDetails from './ProspectDetails';
import { getStatusColor } from '../utils/prospectUtils';

const AccountProspects = ({ prospects }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>LinkedIn</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Active Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.map((prospect) => (
            <React.Fragment key={prospect.id}>
              <TableRow>
                <TableCell>{prospect.name}</TableCell>
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
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(prospect.status)}`}>
                    {prospect.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(prospect.id)}
                  >
                    {expandedRows[prospect.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows[prospect.id] && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <ProspectDetails prospect={prospect} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default AccountProspects;