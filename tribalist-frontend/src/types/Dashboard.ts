export interface RecentOrder {
  id: number;
  name: string;
  item: string;
  date: string;
  status: string;
  amount: number;
}

export interface DashboardData {
  totalRevenue: number;
  totalItems: number;
  totalOrders: number;
  totalCustomers: number;
  recentOrders: RecentOrder[];
}
