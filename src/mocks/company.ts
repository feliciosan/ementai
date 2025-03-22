import { TCompanyInfo } from "@/services/company.types";

export const companyInfoMock: TCompanyInfo = {
  name: "Hot Grill by Ementai",
  logo: "/logo.webp",
  backgroundImage: "/background.jpg",
  slogan: "Aqui você encontra as melhores carnes da região!",
  theme: {
    primaryColor: "#ca1209",
    isDark: false,
  },
  aditicional: {
    address: "Rua dos Bobos, 0",
    phone: "922000000",
    email: "meunegocio@gmail.com",
    extra: {
      label: "Take Away",
      value: "10% OFF, use o cupom: TAKEAWAY",
    },
  },
  social: {
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    whatsapp: "922000000",
  },
};
