import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-blacks.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
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

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((book) => !book.returned);
    const returned = userBorrowedBooks.filter((book) => book.returned);
    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);
  }, [userBorrowedBooks]);

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

  const options = {
    cutout: "0%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.formattedValue} books`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <main className="relative flex-1 p-4 sm:p-6 pt-24 sm:pt-28 bg-neutral-100 min-h-screen">
        <Header />
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Section */}
          <section className="flex flex-col xl:w-3/5 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition  hover:ring-2 hover:ring-neutral-300">
                <span className="w-1.5 bg-gray-800 h-16 rounded-full"></span>
                <span className="bg-gray-200 h-16 w-16 flex justify-center items-center rounded-full flex-shrink-0">
                  <img src={bookIcon} alt="book-icon" className="w-9 h-9" />
                </span>
                <p className="text-lg font-semibold text-gray-800 flex-grow">
                  Your Borrowed Book List
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition  hover:ring-2 hover:ring-neutral-300">
                <span className="w-1.5 bg-gray-800 h-16 rounded-full"></span>
                <span className="bg-gray-200 h-16 w-16 flex justify-center items-center rounded-full flex-shrink-0">
                  <img src={returnIcon} alt="return-icon" className="w-9 h-9" />
                </span>
                <p className="text-lg font-semibold text-gray-800 flex-grow">
                  Your Returned Book List
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition hover:ring-2 hover:ring-neutral-300">
                <span className="w-1.5 bg-gray-800 h-16 rounded-full"></span>
                <span className="bg-gray-200 h-16 w-16 flex justify-center items-center rounded-full flex-shrink-0">
                  <img src={browseIcon} alt="browse-icon" className="w-9 h-9" />
                </span>
                <p className="text-lg font-semibold text-gray-800 flex-grow">
                  Let's browse the book inventory
                </p>
              </div>

              {/* Logo */}
              <div className="hidden md:flex justify-center items-center p-5">
                <img
                  src={logo_with_title}
                  alt="LibroTrack Logo"
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Quote Section */}
            <div className="bg-white p-16 text-center rounded-2xl shadow-sm flex flex-col justify-center items-center min-h-[180px] max-w-4xl mx-auto ">
              <h4 className="text-2xl sm:text-3xl font-serif italic text-gray-700 max-w-2xl">
                " When in doubt, go to the library. "
              </h4>
              <p className="text-sm sm:text-base text-gray-600 mt-5 self-end pr-4">
                ~ LibroTrack Team
              </p>
            </div>
          </section>

          {/* Right Section */}
          <aside className="flex flex-col xl:w-2/5 gap-6">
            {/* Pie Chart */}
            <div className="bg-white p-16 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[320px]">
              <Pie
                data={data}
                options={{ cutout: 0 }}
                className="mx-auto lg:mx-0 w-full h-auto"
              ></Pie>
            </div>

            {/* Legend */}
            <div className="bg-white p-2 rounded-2xl shadow-sm flex items-center gap-5">
              <img
                src={logo}
                alt="LibroTrack Logo"
                className="w-auto h-16 sm:h-20"
              />
              <span className="w-1 bg-gray-300 h-20 rounded-full"></span>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-4 h-2.5 rounded-full bg-[#3D3E3E]"></span>
                  <span>Total Borrowed Books</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-4 h-2.5 rounded-full bg-[#151619]"></span>
                  <span>Total Returned Books</span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
