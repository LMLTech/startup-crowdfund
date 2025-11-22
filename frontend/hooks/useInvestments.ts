import { useState } from 'react';
import { investmentAPI, Investment, CreateInvestmentRequest } from '../services/api';
import { addInvestment } from '../utils/projectsManager';

const USE_MOCK = import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_BASE_URL;

// Mock investments storage
const INVESTMENTS_KEY = 'starfund_investments';

const getMockInvestments = (): Investment[] => {
  const data = localStorage.getItem(INVESTMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveMockInvestment = (investment: Investment) => {
  const investments = getMockInvestments();
  investments.push(investment);
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
};

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvestment = async (data: CreateInvestmentRequest): Promise<Investment | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        // Mock investment creation
        const newInvestment: Investment = {
          id: Date.now(),
          projectId: data.projectId,
          projectTitle: 'Project ' + data.projectId, // This should be fetched from project
          investorId: 0, // Will be set from current user
          investorName: 'Current User',
          amount: data.amount,
          paymentMethod: data.paymentMethod,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        
        saveMockInvestment(newInvestment);
        
        // Update project with investment
        addInvestment(data.projectId, data.amount);
        
        setLoading(false);
        return newInvestment;
      } else {
        const response = await investmentAPI.createInvestment(data);
        setLoading(false);
        return response;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create investment');
      setLoading(false);
      return null;
    }
  };

  const fetchInvestmentsByInvestor = async (investorId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const allInvestments = getMockInvestments();
        const filtered = allInvestments.filter(inv => inv.investorId === investorId);
        setInvestments(filtered);
      } else {
        const data = await investmentAPI.getInvestmentsByInvestor(investorId);
        setInvestments(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch investments');
      setLoading(false);
    }
  };

  const fetchInvestmentsByProject = async (projectId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const allInvestments = getMockInvestments();
        const filtered = allInvestments.filter(inv => inv.projectId === projectId);
        setInvestments(filtered);
      } else {
        const data = await investmentAPI.getInvestmentsByProject(projectId);
        setInvestments(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch investments');
      setLoading(false);
    }
  };

  const fetchInvestmentById = async (id: number): Promise<Investment | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const allInvestments = getMockInvestments();
        const investment = allInvestments.find(inv => inv.id === id);
        setLoading(false);
        return investment || null;
      } else {
        const data = await investmentAPI.getInvestmentById(id);
        setLoading(false);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch investment');
      setLoading(false);
      return null;
    }
  };

  const getTotalInvestedByInvestor = (investorId: number): number => {
    if (USE_MOCK) {
      const allInvestments = getMockInvestments();
      return allInvestments
        .filter(inv => inv.investorId === investorId && inv.status === 'completed')
        .reduce((sum, inv) => sum + inv.amount, 0);
    }
    return 0;
  };

  return {
    investments,
    loading,
    error,
    createInvestment,
    fetchInvestmentsByInvestor,
    fetchInvestmentsByProject,
    fetchInvestmentById,
    getTotalInvestedByInvestor,
  };
};
