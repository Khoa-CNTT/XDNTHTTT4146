import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="homepage-container min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 relative">
      <Navbar />

      <main className="main-content flex flex-col items-center justify-center text-center pt-24 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Chào mừng đến với TOEIC Gamification!
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Tăng cường kỹ năng TOEIC của bạn qua các trò chơi học tập thú vị và
          hiệu quả. Khám phá các khóa học, từ vựng, và những thử thách hấp dẫn.
        </p>
        <Link to="/login">
          <button className="cta-button text-white">Bắt đầu ngay</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
