export interface IConfigEnvironment {
  env: 'development' | 'staging' | 'production' | 'test';
  apiUrl: string;
}
