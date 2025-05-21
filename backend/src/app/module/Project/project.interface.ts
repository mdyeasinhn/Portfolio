export interface TProject {
  _id?: string;
  title: string;
  content: string;
  image: string;
  link?: string;
  github?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Other';
  techStack?: string[];
  features?: string[];
  challenges?: string;
  solutions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
