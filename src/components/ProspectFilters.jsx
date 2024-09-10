import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProspectFilters = ({
  searchTerm,
  setSearchTerm,
  campaignFilter,
  setCampaignFilter,
  statusFilter,
  setStatusFilter,
  uniqueCampaigns,
  uniqueStatuses
}) => {
  return (
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
  );
};

export default ProspectFilters;