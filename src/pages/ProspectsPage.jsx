import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, CheckIcon, XIcon } from 'lucide-react';

import { dummyProspects, getStatusColor } from '../utils/prospectUtils';
import ProspectDetails from '../components/ProspectDetails';
import ProspectTableHeader from '../components/ProspectTableHeader';
import ProspectTableRow from '../components/ProspectTableRow';
import ProspectFilters from '../components/ProspectFilters';

const ProspectsPage = () => {
  const [prospects, setProspects] = useState(dummyProspects);
  const [filteredProspects, setFilteredProspects] = useState(prospects);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const handleApprove = (id) => {
    const updatedProspects = prospects.map(prospect => 
      prospect.id === id ? { ...prospect, status: 'Sequenced' } : prospect
    );
    setProspects(updatedProspects);
  };

  const handleRemove = (id) => {
    const updatedProspects = prospects.filter(prospect => prospect.id !== id);
    setProspects(updatedProspects);
  };

  useEffect(() => {
    let result = prospects;

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
  }, [searchTerm, campaignFilter, statusFilter, prospects]);

  const uniqueCampaigns = ['All Campaigns', ...new Set(prospects.map(p => p.activeCampaign))];
  const uniqueStatuses = ['All Statuses', ...new Set(prospects.map(p => p.status))];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prospects</h1>
      <ProspectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        campaignFilter={campaignFilter}
        setCampaignFilter={setCampaignFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        uniqueCampaigns={uniqueCampaigns}
        uniqueStatuses={uniqueStatuses}
      />
      <Card>
        <CardContent>
          <Table>
            <ProspectTableHeader />
            <TableBody>
              {filteredProspects.map((prospect) => (
                <ProspectTableRow
                  key={prospect.id}
                  prospect={prospect}
                  handleApprove={handleApprove}
                  handleRemove={handleRemove}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectsPage;