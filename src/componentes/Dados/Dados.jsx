import React, { useState } from 'react';
import { BarChart2, Mail, Users, TestTube, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import "./Dados.css"

// Simplified chart component for all data types with updated color scheme
const SimpleBarChart = ({ data }) => {
  const COLORS = ['#6BF499', '#5CD284', '#6FFC9E', '#4DB06E', '#3F8F59', '#4F705A', '#6BF4A9'];

  return (
    <BarChart width={300} height={300} data={data} layout="vertical">
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" width={150} />
      <Tooltip />
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );
}; 

const initialQuestions = [
  {
    icon: <BarChart2 className="w-6 h-6" />,
    text: "Quais são as principais origens dos leads na última campanha?",
    answer: "As principais origens dos leads na última campanha foram:\n1. Email: 35%\n2. Mídia Social: 25%\n3. SEO: 20%\n4. Acesso Direto: 10%\n5. Display: 7%\n6. Referral: 3%",
    chartData: [
      { name: 'Email', value: 35 },
      { name: 'Mídia Social', value: 25 },
      { name: 'SEO', value: 20 },
      { name: 'Acesso Direto', value: 10 },
      { name: 'Display', value: 7 },
      { name: 'Referral', value: 3 },
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    text: "Como está a distribuição de gênero entre os compradores?",
    answer: "A distribuição de gênero entre os compradores é:\nMasculino: 55%\nFeminino: 45%",
    chartData: [
      { name: 'Masculino', value: 55 },
      { name: 'Feminino', value: 45 },
    ]
  },
  {
    icon: <Mail className="w-6 h-6" />,
    text: "Qual é a taxa de conversão por tipo de conteúdo?",
    answer: "As taxas de conversão por tipo de conteúdo são:\nDivulgação: 8%\nPromoção: 12%\nOutros: 5%",
    chartData: [
      { name: 'Divulgação', value: 8 },
      { name: 'Promoção', value: 12 },
      { name: 'Outros', value: 5 },
    ]
  },
  {
    icon: <TestTube className="w-6 h-6" />,
    text: "Como o tempo de compra varia entre os diferentes segmentos?",
    answer: "O tempo médio de compra varia entre os segmentos:\nConnoisseurs Platinum RFV: 3 min\nApreciadores Fiéis RFV: 5 min\nEspíritos Adormecidos RFV: 8 min\nExploradores de Sabores RFV: 6 min\nDegustadores Ocasionais RFV: 7 min",
    chartData: [
      { name: 'Connoisseurs Platinum RFV', value: 3 },
      { name: 'Apreciadores Fiéis RFV', value: 5 },
      { name: 'Espíritos Adormecidos RFV', value: 8 },
      { name: 'Exploradores de Sabores RFV', value: 6 },
      { name: 'Degustadores Ocasionais RFV', value: 7 },
    ]
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    text: "Quais são os produtos mais vendidos na última campanha?",
    answer: "Os produtos mais vendidos na última campanha foram:\n1. Martell: 20%\n2. Chivas Regal: 18%\n3. The Glenlivet: 15%\n4. Absolut Vodka: 12%\n5. Jameson: 10%",
    chartData: [
      { name: 'Martell', value: 20 },
      { name: 'Chivas Regal', value: 18 },
      { name: 'The Glenlivet', value: 15 },
      { name: 'Absolut Vodka', value: 12 },
      { name: 'Jameson', value: 10 },
      { name: 'Outros', value: 25 },
    ]
  }
];

const customQuestions = [
  {
    text: "Quais são as 3 campanhas com maior ROI?",
    answer: "As 3 campanhas com maior ROI são:\n1. Campanha Verão Refrescante: 320% ROI\n2. Promoção Fim de Ano: 280% ROI\n3. Lançamento Edição Limitada: 250% ROI",
    chartData: [
      { name: 'Verão Refrescante', value: 320 },
      { name: 'Promoção Fim de Ano', value: 280 },
      { name: 'Lançamento Ed. Limitada', value: 250 },
    ]
  },
  {
    text: "Quais são as 3 campanhas com maior taxa de conversão no último trimestre?",
    answer: "As 3 campanhas com maior taxa de conversão no último trimestre são:\n1. Campanha A: 15.3%\n2. Campanha B: 12.7%\n3. Campanha C: 11.9%",
    chartData: [
      { name: 'Campanha A', value: 15.3 },
      { name: 'Campanha B', value: 12.7 },
      { name: 'Campanha C', value: 11.9 },
    ]
  },
  {
    text: "Qual foi a taxa de cliques por segmento na última campanha?",
    answer: "Na última campanha, as taxas de cliques por segmento foram:\nConnoisseurs Platinum: 12% cliques\nApreciadores Fiéis: 9% cliques\nExploradores de Sabores: 7% cliques",
    chartData: [
      { name: 'Connoisseurs Platinum', value: 12 },
      { name: 'Apreciadores Fiéis', value: 9 },
      { name: 'Exploradores de Sabores', value: 7 },
    ]
  }
];

const Dados = () => {
  const [stage, setStage] = useState('initial');
  const [conversation, setConversation] = useState([]);
  const [customQuestion, setCustomQuestion] = useState('');

  const handleInitialQuestionSelect = (question) => {
    setConversation([...conversation, { type: 'question', text: question.text }, { type: 'answer', text: question.answer, chartData: question.chartData }]);
    setStage('answered');
  };

  const handleCustomQuestionSubmit = (e) => {
    e.preventDefault();
    if (customQuestion.trim()) {
      const matchedCustomQuestion = customQuestions.find(q => 
        q.text.toLowerCase().includes(customQuestion.toLowerCase()) ||
        customQuestion.toLowerCase().includes(q.text.toLowerCase())
      );

      if (matchedCustomQuestion) {
        setConversation([...conversation, { type: 'question', text: customQuestion }, { type: 'answer', text: matchedCustomQuestion.answer, chartData: matchedCustomQuestion.chartData }]);
      } else {
        setConversation([...conversation, { type: 'question', text: customQuestion }, { type: 'answer', text: "Desculpe, não tenho uma resposta específica para essa pergunta. Posso ajudar com algo mais?" }]);
      }

      setCustomQuestion('');
      setStage('answered');
    }
  };

  const handleBackToInitial = () => {
    setStage('initial');
  };

  const handleEndSession = () => {
    setConversation([]);
    setStage('initial');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-3xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-teal-300">Olá!</h1>
        <p className="text-lg">
          Eu sou o <span className="font-semibold text-teal-300">CampaignMaster</span> e vou te ajudar a visualizar dados de suas campanhas diretamente do Salesforce.
        </p>
      </div>
      
      {stage === 'initial' && (
        <>
          <p className="mb-4 text-sm text-gray-300">Aqui vão algumas perguntas que você pode fazer:</p>
          <div className="space-y-3 mb-4">
            {initialQuestions.map((question, index) => (
              <button
                key={index}
                className="flex items-center bg-gray-800 p-4 rounded-2xl w-full text-left hover:bg-gray-700 transition-colors"
                onClick={() => handleInitialQuestionSelect(question)}
              >
                <div className="bg-gray-700 p-2 rounded-lg mr-4">
                  {question.icon}
                </div>
                <span className="text-sm">{question.text}</span>
              </button>
            ))}
          </div>
          <form onSubmit={handleCustomQuestionSubmit} className="mt-4">
            <div className="flex items-center">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Faça uma pergunta personalizada..."
                className="flex-grow p-3 rounded-l-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white p-3 rounded-r-xl hover:bg-teal-700 transition-colors"
                onClick={handleCustomQuestionSubmit}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </>
      )}

      {stage === 'answered' && (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-sm text-gray-300">Última pergunta respondida:</p>
            <p className="font-bold">{conversation[conversation.length - 2].text}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-sm text-gray-300">Resposta:</p>
            <p className="mb-4">{conversation[conversation.length - 1].text}</p>
            {conversation[conversation.length - 1].chartData && (
              <div className="mt-4">
                <SimpleBarChart data={conversation[conversation.length - 1].chartData} />
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              className="flex-1 bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 transition-colors"
              onClick={handleBackToInitial}
            >
              Voltar ao início
            </button>
            <button
              className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-colors"
              onClick={handleEndSession}
            >
              Encerrar sessão
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dados;