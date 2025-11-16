// import React from "react";
// import alarmClock from "./../../public/Alarm Clock.png";
// import barChart from "./../../public/Bar Chart.png";
// import calendar from "./../../public/Calendar.png";
// import image1 from "./../../public/image 1.png";
// import student from "./../../public/student.png";

// const Home = () => {
//   return (
//     <div className="bg-white w-full min-w-[1280px] min-h-[1296px] relative">
//       <div className="absolute top-[708px] left-0 w-[1280px] h-[588px] bg-[#289e55]" />

//       <p className="top-[210px] [font-family:'Poppins-ExtraBold',Helvetica] font-extrabold text-[#202c3b] text-5xl leading-[58px] absolute left-[calc(50.00%_-_522px)] w-[522px] tracking-[0]">
//         Emsi Study Hub Organize Your Learning Journey
//       </p>

//       <p className="absolute top-[752px] left-[calc(50.00%_-_391px)] w-[783px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-[42px] text-center tracking-[0] leading-[58px]">
//         Empower Your Study Life At Emsi
//       </p>

//       <p className="top-[404px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#5e6670] text-xl leading-[27px] absolute left-[calc(50.00%_-_522px)] w-[522px] tracking-[0]">
//         EMSI Study Hub helps you stay organized and focused. Create notes,
//         manage your tasks, and visualize your schedule effortlessly — all in one
//         simple dashboard.
//       </p>

//       <p className="absolute top-[830px] left-[calc(50.00%_-_261px)] w-[522px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#dedede] text-xl text-center tracking-[0] leading-[27px]">
//         Turn your study sessions into a productive and rewarding experience
//         designed especially for EMSI students.
//       </p>

//       <div className="flex w-[143px] h-[41px] items-center justify-center gap-2.5 px-[19px] py-[9px] absolute top-[29px] left-[1017px] rounded-[39px] border border-solid border-[#008d36]">
//         <div className="relative w-fit mt-[-0.50px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#008d36] text-lg tracking-[0] leading-[normal]">
//           Get Access
//         </div>
//       </div>

//       <div className="inline-flex items-center justify-center gap-2.5 px-10 py-3 absolute top-[542px] left-[120px] bg-[#008d36] rounded-[39px]">
//         <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]">
//           Start your journey
//         </div>
//       </div>

//       <div className="absolute top-[17px] left-[120px] w-[106px] h-[67px]">
//         <img
//           className="absolute top-0 left-0 w-[106px] h-[46px] aspect-[2.31] object-cover"
//           alt="Image"
//           src={image1}
//         />

//         <div className="absolute top-[46px] left-px [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#131313] text-[17px] text-center tracking-[0] leading-[normal]">
//           STUDY HUB
//         </div>
//       </div>

//       <div className="absolute top-[153px] left-[738px] w-[426px] h-[555px]">
//         <div className="absolute left-[calc(50.00%_-_183px)] bottom-[123px] w-[366px] h-[366px] rounded-[183px] border-[3px] border-dashed border-[#008d36]" />

//         <div className="absolute left-[calc(50.00%_-_171px)] bottom-[135px] w-[342px] h-[342px] rounded-[171px] bg-[linear-gradient(237deg,rgba(0,141,54,1)_0%,rgba(81,162,70,1)_100%)]" />

//         <img
//           className="absolute left-[calc(50.00%_-_213px)] bottom-0 w-[426px] h-[555px] object-cover"
//           alt="Student"
//           src={student}
//         />
//       </div>

//       <div className="inline-flex items-center gap-7 absolute top-[971px] left-[calc(50.00%_-_514px)]">
//         <div className="inline-flex flex-col items-center justify-center px-[26px] py-[22px] relative flex-[0_0_auto] bg-white rounded-[14px]">
//           <img
//             className="relative w-11 h-11 object-cover"
//             alt="Calendar"
//             src={calendar}
//           />

//           <div className="flex flex-col w-[272px] items-start relative flex-[0_0_auto]">
//             <div className="relative self-stretch mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#202c3b] text-xl text-center tracking-[0] leading-[58px]">
//               Smart Study Habits
//             </div>

//             <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#5f6770] text-base text-center tracking-[0] leading-[27px]">
//               Create and track your daily study <br />
//               goals with simple checklists <br />
//               and progress indicators — stay <br />
//               consistent and organized.
//             </p>
//           </div>
//         </div>

//         <div className="inline-flex flex-col items-center justify-center px-[26px] py-[22px] relative flex-[0_0_auto] bg-white rounded-[14px]">
//           <img
//             className="relative w-11 h-11 aspect-[1] object-cover"
//             alt="Bar chart"
//             src={barChart}
//           />

//           <div className="flex flex-col w-[272px] items-start relative flex-[0_0_auto]">
//             <div className="relative self-stretch mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#202c3b] text-xl text-center tracking-[0] leading-[58px]">
//               Progress Insights
//             </div>

//             <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#5f6770] text-base text-center tracking-[0] leading-[27px]">
//               Visualize your academic growth through personalized charts that
//               track your learning time, shared materials, and achievements.
//             </p>
//           </div>
//         </div>

