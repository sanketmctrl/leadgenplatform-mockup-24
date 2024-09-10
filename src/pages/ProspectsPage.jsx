import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

import { dummyProspects, getCompanyById } from '../utils/dummyData';
import { getStatusColor, sortProspects } from '../utils/prospectUtils';
import ProspectDetails from '../components/ProspectDetails';

const ProspectsPage = () => {
  const [prospects, setProspects] = useState(dummyProspects);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedProspects, setSelectedProspects] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'status', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let result = dummyProspects;

    if (searchTerm) {
      result = result.filter(prospect => 
        prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCompanyById(prospect.companyId).name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (campaignFilter !== 'All Campaigns') {
      result = result.filter(prospect => prospect.activeCampaign === campaignFilter);
    }

    if (statusFilter !== 'All Statuses') {
      result = result.filter(prospect => prospect.status === statusFilter);
    }

    result = sortProspects(result, sortConfig);

    setProspects(result);
  }, [searchTerm, campaignFilter, statusFilter, sortConfig]);

  const uniqueCampaigns = ['All Campaigns', ...new Set(dummyProspects.map(p => p.activeCampaign))];
  const uniqueStatuses = ['All Statuses', ...new Set(dummyProspects.map(p => p.status))];

  const handleApprove = (id) => {
    setProspects(prospects => 
      prospects.map(prospect => 
        prospect.id === id ? { ...prospect, status: 'Sequenced' } : prospect
      )
    );
  };

  const handleRemove = (id) => {
    setProspects(prospects => prospects.filter(prospect => prospect.id !== id));
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProspectSelection = (id) => {
    setSelectedProspects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBulkAction = (action) => {
    const selectedIds = Object.keys(selectedProspects).filter(id => selectedProspects[id]);
    if (action === 'remove') {
      setProspects(prospects => prospects.filter(prospect => !selectedIds.includes(prospect.id.toString())));
    } else if (action === 'approve') {
      setProspects(prospects => 
        prospects.map(prospect => 
          selectedIds.includes(prospect.id.toString()) && prospect.status === 'For Approval'
            ? { ...prospect, status: 'Sequenced' }
            : prospect
        )
      );
    }
    setSelectedProspects({});
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prospects</h1>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search names, job titles, companies..."
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
      <div className="flex space-x-4 mb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Bulk Remove</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the selected prospects from your list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleBulkAction('remove')}>
                Yes, remove prospects
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button onClick={() => handleBulkAction('approve')}>Bulk Approve</Button>
      </div>
      <Card>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('companyId')} className="cursor-pointer">
                    Company {sortConfig.key === 'companyId' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('title')} className="cursor-pointer">
                    Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead>LinkedIn</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead onClick={() => handleSort('activeCampaign')} className="cursor-pointer">
                    Active Campaign {sortConfig.key === 'activeCampaign' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </TableHead>
                  <TableHead>Remove</TableHead>
                  <TableHead>Approve</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prospects.map((prospect) => (
                  <React.Fragment key={prospect.id}>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={selectedProspects[prospect.id] || false}
                          onCheckedChange={() => toggleProspectSelection(prospect.id)}
                        />
                      </TableCell>
                      <TableCell>{prospect.name}</TableCell>
                      <TableCell>{getCompanyById(prospect.companyId).name}</TableCell>
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
                        <TableCell colSpan={11}>
                          <ProspectDetails prospect={prospect} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectsPage;