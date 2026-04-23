interface InfoItemProps {
  label: string;
  value: string;
}

export const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-sm font-medium text-gray-700">{value}</span>
  </div>
);
