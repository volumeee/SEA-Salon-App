export type RootStackParamList = {
  MainTabs: undefined;
  HomeDetail: undefined;
  ReservationDetail: undefined;
  ProfileDetail: undefined;
  Order: { specialist: HairSpecialist };
  Payment: { specialist: HairSpecialist; date: string }; // Change Date to string
};

export type Category = {
  id: number;
  categories_name: string;
};

export type HairSpecialist = {
  id: number;
  specialist_name: string;
  specialist_phone: string;
  specialist_price: number;
  profile_picture: string;
  vote_average: number;
  categories: Category[];
};

export type Transaction = {
  id: number;
  created_at: string;
  hair_specialist_id: number;
  t_specialist_name: string;
  t_specialist_categories: string;
  t_specialist_phone: string;
  t_rating: number;
  t_transaction_date: string;
  t_payment_method: string;
  t_amount_price: string;
  t_state_id: State[];
  customer_id: number;
};

export type State = {
  id: number;
  status: string;
};
