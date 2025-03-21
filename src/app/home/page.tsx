"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Task {
  id: number;
  message: string;
}

const tasks: Task[] = [
  {
    id: 1,
    message:
      "📢 Dear Members, Welcome to ShareMitra Community! 🙌\n\n💰 Earn ₹25 in just 2 minutes!\n💡 Referral Bonus: Onboard 10 friends and earn ₹400!\n\n1️⃣ Create a Broadcast List on WhatsApp with 250 unique contacts.\n\n2️⃣ Copy the affiliate link from this Telegram group and share it exactly as it is in your Broadcast List.\n\n3️⃣ Upload a screenshot of the shared message along with your UPI/QR code in the payment group here: https://t.me/sharemitrapayment.\n\n👉 Get ₹25 for every verified affiliate link shared!\n\n📌 Important: Add our number +919045054001 to your Broadcast List to qualify!",
  },
  {
    id: 2,
    message:
      "🔔 Stay Active: ShareMitra rewards consistent users! Complete daily tasks and earn more bonuses! 🚀",
  },
  {
    id: 3,
    message:
      "📞 Need Support? Join our Telegram Help Desk for quick assistance. Click here: https://t.me/sharemitrasupport",
  },
];

const HomePage: React.FC = () => {
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  /**
   * Tracks whether the newest task’s shining effect
   * has been turned off (i.e., user has expanded it).
   */
  const [hasOpenedNewest, setHasOpenedNewest] = useState(false);

  // Sort tasks so the newest (highest ID) is first
  const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);
  const newestId = sortedTasks[0]?.id; // ID of the newest task

  const handleCopyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    alert("Message copied!");
  };

  const handleSendWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  // Proceed to Next Step for a specific task
  const handleNextStepForTask = (taskId: number) => {
    window.location.href = `/home/taskupload?taskId=${taskId}`;
  };

  const toggleTask = (taskId: number) => {
    // Expand/collapse the clicked task
    setExpandedTask(expandedTask === taskId ? null : taskId);

    // If user is expanding the newest task,
    // disable the shining effect permanently.
    if (taskId === newestId && expandedTask !== taskId) {
      setHasOpenedNewest(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-center">
      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow p-6 mt-16 w-full max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-green-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to ShareMitra!
        </motion.h1>

        <motion.p
          className="text-lg text-green-700 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Earn money effortlessly by completing simple tasks. Follow the steps
          below and start earning now! 🚀
        </motion.p>

        {/* Task Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full border border-gray-200">
          {sortedTasks.map((task) => {
            const isNewest = task.id === newestId;
            // Only show shining effect if it's the newest AND hasn't been opened yet
            const shouldShine = isNewest && !hasOpenedNewest;

            return (
              <div
                key={task.id}
                className={`mb-4 border-b border-gray-300 pb-4 ${
                  shouldShine ? "animate-pulse bg-yellow-50" : ""
                }`}
              >
                <button
                  className="w-full text-left text-xl font-semibold text-gray-800 flex justify-between items-center"
                  onClick={() => toggleTask(task.id)}
                >
                  <span className="flex items-center">
                    Task {task.id}
                    {/* Show "New" badge if this is the newest task */}
                    {isNewest && (
                      <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                        NEW
                      </span>
                    )}
                  </span>
                  <span>{expandedTask === task.id ? "▲" : "▼"}</span>
                </button>

                {/* Expanded Task Details */}
                {expandedTask === task.id && (
                  <div className="mt-4 text-gray-600">
                    <p className="mb-4 whitespace-pre-line">{task.message}</p>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                      <button
                        className="flex-1 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => handleCopyMessage(task.message)}
                      >
                        📋 Copy Message
                      </button>
                      <button
                        className="flex-1 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition"
                        onClick={() => handleSendWhatsApp(task.message)}
                      >
                        📲 Send via WhatsApp
                      </button>
                    </div>

                    {/* Next Step Button */}
                    <button
                      className="mt-4 w-full bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
                      onClick={() => handleNextStepForTask(task.id)}
                    >
                      ⏭️ Proceed to Next Step for Task {task.id}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
