export interface UserAuthData {
  displayName: null;
  email: null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: Metadata;
  multiFactor: MultiFactor;
  phoneNumber: string;
  photoURL: null;
  providerData: ProviderDatum[];
  providerId: string;
  refreshToken: string;
  tenantId: null;
  uid: string;
}

export interface Metadata {
  creationTime: number;
  lastSignInTime: number;
}

export interface MultiFactor {
  enrolledFactors: any[];
}

export interface ProviderDatum {
  phoneNumber: string;
  providerId: string;
}
