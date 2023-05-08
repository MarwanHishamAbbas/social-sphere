import { Loader2 } from "lucide-react";
import { FC } from "react";

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: any;
}

const CustomButton: FC<CustomButtonProps> = ({
  loading,
  children,
  icon,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      {...props}
      className="bg-primary-100 hover:bg-primary-50 transition-colors disabled:bg-dark-0 text-sm md:text-base font-normal px-3 py-2 rounded-md flex items-center gap-2"
    >
      {loading ? <Loader2 className="animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default CustomButton;
