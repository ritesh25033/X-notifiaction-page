// Get DOM elements
const notificationsList = document.getElementById('list');
const markAllButton = document.querySelector('.mark-all-button');
const notificationsCounter = document.querySelector('.notifications-counter');

// Track unread notifications (first 3 are unread initially)
let unreadCount = 3;
const unreadNotifications = new Set([0, 1, 2]);

// Function to render notifications
function renderNotifications() {
    notificationsList.innerHTML = '';
    
    data.forEach((notification, index) => {
        const listItem = document.createElement('li');
        listItem.className = `notification-item ${unreadNotifications.has(index) ? 'new-notification' : ''}`;
        
        let notificationHTML = `
            <img src="${notification.img}" alt="${notification.info.name}" class="notification-avatar">
            <div class="notification-content">
                <div class="notification-infos">
                    <a href="#" class="profile-link">${notification.info.name}</a>
                    <span class="notification-text">${notification.info.action}</span>
                    ${notification.info.postName ? `<a href="#" class="notification-link-post">${notification.info.postName}</a>` : ''}
                </div>
                <div class="notification-time">${notification.info.time}</div>
                ${notification.info.privateMessage ? `<div class="notification-text-private-message">${notification.info.privateMessage}</div>` : ''}
            </div>
        `;
        
        if (notification.info.picture) {
            notificationHTML += `<img src="${notification.info.picture}" alt="Picture" class="notification-picture">`;
        }
        
        // FIXED: Always render notification dot, but hide it when read
        const dotClass = unreadNotifications.has(index) ? 'notification-dot' : 'notification-dot hidden';
        notificationHTML += `<span class="${dotClass}"></span>`;
        
        listItem.innerHTML = notificationHTML;
        
        listItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('profile-link') || e.target.classList.contains('notification-link-post')) {
                e.preventDefault();
                window.location.href = '#';
                return;
            }
            
            if (notification.info.privateMessage) {
                const privateMessage = listItem.querySelector('.notification-text-private-message');
                if (privateMessage) {
                    privateMessage.classList.toggle('show');
                }
            }
            
            if (unreadNotifications.has(index)) {
                markAsRead(index);
            }
        });
        
        notificationsList.appendChild(listItem);
    });
    
    updateCounter();
}

// Function to mark individual notification as read
function markAsRead(index) {
    unreadNotifications.delete(index);
    unreadCount = unreadNotifications.size;
    
    // Hide the dot instead of removing it
    const notificationItem = notificationsList.children[index];
    const dot = notificationItem.querySelector('.notification-dot');
    if (dot) {
        dot.classList.add('hidden');
    }
    
    // Remove new-notification class
    notificationItem.classList.remove('new-notification');
    
    updateCounter();
}

// Function to mark all notifications as read
function markAllAsRead() {
    unreadNotifications.clear();
    unreadCount = 0;
    
    // Hide all dots and remove new-notification classes
    document.querySelectorAll('.notification-dot').forEach(dot => {
        dot.classList.add('hidden');
    });
    
    document.querySelectorAll('.new-notification').forEach(item => {
        item.classList.remove('new-notification');
    });
    
    updateCounter();
}

// Function to update counter
function updateCounter() {
    notificationsCounter.textContent = unreadCount;
    if (unreadCount === 0) {
        notificationsCounter.style.display = 'none';
    } else {
        notificationsCounter.style.display = 'inline-block';
    }
}

// Event listeners
markAllButton.addEventListener('click', markAllAsRead);

// Initial render
document.addEventListener('DOMContentLoaded', function() {
    renderNotifications();
});
