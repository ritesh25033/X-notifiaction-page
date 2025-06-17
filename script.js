// Get DOM elements
const notificationsList = document.getElementById('list');
const markAllButton = document.querySelector('.mark-all-button');
const notificationsCounter = document.querySelector('.notifications-counter');

// Track unread notifications (first 4 are unread initially)
let unreadCount = 4;
const unreadNotifications = new Set([0, 1, 2, 3]); // Mark first 4 as unread

// Function to render notifications
function renderNotifications() {
    notificationsList.innerHTML = '';
    
    data.forEach((notification, index) => {
        const listItem = document.createElement('li');
        listItem.className = `notification-item ${unreadNotifications.has(index) ? 'new-notification' : ''}`;
        
        // Create notification HTML
        let notificationHTML = `
            <img src="${notification.img}" alt="${notification.info.name}" class="notification-avatar">
            <div class="notification-content">
                <div class="notification-infos">
                    <a href="#" class="profile-link">${notification.info.name}</a>
                    <span class="notification-text">${notification.info.action}</span>
                    ${notification.info.postName ? `<a href="#" class="notification-link-post">${notification.info.postName}</a>` : ''}
                    ${unreadNotifications.has(index) ? '<span class="notification-dot"></span>' : ''}
                </div>
                <div class="notification-time">${notification.info.time}</div>
                ${notification.info.privateMessage ? `<div class="notification-text-private-message">${notification.info.privateMessage}</div>` : ''}
            </div>
        `;
        
        // Add picture if exists
        if (notification.info.picture) {
            notificationHTML += `<img src="${notification.info.picture}" alt="Chess" class="notification-picture">`;
        }
        
        listItem.innerHTML = notificationHTML;
        
        // Fixed: Add click event for private messages with proper toggle
        if (notification.info.privateMessage) {
            listItem.addEventListener('click', (e) => {
                // Prevent navigation if clicking on links
                if (e.target.tagName === 'A') return;
                
                const privateMessage = listItem.querySelector('.notification-text-private-message');
                privateMessage.classList.toggle('show');
                
                // Mark as read when clicked
                if (unreadNotifications.has(index)) {
                    markAsRead(index);
                }
            });
        } else {
            // Mark as read when clicked (for non-private messages)
            listItem.addEventListener('click', (e) => {
                // Prevent navigation if clicking on links
                if (e.target.tagName === 'A') return;
                
                if (unreadNotifications.has(index)) {
                    markAsRead(index);
                }
            });
        }
        
        notificationsList.appendChild(listItem);
    });
    
    updateCounter();
}

// Function to mark individual notification as read
function markAsRead(index) {
    unreadNotifications.delete(index);
    unreadCount = unreadNotifications.size;
    renderNotifications();
}

// Function to mark all notifications as read
function markAllAsRead() {
    unreadNotifications.clear();
    unreadCount = 0;
    renderNotifications();
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

// Fixed: Proper navigation handling for profile and post links
document.addEventListener('click', (e) => {
    if (e.target.matches('.profile-link') || e.target.matches('.notification-link-post')) {
        e.preventDefault();
        // Navigate to # (this will change the URL to include #)
        window.location.href = '#';
    }
});

// Initial render
renderNotifications();
