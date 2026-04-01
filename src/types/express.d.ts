declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      cellphone: string;
      birthDate: Date;
    };
  }
}