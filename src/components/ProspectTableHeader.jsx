import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProspectTableHeader = () => {
  return (
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
        <TableHead>Details</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProspectTableHeader;