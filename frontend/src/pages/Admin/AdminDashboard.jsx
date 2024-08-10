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
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail && Array.isArray(salesDetail)) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

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
              Rp. {salesLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>

            <p className="mt-5">Pelanggan</p>
            <h1 className="text-xl font-bold">
               {customersLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>

            <p className="mt-5">Pesanan</p>
            <h1 className="text-xl font-bold">
               {ordersLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
