'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BarChartIcon from '@mui/icons-material/BarChart'
import EventIcon from '@mui/icons-material/Event'
import AdminNavbar from '../../../components/AdminNavbar'
import axios from 'axios'

const page = () => {
    const [role, setRole] = useState(null)


    const getUserRole = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/user', { withCredentials: true })
            console.log(res.data.user.role)
            setRole(res.data.user.role)
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        getUserRole()
    }, [])
    if (role !== 'admin') {

        return (
            <h1>UnAuthorized</h1>
        )
    }

    // Placeholder Stats
    const stats = {
        users: 1342,
        orders: 478,
        revenue: 32567,
        growth: 18.5
    }

    // Placeholder Activities
    const activities = [
        { icon: <PeopleIcon className="text-indigo-600" fontSize="small" />, title: 'New user John Doe registered', time: '2 hours ago' },
        { icon: <ShoppingCartIcon className="text-blue-500" fontSize="small" />, title: 'Order #9582 completed', time: '5 hours ago' },
        { icon: <BarChartIcon className="text-purple-500" fontSize="small" />, title: 'Monthly growth report generated', time: '1 day ago' }
    ]

    return (
        <div className="flex bg-[#f9fafb] min-h-screen">
            <AdminNavbar />

            <main className="flex-1 px-10 py-8">
                {/* Header */}
                <Box display="flex" alignItems="center" gap={2} mb={6}>
                    <DashboardIcon fontSize="large" className="text-indigo-600" />
                    <Typography variant="h4" className="font-bold text-gray-800">
                        Admin Dashboard
                    </Typography>
                </Box>

                {/* Top Stats */}
                <Grid container spacing={3} mb={6}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">Users</Typography>
                                        <Typography variant="h5" fontWeight={600}>{stats.users}</Typography>
                                        <Typography variant="caption" color="textSecondary">+4% this month</Typography>
                                    </Box>
                                    <PeopleIcon fontSize="large" className="text-indigo-500" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">Orders</Typography>
                                        <Typography variant="h5" fontWeight={600}>{stats.orders}</Typography>
                                        <Typography variant="caption" color="textSecondary">+7% this month</Typography>
                                    </Box>
                                    <ShoppingCartIcon fontSize="large" className="text-blue-500" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">Revenue</Typography>
                                        <Typography variant="h5" fontWeight={600}>${stats.revenue.toLocaleString()}</Typography>
                                        <Typography variant="caption" color="textSecondary">+12% this month</Typography>
                                    </Box>
                                    <AttachMoneyIcon fontSize="large" className="text-green-500" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">Growth</Typography>
                                        <Typography variant="h5" fontWeight={600}>{stats.growth}%</Typography>
                                        <Typography variant="caption" color="textSecondary">+3.2% vs last month</Typography>
                                    </Box>
                                    <BarChartIcon fontSize="large" className="text-purple-500" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Middle Section */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Card className="rounded-2xl shadow-sm">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6">Sales Overview</Typography>
                                    <EventIcon color="action" />
                                </Box>
                                <Box className="h-64 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Typography color="textSecondary">[Chart Placeholder]</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card className="rounded-2xl shadow-sm">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                                <Divider />
                                <Box mt={2} className="space-y-4">
                                    {activities.map((activity, i) => (
                                        <Box key={i} display="flex" alignItems="flex-start" gap={2}>
                                            <Box className="p-2 rounded-full bg-indigo-100">
                                                {activity.icon}
                                            </Box>
                                            <Box>
                                                <Typography className="font-medium text-sm">{activity.title}</Typography>
                                                <Typography variant="caption" color="textSecondary">{activity.time}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}
export default page
