import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState({
        orders: 0,
        users: 0,
        menuItems: 0,
        income: 0
    });
    const [salesData, setSalesData] = useState({
        labels: [],
        datasets: []
    });
    const [popularFoodData, setPopularFoodData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use full backend URLs if not using a proxy
                const dashboardResponse = await fetch('http://localhost:5000/api/orders/dashboard-data');
                if (!dashboardResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const dashboardData = await dashboardResponse.json();
                setDashboardData(dashboardData);
        
                const salesResponse = await fetch('http://localhost:5000/api/orders/sales-figures');
                if (!salesResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const salesFigures = await salesResponse.json();
                setSalesData({
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Sales Figures',
                        data: salesFigures,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                    }]
                });
        
                const foodResponse = await fetch('http://localhost:5000/api/orders/popular-food');
                if (!foodResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const popularFood = await foodResponse.json();
                setPopularFoodData({
                    labels: popularFood.labels,
                    datasets: [{
                        data: popularFood.data,
                        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
                    }]
                });
        
                setLoading(false); // Loading is complete
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally, handle or display error to the user
            }
        };        
        fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="dashboard-content">
                <h2>Dashboard</h2>
                <div className="dashboard-widgets">
                    <div className="widget">
                        <h3>Orders</h3>
                        <p>{dashboardData.orders}</p>
                    </div>
                    <div className="widget">
                        <h3>Users</h3>
                        <p>{dashboardData.users}</p>
                    </div>
                    <div className="widget">
                        <h3>Menu Items</h3>
                        <p>{dashboardData.menuItems}</p>
                    </div>
                    <div className="widget">
                        <h3>Income</h3>
                        <p>${dashboardData.income}</p>
                    </div>
                </div>

                <div className="charts">
                    <div className="sales-chart">
                        <h3>Sales Figures</h3>
                        <Line data={salesData} />
                    </div>
                    <div className="popular-food-chart">
                        <h3>Popular  Food</h3>
                        <Doughnut data={popularFoodData} />
                    </div>
                </div>
            </div>
        </div>
    );
};
const Sidebar = () => (
    <div className="sidebar">
        <h2>Cafe Ziad</h2>
        <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/admin-menu-page">Menu</a></li>
            <li><a href="/order-history">Orders History</a></li>
            <li><a href="/users">Users</a></li>
            <li><a href="/menu">disconnect</a></li>
        </ul>
    </div>
);
export default DashboardPage;
