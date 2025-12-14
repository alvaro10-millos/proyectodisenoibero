// ========================================
// ESPERAR A QUE EL DOM ESTÉ LISTO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ App inicializada');
  
  initTaskForm();
  initTaskToggles();
  addAnimations();
});

// ========================================
// INICIALIZAR FORMULARIO DE TAREAS
// ========================================
function initTaskForm() {
  const form = document.getElementById('taskForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    
    if (!title) {
      showNotification('Por favor ingresa una tarea', 'error');
      return;
    }
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });
      
      if (!response.ok) throw new Error('Error al crear la tarea');
      
      const task = await response.json();
      addTaskToDOM(task);
      input.value = '';
      showNotification('¡Tarea agregada exitosamente!', 'success');
      
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al agregar la tarea', 'error');
    }
  });
}

// ========================================
// AGREGAR TAREA AL DOM
// ========================================
function addTaskToDOM(task) {
  const taskList = document.querySelector('.task-list');
  if (!taskList) return;
  
  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    ${task.title}
    
      ✓ Completar
    
  `;
  
  taskList.appendChild(li);
  
  // Animación de entrada
  li.style.opacity = '0';
  li.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    li.style.transition = 'all 0.3s ease';
    li.style.opacity = '1';
    li.style.transform = 'translateY(0)';
  }, 10);
}

// ========================================
// INICIALIZAR TOGGLES DE TAREAS
// ========================================
function initTaskToggles() {
  const toggleButtons = document.querySelectorAll('.btn-success');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      toggleTask(this);
    });
  });
}

// ========================================
// TOGGLE COMPLETADO DE TAREA
// ========================================
function toggleTask(button) {
  const taskItem = button.closest('.task-item');
  taskItem.classList.toggle('completed');
  
  if (taskItem.classList.contains('completed')) {
    button.textContent = '↺ Reabrir';
    button.classList.remove('btn-success');
    button.classList.add('btn-danger');
  } else {
    button.textContent = '✓ Completar';
    button.classList.remove('btn-danger');
    button.classList.add('btn-success');
  }
}

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// AGREGAR ANIMACIONES
// ========================================
function addAnimations() {
  // Observador de intersección para animaciones al scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
