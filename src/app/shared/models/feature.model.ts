export interface Feature {
    _id?: string;
    code: string;
    title: string;
    type: string;
    subtitle?: string;
    icon?: string;
    link?: string;
    order?: number;
    status?: string;
    featuresIdParent?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  