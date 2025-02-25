import { Feature } from './feature.model'
export interface Group {
    _id?: string;          
    code: string;          
    label: string;         
    description?: string; 
    features:Feature[];    
    status?: string;      
    createdAt?: string;    
    updatedAt?: string;    
  }
  