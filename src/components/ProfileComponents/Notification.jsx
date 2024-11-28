


export default function Notification() {
  const notifications = [
    {
      id: 1,
      avatar: "https://i.ibb.co.com/YQfT5nK/janeDoe.jpg",
      name: "Angela Gray",
      action: "reviewed 5 stars!",
      target: "",
      time: "1m ago"
    },
    {
      id: 2,
      avatar: "https://i.ibb.co.com/qD6tNgz/founder.jpg",
      name: "Thomas Wayne",
      action: "followed you",
      time: "5m ago"
    },
    {
      id: 3,
      avatar: "https://i.ibb.co.com/YQfT5nK/janeDoe.jpg",
      name: "Angela Gray",
      action: "has joined your group",
      target: "",
      time: "1 day ago"
    },
    {
      id: 4,
      avatar: "https://i.ibb.co.com/x8n0TrT/johnDoe.jpg",
      name: "Bruce Wayne",
      action: "sent you a private message",
      message: "Hello, thanks for joining as a cook. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
      time: "5 days ago"
    },
    {
      id: 5,
      avatar: "https://i.ibb.co.com/x8n0TrT/johnDoe.jpg",
      name: "Bruce Wayne",
      action: "commented on your post",
      time: "1 week ago",
      image: "https://i.ibb.co.com/twG8hmm/biryani.jpg"
    },
    
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm mt-10 mb-8">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Notifications</h1>
            <span className="bg-blue-600 text-white px-2 py-0.5 text-sm rounded-md">5</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 text-sm">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex gap-4 p-4 rounded-lg hover:bg-gray-50"
            >
              <img
                src={notification.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-semibold hover:text-blue-600 cursor-pointer">
                        {notification.name}
                      </span>{' '}
                      <span className="text-gray-600">{notification.action}</span>{' '}
                      {notification.target && (
                        <span className="font-semibold text-gray-600 hover:text-blue-600 cursor-pointer">
                          {notification.target}
                        </span>
                      )}
                    </p>
                    <p className="text-gray-500 text-sm">{notification.time}</p>
                    {notification.message && (
                      <div className="mt-2 p-4 border rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
                        {notification.message}
                      </div>
                    )}
                  </div>
                  {notification.image && (
                    <img
                      src={notification.image}
                      alt=""
                      className="w-10 h-10 rounded-lg cursor-pointer hover:opacity-80"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

