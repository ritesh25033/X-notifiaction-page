// Get DOM elements
const notificationsList = document.getElementById('list');
const markAllButton = document.querySelector('.mark-all-button');
const notificationsCounter = document.querySelector('.notifications-counter');

// FIXED: Ensure proper initialization
let unreadCount = 4;
const unreadNotifications = new Set([0, 1, 2, 3]); // First 4 notifications are unread

// Function to render notifications
function renderNotifications() {
    notificationsList.innerHTML = '';
    
    data.forEach((notification, index) => {
        const listItem = document.createElement('li');
        listItem.className = `notification-item ${unreadNotifications.has(index) ? 'new-notification' : ''}`;
        
        // FIXED: Ensure notification dot is properly placed
        listItem.innerHTML = `
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
            ${notification.info.picture ? `<img src="${notification.info.picture}" alt="Chess" class="notification-picture">` : ''}
            ${unreadNotifications.has(index) ? '<span class="notification-dot"></span>' : ''}
        `;
        
        // Add click event listener
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

// Function to mark all notifications as read
function markAllAsRead() {
    unreadNotifications.clear();
    unreadCount = 0;
    renderNotifications(); // This will re-render without dots
}

// Function to update counter
function updateCounter() {
    notificationsCounter.textContent = unreadCount;
}

// Event listeners
markAllButton.addEventListener('click', markAllAsRead);

// CRITICAL: Make sure this runs after data.js is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderNotifications();
});
