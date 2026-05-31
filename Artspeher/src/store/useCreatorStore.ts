import { create } from 'zustand';
import { MOCK_CREATORS } from '../lib/mockData';
import type { Creator, Project } from '../lib/mockData';

interface CreatorStore {
  currentUser: Creator;
  updateProfile: (data: Partial<Creator>) => void;
  addProject: (project: Omit<Project, 'id' | 'likes'>) => void;
  removeProject: (id: string) => void;
}

export const useCreatorStore = create<CreatorStore>((set) => ({
  currentUser: MOCK_CREATORS[0], // Start with the first mock user
  
  updateProfile: (data) => 
    set((state) => ({ 
      currentUser: { ...state.currentUser, ...data } 
    })),
    
  addProject: (project) => 
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        projects: [
          ...state.currentUser.projects,
          { 
            ...project, 
            id: `p_${Math.random().toString(36).substr(2, 9)}`,
            likes: 0 
          }
        ]
      }
    })),
    
  removeProject: (id) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        projects: state.currentUser.projects.filter(p => p.id !== id)
      }
    }))
}));
