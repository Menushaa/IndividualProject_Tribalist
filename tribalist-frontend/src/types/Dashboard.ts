export interface RecentOrder {
  id: number;
  name: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface DashboardData {
  totalRevenue: number;
  totalItems: number;
  totalOrders: number;
  totalCustomers: number;
  recentOrders: RecentOrder[];
}
