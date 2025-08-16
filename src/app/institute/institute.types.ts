export interface Iinstitute {
  instituteName: string,
  instituteEmail: string,
  institutePhoneNumber: string,
  instituteAddress: string,
  instituteVatNo: string,
  institutePanNo: string

}
export interface IDecodedToken {
  id: string | null;
  name: string | null;
  role: string | null;
  iat: number | null;
  exp: number | null;
}