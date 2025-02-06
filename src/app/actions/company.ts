export const getCompanyBySlug = async (slug: string) => {
  return {
    name: "Restaurante Dom Brasas",
    logo: "/company-logo.webp",
    theme: {
      primaryColor: "#b5263d",
      slug,
    },
  };
};
