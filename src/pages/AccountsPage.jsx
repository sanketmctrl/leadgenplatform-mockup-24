import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AccountsPage = () => {
  const [accounts] = useState([
    { id: 1, name: "Tech Corp", industry: "Technology", prospects: ["John Doe", "Alice Brown"] },
    { id: 2, name: "Innovate Inc", industry: "Software", prospects: ["Jane Smith", "Charlie Davis"] },
    { id: 3, name: "Global Solutions", industry: "Consulting", prospects: ["Bob Johnson", "Eva Wilson"] },
  ]);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="cursor-pointer" onClick={() => handleAccountClick(account)}>
            <CardHeader>
              <CardTitle>{account.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Industry: {account.industry}</p>
              <p>Prospects: {account.prospects.length}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedAccount && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Prospects for {selectedAccount.name}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedAccount.prospects.map((prospect, index) => (
                <TableRow key={index}>
                  <TableCell>{prospect}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
