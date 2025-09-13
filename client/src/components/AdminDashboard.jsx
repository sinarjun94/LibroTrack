import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import avatarHolder from "../assets/avatar-holder.jpg";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const userCount = users.filter((u) => u.role === "User").length;
    const adminCount = users.filter((u) => u.role === "Admin").length;
    const bookCount = books.length || 0;
    const borrowedCount = allBorrowedBooks.filter(
      (b) => b.returnDate === null
    ).length;
    const returnedCount = allBorrowedBooks.filter(
      (b) => b.returnDate !== null
    ).length;

    setTotalUsers(userCount);
    setTotalAdmins(adminCount);
    setTotalBooks(bookCount);
    setTotalBorrowedBooks(borrowedCount);
    setTotalReturnedBooks(returnedCount);
  }, [users, books, allBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 8,
        borderWidth: 2,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-6 pt-28 bg-gray-50 min-h-screen">
      <Header />

      {/* Top Section: Chart and Legend */}
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Pie Chart */}
        <section className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center xl:w-5/10">
          <Pie
            data={data}
            options={{ cutout: 0 }}
            className="w-full max-w-xs h-auto"
          />
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-4 h-4 rounded-full bg-[#3D3E3E]"></span>
              <span>Borrowed: {totalBorrowedBooks}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-4 h-4 rounded-full bg-[#151619]"></span>
              <span>Returned: {totalReturnedBooks}</span>
            </div>
          </div>
        </section>

        {/* KPI Cards and Profile */}
        <section className="flex flex-col gap-6 flex-1">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Users */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <span className="bg-gray-200 h-16 w-16 flex justify-center items-center rounded-full">
                <img src={usersIcon} alt="Users Icon" className="w-8 h-8" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{totalUsers}</h4>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>

            {/* Total Books */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <span className="bg-gray-200 h-16 w-16 flex justify-center items-center rounded-full">
                <img src={bookIcon} alt="Books Icon" className="w-8 h-8" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{totalBooks}</h4>
                <p className="text-gray-600">Total Books</p>
              </div>
            </div>

            {/* Total Admins */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <span className="bg-gray-200 h-16 w-16 flex justify-center items-center rounded-full">
                <img src={adminIcon} alt="Admin Icon" className="w-8 h-8" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{totalAdmins}</h4>
                <p className="text-gray-600">Total Admins</p>
              </div>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={user?.avatar?.url || avatarHolder}
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{user?.name || "Admin"}</h2>
            <p className="text-gray-600 text-sm mt-2 max-w-md">
              Welcome to your admin dashboard. Manage users, books, and monitor
              library activities efficiently.
            </p>
          </div>
        </section>
      </div>

      {/* Quote Section */}
      <section className="mt-10 bg-white p-9 rounded-xl shadow flex flex-col justify-center w-full">
        <h4 className="text-lg sm:text-2xl md:text-3xl font-serif italic text-gray-700 w-full text-left md:text-center">
          " Read more, learn more, grow more. "
        </h4>
        <p className="text-sm sm:text-base text-gray-600 mt-4 w-full text-right pr-2">
          ~ LibroTrack Team
        </p>
      </section>
    </main>
  );
};

export default AdminDashboard;
