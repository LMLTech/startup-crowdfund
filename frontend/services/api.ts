// API Service Layer
// This file handles all API calls to the Java Spring Boot backend
// Base URL should be configured in environment variables

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token || null;
  }
  return null;
};

// Helper function to create headers
const createHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Helper function to handle responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// ============================================
// AUTHENTICATION APIs
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'investor' | 'startup';
  company?: string;
  phone?: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
  company?: string;
  phone?: string;
}

export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(response);
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(response);
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: createHeaders(),
    });
    return handleResponse<AuthResponse>(response);
  },
};

// ============================================
// PROJECT APIs
// ============================================

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  investorCount: number;
  daysLeft: number;
  startupName: string;
  founderId: number;
  founderName: string;
  founderEmail: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  image: string;
  tags: string[];
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  reviewFeedback?: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  targetAmount: number;
  daysLeft: number;
  image: string;
  tags: string[];
  milestones?: Array<{
    title: string;
    description: string;
    amount: number;
  }>;
}

export const projectAPI = {
  // Get all approved projects (public)
  getApprovedProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/approved`, {
      headers: createHeaders(false),
    });
    return handleResponse<Project[]>(response);
  },

  // Get pending projects (CVA only)
  getPendingProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/pending`, {
      headers: createHeaders(),
    });
    return handleResponse<Project[]>(response);
  },

  // Get project by ID
  getProjectById: async (id: number): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: createHeaders(false),
    });
    return handleResponse<Project>(response);
  },

  // Get projects by founder
  getProjectsByFounder: async (founderId: number): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/founder/${founderId}`, {
      headers: createHeaders(),
    });
    return handleResponse<Project[]>(response);
  },

  // Create new project (startup only)
  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<Project>(response);
  },

  // Update project (startup only)
  updateProject: async (id: number, data: Partial<CreateProjectRequest>): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<Project>(response);
  },

  // Approve project (CVA only)
  approveProject: async (id: number, feedback?: string): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/approve`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({ feedback }),
    });
    return handleResponse<Project>(response);
  },

  // Reject project (CVA only)
  rejectProject: async (id: number, feedback: string): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/reject`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({ feedback }),
    });
    return handleResponse<Project>(response);
  },

  // Delete project (admin only)
  deleteProject: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  },

  // Search projects
  searchProjects: async (query: string): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/search?q=${encodeURIComponent(query)}`, {
      headers: createHeaders(false),
    });
    return handleResponse<Project[]>(response);
  },
};

// ============================================
// INVESTMENT APIs
// ============================================

export interface Investment {
  id: number;
  projectId: number;
  projectTitle: string;
  investorId: number;
  investorName: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

export interface CreateInvestmentRequest {
  projectId: number;
  amount: number;
  paymentMethod: string;
}

export const investmentAPI = {
  // Create investment
  createInvestment: async (data: CreateInvestmentRequest): Promise<Investment> => {
    const response = await fetch(`${API_BASE_URL}/investments`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<Investment>(response);
  },

  // Get investments by investor
  getInvestmentsByInvestor: async (investorId: number): Promise<Investment[]> => {
    const response = await fetch(`${API_BASE_URL}/investments/investor/${investorId}`, {
      headers: createHeaders(),
    });
    return handleResponse<Investment[]>(response);
  },

  // Get investments by project
  getInvestmentsByProject: async (projectId: number): Promise<Investment[]> => {
    const response = await fetch(`${API_BASE_URL}/investments/project/${projectId}`, {
      headers: createHeaders(),
    });
    return handleResponse<Investment[]>(response);
  },

  // Get investment by ID
  getInvestmentById: async (id: number): Promise<Investment> => {
    const response = await fetch(`${API_BASE_URL}/investments/${id}`, {
      headers: createHeaders(),
    });
    return handleResponse<Investment>(response);
  },
};

// ============================================
// TRANSACTION APIs
// ============================================

export interface Transaction {
  id: number;
  investmentId: number;
  amount: number;
  type: 'investment' | 'withdrawal' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  vnpayTransactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export const transactionAPI = {
  // Get all transactions (admin only)
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: createHeaders(),
    });
    return handleResponse<Transaction[]>(response);
  },

  // Get transaction by ID
  getTransactionById: async (id: number): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      headers: createHeaders(),
    });
    return handleResponse<Transaction>(response);
  },

  // Get transactions by user
  getTransactionsByUser: async (userId: number): Promise<Transaction[]> => {
    const response = await fetch(`${API_BASE_URL}/transactions/user/${userId}`, {
      headers: createHeaders(),
    });
    return handleResponse<Transaction[]>(response);
  },
};

// ============================================
// USER APIs (Admin)
// ============================================

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  company?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
}

export const userAPI = {
  // Get all users (admin only)
  getAllUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: createHeaders(),
    });
    return handleResponse<User[]>(response);
  },

  // Get user by ID (admin only)
  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: createHeaders(),
    });
    return handleResponse<User>(response);
  },

  // Update user status (admin only)
  updateUserStatus: async (id: number, status: 'active' | 'inactive' | 'banned'): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/status`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse<User>(response);
  },

  // Delete user (admin only)
  deleteUser: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};

// ============================================
// STATISTICS APIs
// ============================================

export interface Statistics {
  totalProjects: number;
  totalInvestments: number;
  totalInvestors: number;
  totalStartups: number;
  totalFunding: number;
  pendingProjects: number;
  approvedProjects: number;
  rejectedProjects: number;
}

export const statisticsAPI = {
  // Get overall statistics
  getOverallStatistics: async (): Promise<Statistics> => {
    const response = await fetch(`${API_BASE_URL}/statistics/overall`, {
      headers: createHeaders(),
    });
    return handleResponse<Statistics>(response);
  },

  // Get investor statistics
  getInvestorStatistics: async (investorId: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/statistics/investor/${investorId}`, {
      headers: createHeaders(),
    });
    return handleResponse<any>(response);
  },

  // Get startup statistics
  getStartupStatistics: async (founderId: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/statistics/startup/${founderId}`, {
      headers: createHeaders(),
    });
    return handleResponse<any>(response);
  },
};

// ============================================
// VNPAY Payment APIs
// ============================================

export interface VNPayRequest {
  amount: number;
  investmentId: number;
  returnUrl: string;
}

export interface VNPayResponse {
  paymentUrl: string;
}

export const vnpayAPI = {
  // Create payment URL
  createPaymentUrl: async (data: VNPayRequest): Promise<VNPayResponse> => {
    const response = await fetch(`${API_BASE_URL}/payment/vnpay/create`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<VNPayResponse>(response);
  },

  // Verify payment callback
  verifyPayment: async (queryParams: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/payment/vnpay/callback?${queryParams}`, {
      headers: createHeaders(),
    });
    return handleResponse<{ success: boolean; message: string }>(response);
  },
};

export default {
  auth: authAPI,
  project: projectAPI,
  investment: investmentAPI,
  transaction: transactionAPI,
  user: userAPI,
  statistics: statisticsAPI,
  vnpay: vnpayAPI,
};
