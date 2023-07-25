"use client";

export const MenuItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 text-center font-bold transition hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};
