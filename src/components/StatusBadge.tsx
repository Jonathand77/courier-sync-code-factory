export const StatusBadge = ({ statusName }: { statusName: string }) => {
  const statusStyles: { [key: string]: string } = {
    'DELIVERED': 'bg-green-200 text-green-800 border border-green-200',
    'IN_TRANSIT': 'bg-blue-200 text-blue-800 border border-blue-200',
    'PENDING': 'bg-yellow-200 text-yellow-800 border border-yellow-200',
    'RETURNED': 'bg-red-200 text-red-800 border border-red-200',
    'CANCELLED': 'bg-red-200 text-red-800 border border-red-200',
    'default': 'bg-gray-200 text-gray-800 border border-gray-200',
  };

  const style = statusStyles[statusName] || statusStyles.default;

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full tracking-wider ${style}`}>
      {statusName.toUpperCase()}
    </span>
  );
};