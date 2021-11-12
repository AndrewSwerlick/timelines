import styled from "@emotion/styled";

const variants = {
  primary: {
    borderRadius: "255px 25px 225px 25px/25px 225px 25px 255px",
  },
  wrapper: {},
};

export const Box: React.FC<{ variant?: keyof typeof variants }> = ({
  variant = 'primary',
  children,
}) => {
  const Component = styled("div")(
    {
      borderWidth: "2px",
      borderStyle: "solid",
      padding: "8px",
      boxSizing: "border-box",
      ...variants[variant],
    },
  );
  return <Component children={children} />;
};
