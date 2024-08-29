// Update this page (the content is just a fallback if you fail to update the page)

import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#000080] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Connected</h2>
            <p className="text-4xl font-bold">1,234</p>
          </div>
          <div className="bg-[#87CEEB] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Messages Sent</h2>
            <p className="text-4xl font-bold">5,678</p>
          </div>
          <div className="bg-[#800080] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Replies</h2>
            <p className="text-4xl font-bold">2,345</p>
          </div>
          <div className="bg-[#40E0D0] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Positive Replies</h2>
            <p className="text-4xl font-bold">1,234</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
