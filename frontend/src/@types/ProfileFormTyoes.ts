export type ProfileFormType = {
  firstName: string;
  secondName: string;
  email: string;
  userName?: string | null;
};
export interface ShippingFormType {
  firstName: string;
  lastName: string;

  address: string;
  address2?: string; // необязательное поле
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
}
