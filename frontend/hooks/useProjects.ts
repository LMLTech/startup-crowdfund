import { useState, useEffect } from 'react';
import { projectAPI, Project, CreateProjectRequest } from '../services/api';
import { 
  getAllProjects, 
  getApprovedProjects as getApprovedProjectsLocal,
  getPendingProjects as getPendingProjectsLocal,
  getProjectById as getProjectByIdLocal,
  getProjectsByFounderId as getProjectsByFounderIdLocal,
  createProject as createProjectLocal,
  updateProject as updateProjectLocal,
  approveProject as approveProjectLocal,
  rejectProject as rejectProjectLocal,
  deleteProject as deleteProjectLocal,
} from '../utils/projectsManager';

const USE_MOCK = import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_BASE_URL;

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApprovedProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const data = getApprovedProjectsLocal();
        setProjects(data);
      } else {
        const data = await projectAPI.getApprovedProjects();
        setProjects(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
      setLoading(false);
    }
  };

  const fetchPendingProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const data = getPendingProjectsLocal();
        setProjects(data);
      } else {
        const data = await projectAPI.getPendingProjects();
        setProjects(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pending projects');
      setLoading(false);
    }
  };

  const fetchProjectById = async (id: number): Promise<Project | undefined> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const data = getProjectByIdLocal(id);
        setLoading(false);
        return data;
      } else {
        const data = await projectAPI.getProjectById(id);
        setLoading(false);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch project');
      setLoading(false);
      return undefined;
    }
  };

  const fetchProjectsByFounder = async (founderId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const data = getProjectsByFounderIdLocal(founderId);
        setProjects(data);
      } else {
        const data = await projectAPI.getProjectsByFounder(founderId);
        setProjects(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
      setLoading(false);
    }
  };

  const createProject = async (projectData: CreateProjectRequest): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const newProject = createProjectLocal({
          ...projectData,
          status: 'pending',
          founderId: 0, // Will be set by the component
          startupName: '',
          founderName: '',
          founderEmail: '',
        });
        setLoading(false);
        return newProject;
      } else {
        const data = await projectAPI.createProject(projectData);
        setLoading(false);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      setLoading(false);
      return null;
    }
  };

  const updateProject = async (id: number, updates: Partial<CreateProjectRequest>): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const updated = updateProjectLocal(id, updates);
        setLoading(false);
        return updated;
      } else {
        const data = await projectAPI.updateProject(id, updates);
        setLoading(false);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
      setLoading(false);
      return null;
    }
  };

  const approveProject = async (id: number, feedback?: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const approved = approveProjectLocal(id, feedback);
        setLoading(false);
        return approved;
      } else {
        const data = await projectAPI.approveProject(id, feedback);
        setLoading(false);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to approve project');
      setLoading(false);
      return null;
    }
  };

  const rejectProject = async (id: number, feedback: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const rejected = rejectProjectLocal(id, feedback);
        setLoading(false);
        return rejected;
      } else {
        const data = await projectAPI.rejectProject(id, feedback);
        setLoading(false);
        return data;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reject project');
      setLoading(false);
      return null;
    }
  };

  const deleteProject = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const deleted = deleteProjectLocal(id);
        setLoading(false);
        return deleted;
      } else {
        await projectAPI.deleteProject(id);
        setLoading(false);
        return true;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
      setLoading(false);
      return false;
    }
  };

  const searchProjects = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK) {
        const allProjects = getAllProjects();
        const filtered = allProjects.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        setProjects(filtered);
      } else {
        const data = await projectAPI.searchProjects(query);
        setProjects(data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to search projects');
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchApprovedProjects,
    fetchPendingProjects,
    fetchProjectById,
    fetchProjectsByFounder,
    createProject,
    updateProject,
    approveProject,
    rejectProject,
    deleteProject,
    searchProjects,
  };
};
