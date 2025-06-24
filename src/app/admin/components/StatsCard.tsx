import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  trend:string;
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          <p
            className={`text-xs mt-2 ${
              change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last week
          </p>
        </div>
        <div className="bg-red-900/20 p-3 rounded-lg text-red-500">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;