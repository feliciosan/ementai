import classNames from "classnames";

export const getSecondaryTextColor = (isDark: boolean | undefined) => {
  return classNames({
    "text-neutral-600": !isDark,
    "text-neutral-300": isDark,
  });
};
