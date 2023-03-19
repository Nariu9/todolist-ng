export interface CommonResponse<T = Record<never, never>> {
  data: T;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
}
