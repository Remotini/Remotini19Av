import React from 'react';
import { Pie } from 'react-chartjs-2';


function PieChart({ data }) {
    const [userData, setUserData] = useState(data);

    const chartData = {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [
            {
                label: 'Tasks',
                data: [userData.completed, userData.inProgress, userData.notStarted],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };
    return (
        <div>
            <Pie data={chartData} />
        </div>
    );
}