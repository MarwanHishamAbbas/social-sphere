"use client";

import { Button } from "@mantine/core";
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
    <Button
      type="button"
      h={40}
      disabled={loading}
      leftIcon={icon}
      {...props}
      className="bg-primary-100 hover:bg-primary-50 transition-colors disabled:bg-dark-0 text-sm md:text-base font-normal "
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
