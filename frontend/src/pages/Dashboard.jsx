import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import StatsBar from '../components/StatsBar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?status=${filter}&search=${search}&sort=${sort}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/tasks/stats/summary');
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search, sort]);

  const refresh = () => {
    fetchTasks();
    fetchStats();
  };
  const deleteCompleted = async () => {
    try {
      await api.delete('/tasks/completed/all');
      toast.success('All completed tasks deleted!');
      refresh();
    } catch {
      toast.error('Error deleting completed tasks');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <StatsBar stats={stats} />
        <TaskForm onTaskAdded={refresh} />
        <div style={styles.filters}>
          <button style={styles.deleteBtn} onClick={deleteCompleted}>
          🗑 Delete Completed
          </button>
          <input style={styles.search} placeholder="🔍 Search tasks..."
            onChange={e => setSearch(e.target.value)} />
          <select style={styles.select} onChange={e => setFilter(e.target.value)}>
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select style={styles.select} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
        {tasks.length === 0
          ? <p style={styles.empty}>No tasks found! Add one above 👆</p>
          : tasks.map(task => (
              <TaskCard key={task._id} task={task} onUpdate={refresh} onDelete={refresh} />
            ))
        }
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '24px' },
  filters: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' },
  search: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
  select: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
  empty: { textAlign: 'center', color: '#666', fontSize: '16px', marginTop: '40px' },deleteBtn: { padding: '10px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }
};

export default Dashboard;