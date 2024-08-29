import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const InboxPage = () => {
  const [messages] = useState([
    { id: 1, from: "John Doe", subject: "Re: Summer Outreach", platform: "Email", content: "Thanks for reaching out. I'm interested in learning more." },
    { id: 2, from: "Jane Smith", subject: "Product Demo Request", platform: "LinkedIn", content: "I'd like to schedule a demo of your product." },
    { id: 3, from: "Bob Johnson", subject: "Quick Question", platform: "Email", content: "Can you provide more information about pricing?" },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setReply("");
  };

  const handleReply = () => {
    console.log(`Replying to ${selectedMessage.from}: ${reply}`);
    // Here you would typically send the reply to your backend
    setReply("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Platform</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} className="cursor-pointer" onClick={() => handleMessageClick(message)}>
                  <TableCell>{message.from}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>{message.platform}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          {selectedMessage && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Message from {selectedMessage.from}</h2>
              <p className="mb-4">{selectedMessage.content}</p>
              <Textarea
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="mb-2"
              />
              <Button onClick={handleReply}>Send Reply</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
