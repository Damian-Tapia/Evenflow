interface IconProps {
  className?: string;
}

export const TicketIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="40px"
      width="40px"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d="M580-240q25 0 42.5-17.5T640-300q0-25-17.5-42.5T580-360q-25 0-42.5 17.5T520-300q0 25 17.5 42.5T580-240Zm0-160q25 0 42.5-17.5T640-460q0-25-17.5-42.5T580-520q-25 0-42.5 17.5T520-460q0 25 17.5 42.5T580-400ZM200-160q-33 0-56.5-23.5T120-240v-160q42 0 71-29t29-71q0-42-29-71t-71-29v-160q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720v160q-42 0-71 29t-29 71q0 42 29 71t71 29v160q0 33-23.5 56.5T760-160H200Zm0-80h560v-102q-47-22-73.5-65T660-500q0-54 26.5-97T760-662v-58H200v58q47 22 73.5 65T300-500q0 54-26.5 97T200-338v98Zm280-320Z" />
    </svg>
  );
};
