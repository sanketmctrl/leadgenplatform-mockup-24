import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getActivityColor } from '../utils/prospectUtils';
import { getCompanyById } from '../utils/dummyData';

const ProspectDetails = ({ prospect }) => {
  if (!prospect) {
    return <div>No prospect details available.</div>;
  }

  const company = getCompanyById(prospect.companyId);

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg"><strong>Name:</strong> {prospect.name}</p>
            <p className="text-lg"><strong>Email:</strong> <a href={`mailto:${prospect.email}`} className="text-blue-500 hover:underline">{prospect.email}</a></p>
            <p className="text-lg"><strong>LinkedIn:</strong> <a href={prospect.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.linkedinUrl}</a></p>
            <p className="text-lg"><strong>Title:</strong> {prospect.title}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg"><strong>Name:</strong> {company.name}</p>
            <p className="text-lg"><strong>Industry:</strong> {company.industry}</p>
            <p className="text-lg"><strong>Size:</strong> {company.size}</p>
            <p className="text-lg"><strong>Employee Count:</strong> {company.employeeCount}</p>
            <p className="text-lg"><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.website}</a></p>
            <p className="text-lg"><strong>LinkedIn:</strong> <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.linkedinUrl}</a></p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Activity Stream</CardTitle>
        </CardHeader>
        <CardContent>
          {prospect.activityStream && prospect.activityStream.length > 0 ? (
            <ul className="space-y-4">
              {prospect.activityStream.map((activity, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className={`text-lg ${getActivityColor(activity.action)}`}>{activity.action}</span>
                  <span className="text-sm text-gray-500">{new Date(activity.date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No activity stream available.</p>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default ProspectDetails;