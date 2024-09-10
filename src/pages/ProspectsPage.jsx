import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { dummyProspects, getStatusColor } from '../utils/prospectUtils';
import ProspectDetails from '../components/ProspectDetails';

const ProspectsPage = () => {
  const [filteredProspects, setFilteredProspects] = useState(dummyProspects);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [expandedRows, setExpandedRows] = useState({});

  const handleApprove = (id) => {
    const updatedProspects = filteredProspects.map(prospect => 
      prospect.id === id ? { ...prospect, status: 'Sequenced' } : prospect
    );
    setFilteredProspects(updatedProspects);
  };

  const handleRemove = (id) => {
    const updatedProspects = filteredProspects.filter(prospect => prospect.id !== id);
    setFilteredProspects(updatedProspects);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    let result = dummyProspects;

    if (searchTerm) {
      result = result.filter(prospect => 
        prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.organisation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (campaignFilter !== 'All Campaigns') {
      result = result.filter(prospect => prospect.activeCampaign === campaignFilter);
    }

    if (statusFilter !== 'All Statuses') {
      result = result.filter(prospect => prospect.status === statusFilter);
    }

    setFilteredProspects(result);
  }, [searchTerm, campaignFilter, statusFilter]);

  const uniqueCampaigns = ['All Campaigns', ...new Set(dummyProspects.map(p => p.activeCampaign))];
  const uniqueStatuses = ['All Statuses', ...new Set(dummyProspects.map(p => p.status))];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prospects</h1>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search names, job titles, organisations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={campaignFilter} onValueChange={setCampaignFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by campaign" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCampaigns.map((campaign) => (
              <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {uniqueStatuses.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
                <TableHead>Remove</TableHead>
                <TableHead>Approve</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map((prospect) => (
                <React.Fragment key={prospect.id}>
                  <TableRow>
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Remove</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove the prospect from your list.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemove(prospect.id)}>
                              Yes, remove prospect
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell>
                      {prospect.status === 'For Approval' && (
                        <Button onClick={() => handleApprove(prospect.id)}>
                          Approve
                        </Button>
                      )}
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
                      <TableCell colSpan={10}>
                        <ProspectDetails prospect={prospect} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectsPage;