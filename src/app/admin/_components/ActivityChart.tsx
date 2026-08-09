"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ActivityChartProps {
  skillsCount: number;
  projectsCount: number;
  experiencesCount: number;
  messagesCount: number;
}

export default function ActivityChart({
  skillsCount,
  projectsCount,
  experiencesCount,
  messagesCount,
}: ActivityChartProps) {
  const options: ApexOptions = {
    colors: ["#465FFF", "#12B76A", "#F79009", "#F04438"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 280,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 8,
        borderRadiusApplication: "end",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: ["Projects", "Skills", "Experience", "Messages"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: ["#6B7280", "#6B7280", "#6B7280", "#6B7280"],
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        style: { colors: ["#6B7280"] },
      },
    },
    grid: {
      borderColor: "rgba(243, 244, 246, 0.6)",
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} total` },
    },
  };

  const series = [
    {
      name: "Count",
      data: [projectsCount, skillsCount, experiencesCount, messagesCount],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-none dark:bg-black sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Portfolio Content Distribution
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Breakdown of active entities stored in your portfolio database
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <ReactApexChart options={options} series={series} type="bar" height={280} />
        </div>
      </div>
    </div>
  );
}
