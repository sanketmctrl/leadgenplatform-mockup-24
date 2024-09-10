import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getActivityColor } from '../utils/prospectUtils';

const ProspectDetails = ({ prospect }) => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg"><strong>Name:</strong> {prospect.firstName} {prospect.lastName}</p>
            <p className="text-lg"><strong>Email:</strong> <a href={`mailto:${prospect.email}`} className="text-blue-500 hover:underline">{prospect.email}</a></p>
            <p className="text-lg"><strong>Phone:</strong> {prospect.phone}</p>
            <p className="text-lg"><strong>LinkedIn:</strong> <a href={prospect.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.linkedinUrl}</a></p>
            <p className="text-lg"><strong>LinkedIn Headline:</strong> {prospect.linkedinHeadline}</p>
            <p className="text-lg"><strong>LinkedIn Summary:</strong> {prospect.linkedinSummary}</p>
            <p className="text-lg"><strong>Location:</strong> {prospect.location}</p>
            <p className="text-lg"><strong>Connections:</strong> {prospect.connections}</p>
            <p className="text-lg"><strong>Followers:</strong> {prospect.followerCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Organisation Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg"><strong>Name:</strong> {prospect.organisation}</p>
            <p className="text-lg"><strong>LinkedIn:</strong> <a href={prospect.organisationLinkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.organisationLinkedinUrl}</a></p>
            <p className="text-lg"><strong>Website:</strong> <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{prospect.website}</a></p>
            <p className="text-lg"><strong>Description:</strong> {prospect.organisationDescription}</p>
            <p className="text-lg"><strong>Industry:</strong> {prospect.industry}</p>
            <p className="text-lg"><strong>Location:</strong> {prospect.organisationLocation}</p>
            <p className="text-lg"><strong>Employee Count:</strong> {prospect.employeeCount}</p>
            <p className="text-lg"><strong>Size:</strong> {prospect.size}</p>
            <p className="text-lg"><strong>Type:</strong> {prospect.type}</p>
            <p className="text-lg"><strong>Followers:</strong> {prospect.organisationFollowerCount}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Activity Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {prospect.activityStream.map((activity, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className={`text-lg ${getActivityColor(activity.action)}`}>{activity.action}</span>
                <span className="text-sm text-gray-500">{new Date(activity.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default ProspectDetails;