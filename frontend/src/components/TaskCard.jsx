import api from '../api/axios';
import toast from 'react-hot-toast';

const priorityColors = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const handleToggle = async () => {
    try {
      await api.patch(`/tasks/${task._id}/toggle`);
      onUpdate();
    } catch {
      toast.error('Error updating task');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success('Task deleted!');
      onDelete();
    } catch {
      toast.error('Error deleting task');
    }
  };

  return (
    <div style={{...styles.card, opacity: task.completed ? 0.7 : 1}}>
      <div style={styles.top}>
        <span style={{...styles.priority, background: priorityColors[task.priority]}}>
          {task.priority}
        </span>
        {task.dueDate && (
          <span style={styles.due}>
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <h3 style={{...styles.title, textDecoration: task.completed ? 'line-through' : 'none'}}>
        {task.title}
      </h3>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      <div style={styles.actions}>
        <button style={{...styles.btn, background: task.completed ? '#f59e0b' : '#10b981'}}
          onClick={handleToggle}>
          {task.completed ? '↩ Undo' : '✓ Complete'}
        </button>
        <button style={{...styles.btn, background: '#ef4444'}} onClick={handleDelete}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '16px' },
  top: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  priority: { padding: '4px 10px', borderRadius: '20px', color: 'white', fontSize: '12px', fontWeight: 'bold' },
  due: { fontSize: '12px', color: '#666' },
  title: { margin: '8px 0', fontSize: '16px', color: '#333' },
  desc: { color: '#666', fontSize: '14px', margin: '4px 0 12px' },
  actions: { display: 'flex', gap: '8px' },
  btn: { padding: '6px 14px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }
};

export default TaskCard;