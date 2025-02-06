export const getMenuBySlug = async (slug: string) => {
  console.log(slug);
  return [
    {
      category: "Carnes",
      items: [
        {
          name: "Frango",
          price: [{ label: "1 Dose", value: 5.0 }],
          description:
            "Frango grelhado com tempero especial, o melhor da região de Braga",
          new: true,
        },
        {
          name: "1/2 Frango",
          price: [{ label: "1/2 Dose", value: 2.6 }],
          description: "Meia porção de frango grelhado",
        },
        {
          name: "Feveras de Porco",
          price: [{ label: "1 Dose", value: 5.6 }],
          description: "Feveras de porco grelhadas",
        },
        {
          name: "Secretos de Porco Preto",
          price: [
            { label: "1 Dose", value: 12.6 },
            { label: "1/2 Dose", value: 6.95 },
          ],
          description:
            "Secretos de porco preto grelhados na brasa com salada e batata frita",
          bestSeller: true,
        },
        {
          name: "Entrecosto",
          price: [{ label: "1 Dose", value: 5.8 }],
          description: "Entrecosto grelhado",
        },
        {
          name: "Costelinhas",
          price: [
            { label: "1 Dose", value: 8.5 },
            { label: "1/2 Dose", value: 5.0 },
          ],
          description: "Costelinhas de porco grelhadas",
        },
        {
          name: "Costeleta de Vitela",
          price: [
            { label: "1 Dose", value: 9.95 },
            { label: "2 Pessoas", value: 18.5 },
          ],
          description: "Costeleta de vitela grelhada",
        },
        {
          name: "Bife do Vazio",
          price: [
            { label: "1 Dose", value: 10.0 },
            { label: "2 Pessoas", value: 20.0 },
          ],
          description: "Bife do vazio grelhado",
        },
        {
          name: "Posta Dom Brasas",
          price: [{ label: "2 Pessoas", value: 22.0 }],
          description: "Posta de carne especial para duas pessoas",
        },
        {
          name: "Prego em Prato",
          price: [{ label: "1 Dose", value: 7.5 }],
          description: "Prego no prato com tempero especial",
        },
        {
          name: "Coelho",
          price: [{ label: "1 Dose", value: 8.0 }],
          description: "Coelho grelhado",
        },
        {
          name: "1/2 Coelho",
          price: [{ label: "1/2 Dose", value: 4.0 }],
          description: "Meia porção de coelho grelhado",
        },
        {
          name: "Churrasco Misto",
          price: [{ label: "3 a 4 Pessoas", value: 29.9 }],
          description: "Churrasco misto para 3 a 4 pessoas",
          bestSeller: true,
        },
        {
          name: "Pincho",
          price: [{ label: "1 Dose", value: 6.0 }],
          description: "Espetada de carne grelhada",
        },
      ],
    },
    {
      category: "Peixe",
      items: [
        {
          name: "Salmão",
          price: [
            { label: "1 Dose", value: 15.5 },
            { label: "1/2 Dose", value: 8.8 },
          ],
          description: "Salmão grelhado",
        },
        {
          name: "Espetada de Lulas",
          price: [{ label: "1 Dose", value: 9.8 }],
          description: "Espetada de lulas grelhadas",
        },
        {
          name: "Espetada de Polvo",
          price: [{ label: "1 Dose", value: 14.6 }],
          description: "Espetada de polvo grelhado",
        },
        {
          name: "Espetada Dom Brasas",
          price: [{ label: "1 Dose", value: 14.0 }],
          description: "Espetada especial Dom Brasas",
        },
        {
          name: "Espetada de Camarão",
          price: [{ label: "1 Dose", value: 18.4 }],
          description: "Espetada de camarão grelhado",
          new: true,
        },
        {
          name: "Bacalhau na Brasa",
          price: [
            { label: "1 Dose", value: 25.5 },
            { label: "1/2 Dose", value: 14.0 },
          ],
          description: "Bacalhau grelhado na brasa",
        },
        {
          name: "Bacalhau à Braga",
          price: [
            { label: "1 Dose", value: 25.5 },
            { label: "1/2 Dose", value: 14.0 },
          ],
          description: "Bacalhau à moda de Braga",
        },
        {
          name: "Filetes de Pescada c/ Salada Russa",
          price: [
            { label: "1 Dose", value: 12.4 },
            { label: "1/2 Dose", value: 7.9 },
          ],
          description: "Filetes de pescada com salada russa",
        },
      ],
    },
    {
      category: "Guarnição",
      items: [
        {
          name: "Batata",
          price: [
            { label: "1 Dose", value: 2.7 },
            { label: "1/2 Dose", value: 2.0 },
          ],
          description: "Batata frita",
        },
        {
          name: "Arroz",
          price: [
            { label: "1 Dose", value: 2.0 },
            { label: "1/2 Dose", value: 2.0 },
          ],
          description: "Arroz branco",
        },
        {
          name: "Salada Mista",
          price: [
            { label: "1 Dose", value: 3.0 },
            { label: "1/2 Dose", value: 1.5 },
          ],
          description: "Salada mista de legumes",
        },
        {
          name: "Salada de Pimentos",
          price: [
            { label: "1 Dose", value: 2.5 },
            { label: "1/2 Dose", value: 1.25 },
          ],
          description: "Salada de pimentos grelhados",
        },
        {
          name: "Salada Especial",
          price: [
            { label: "1 Dose", value: 4.0 },
            { label: "1/2 Dose", value: 2.0 },
          ],
          description: "Salada especial da casa",
        },
        {
          name: "Salada Russa",
          price: [{ label: "1 Dose", value: 3.5 }],
          description: "Salada russa com legumes e maionese",
        },
        {
          name: "Legumes Salteados",
          price: [{ label: "1 Dose", value: 3.9 }],
          description: "Legumes salteados na manteiga",
        },
        {
          name: "Feijão Preto",
          price: [
            { label: "1 Dose", value: 3.2 },
            { label: "1/2 Dose", value: 1.6 },
          ],
          description: "Feijão preto cozido",
        },
        {
          name: "Batata a Murro",
          price: [
            { label: "1 Dose", value: 2.95 },
            { label: "1/2 Dose", value: 2.25 },
          ],
          description: "Batata a murro com azeite e alho",
        },
        {
          name: "Arroz de Feijão",
          price: [
            { label: "1 Dose", value: 3.0 },
            { label: "1/2 Dose", value: 1.5 },
          ],
          description: "Arroz de feijão",
        },
      ],
    },
    {
      category: "Sopas",
      items: [
        {
          name: "Sopa",
          price: [{ label: "1 Dose", value: 1.5 }],
          description: "Sopa do dia",
        },
        {
          name: "Creme de Legumes",
          price: [{ label: "1 Dose", value: 1.5 }],
          description: "Creme de legumes variados",
        },
        {
          name: "Caldo Verde",
          price: [{ label: "1 Dose", value: 1.8 }],
          description: "Caldo verde com couve e chouriço",
          new: true,
        },
        {
          name: "Papas",
          price: [{ label: "1 Dose", value: 2.0 }],
          description: "Papas de milho",
        },
      ],
    },
  ];
};
