import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import AccountProspects from '../components/AccountProspects';
import { dummyAccounts } from '../utils/dummyData';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState(dummyAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Accounts</h1>
      <Input
        placeholder="Search accounts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4"
      />
      <Card>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Employee Count</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>LinkedIn</TableHead>
                  <TableHead>Prospects</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <React.Fragment key={account.id}>
                    <TableRow>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.industry}</TableCell>
                      <TableCell>{account.size}</TableCell>
                      <TableCell>{account.employeeCount}</TableCell>
                      <TableCell>
                        <a href={account.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Website
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={account.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          LinkedIn
                        </a>
                      </TableCell>
                      <TableCell>{account.prospects.length}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(account.id)}
                        >
                          {expandedRows[account.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedRows[account.id] && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <AccountProspects prospects={account.prospects} />
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

export default AccountsPage;