interface ButtonProps {
  value: string;
  onClick: () => void;
  color?: 'green' | 'red';
}

export function Button({ value, onClick, color }: ButtonProps) {
  const colorClass =
    color === 'green' ? 'text-green bg-black' : 'text-red bg-[#141317]';

  return (
    <button onClick={onClick} className={`px-8 py-2 m-[1px] ${colorClass}`}>
      {value}
    </button>
  );
}