//         <div className="inline-flex flex-col items-center justify-center px-[26px] py-[22px] relative flex-[0_0_auto] bg-white rounded-[14px]">
//           <img
//             className="relative w-11 h-11 aspect-[1] object-cover"
//             alt="Alarm clock"
//             src={alarmClock}
//           />

//           <div className="flex flex-col w-[272px] items-start relative flex-[0_0_auto]">
//             <div className="relative self-stretch mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#202c3b] text-xl text-center tracking-[0] leading-[58px]">
//               Pomodoro Timer
//             </div>

//             <p className="relative self-stretch [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#5f6770] text-base text-center tracking-[0] leading-[27px]">
//               Study with focus using built-in Pomodoro sessions. Work in bursts,
//               take mindful breaks, and watch your consistency grow.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Home;

import React from "react";
// Assuming these paths are correct relative to the component file
import alarmClock from "./../../public/Alarm Clock.png";
import barChart from "./../../public/Bar Chart.png";
import calendar from "./../../public/Calendar.png";
import image1 from "./../../public/image 1.png"; // Emsi logo/brand image
import student from "./../../public/student.png"; // Hero image

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* --- Header/Navigation --- */}
      <header className="flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 absolute w-full z-10">
        {/* Logo/Brand */}
        <div className="flex flex-col items-start">
          <img
            className="w-24 h-10 object-contain"
            alt="EMSI Image Logo"
            src={image1}
          />
          <div className="font-bold text-lg text-gray-900 tracking-wider">
            STUDY HUB
          </div>
        </div>

        {/* Get Access Button (Bordered) */}
        <button className="flex items-center justify-center px-5 py-2 rounded-full border border-solid border-[#008d36] hover:bg-[#008d36] transition duration-300 group">
          <span className="font-bold text-lg text-[#008d36] group-hover:text-white">
            Get Access
          </span>
        </button>
      </header>

      {/* --- Hero Section --- */}
      <section className="pt-24 pb-12 lg:pb-0 px-6 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center justify-between min-h-[700px]">
        {/* Hero Content (Left) */}
        <div className="w-full lg:w-1/2 max-w-lg lg:max-w-xl mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#202c3b] leading-tight mb-6 font-poppins">
            Emsi Study Hub Organize Your Learning Journey
          </h1>

          <p className="text-xl font-medium text-[#5e6670] leading-relaxed mb-10 font-montserrat">
            EMSI Study Hub helps you stay organized and focused. Create notes,
            manage your tasks, and visualize your schedule effortlessly — all in
            one simple dashboard.
          </p>

          {/* Call to Action Button (Solid) */}
          <button className="inline-flex items-center justify-center px-10 py-3 bg-[#008d36] rounded-full hover:bg-green-700 transition duration-300 shadow-lg">
            <span className="font-bold text-lg text-white font-montserrat">
              Start your journey
            </span>
          </button>
        </div>

        {/* Hero Image (Right) */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center h-[550px]">
          {/* Animated/Styled Background Circles */}
          <div className="absolute inset-0 flex justify-center items-end pb-12">
            {/* Dashed Border Circle */}
            <div className="w-80 h-80 rounded-full border-[3px] border-dashed border-[#008d36] absolute transform translate-y-6" />
            {/* Solid Green Gradient Circle */}
            <div className="w-72 h-72 rounded-full absolute bg-gradient-to-br from-[#008d36] to-[#51a246] transform translate-y-6" />
          </div>

          {/* Student Image */}
          <img
            className="absolute bottom-0 w-[426px] h-[555px] object-cover"
            alt="Student studying on laptop"
            src={student}
          />
        </div>
      </section>

      {/* --- Features Section (Dark Green Background) --- */}
      <section className="bg-[#289e55] py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4 font-poppins">
            Empower Your Study Life At Emsi
          </h2>
          <p className="text-xl font-medium text-[#dedede] leading-relaxed mb-16 max-w-3xl mx-auto font-montserrat">
            Turn your study sessions into a productive and rewarding experience
            designed especially for EMSI students.
          </p>

          {/* Feature Cards Container */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
            {/* Card 1: Smart Study Habits */}
            <FeatureCard
              icon={calendar}
              title="Smart Study Habits"
              description="Create and track your daily study goals with simple checklists and progress indicators — stay consistent and organized."
            />

            {/* Card 2: Progress Insights */}
            <FeatureCard
              icon={barChart}
              title="Progress Insights"
              description="Visualize your academic growth through personalized charts that track your learning time, shared materials, and achievements."
            />

            {/* Card 3: Pomodoro Timer */}
            <FeatureCard
              icon={alarmClock}
              title="Pomodoro Timer"
              description="Study with focus using built-in Pomodoro sessions. Work in bursts, take mindful breaks, and watch your consistency grow."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for Feature Cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center justify-start p-6 bg-white rounded-xl shadow-lg w-full max-w-xs transition duration-300 hover:scale-[1.02] hover:shadow-xl">
    <img className="w-12 h-12 object-contain mb-4" alt={title} src={icon} />

    <h3 className="text-xl font-semibold text-[#202c3b] mb-2 text-center font-poppins">
      {title}
    </h3>

    {/* Using leading-normal for better vertical spacing in Tailwind context */}
    <p className="text-base font-medium text-[#5f6770] text-center leading-relaxed font-montserrat">
      {description}
    </p>
  </div>
);

export default Home;
