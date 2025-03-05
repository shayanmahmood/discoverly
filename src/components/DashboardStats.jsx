
import React from 'react';
import { Card } from "./ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const monthlyData = [
  { name: 'Jan', attendees: 120, revenue: 5400 },
  { name: 'Feb', attendees: 150, revenue: 6750 },
  { name: 'Mar', attendees: 200, revenue: 9000 },
  { name: 'Apr', attendees: 180, revenue: 8100 },
  { name: 'May', attendees: 220, revenue: 9900 },
  { name: 'Jun', attendees: 250, revenue: 11250 },
  { name: 'Jul', attendees: 280, revenue: 12600 },
  { name: 'Aug', attendees: 260, revenue: 11700 },
  { name: 'Sep', attendees: 300, revenue: 13500 },
  { name: 'Oct', attendees: 340, revenue: 15300 },
  { name: 'Nov', attendees: 380, revenue: 17100 },
  { name: 'Dec', attendees: 310, revenue: 13950 }
];

const categoryData = [
  { name: 'Technology', value: 45 },
  { name: 'Business', value: 25 },
  { name: 'Marketing', value: 15 },
  { name: 'Design', value: 10 },
  { name: 'Other', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ticketData = [
  { name: 'General', sold: 345, revenue: 10350 },
  { name: 'VIP', sold: 120, revenue: 9600 },
  { name: 'Early Bird', sold: 80, revenue: 2000 },
  { name: 'Group', sold: 42, revenue: 5460 }
];

const attendeeGrowthData = [
  { name: 'Week 1', newAttendees: 45, totalAttendees: 45 },
  { name: 'Week 2', newAttendees: 60, totalAttendees: 105 },
  { name: 'Week 3', newAttendees: 75, totalAttendees: 180 },
  { name: 'Week 4', newAttendees: 90, totalAttendees: 270 },
  { name: 'Week 5', newAttendees: 105, totalAttendees: 375 },
  { name: 'Week 6', newAttendees: 120, totalAttendees: 495 },
  { name: 'Week 7', newAttendees: 90, totalAttendees: 585 }
];

const DashboardStats = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Event Statistics & Analytics</h3>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 h-10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Monthly Attendees</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendees" fill="#8884d8" name="Attendees" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Events by Category</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Monthly Revenue</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#00C49F" 
                      name="Revenue ($)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Ticket Sales</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ticketData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sold" fill="#0088FE" name="Tickets Sold" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#FFBB28" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Revenue Growth</h4>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#0088FE" 
                      fill="#0088FE" 
                      fillOpacity={0.2} 
                      name="Revenue ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendees" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Attendee Growth</h4>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={attendeeGrowthData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="newAttendees" 
                      stackId="1"
                      stroke="#00C49F" 
                      fill="#00C49F" 
                      name="New Attendees"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="totalAttendees" 
                      stackId="2"
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.2}
                      name="Total Attendees"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Event Categories</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="text-lg font-medium mb-4">Category Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={categoryData}
                    margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Events" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardStats;