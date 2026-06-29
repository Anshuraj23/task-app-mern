import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.title) return toast.error('Title is required!');
    setLoading(true);
    try {
      await api.post('/tasks', form);
      toast.success('Task created!');
      setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
      onTaskAdded();
    } catch {
      toast.error('Error creating task');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Add New Task</h3>
      <input style={styles.input} placeholder="Task title *"
        value={form.title}
        onChange={e => setForm({...form, title: e.target.value})} />
      <input style={styles.input} placeholder="Description (optional)"
        value={form.description}
        onChange={e => setForm({...form, description: e.target.value})} />
      <div style={styles.row}>
        <select style={styles.select} value={form.priority}
          onChange={e => setForm({...form, priority: e.target.value})}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input style={styles.input} type="date" value={form.dueDate}
          onChange={e => setForm({...form, dueDate: e.target.value})} />
      </div>
      <button style={styles.button} onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : '+ Add Task'}
      </button>
    </div>
  );
};

const styles = {
  container: { background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px' },
  heading: { margin: '0 0 16px', color: '#333' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '12px' },
  select: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '12px' },
  button: { padding: '10px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }
};

export default TaskForm;