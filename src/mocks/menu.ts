import { TMenuCategory } from "@/services/menu.types";
import { Timestamp } from "firebase/firestore";

export const menuMock: TMenuCategory[] = [
  {
    id: "1",
    name: "Categoria Exemplo 1",
    createdAt: Timestamp.now(),
    indexPosition: 0,
    items: [
      {
        id: "1",
        title: "Exemplo: Prato Principal A",
        price: [{ label: "Individual", value: "5,00" }],
        description: "Descrição exemplo de um prato principal delicioso",
        new: true,
      },
      {
        id: "2",
        title: "Exemplo: Prato Principal B",
        price: [{ label: "Meia Porção", value: "2,60" }],
        description: "Descrição exemplo de meia porção",
      },
      {
        id: "3",
        title: "Exemplo: Especialidade da Casa",
        price: [{ label: "Individual", value: "5,60" }],
        description: "Descrição exemplo de uma especialidade",
      },
      {
        id: "4",
        title: "Exemplo: Prato Premium",
        price: [
          { label: "2 Pessoas", value: "12,6" },
          { label: "Individual", value: "6,95" },
        ],
        description:
          "Descrição exemplo de um prato premium com acompanhamentos",
        bestSeller: true,
      },
      {
        id: "5",
        title: "Exemplo: Prato Tradicional",
        price: [{ label: "Individual", value: "5,80" }],
        description: "Descrição exemplo de um prato tradicional",
      },
      {
        id: "6",
        title: "Exemplo: Porção Especial",
        price: [
          { label: "4 Pessoas", value: "8,50" },
          { label: "2 Pessoas", value: "5,00" },
        ],
        description: "Descrição exemplo de uma porção especial",
      },
      {
        id: "7",
        title: "Exemplo: Prato Gourmet",
        price: [
          { label: "Individual", value: "9,95" },
          { label: "2 Pessoas", value: "18,50" },
        ],
        description: "Descrição exemplo de um prato gourmet",
      },
      {
        id: "8",
        title: "Exemplo: Prato do Chef",
        price: [
          { label: "Individual", value: "10,00" },
          { label: "2 Pessoas", value: "20,00" },
        ],
        description: "Descrição exemplo do prato do chef",
      },
      {
        id: "9",
        title: "Exemplo: Prato para Compartilhar",
        price: [{ label: "2 Pessoas", value: "22,00" }],
        description: "Descrição exemplo de um prato para duas pessoas",
      },
      {
        id: "10",
        title: "Exemplo: Sanduíche Especial",
        price: [{ label: "Individual", value: "7,50" }],
        description: "Descrição exemplo de um sanduíche especial",
      },
      {
        id: "11",
        title: "Exemplo: Prato Regional",
        price: [{ label: "Individual", value: "8,00" }],
        description: "Descrição exemplo de um prato regional",
      },
      {
        id: "12",
        title: "Exemplo: Meia Porção Regional",
        price: [{ label: "Meia Porção", value: "4,00" }],
        description: "Descrição exemplo de meia porção regional",
      },
      {
        id: "13",
        title: "Exemplo: Combinado Família",
        price: [{ label: "4 Pessoas", value: "29,90" }],
        description: "Descrição exemplo de um combinado para família",
        bestSeller: true,
      },
      {
        id: "14",
        title: "Exemplo: Espetinho da Casa",
        price: [{ label: "Individual", value: "6,00" }],
        description: "Descrição exemplo de um espetinho",
      },
    ],
  },
  {
    id: "2",
    name: "Categoria Exemplo 2",
    createdAt: Timestamp.now(),
    indexPosition: 1,
    items: [
      {
        id: "1",
        title: "Exemplo: Peixe Premium",
        price: [
          { label: "2 Pessoas", value: "15,50" },
          { label: "Individual", value: "8,80" },
        ],
        description: "Descrição exemplo de um peixe premium",
      },
      {
        id: "2",
        title: "Exemplo: Frutos do Mar A",
        price: [{ label: "Individual", value: "9,80" }],
        description: "Descrição exemplo de frutos do mar",
      },
      {
        id: "3",
        title: "Exemplo: Frutos do Mar B",
        price: [{ label: "2 Pessoas", value: "14,60" }],
        description: "Descrição exemplo de frutos do mar especial",
      },
      {
        id: "4",
        title: "Exemplo: Especialidade Marinha",
        price: [{ label: "Individual", value: "14,00" }],
        description: "Descrição exemplo de especialidade marinha",
      },
      {
        id: "5",
        title: "Exemplo: Frutos do Mar Premium",
        price: [{ label: "2 Pessoas", value: "18,40" }],
        description: "Descrição exemplo de frutos do mar premium",
        new: true,
      },
      {
        id: "6",
        title: "Exemplo: Peixe Tradicional A",
        price: [
          { label: "4 Pessoas", value: "25,50" },
          { label: "2 Pessoas", value: "14,00" },
        ],
        description: "Descrição exemplo de peixe tradicional",
      },
      {
        id: "7",
        title: "Exemplo: Peixe Tradicional B",
        price: [
          { label: "4 Pessoas", value: "25,50" },
          { label: "2 Pessoas", value: "14,00" },
        ],
        description: "Descrição exemplo de peixe no estilo da casa",
      },
      {
        id: "8",
        title: "Exemplo: Peixe com Acompanhamento",
        price: [
          { label: "Individual", value: "12,40" },
          { label: "Meia Porção", value: "7,90" },
        ],
        description: "Descrição exemplo de peixe com acompanhamento especial",
      },
    ],
  },
  {
    id: "3",
    name: "Categoria Exemplo 3",
    createdAt: Timestamp.now(),
    indexPosition: 2,
    items: [
      {
        id: "1",
        title: "Exemplo: Acompanhamento A",
        price: [
          { label: "Individual", value: "2,70" },
          { label: "Meia Porção", value: "2,00" },
        ],
        description: "Descrição exemplo de acompanhamento",
      },
      {
        id: "2",
        title: "Exemplo: Acompanhamento B",
        price: [
          { label: "Individual", value: "2,00" },
          { label: "2 Pessoas", value: "2,00" },
        ],
        description: "Descrição exemplo de acompanhamento básico",
      },
      {
        id: "3",
        title: "Exemplo: Salada Mista",
        price: [
          { label: "Individual", value: "3,00" },
          { label: "Meia Porção", value: "1,50" },
        ],
        description: "Descrição exemplo de salada mista",
      },
      {
        id: "4",
        title: "Exemplo: Salada Especial A",
        price: [
          { label: "2 Pessoas", value: "2,50" },
          { label: "Individual", value: "1,25" },
        ],
        description: "Descrição exemplo de salada especial",
      },
      {
        id: "5",
        title: "Exemplo: Salada da Casa",
        price: [
          { label: "4 Pessoas", value: "4,00" },
          { label: "2 Pessoas", value: "2,00" },
        ],
        description: "Descrição exemplo da salada da casa",
      },
      {
        id: "6",
        title: "Exemplo: Salada Especial B",
        price: [{ label: "Individual", value: "3,50" }],
        description: "Descrição exemplo de salada especial com molho",
      },
      {
        id: "7",
        title: "Exemplo: Legumes da Temporada",
        price: [{ label: "2 Pessoas", value: "3,90" }],
        description: "Descrição exemplo de legumes da temporada",
      },
      {
        id: "8",
        title: "Exemplo: Acompanhamento Tradicional",
        price: [
          { label: "Individual", value: "3,20" },
          { label: "Meia Porção", value: "1,60" },
        ],
        description: "Descrição exemplo de acompanhamento tradicional",
      },
      {
        id: "9",
        title: "Exemplo: Acompanhamento Especial",
        price: [
          { label: "4 Pessoas", value: "2,95" },
          { label: "2 Pessoas", value: "2,25" },
        ],
        description: "Descrição exemplo de acompanhamento especial",
      },
      {
        id: "10",
        title: "Exemplo: Combinado de Acompanhamentos",
        description: "Descrição exemplo de combinado",
        price: [
          { label: "Individual", value: "3,00" },
          { label: "Meia Porção", value: "1,50" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Categoria Exemplo 4",
    createdAt: Timestamp.now(),
    indexPosition: 3,
    items: [
      {
        id: "1",
        title: "Exemplo: Entrada A",
        price: [{ label: "Individual", value: "1,50" }],
        description: "Descrição exemplo de entrada",
      },
      {
        id: "2",
        title: "Exemplo: Entrada B",
        price: [{ label: "Individual", value: "1,50" }],
        description: "Descrição exemplo de entrada cremosa",
      },
      {
        id: "3",
        title: "Exemplo: Entrada Tradicional",
        price: [{ label: "2 Pessoas", value: "1,80" }],
        description: "Descrição exemplo de entrada tradicional",
        new: true,
      },
      {
        id: "4",
        title: "Exemplo: Entrada Especial",
        price: [{ label: "Individual", value: "2,00" }],
        description: "Descrição exemplo de entrada especial",
      },
    ],
  },
];
