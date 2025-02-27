import { useState } from 'react';
import { motion } from 'framer-motion';
import CreateTeam from './CreateTeam';
import UpdateTeam from './UpdateTeam';
import DeleteTeam from './DeleteTeam';

const ManageTeam = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'update' | 'delete'>('create');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Manage Team
          </h1>
          <p className="text-gray-400 text-lg">
            Add or update team members
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'create'
                ? 'bg-[#FF3366] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
            }`}
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Member
          </button>
          <button
            onClick={() => setActiveTab('update')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'update'
                ? 'bg-[#FF3366] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
            }`}
          >
            <i className="fas fa-edit mr-2"></i>
            Update Members
          </button>
          <button
            onClick={() => setActiveTab('delete')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'delete'
                ? 'bg-[#FF3366] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
            }`}
          >
            <i className="fas fa-trash mr-2"></i>
            Delete Members
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'create' ? (
            <div className="bg-[#1a1a1a] rounded-xl p-8">
              <CreateTeam />
            </div>
          ) : activeTab === 'update' ? (
            <div className="bg-[#1a1a1a] rounded-xl p-8">
              <UpdateTeam />
            </div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-xl p-8">
              <DeleteTeam />
            </div>
          )}
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#FF3366] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#ff1f57] transition-colors"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default ManageTeam;
