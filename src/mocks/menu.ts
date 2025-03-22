import { TMenuCategory } from "@/services/menu.types";
import { Timestamp } from "firebase/firestore";

export const menuMock: TMenuCategory[] = [
  {
    id: "1",
    name: "Carnes",
    createdAt: Timestamp.now(),
    items: [
      {
        id: "1",
        title: "Frango",
        price: [{ label: "1 Dose", value: "5.0" }],
        description:
          "Frango grelhado com tempero especial, o melhor da região de Braga",
        new: true,
      },
      {
        id: "2",
        title: "1/2 Frango",
        price: [{ label: "1/2 Dose", value: "2.6" }],
        description: "Meia porção de frango grelhado",
      },
      {
        id: "3",
        title: "Feveras de Porco",
        price: [{ label: "1 Dose", value: "5.6" }],
        description: "Feveras de porco grelhadas",
      },
      {
        id: "4",
        title: "Secretos de Porco Preto",
        price: [
          { label: "1 Dose", value: "12.6" },
          { label: "1/2 Dose", value: "6.95" },
        ],
        description:
          "Secretos de porco preto grelhados na brasa com salada e batata frita",
        bestSeller: true,
      },
      {
        id: "5",
        title: "Entrecosto",
        price: [{ label: "1 Dose", value: "5.8" }],
        description: "Entrecosto grelhado",
      },
      {
        id: "6",
        title: "Costelinhas",
        price: [
          { label: "1 Dose", value: "8.5" },
          { label: "1/2 Dose", value: "5.0" },
        ],
        description: "Costelinhas de porco grelhadas",
      },
      {
        id: "7",
        title: "Costeleta de Vitela",
        price: [
          { label: "1 Dose", value: "9.95" },
          { label: "2 Pessoas", value: "18.5" },
        ],
        description: "Costeleta de vitela grelhada",
      },
      {
        id: "8",
        title: "Bife do Vazio",
        price: [
          { label: "1 Dose", value: "10.0" },
          { label: "2 Pessoas", value: "20.0" },
        ],
        description: "Bife do vazio grelhado",
      },
      {
        id: "9",
        title: "Posta Dom Brasas",
        price: [{ label: "2 Pessoas", value: "22.0" }],
        description: "Posta de carne especial para duas pessoas",
      },
      {
        id: "10",
        title: "Prego em Prato",
        price: [{ label: "1 Dose", value: "7.5" }],
        description: "Prego no prato com tempero especial",
      },
      {
        id: "11",
        title: "Coelho",
        price: [{ label: "1 Dose", value: "8.0" }],
        description: "Coelho grelhado",
      },
      {
        id: "12",
        title: "1/2 Coelho",
        price: [{ label: "1/2 Dose", value: "4.0" }],
        description: "Meia porção de coelho grelhado",
      },
      {
        id: "13",
        title: "Churrasco Misto",
        price: [{ label: "3 a 4 Pessoas", value: "29.9" }],
        description: "Churrasco misto para 3 a 4 pessoas",
        bestSeller: true,
      },
      {
        id: "14",
        title: "Pincho",
        price: [{ label: "1 Dose", value: "6.0" }],
        description: "Espetada de carne grelhada",
      },
    ],
  },
  {
    id: "2",
    name: "Peixe",
    createdAt: Timestamp.now(),
    items: [
      {
        id: "1",
        title: "Salmão",
        price: [
          { label: "1 Dose", value: "15.5" },
          { label: "1/2 Dose", value: "8.8" },
        ],
        description: "Salmão grelhado",
      },
      {
        id: "2",
        title: "Espetada de Lulas",
        price: [{ label: "1 Dose", value: "9.8" }],
        description: "Espetada de lulas grelhadas",
      },
      {
        id: "3",
        title: "Espetada de Polvo",
        price: [{ label: "1 Dose", value: "14.6" }],
        description: "Espetada de polvo grelhado",
      },
      {
        id: "4",
        title: "Espetada Dom Brasas",
        price: [{ label: "1 Dose", value: "14.0" }],
        description: "Espetada especial Dom Brasas",
      },
      {
        id: "5",
        title: "Espetada de Camarão",
        price: [{ label: "1 Dose", value: "18.4" }],
        description: "Espetada de camarão grelhado",
        new: true,
      },
      {
        id: "6",
        title: "Bacalhau na Brasa",
        price: [
          { label: "1 Dose", value: "25.5" },
          { label: "1/2 Dose", value: "14.0" },
        ],
        description: "Bacalhau grelhado na brasa",
      },
      {
        id: "7",
        title: "Bacalhau à Braga",
        price: [
          { label: "1 Dose", value: "25.5" },
          { label: "1/2 Dose", value: "14.0" },
        ],
        description: "Bacalhau à moda de Braga",
      },
      {
        id: "8",
        title: "Filetes de Pescada c/ Salada Russa",
        price: [
          { label: "1 Dose", value: "12.4" },
          { label: "1/2 Dose", value: "7.9" },
        ],
        description: "Filetes de pescada com salada russa",
      },
    ],
  },
  {
    id: "3",
    name: "Guarnição",
    createdAt: Timestamp.now(),
    items: [
      {
        id: "1",
        title: "Batata",
        price: [
          { label: "1 Dose", value: "2.7" },
          { label: "1/2 Dose", value: "2.0" },
        ],
        description: "Batata frita",
      },
      {
        id: "2",
        title: "Arroz",
        price: [
          { label: "1 Dose", value: "2.0" },
          { label: "1/2 Dose", value: "2.0" },
        ],
        description: "Arroz branco",
      },
      {
        id: "3",
        title: "Salada Mista",
        price: [
          { label: "1 Dose", value: "3.0" },
          { label: "1/2 Dose", value: "1.5" },
        ],
        description: "Salada mista de legumes",
      },
      {
        id: "4",
        title: "Salada de Pimentos",
        price: [
          { label: "1 Dose", value: "2.5" },
          { label: "1/2 Dose", value: "1.25" },
        ],
        description: "Salada de pimentos grelhados",
      },
      {
        id: "5",
        title: "Salada Especial",
        price: [
          { label: "1 Dose", value: "4.0" },
          { label: "1/2 Dose", value: "2.0" },
        ],
        description: "Salada especial da casa",
      },
      {
        id: "6",
        title: "Salada Russa",
        price: [{ label: "1 Dose", value: "3.5" }],
        description: "Salada russa com legumes e maionese",
      },
      {
        id: "7",
        title: "Legumes Salteados",
        price: [{ label: "1 Dose", value: "3.9" }],
        description: "Legumes salteados na manteiga",
      },
      {
        id: "8",
        title: "Feijão Preto",
        price: [
          { label: "1 Dose", value: "3.2" },
          { label: "1/2 Dose", value: "1.6" },
        ],
        description: "Feijão preto cozido",
      },
      {
        id: "9",
        title: "Batata a Murro",
        price: [
          { label: "1 Dose", value: "2.95" },
          { label: "1/2 Dose", value: "2.25" },
        ],
        description: "Batata a murro com azeite e alho",
      },
      {
        id: "10",
        title: "Arroz de Feijão",
        description: "Arroz de feijão",
        price: [
          { label: "1 Dose", value: "3.0" },
          { label: "1/2 Dose", value: "1.5" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Sopas",
    createdAt: Timestamp.now(),
    items: [
      {
        id: "1",
        title: "Sopa",
        price: [{ label: "1 Dose", value: "1.5" }],
        description: "Sopa do dia",
      },
      {
        id: "2",
        title: "Creme de Legumes",
        price: [{ label: "1 Dose", value: "1.5" }],
        description: "Creme de legumes variados",
      },
      {
        id: "3",
        title: "Caldo Verde",
        price: [{ label: "1 Dose", value: "1.8" }],
        description: "Caldo verde com couve e chouriço",
        new: true,
      },
      {
        id: "4",
        title: "Papas",
        price: [{ label: "1 Dose", value: "2.0" }],
        description: "Papas de milho",
      },
    ],
  },
];
