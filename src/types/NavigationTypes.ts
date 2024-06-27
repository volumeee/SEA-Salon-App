export type RootStackParamList = {
  MainTabs: undefined;
  HomeDetail: undefined;
  ReservationDetail: undefined;
  ProfileDetail: undefined;
  Transaction: { specialist: HairSpecialist };
};

export interface HairSpecialist {
  id: number;
  specialist_name: string;
  specialist_phone: string;
  specialist_price: string;
  profile_picture: string;
  vote_average: number;
}
