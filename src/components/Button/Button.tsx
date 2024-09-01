interface Props {
  label: string;
}

const Button = ({ label }: Props) => {
  return (
    <button className="py-3 text-black btn-bg w-full rounded font-poppins text-lg shadow shadow-zinc-950">
      {label}
    </button>
  );
};

export default Button;
