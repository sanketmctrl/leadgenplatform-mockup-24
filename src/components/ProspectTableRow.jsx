import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PopOutIcon, CheckIcon, XIcon } from 'lucide-react';
import { getStatusColor } from '../utils/prospectUtils';
import ProspectDetails from './ProspectDetails';

const ProspectTableRow = ({ prospect, handleApprove, handleRemove }) => {
  return (
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRemove(prospect.id)}
          className="text-red-500 hover:text-red-700"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell>
        {prospect.status === 'For Approval' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleApprove(prospect.id)}
            className="text-green-500 hover:text-green-700"
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <PopOutIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <ProspectDetails prospect={prospect} />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default ProspectTableRow;