import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: customersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail, isLoading: salesDetailLoading } = useGetTotalSalesByDateQuery();

  if (salesLoading || customersLoading || ordersLoading || salesDetailLoading) {
    return <Loader />;
  }

  // Urutkan salesDetail berdasarkan _id (tanggal)
  const sortedSalesDetail = salesDetail
    ? salesDetail.slice().sort((a, b) => new Date(b._id) - new Date(a._id))
    : [];

  return (
    <>
      <AdminMenu />
      <section className="xl:ml-[4rem] mt-[20rem] md:ml-[0rem]">
        <h1 className="ml-[2rem]">Summary</h1>
        <div className="w-[100%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>

            <p className="mt-5">Penjualan</p>
            <h1 className="text-xl font-bold">
              Rp. {sales?.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>

            <p className="mt-5">Pelanggan</p>
            <h1 className="text-xl font-bold">
              {customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>

            <p className="mt-5">Pesanan</p>
            <h1 className="text-xl font-bold">
              {orders?.totalOrders}
            </h1>
          </div>
        </div>
        
        {/* Tabel Penjualan per Tanggal */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold ml-5">Penjualan per Tanggal</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Penjualan</th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-gray-200">
                {sortedSalesDetail.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {item._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp. {item.totalSales.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
