import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import apiService from "../../services/ApiServices";
// Style =======================================
import {
  cardStyles,
  cardContentStyles,
  titleStyles,
  countStyles,
} from "./style";

const DashboardInfo = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiService.get("api/dashboard-count/");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const mappedData = dashboardData
    ? [
        {
          title: "Total Users",
          count: dashboardData.total_user_count || "0",
          gradient: "linear-gradient(82.59deg, #d13981 0%, #5b448f 100%)",
        },
        {
          title: "Total Books",
          count: dashboardData.total_books || "0",
          gradient: "linear-gradient(81.67deg, #ae3d8e 0%, #864193 100%)",
        },
        {
          title: "Different Books",
          count: dashboardData.total_different_books || "0",
          gradient: "linear-gradient(69.83deg, #d13981 0%, #864193 100%)",
        },
        {
          title: "Copies Available",
          count: dashboardData.total_copies_available || "0",
          gradient: "linear-gradient(81.67deg, #ff647c 0%, #1f5dc5 100%)",
        },
      ]
    : [];

  return (
    <div className="container pt-5">
      {error && (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        {mappedData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={cardStyles(item.gradient)}>
              <CardContent sx={cardContentStyles}>
                <Typography variant="h6" sx={titleStyles}>
                  {item.title}
                </Typography>
                <Typography variant="h2" sx={countStyles}>
                  {item.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardInfo;
