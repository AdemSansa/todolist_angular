

export interface GroupFeature {
    _id?: string;
    group: string;
    feature: string;
    status?: string;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    list: boolean;
    createdAt?: string;
    updatedAt?: string;
  }